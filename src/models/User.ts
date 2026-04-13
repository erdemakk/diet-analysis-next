import mongoose, { Schema, models } from 'mongoose';

// 1. Kullanıcının hangi verilere sahip olacağını tanımlıyoruz (Şema)
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true, // İsim alanı zorunlu
        },
        email: {
            type: String,
            required: true, // E-posta zorunlu
            unique: true,   // Aynı e-posta ile ikinci bir kişi eklenemez
        },
        password: {
            type: String,
            required: true, // Şifre zorunlu
        },
        role: {
            type: String,
            default: 'user', // Varsayılan olarak herkes 'user'. Sen kendine 'admin' yapabilirsin.
        }
    },
    {
        timestamps: true // Bu sihirli ayar, kullanıcının sisteme ne zaman eklendiğini (createdAt) otomatik kaydeder.
    }
);

// 2. Modeli Dışa Aktarma (Next.js Hot Reload Koruması)
// Eğer 'User' adında bir model zaten hafızada varsa onu kullan, yoksa sıfırdan oluştur.
const User = models.User || mongoose.model('User', userSchema);

export default User;