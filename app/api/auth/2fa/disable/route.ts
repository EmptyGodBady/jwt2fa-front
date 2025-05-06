import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const token = req.headers.get('authorization');

	const res = await fetch('http://localhost:5002/api/auth/2fa/disable', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token || '',
			cookie: req.headers.get('cookie') || '',
		},
		credentials: 'include',
	});

	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
