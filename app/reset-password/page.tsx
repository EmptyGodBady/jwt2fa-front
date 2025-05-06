'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function ResetPasswordPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (!token) {
			setError('Invalid or missing token');
			return;
		}

		try {
			await api('/api/auth/reset-password', {
				method: 'POST',
				body: JSON.stringify({ token, newPassword: password }),
			});
			setSuccess(true);
			setTimeout(() => router.push('/login'), 2000);
		} catch (err: any) {
			setError(err.message || 'Reset failed');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-6 rounded shadow-md w-full max-w-sm"
			>
				<h2 className="text-xl font-semibold mb-4">Reset Password</h2>

				{success ? (
					<p className="text-green-600">Password updated! Redirecting…</p>
				) : (
					<>
						{error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
						<input
							type="password"
							placeholder="New password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-3 py-2 border rounded mb-4"
						/>
						<button
							type="submit"
							className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
						>
							Reset Password
						</button>
					</>
				)}
			</form>
		</div>
	);
}
