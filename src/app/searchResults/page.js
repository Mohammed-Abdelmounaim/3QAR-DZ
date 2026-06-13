import pool from "@/lib/db";
import {DZcommunes} from "@/data/DZcommunes";
import SearchFilter from "@/components/searchFilter";

function AnnounceCard( {announce} ) {

    const date = new Date(announce.created_at);

    const formattedDate = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;

    const typeTranslated = {
        House: "منزل",
        Appartement: "شقة",
        Shop: "محل",
        Land: "قطعة أرض"
    };

    const getLocationArabic = (wilayaValue, baladiaValue) => {
        const wilayaObj = DZcommunes.find(w => w.value === wilayaValue);

        if (!wilayaObj) return `${wilayaValue} - ${baladiaValue}`;

        const baladiaObj = wilayaObj.communes.find(c => c.value === baladiaValue);

        return `${wilayaObj.text} - ${baladiaObj ? baladiaObj.text : baladiaValue}`;
    };

    return (
        <div className="bg-white min-h-[400px] w-[280px] pt-[10px] pb-[20px] shadow-xl rounded-2xl mt-10 mb-10 m-auto">
            <img src={announce.url} alt="صورة خارجية" className="w-[90%] h-[150px] m-auto mt-[15px] rounded-xl"/>
            <ul className="mt-[20px] w-[90%] m-auto rounded-l flex flex-col">
                <li className="mb-[10px] mr-[10px] flex gap-2 text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <p className=" text-black text-xl font-semibold">
                        {getLocationArabic(announce.wilaya, announce.baladia)}
                    </p>
                </li>
                <li className="mb-[10px] mr-[10px]">{typeTranslated[announce.estate_type]} للبيع، المساحة {announce.surface} م<sup>2</sup></li>
                <li className="mb-[15px] mr-[10px]">{announce.rooms} غرف، {announce.floor_} طوابق</li>
                <li className="text-center font-semibold"><span className="text-blue-500 text-2xl font-bold">{announce.price}</span> دج</li>
            </ul>

            <div className="flex justify-around mt-[20px] h-[40px]" dir="ltr">
                <a href={`/AnnounceDetail/${announce.id}`} className="bg-white w-[40%] text-center pt-[5px] rounded-2xl border-2 border-blue-300 hover:border-blue-500 hover:text-blue-500 font-bold">تفاصيل أكثر</a>
                <div className="w-[30%] bg-white text-center pt-[5px]">{formattedDate}</div>
            </div>
        </div>
    );
}

async function Announces( {data} ) {
    const type = data.type;
    let announces;

    if(type === "wilaya"){
        const value = data.value;

        const result = await pool.query(
            "SELECT a.id, a.wilaya, a.baladia, a.estate_type, a.surface, a.floor_, a.rooms, a.price, a.created_at, i.url FROM announces a LEFT JOIN images i on a.id = i.announce_id AND i.img_type = 'out' WHERE a.wilaya = $1 AND a.is_active = true ORDER BY a.created_at DESC", [value]
        );

        announces = result.rows;
    } else if(type === "category"){
        const value = data.value;

        const result = await pool.query(
            "SELECT a.id, a.wilaya, a.baladia, a.estate_type, a.surface, a.floor_, a.rooms, a.price, a.created_at, i.url FROM announces a LEFT JOIN images i on a.id = i.announce_id AND i.img_type = 'out' WHERE a.estate_type = $1 AND a.is_active = true ORDER BY a.created_at DESC", [value]
        );

        announces = result.rows;
    } else if(type === "filter"){
        const estateType = data.etype;
        const wilaya = data.wilaya;
        const baldia = data.baladia;
        const max = data.maxPrice;

        const result = await pool.query(
            "SELECT a.id, a.wilaya, a.baladia, a.estate_type, a.surface, a.floor_, a.rooms, a.price, a.created_at, i.url FROM announces a LEFT JOIN images i on a.id = i.announce_id AND i.img_type = 'out' WHERE a.estate_type = $1 AND a.is_active = true AND a.wilaya = $2 AND a.baladia = $3 AND a.price <= $4 ORDER BY a.created_at DESC", [estateType, wilaya, baldia, max]
        );

        announces = result.rows;
    }

    return (
    <section className="m-auto w-[90%] p-3 shadow-xl rounded-xl bg-gray-100 mb-[50px]">
        <h2 className="text-center mt-[20px] mb-[20px] font-bold text-lg">نتائج البحث</h2>
        <div className="w-[90%] m-auto min-h-[200px] flex flex-col md:flex-row gap-1 md:gap-2" dir="rtl">
            {announces.length === 0 ? (
                <p className="mt-[100px] text-xl text-gray-600">لا توجد إعلانات مطابقة لما بحثت عنه</p>
            ) : (
                announces.map((a) => (
                    <AnnounceCard key={a.id} announce={a} />
                ))
            )}
        </div>
    </section>
    );
}

async function searchResults({ searchParams }) {
    const parameters = await searchParams;

    return (
        <main className="pt-[65px]">
            <h1 className="text-center mt-[20px] mb-[20px] font-bold text-2xl">صفحة الإعلانات</h1>
            <SearchFilter />
            <Announces data={parameters}/>
        </main>
    )
}
export default searchResults;