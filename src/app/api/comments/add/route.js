import pool from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req){

    try{
        const { announceId, comment} = await req.json();

        const authHeader = req.headers.get("authorization");
        if(!authHeader) {
            return NextResponse.json({ success: false }, { status: 401 })
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.id;

        const result = await pool.query(
            "INSERT INTO comments (announce_id, commentor_id, comment, created_at) VALUES ($1,$2,$3,NOW()) RETURNING *", [announceId, user_id, comment]
        );

        return NextResponse.json({
            success: true,
            comment: result.rows[0]
        });

    } catch (error){
        return NextResponse.json({
            success: false,
        }, { status:500 });

    }
}