import { updateSession } from "./lib/auth"

export async function middleware(request) {
	return await updateSession(request)
}

export const config = {
	'matcher': ['/b-admin/dashboard/:path*', '/b-admin/dashboard']
}