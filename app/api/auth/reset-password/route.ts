import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const body = await req.json();

	const res = await fetch('http://localhost:5002/api/auth/reset-password', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
		credentials: 'include',
	});

	const data = await res.json();
	return NextResponse.json(data, { status: res.status });
}
