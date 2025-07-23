const { Pool } = require('pg');
const CryptoJS = require('crypto-js');

// Database configuration
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'medical_device',
    user: 'postgres',
    password: 'postgres123',
});

// Crypto configuration
const CRYPTO_KEY = '0123456789abcdef0123456789abcdef';
const CRYPTO_IV = 'abcdef0123456789';

const key = CryptoJS.enc.Hex.parse(CRYPTO_KEY);
const iv = CryptoJS.enc.Hex.parse(CRYPTO_IV);

function encrypt(text) {
    const encrypted = CryptoJS.AES.encrypt(text, key, { iv: iv });
    return encrypted.toString();
}

async function createAdminUser() {
    try {
        const client = await pool.connect();

        // Mã hóa mật khẩu
        const encryptedPassword = encrypt('admin123');

        // Thêm user admin
        const result = await client.query(`
      INSERT INTO users (id, email, password, first_name, last_name, role, active, created_at, updated_at)
      VALUES (
        uuid_generate_v4(),
        $1,
        $2,
        $3,
        $4,
        $5,
        true,
        NOW(),
        NOW()
      ) RETURNING *
    `, ['admin@test.com', encryptedPassword, 'Admin', 'User', 1]);

        console.log('✅ Admin user created successfully!');
        console.log('📧 Email: admin@test.com');
        console.log('🔑 Password: admin123');
        console.log('📋 User data:', result.rows[0]);

        client.release();
        await pool.end();
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    }
}

createAdminUser();
