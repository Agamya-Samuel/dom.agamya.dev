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

	const response = await fetch(process.env.CLOUDFLARE_API, options)
		.then((response) => response.json())
		.catch((err) => console.error(err));

	const data = [];
	response.result.map((record) => {
		const json_data = {
			name: record.name,
			// type: record.type,
			// content: record.content,
			// ttl: record.ttl,
		};
		data.push(json_data);
	});
	// console.log(data);

	return NextResponse.json(data);
}

// export async function GET(request) {
// 	const greeting = 'Hello World!!';
// 	const json = {
// 		greeting,
// 	};

// 	return NextResponse.json(json);
// }
