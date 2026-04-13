import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // 1. E-posta veya şifre boş mu kontrol et
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Lütfen e-posta ve şifrenizi girin.");
                }

                // 2. Veritabanına bağlan
                await connectToDatabase();

                // 3. Kullanıcıyı e-postasına göre bul
                const user = await User.findOne({ email: credentials.email });
                if (!user) {
                    throw new Error("Bu e-posta adresiyle kayıtlı bir hesap bulunamadı.");
                }

                // 4. Şifre doğru mu diye kontrol et (Kriptoyu çöz ve karşılaştır)
                const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordMatch) {
                    throw new Error("Şifreniz hatalı, lütfen tekrar deneyin.");
                }

                // 5. Her şey doğruysa kullanıcı bilgilerini sisteme (token'a) ver
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role, // Admin olup olmadığını anlamak için
                };
            }
        })
    ],
    session: {
        strategy: "jwt", // Oturumu çerezlerde (cookie) güvenle tut
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login", // Kullanıcı girişi bizim yaptığımız özel /login sayfasından yapacak
    },
});

export { handler as GET, handler as POST };