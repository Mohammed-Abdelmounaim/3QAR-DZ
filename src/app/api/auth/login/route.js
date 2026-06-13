import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import pool from "@/lib/db";
import jwt from 'jsonwebtoken';

export async function POST(req){
    try {
        const {email, password} = await req.json();

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        ); 

        if(result.rows.length === 0){
            return NextResponse.json(
                    {success: false, message: "البريد غير موجود"},
                    { status: 400}
                );
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.passwordhash);

        if(!isMatch){
            return NextResponse.json(
                {success: false, message: "كلمة المرور غير صحيحة"},
                {status: 400}
            );
        }

        const token = jwt.sign(
            {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );

        return NextResponse.json(
            { success: true,
            token,
        });

    } catch (error){
        return NextResponse.json(
            {success:false, message: "حدث خطأ في تسجيل الدخول"},
            {status:500}
        );

    }

}