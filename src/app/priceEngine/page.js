"use client";
import { useState } from "react";
import { estateData } from "@/data/estateData";
import { useRouter } from "next/navigation";

function DataForm() {

    const router = useRouter();
    const [estateType, setEstate] = useState("");

    const [carac, setCarac] = useState([]);

    const [willaya, setWillaya] = useState("");
    const [commune, setCommune] = useState("");

    const [surface, setSurface] = useState("");
    const [floor, setFloor] = useState(0);
    const [rooms, setRooms] = useState(0);

    const [zone, setZoneCar] = useState("Center");
    const [caracter, setEstateCarac] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        router.push(
            `/estatePrice?wilaya=${willaya}&baladia=${commune}&estateType=${estateType}&surface=${surface}&floor=${floor}&rooms=${rooms}&zone=${zone}&caracter=${caracter}`
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-[90%] max-h-[1100px] mb-[40px] m-auto pt-5 shadow-xl rounded-lg bg-gray-100 mt-[20px]"
        >
            <h2 className="font-bold text-xl mb-[25px]">
                معلومات العقار
            </h2>

            <div className="w-[90%] mb-[20px]">
                <hr className="text-blue-500 border-1" />
            </div>

            <fieldset dir="rtl" className="w-[90%] mb-[30px]">
                <legend className="font-bold text-xl mb-[25px] text-blue-500 text-center">
                    حول العقار و منطقة تواجده
                </legend>

                <div className="w-[90%] m-auto lg:mt-[30px] flex flex-col justify-center lg:flex-row">

                    <label htmlFor="willaya" className="font-bold text-lg lg:w-[10%] lg:text-center">
                        الولاية
                    </label>

                    <select
                        value={willaya}
                        onChange={(e) => setWillaya(e.target.value)}
                        className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2"
                        id="willaya"
                        required
                    >
                        <option value="">اختر الولاية</option>
                        <option value="OUM_EL_BOUAGHI">أم البواقي</option>
                    </select>

                    <label htmlFor="baladia" className="font-bold text-lg lg:w-[10%] lg:text-center">
                        البلدية
                    </label>

                    <select
                        value={commune}
                        onChange={(e) => setCommune(e.target.value)}
                        className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2"
                        id="baladia"
                        required
                    >
                        <option value="">اختر البلدية</option>
                        <option value="AIN_BEIDA">عين البيضاء</option>
                        <option value="OUM_EL_BOUAGHI">أم البواقي</option>
                        <option value="AIN_MLILA">عين مليلة</option>
                        <option value="AIN_FAKROUN">عين فكرون</option>
                    </select>

                </div>

                <div className="w-[90%] m-auto flex flex-col justify-center lg:flex-row">

                    <label htmlFor="type" className="font-bold text-lg lg:w-[10%] lg:text-center">
                        نوع العقار
                    </label>

                    <select
                        className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2"
                        id="type"
                        required
                        onChange={(e) => {
                            const type = e.target.value;

                            setEstate(type);

                            const selectedType = estateData.find(
                                (a) => a.value === type
                            );

                            if (selectedType) {
                                setCarac(selectedType.caracs);
                            }
                        }}
                    >
                        <option value="">اختر نوع العقار</option>

                        {estateData.map((a) => (
                            <option key={a.value} value={a.value}>
                                {a.text}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="surface" className="font-bold text-lg lg:w-[10%] lg:text-center">
                        المساحة
                    </label>

                    <input
                        onChange={(e) => setSurface(e.target.value)}
                        className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2"
                        type="number"
                        placeholder="أدخل المساحة"
                        id="surface"
                        required
                    />
                </div>

                <div className="w-[90%] m-auto flex flex-col justify-center lg:flex-row">

                    {(estateType === "Appartement" ||
                        estateType === "House") && (
                        <>
                            <label htmlFor="roomsNbr" className="font-bold text-lg lg:w-[10%] lg:text-center">
                                عدد الغرف
                            </label>

                            <input
                                onChange={(e) => setRooms(e.target.value)}
                                className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2"
                                type="number"
                                placeholder="أدخل عدد الغرف"
                                id="roomsNbr"
                                required
                            />

                            {estateType === "Appartement" && (
                                <>
                                    <label htmlFor="floor" className="font-bold text-lg lg:w-[10%] lg:text-center">
                                        الطابق
                                    </label>

                                    <input
                                        onChange={(e) => setFloor(e.target.value)}
                                        className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2"
                                        type="number"
                                        placeholder="أدخل الطابق"
                                        id="floor"
                                        required
                                    />
                                </>
                            )}

                            {estateType === "House" && (
                                <>
                                    <label htmlFor="floor" className="font-bold text-lg lg:w-[10%] lg:text-center">
                                        الطابق
                                    </label>

                                    <select
                                        onChange={(e) => setFloor(e.target.value)}
                                        className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2"
                                        id="floor"
                                        required
                                    >
                                        <option value={0}>أرضي</option>
                                        <option value={1}>أرضي +1</option>
                                        <option value={2}>أرضي +2</option>
                                        <option value={3}>أرضي +3</option>
                                        <option value={4}>أرضي +4</option>
                                    </select>
                                </>
                            )}
                        </>
                    )}

                    {(estateType === "Shop" ||
                        estateType === "Land") && (
                        <>
                            <input type="hidden" value={0} />
                            <input type="hidden" value={0} />
                        </>
                    )}
                </div>

                <div className="w-[90%] m-auto lg:mb-[30px] flex flex-col justify-center lg:flex-row">

                    <label htmlFor="estateCarac" className="font-bold text-lg lg:w-[10%] lg:text-center">
                        خصائص العقار
                    </label>

                    <select
                        onChange={(e) => setEstateCarac(e.target.value)}
                        className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2"
                        id="estateCarac"
                        required
                    >
                        <option value="">اختر خصائص العقار</option>

                        {carac.map((c) => (
                            <option value={c.value} key={c.value}>
                                {c.text}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="zoneCarac" className="font-bold text-lg lg:w-[10%] lg:text-center">
                        خصائص المنطقة
                    </label>

                    <select
                        onChange={(e) => setZoneCar(e.target.value)}
                        className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2"
                        id="zoneCarac"
                        required
                    >
                        <option value="Center">وسط المدينة</option>
                        <option value="closeToCenter">
                            منطقة سكنية قريبة من الوسط
                        </option>
                        <option value="CityBorder">
                            أطراف المدينة
                        </option>
                        <option value="OutOfCity">
                            خارج المدينة
                        </option>
                    </select>

                </div>

            </fieldset>

            <button
                type="submit"
                className="w-[200px] bg-blue-500 text-white h-[50px] text-center rounded-lg p-2 hover:bg-blue-600 hover:cursor-pointer text-xl font-bold shadow-lg hover:shadow-xl hover:transition hover:duration-300 mb-[30px]"
            >
                تسعير
            </button>
        </form>
    );
}

function PricingEngine() {
    return (
        <main className="pt-[65px]">
            <h1 className="font-bold text-2xl text-center mt-[10px]">تسعير العقار</h1>
            <DataForm />
        </main>
    )
}
export default PricingEngine;