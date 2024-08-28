import clientPromise from "./mongodb.js";
import {cookies} from 'next/headers'
import {sha256} from 'js-sha256'
import { encrypt } from "./auth.js";
import { redirect } from "next/navigation.js";



export async function login(formData) {
    const password = formData.get('password')
    const email = formData.get('email')
    const user = {email, role: 'admin'}
    const passwordHash = sha256(password)
    const client = await clientPromise

    const collection = client.db("BlogDatabase").collection("users")
    
    let userData = await collection.findOne({ username: email, password: passwordHash });
    console.log('user data is : #################')
    console.log(userData)
    if(!userData) {
        cookies().set('session', '', {expires: new Date(0)})
        return
    }
	const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
	const session = await encrypt({user, expires})
	cookies().set('session', session, {expires, httpOnly: true});
    redirect("/b-admin/dashboard");
}