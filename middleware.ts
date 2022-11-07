import {NextResponse} from "next/server"

const randomId = () => Math.random().toString(36).substring(2)

export function middleware () {
        const response = NextResponse.next();
        response.headers.set('request-id', randomId());
        return response;
}

