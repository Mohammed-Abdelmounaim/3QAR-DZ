"use client";
import { useState } from "react";
import {DZcommunes} from "@/data/DZcommunes";
import { useRouter } from "next/navigation";

function SearchFilter (){
    const router = useRouter();

    const [willaya, setWillaya] = useState("");
    const [commune, setCommune] = useState("");
    const [communes, setCommunes] = useState([]);

    const [type, setType] = useState("House");
    const [maxPrice, setMaxPrice] = useState();

    const handleSubmit = (e) =>{
        e.preventDefault();
        router.push(`/searchResults?type=filter&wilaya=${willaya}&baladia=${commune}&etype=${type}&maxPrice=${maxPrice}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-[450px] h-[300px] mb-[40px] m-auto shadow-xl rounded-lg" dir="rtl">
            
            <div className="w-[90%] m-auto mt-[15px] flex justify-center gap-5">
                <div className="w-[40%]">
                    <label htmlFor="willaya" className="font-bold text-lg ml-[10px]">الولاية</label>
                    <select className="w-[70%] h-[50px] focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" id="willaya" required
                            onChange = { (e) => {
                                const willaya = e.target.value;
                                setWillaya(willaya);

                                const selectedWillaya = DZcommunes.find(w => w.value === willaya);
                                if(selectedWillaya){
                                setCommunes(selectedWillaya.communes);
                                }
                            }}>

                                <option value="">اختر الولاية</option>
                                {DZcommunes.map(w => (
                                    <option key={w.id} value={w.value}>
                                        {w.text}
                                    </option>
                                ))
                                }
                    </select>
                </div>

                <div className="w-[40%]">
                    <label htmlFor="baladia" className="font-bold text-lg ml-[10px]">البلدية</label>
                    <select onChange={(e) => setCommune(e.target.value)} className="w-[70%] h-[50px] focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" id="baladia" required>
                                <option value="">اختر البلدية</option>
                                {communes.map(c => (
                                    <option value={c.value} key={c.value}>
                                        {c.text}
                                    </option>
                                ))
                                }
                    </select>
                </div>
            </div>
            
            <div className="flex justify-center w-[90%] gap-2">
                <div className="w-[50%] flex flex-col items-center">
                    <label htmlFor="type" className="font-bold text-lg">نوع العقار</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} id="type" className="w-[80%] h-[50px] focus:outline-none p-2 border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 " required>
                        <option value="House">منزل</option>
                        <option value="Appartement">شقة</option>
                        <option value="Shop">محل</option>
                        <option value="Land">أرض</option>
                    </select>
                </div>

                <div className="w-[40%] flex flex-col items-center">
                    <label htmlFor="maxPrice" className="font-bold text-lg">الحد الأقصى للسعر</label>
                    <input onChange={(e) => setMaxPrice(e.target.value)} className="w-[90%] h-[50px] focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" type="number" placeholder="أدخل السعر الأقصى" id="maxPrice" required/>
                </div>
            </div>
            
            <button type="submit" className="w-[40%] m-auto mb-[15px] bg-blue-500 text-white h-[50px] text-center rounded-lg p-2 hover:bg-blue-600 hover:cursor-pointer text-xl font-bold shadow-lg hover:shadow-xl hover:transition hover:duration-300">تخصيص</button>
            
        </form>
    )
}
export default SearchFilter;