import pool from "@/lib/db";
import Viewer from "@/components/PannellumViewer";

async function Interior({ params }){
    const { id } = await params;

    const result = await pool.query(
            "SELECT url FROM images WHERE announce_id = $1 AND img_type = 'in'", [id]
        );

        const images = result.rows;

    return (
        <main className="pt-[65px] mb-[50px] flex flex-col">
            <h1 className="text-center mt-[20px] mb-[20px] font-bold text-2xl">الجولة الداخلية</h1>
            <Viewer images= {images}/>
        </main>
    );

}
export default Interior;