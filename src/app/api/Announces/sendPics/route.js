import pool from "@/lib/db";

export async function POST(req) {
    try{
        const body = await req.json();

        await pool.query(
            "INSERT INTO images (announce_id, url, img_type) VALUES ($1, $2, $3)", [
                body.announce_id, body.url, body.img_type
            ]
        );

        return Response.json({ success: true });
        
    } catch(error) {
        return Response.json(
                    {success:false, message: "حدث خطأ"},
                );
    }
}