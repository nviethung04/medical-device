import pool from "@/lib/postgresql";
import { decrypt, encrypt } from "@/utils/Security";
import { NextResponse } from "next/server";

// API POST để Dang nhap
export async function POST(req) {
  try {
    const client = await pool.connect();

    const { email, password } = await req.json();

    try {
      const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) {
        return NextResponse.json({ success: false, error: "Email hoặc mật khẩu không đúng" }, { status: 404 });
      }

      if (decrypt(user.password) !== password) {
        return NextResponse.json({ success: false, error: "Email hoặc mật khẩu không đúng" }, { status: 400 });
      }

      // userToken
      let userToken = {
        id: user.id,
        time: new Date().getTime()
      };

      userToken = JSON.stringify(userToken);

      userToken = encrypt(userToken);

      return NextResponse.json({
        success: true,
        data: {
          token: userToken,
          type: "Bearer"
        }
      });
    } finally {
      client.release();
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
