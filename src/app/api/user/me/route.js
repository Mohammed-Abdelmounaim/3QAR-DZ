import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function GET(req) {
    try{
        const authHeader = req.headers.get("authorization");

        if(!authHeader){
            return NextResponse.json(
                {success: false, message: "غير مصرح"},
                {status: 401}
            );
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const result = await pool.query(
            "SELECT id, firstname, lastname, email, role, createdAt FROM users WHERE id = $1", [decoded.id]
        );

        if(result.rows.length === 0) {
            return NextResponse.json(
                {success: false, message: "المستخدم غير موجود"},
                {status: 404}
            );
        }

        return NextResponse.json({
            success: true,
            user: result.rows[0], 
        });

    } catch(error) {
        return NextResponse.json(
            {success: false, message: "توكن غير صالح"},
            {status: 401}
        );
    }
}