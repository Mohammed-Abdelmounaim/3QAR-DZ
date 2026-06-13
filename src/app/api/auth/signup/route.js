import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import pool from "@/lib/db";
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const body = await request.json();
        const { firstname, lastname, email, password, role } = body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = 'INSERT INTO users (firstname, lastname, email, passwordHash, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, firstname, lastname, email, role, createdat';

        const values = [firstname, lastname, email, hashedPassword, role];
        const result = await pool.query(query, values);

        const payLoad = {
            id: result.rows[0].id,
            firstname: result.rows[0].firstname,
            lastname: result.rows[0].lastname,
            email: result.rows[0].email,
            role: result.rows[0].role,
        };

        const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: '7d'});

        return NextResponse.json({
            success: true,
            message: "تم إنشاء الحساب بنجاح",
            token
            });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "البريد موجود مسبقًا"
            }, { status: 400 });
    }
}