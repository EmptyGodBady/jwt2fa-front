'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
	const { accessToken, logout, loading } = useAuth();
	const [name, setName] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (!loading && !accessToken) {
			router.push('/login');
		}
	}, [accessToken, loading, router]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await api('/api/auth/me', {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				setName(res.user.name);
			} catch {
				setName('');
			}
		};

		if (accessToken) fetchUser();
	}, [accessToken]);

	if (loading || !accessToken) return null;

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full bg-white p-6 rounded shadow-md">
				<h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
				<h2 className="text-xl mb-4">Welcome, {name}!</h2>
				<div className="mb-6 space-y-2">
					<p>You’re logged in 🎉</p>
					<button
						onClick={() => router.push('/settings')}
						className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
					>
						Go to Settings
					</button>
				</div>
				<button
					onClick={() => logout()}
					className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
				>
					Logout
				</button>
			</div>
		</div>
	);
}
