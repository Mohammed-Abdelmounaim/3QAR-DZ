function Offers(){
    return (
        <section className="bg-gray-100 w-[90%] max-w-[800px] min-h-[200px] mb-[50px] m-auto p-5 mt-[30px] rounded-xl shadow-2xl">
            <h2 className="text-center text-2xl font-bold mt-[20px] mb-[30px]">عروض المنصة</h2>
            <div className="flex flex-col md:flex-row gap-7 justify-evenly ">
                <div className="border-2 border-blue-500 rounded-2xl shadow-lg bg-white pt-[15px] pb-[15px] mb-[20px] max-w-[400px] m-auto">
                    <h3 className="text-center text-2xl font-bold text-blue-500 mb-6">
                        عرض الوكالات العقارية
                    </h3>

                    <ul className="text-lg font-semibold text-center mt-[15px]" dir="rtl">
                        <li>
                            5000 دج / شهر
                        </li>

                        <li>
                            13500 دج / 3 أشهر
                            بدل 
                            <span className="text-red-500 mr-[5px]">
                                15000 دج
                            </span>
                        </li>

                        <li>
                            48000 دج / سنة
                            بدل
                            <span className="text-red-500 mr-[5px]">
                                62000 دج
                            </span>
                        </li>
                    </ul>

                    <p className="mt-8 text-center text-gray-700 mt-[15px]" dir="rtl">
                        استفد من اشتراك الوكالة وانشر عدداً غير محدود من الإعلانات
                        للوصول إلى أكبر عدد ممكن من المهتمين بالعقارات في مختلف
                        ولايات الجزائر.
                    </p>
                </div>

                <div className="border-2 rounded-2xl shadow-lg bg-white pt-[15px] pb-[15px] mb-[20px] max-w-[400px] text-green-500 m-auto">
                    <h3 className="text-center text-2xl font-bold text-black mb-6">
                        العرض الفردي
                    </h3>

                    <div className="text-center mt-[15px]">
                        <p className="text-4xl font-bold text-green-500 mb-2">
                            500 دج
                        </p>

                        <p className="font-semibold text-lg mb-4 text-black">
                            لكل إعلان
                        </p>
                    </div>

                    <p className="mt-8 text-center text-gray-700 leading-8">
                        استفد من هذا العرض وانشر إعلانك الآن للوصول إلى أكبر عدد
                        ممكن من الأشخاص المهتمين بعقارك في مختلف أنحاء الجزائر.
                    </p>
                </div>
            </div>

            <div className="mt-[10px] rounded-2xl shadow-lg pt-[15px] max-w-[400px] m-auto">
                <h3 className="font-bold text-xl mb-3 text-center text-red-500">
                    ملاحظة هامة
                </h3>

                <p className="text-center pb-[20px]" dir="rtl">
                     يرجى إرسال رسوم نشر الإعلان إلى الحساب البريدي الجاري:
                    <br />
                    <span className="font-bold">
                        CCP: 98761234 / Clé: 01
                    </span>
                    <br />
                    ثم إرسال وصل الدفع إلى البريد الإلكتروني:
                    <br />
                    <span className="font-bold text-blue-500">
                        3qar_dz@gmail.com
                    </span>
                    <br />
                    في حالة العرض الفردي يرجى إرسال معرف الإعلان الظاهر في بطاقة الإعلان في الصفحة الشخصية
                </p>
            </div>
        </section>
    );
}

function activate(){
    return (
        <main className="pt-[65px]">
            <h1 className="text-center mt-[20px] mb-[20px] font-bold text-2xl">تفعيل إعلان</h1>
            <Offers />
        </main>
    );
}

export default activate;
