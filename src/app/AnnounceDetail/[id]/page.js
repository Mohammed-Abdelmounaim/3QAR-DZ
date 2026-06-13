import pool from "@/lib/db";
import {DZcommunes} from "@/data/DZcommunes";
import Comments from "@/components/comments";

async function Details({id}){
    const result = await pool.query(
            "SELECT a.id, a.id_user, a.wilaya, a.baladia, a.estate_type, a.surface, a.floor_, a.rooms, a.price, a.phone, a.description, a.estate_carac, a.zone_carac, a.created_at, i.url FROM announces a LEFT JOIN images i on a.id = i.announce_id AND i.img_type = 'out' WHERE a.id = $1", [id]
        );

        const announce = result.rows[0];

    const result2 = await pool.query(
        "SELECT firstname, lastname, email FROM users WHERE id = $1", [announce.id_user]
    );
        const user = result2.rows[0];

        const date = new Date(announce.created_at);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;

        const typeTranslated = {
            House: "منزل",
            Appartement: "شقة",
            Shop: "محل",
            Land: "قطعة أرض"
    };

        const zoneTranslated = {
            Center: "وسط المدينة",
            closeToCenter: "قريب من وسط المدينة",
            CityBorder: "أطراف المدينة",
            OutOfCity: "خارج المدينة"
    };

        const houseAppCaracTranslated = {
            Luxury: "فاخر",
            Renovated: "مُحسَّن",
            Economic: "عادي",
            Basic: "قديم / غير مكتمل"
    };

        const shopTranslated = {
            High_traffic: "حركة تجارية عالية",
            Medium_traffic: "حركة تجارية متوسطة",
            Low_traffic: "حركة تجارية ضعيفة"
    };

        const landTranslated = {
            fullOwn2frontWutilities: "ملكية كاملة بواجهتان, موصولة",
            fullOwn2frontWOutilities: "ملكية كاملة بواجهتان, غير موصولة",
            fullOwn1frontWutilities: "ملكية كاملة بواجهة واحدة, موصولة",
            fullOwn1frontWOutilities: "ملكية كاملة بواجهة واحدة, غير موصولة",
            sharedOwn: "ملكية مشتركة",
            Industrial: "أرض (عقار صناعي)"

    };

    let Translation;
    if(announce.estate_type == "House" || "Appartement"){
        Translation = houseAppCaracTranslated;
    } else if (announce.estate_type == "Shop"){
        Translation = shopTranslated;
    } else {
        Translation = landTranslated;
    }

    const getLocationArabic = (wilayaValue, baladiaValue) => {
        const wilayaObj = DZcommunes.find(w => w.value === wilayaValue);

        if (!wilayaObj) return `${wilayaValue} - ${baladiaValue}`;

        const baladiaObj = wilayaObj.communes.find(c => c.value === baladiaValue);

        return `${wilayaObj.text} - ${baladiaObj ? baladiaObj.text : baladiaValue}`;
    };

    return (
        <section className=" m-auto w-[90%] p-3 shadow-xl rounded-xl bg-gray-100 flex flex-col">
            <div className="w-[90%] m-auto mb-[20px] flex flex-col md:flex-row">
                <div className="w-[90%] h-fit md:w-[45%] md:mb-[15px] m-auto bg-white rounded-xl shadow-xl mb-[30px] mt-[10px]">
                    <img src={announce.url} alt="صورة خارجية" className="w-[270px] h-[170px] m-auto mt-[15px] rounded-xl sm:w-[300px] sm:h-[190px] md:w-[250px] md:h-[150px] lg:w-[350px] lg:h-[250px]"/>
                    <div className="w-[90%] m-auto mt-5 mb-5 bg-white p-2 pb-3 rounded-xl border-2 border-blue-500 lg:w-[95%]">
                        <h2 className="text-center mt-[10px] mb-[20px] font-bold text-lg">معلومات مالك العقار</h2>
                        <ul dir="rtl" className="mr-[5%]">
                            <li className="flex gap-3 mb-3 font-bold text-lg">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                </span>
                                {user.firstname} {user.lastname}
                            </li>
                            <li className="flex gap-3 mb-3 font-bold text-sm md:text-xs lg:text-lg">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-icon lucide-mail"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                                </span>
                                {user.email}
                            </li>
                            <li className="flex gap-3 mb-3 font-bold">
                                <span className="inline-block scale-x-[-1]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-icon lucide-phone"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
                                </span>
                                {announce.phone}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-[90%] md:w-[45%] bg-white min-h-[100px] m-auto rounded-xl shadow-xl p-2">
                    <h2 className="text-center mt-[10px] mb-[20px] font-bold text-lg">معلومات العقار</h2>
                    <ul dir="rtl" className="px-5 list-disc">
                        <li className="flex gap-2 mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-blue-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <p className=" text-black text-xl font-semibold">
                                {getLocationArabic(announce.wilaya, announce.baladia)}
                            </p>
                        </li>
                        <li className="mb-2 mr-[10%]">نوع العقار <span className="font-bold">{typeTranslated[announce.estate_type]}</span></li>
                        <li className="mb-2 mr-[10%]">المساحة <span className="font-bold">{announce.surface} م<sup>2</sup></span></li>
                        <li className="mb-2 mr-[10%]"><span className="font-bold">{announce.rooms} </span>غرف</li>
                        <li className="mb-2 mr-[10%]"><span className="font-bold">{announce.floor_} </span>طوابق</li>
                        <li className="mb-2 mr-[10%]">حالة العقار <span className="font-bold">{Translation[announce.estate_carac]} </span></li>
                        <li className="mb-2 mr-[10%]">منطقة التواجد <span className="font-bold">{zoneTranslated[announce.zone_carac]} </span></li>
                        <li className="mb-2 mr-[10%]">تاريخ نشر الإعلان <span className="font-bold">{formattedDate}</span></li>
                        <li className="text-center font-semibold mt-7 list-none"><span className="text-blue-500 text-2xl font-bold">{announce.price}</span> دج</li>
                    </ul>
                    <div className="w-[90%] m-auto rounded-xl p-3 mt-[30px] mb-[20px] border-2 border-blue-500" dir="rtl">
                        {announce.description}
                    </div>
                </div>
            </div>
            <a href={`/interiorTrip/${announce.id}`} className="w-[180px]  text-blue-500 h-[45px] text-center rounded-lg p-2 hover:cursor-pointer text-xl font-bold shadow-lg m-auto mt-[25px] mb-[25px] border-2 border-blue-300 hover:border-blue-500 hover:transition hover:duration-300">عرض الجولة الداخلية</a>
        </section>
    );
}

async function AnnounceDetail({ params }) {
    const { id } = await params;

    const fetchComments = await pool.query(
        "SELECT c.comment, c.created_at, u.firstname, u.lastname FROM comments c JOIN users u ON c.commentor_id = u.id WHERE c.announce_id = $1 ORDER BY c.created_at DESC", [id]
    );

    const comments = fetchComments.rows;

    return (
        <main className="pt-[65px] mb-[50px] flex flex-col">
            <h1 className="text-center mt-[20px] mb-[20px] font-bold text-2xl">تفاصيل الإعلان</h1>
            <Details id={id}/>
            <Comments announceId={id} initcomments={comments}/>
        </main>
    );
}

export default AnnounceDetail;