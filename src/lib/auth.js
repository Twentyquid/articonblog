import {SignJWT, jwtVerify} from 'jose'
import {cookies} from 'next/headers'

import {NextRequest, NextResponse} from 'next/server'

const secretKey = process.env.SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
	return await new SignJWT(payload)
	.setProtectedHeader({alg: "HS256"})
	.setIssuedAt()
	.setExpirationTime('1 day from now')
	.sign(key)
}

export async function decrypt(input) {
	const {payload} = await jwtVerify(input, key, {
		algorithms: ['HS256']
	})
	return payload
}

export async function updateSession(request) {
	const session = request.cookies.get('session')?.value
    console.log('Session is ##################################')
    console.log(session)
	if(!session) {
		return NextResponse.redirect(new URL('/b-admin', request.url))
	}
	const parsed = await decrypt(session)
	parsed.expires = new Date(Date.now() +  24 * 60 * 60 * 1000)
	const res = NextResponse.next()
    if(session) {
        res.cookies.set({
            'name': 'session',
            value: await encrypt(parsed),
            expires: parsed.expires,
            httpOnly: true
        })
		return res
    }
}