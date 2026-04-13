import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        await connectToDatabase();

        // 1. Önce veritabanındaki o yabancı (Jason Smith vb.) kullanıcıları temizleyelim
        // DİKKAT: Bu komut 'users' tablosundaki HER ŞEYİ siler. Tertemiz bir sayfa açar.
        await User.deleteMany({});

        // 2. Senin Admin bilgilerini hazırlayalım
        const adminEmail = "erdem@afrodizie.com";
        const hashedPassword = await bcrypt.hash("erdemakk", 10); // Şifreni buradan belirle

        // 3. Admini oluştur
        const admin = await User.create({
            name: "Erdem Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        return NextResponse.json({
            success: true,
            message: "Veritabanı temizlendi ve Admin hesabı başarıyla kuruldu!",
            data: {
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        }, { status: 201 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}