import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {
	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'X-Auth-Key': process.env.AUTH_KEY,
			'X-Auth-Email': process.env.AUTH_EMAIL,
		},
	};

	try {
		const response = await fetch(process.env.CLOUDFLARE_API, options);
		const jsonResponse = await response.json();

		const data = jsonResponse.result.map((record) => ({
			name: record.name,
			// type: record.type,
			// content: record.content,
			// ttl: record.ttl,
		}));

		const res = NextResponse.json(data);
		res.headers.set(
			'Cache-Control',
			'no-store, no-cache, must-revalidate, proxy-revalidate'
		);
		res.headers.set('Pragma', 'no-cache');
		res.headers.set('Expires', '0');
		return res;
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ error: 'Failed to fetch data' },
			{ status: 500 }
		);
	}
}
