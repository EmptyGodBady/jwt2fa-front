'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { setAccessToken } = useAuth();
	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			const res = await api('/api/auth/login', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
			});

			if (res.requires2FA) {
				localStorage.setItem('tempToken', res.tempToken);
				router.push('/2fa');
			} else {
				setAccessToken(res.accessToken);
				router.push('/');
			}
		} catch (err: any) {
			setError(err.message || 'Login failed');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form
				onSubmit={handleLogin}
				className="bg-white p-6 rounded shadow-md w-full max-w-sm"
			>
				<h2 className="text-2xl font-semibold mb-4">Login</h2>

				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

				<input
					type="email"
					placeholder="Email"
					className="w-full px-3 py-2 border rounded mb-3"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					placeholder="Password"
					className="w-full px-3 py-2 border rounded mb-4"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button
					type="submit"
					className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
				>
					Login
				</button>
				<p className="text-sm text-right mb-4">
					<a href="/forgot-password" className="text-blue-600 hover:underline">
						Forgot password?
					</a>
				</p>
			</form>
		</div>
	);
}
