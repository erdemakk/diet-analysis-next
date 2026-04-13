"use client";

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
    const { data: session, status } = useSession();

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Sol Taraf: Logo ve İsim */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-12 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DYT.</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-bold text-gray-900 tracking-tight">Afrodizie</span>
                                <span className="text-sm font-medium text-gray-500 hidden sm:block">| Diyetisyen Paneli</span>
                            </div>
                        </Link>
                    </div>

                    {/* Sağ Taraf: Dinamik Butonlar */}
                    <div className="flex items-center gap-4">
                        {status === "loading" ? (
                            <span className="text-xs text-gray-400">Kontrol ediliyor...</span>
                        ) : session ? (
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                                    Yönetim Paneli
                                </Link>
                                <span className="text-sm font-medium text-gray-300">|</span>
                                <span className="text-sm font-medium text-gray-700">
                                    Merhaba, <span className="text-green-600">{session.user?.name}</span>
                                </span>
                                <button
                                    onClick={() => signOut()}
                                    className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                                >
                                    Çıkış Yap
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                {/* Giriş Yap Butonu */}
                                <Link
                                    href="/login"
                                    className="bg-green-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
                                >
                                    Giriş Yap
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;