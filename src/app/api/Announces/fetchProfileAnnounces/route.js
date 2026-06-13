import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function GET(req){

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
            "SELECT a.id, a.wilaya, a.baladia, a.estate_type, a.surface, a.floor_, a.rooms, a.price, a.is_active, a.created_at, i.url FROM announces a LEFT JOIN images i on a.id = i.announce_id AND i.img_type = 'out' WHERE a.id_user = $1 ORDER BY created_at DESC", [decoded.id]
        );

        if(result.rows.length === 0) {
            return NextResponse.json(
                {success: false, message: "You have posted no announces yet!"},
                {status: 404}
            );
        }

        return NextResponse.json({
            success: true,
            announces: result.rows, 
        });
    }
    catch(error){
        return NextResponse.json(
            {success: false, message: "توكن غير صالح"},
            {status: 401}
        );
    }
}