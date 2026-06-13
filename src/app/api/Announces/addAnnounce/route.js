import pool from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req){
    try{
        const body = await req.json();

        const authHeader = req.headers.get("authorization");
        
                if(!authHeader){
                    return NextResponse.json(
                        {success: false, message: "غير مصرح"},
                        {status: 401}
                    );
                }
        
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const userId = decoded.id;


        const result = await pool.query(
            "INSERT INTO announces (id_user, wilaya, baladia, estate_type, surface, floor_, rooms, price, phone, description, estate_carac, zone_carac) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id",
            [ userId, body.willaya, body.commune, body.estateType, body.Surface, body.floor, body.rooms, body.price, body.phone, body.description, body.caracter, body.zone ]
        );

        return Response.json(
                    { success: true,
                      id: result.rows[0].id
                });

    } catch (error) {
        return Response.json(
                    {success:false, message: "حدث خطأ"},
                    {status:500}
                );
    }
}