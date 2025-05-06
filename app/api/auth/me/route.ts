import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const token = req.headers.get('authorization');

	const res = await fetch('http://localhost:5002/api/auth/me', {
		method: 'GET',
		headers: {
			Authorization: token || '',
			cookie: req.headers.get('cookie') || '',
		},
		credentials: 'include',
	});

	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
