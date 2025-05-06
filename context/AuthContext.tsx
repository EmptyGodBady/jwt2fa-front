'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface AuthContextType {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	refresh: () => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const refresh = async () => {
		try {
			const data = await api('/api/auth/refresh-token', { method: 'POST' });
			setAccessToken(data.accessToken);
		} catch (err) {
			console.error('❌ refresh() failed:', err);
			setAccessToken(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		refresh();
	}, []);

	const logout = async () => {
		try {
			await api('/api/auth/logout', { method: 'POST' });
		} finally {
			setAccessToken(null);
			router.push('/login');
		}
	};

	return (
		<AuthContext.Provider
			value={{ accessToken, setAccessToken, refresh, logout, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
	return context;
};
