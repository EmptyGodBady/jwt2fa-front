// app/api/auth/2fa/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const tempToken = req.headers.get('authorization');
	const body = await req.json();

	const res = await fetch('http://localhost:5002/api/auth/2fa/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: tempToken || '',
			cookie: req.headers.get('cookie') || '',
		},
		credentials: 'include',
		body: JSON.stringify(body),
	});

	const data = await res.json();

	const response = NextResponse.json(data, { status: res.status });

	const setCookie = res.headers.get('set-cookie');
	if (setCookie) {
		response.headers.set('set-cookie', setCookie);
	}

	return response;
}
