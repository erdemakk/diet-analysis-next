"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    // 1. Durum Yönetimi (Svelte'deki let email = '' mantığı)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Butonun basılıp basılmadığını kontrol etmek için

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
            setIsLoading(false);
        } else {
            router.push('/');
            router.refresh();
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Afrodizie Giriş
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 italic">
                    Diyetisyen Paneline erişmek için bilgilerinizi girin.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">

                    {/* Hata Mesajı Bölümü */}
                    {error && (
                        <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200 text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* E-posta Alanı */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">E-posta</label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    required
                                    value={email} // Svelte'deki bind:value karşılığı
                                    onChange={(e) => setEmail(e.target.value)} // Değeri günceller
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="ornek@afrodizie.com"
                                />
                            </div>
                        </div>

                        {/* Şifre Alanı */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Şifre</label>
                            <div className="mt-1">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Giriş Butonu */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading} // İşlem sürerken butonu kapat
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors 
                                    ${isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-xs text-center text-gray-400 italic">
                        Kayıtlar sadece yönetici tarafından oluşturulmaktadır.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;