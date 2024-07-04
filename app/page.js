'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

async function fetchData() {
	const res = await fetch('/api/data');
	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}
	const data = await res.json();
	return data;
}

export default function Home() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchData()
			.then((data) => setData(data))
			.catch((err) => setError(err.message));
	}, []);

	if (error) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				{error}
			</div>
		);
	}

	if (!data) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				Loading...
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-[#021225] p-6">
			<h1 className="text-4xl font-bold text-gray-100 mb-8">
				Domain Records
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{data.map((record) => (
					<Link
            href={`https://${record.name}`}
            target='_blank'
						key={record.id}
						className="bg-[#2a0fc4] rounded-lg shadow-lg p-6 text-center transform transition-transform hover:scale-105"
					>
						<h2 className="text-2xl font-semibold text-[#FF204E]">
							{record.name}
						</h2>
						{/* <p className="text-">Type: {record.type}</p>
						<p className="text">Content: {record.content}</p>
						<p className="text">TTL: {record.ttl}</p> */}
					</Link>
				))}
			</div>
		</div>
	);
}
