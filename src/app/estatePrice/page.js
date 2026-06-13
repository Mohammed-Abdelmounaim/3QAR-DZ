import pool from "@/lib/db";

async function PricesDisplay({ searchParams }){
    const wilaya = searchParams.wilaya;
    const baladia = searchParams.baladia;
    const type = searchParams.estateType;
    const surface = searchParams.surface;
    const rooms = searchParams.rooms;
    const floor = searchParams.floor;
    const caracter = searchParams.caracter;
    const zone = searchParams.zone;

    let prices;

    const result = await pool.query(
            "SELECT minprice, maxprice FROM meterprice WHERE wilaya = $1 AND baladia = $2 AND etype = $3 AND ecarac = $4 AND zonecarac = $5", [wilaya, baladia, type, caracter, zone]
        );

        prices = result.rows;
        let minestatePrice;
        let maxestatePrice;

        if(prices.length > 0){
            const min = prices[0].minprice;
            const max = prices[0].maxprice;

            minestatePrice = surface * min;
            maxestatePrice = surface * max;
        }

        let aiPrice;
        let aiError;

        const baladiaTranslated = {
            AIN_BEIDA: "عين البيضاء",
            OUM_EL_BOUAGHI: "أم البواقي",
            AIN_MLILA: "عين مليلة",
            AIN_FAKROUN: "عين فكرون"
    };

        const zoneTranslated = {
            Center: "وسط المدينة",
            closeToCenter: "قريب من الوسط",
            CityBorder: "أطراف المدينة",
            OutOfCity: "خارج المدينة"
    };

        const typeTranslated = {
            House: "منزل / فيلا",
            Appartement: "شقة",
            Shop: "محل",
            Land: "قطعة أرض"
    };

        const Translated = {
            Luxury: "فاخر",
            Renovated: "محسن ( فيه تحسينات و إضافات )",
            Economic: "عادي",
            Basic: "قديم / بناء غير منتهي",
            High_traffic: "فاخر",
            Medium_traffic: "محسن ( فيه تحسينات و إضافات )",
            Low_traffic: "عادي",
            fullOwn2frontWutilities: "فاخر",
            fullOwn2frontWOutilities: "محسن ( فيه تحسينات و إضافات )",
            fullOwn1frontWutilities: "عادي",
            fullOwn1frontWOutilities: "قديم / بناء غير منتهي"
    };

        try {
            const requestBody = {
                wilaya: "04 - أم البواقي",
                baladia: baladiaTranslated[baladia],
                type: typeTranslated[type],
                surface: parseFloat(surface),
                rooms: parseInt(rooms),
                floor: parseInt(floor),
                estateCarac: Translated[caracter],
                zone: zoneTranslated[zone]
            }

            const response = await fetch("https://estate-price-api.onrender.com/predict", { 
                method: "POST", 
                headers: { "Content-Type": "application/json", }, 
                body: JSON.stringify(requestBody), 
            });

            const data = await response.json();
            aiPrice = data.estimated_price_dzd;

        } catch (error){
            aiError = "تعذر الاتصال بنموذج الذكاء الاصطناعي حالياً";
            console.log("the error is: ", error);
        }
        

    return(
        <section className="w-[450px] h-[400px] pt-[20px] bg-gray-200 m-auto mt-[40px] mb-[50px] rounded-xl shadow-xl">
            {minestatePrice ? (
            <div className="w-[90%] h-[150px] border-2 border-green-600 m-auto rounded-xl text-center pt-[30px]" dir="rtl">
                <p className="font-bold p-1">بناءً على مواصفات العقار التي أدخلتها وبناءً على الأسعار المقننة من طرف مديرية الضرائب، تبلغ قيمة عقارك بين <br></br><span className="text-green-600 text-lg font-bold">{minestatePrice.toLocaleString()} دج</span> و بين <span className="text-green-600 text-lg font-bold">{maxestatePrice.toLocaleString()} دج</span></p>
            </div> 
            ) : (
                <p className="font-bold text-center mt-[20px]">لا توجد بيانات تسعير لهذا العقار</p>
            )}

            <div className="w-[90%] h-[150px] border-2 border-blue-500 m-auto rounded-xl text-center mt-[45px] pt-[35px]" dir="rtl">
                {aiError ? ( <p className="font-bold text-red-600">{aiError}</p> 
            ) : aiPrice ? ( 
                <p className="font-bold"> بناءً على توقعات نموذج الذكاء الاصطناعي ومقارنةً بأسعار العقارات في السوق الجزائري، قيمة عقارك هي <span className="text-blue-600 text-lg font-bold block mt-2">{aiPrice.toLocaleString()} da</span> </p> 
            ) : (
                 <p className="font-bold">جاري تحميل سعر الذكاء الاصطناعي...</p> )}
            </div>
        </section>
    );
}

async function EstatePricePage({ searchParams }){
    const neededData = await searchParams;

    return(
        <main className="pt-[65px]">
            <h1 className="text-center mt-[20px] mb-[20px] font-bold text-2xl">أسعار العقار بعد التقييم</h1>
            <PricesDisplay searchParams ={neededData} />
        </main>
    )
}
export default EstatePricePage;