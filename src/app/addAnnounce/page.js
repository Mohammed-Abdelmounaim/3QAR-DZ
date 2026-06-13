"use client";
import {DZcommunes} from "@/data/DZcommunes"
import {estateData} from "@/data/estateData"
import { useState } from "react";

function FindPrice() {
    return (
        <section className="w-[70%] min-h-[100px] md:flex md:w-[500px] mb-[30px] m-auto p-5 mt-[20px] rounded-xl shadow-2xl" dir="rtl">
            <div className="md:w-[70%] p-3 m-auto text-center mb-[20px]">
                <p className="font-semibold text-lg md:font-bold md:text-xl">أوجد السعر المناسب لعقارك الآن</p>
            </div>
            <div className="flex md:w-[30%] justify-center">
                <a href="/priceEngine" className="text-white bg-linear-to-bl from-blue-500 to-cyan-400 p-3 text-gray-700 rounded-lg h-fit self-center w-[90%] text-center text-lg font-semibold hover:cursor-pointer hover:shadow-xl hover:transition hover:duration:300">تسعير العقار</a>
            </div>
        </section>
    )
}

function DataForm({ setStep, setAnnounceId, setEstate, estateType }) {

    const [willaya, setWillaya] = useState("");
    const [communes, setCommunes] = useState([]);

    const [carac, setCarac] = useState([]);


    const [commune, setCommune] = useState("");
    const [Surface, setSurface] = useState();
    const [floor, setFloor] = useState();
    const [rooms, setRooms] = useState();
    const [price, setPrice] = useState();
    const [phone, setPhone] = useState("");
    const [description, setDesc] = useState("");
    const [zone, setZoneCar] = useState("");
    const [caracter, setEstateCarac] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const res = await fetch('/api/Announces/addAnnounce',{
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
             },
            body: JSON.stringify({ willaya, commune,estateType, Surface, floor, rooms, price, phone, description, zone, caracter }),
        });

        const data = await res.json();
        if(data.success){
            setAnnounceId(data.id);
            setStep(2);
        }
    };

    return (
        <>
            <FindPrice />

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] min-h-[1520px] md:min-h-[1350px] lg:min-h-[970px] mb-[40px] m-auto pt-10 shadow-xl rounded-lg bg-gray-100">
                <h2 className="font-bold text-xl mb-[25px]">معلومات العقار</h2>

                <div className="w-[90%] mb-[20px]">
                    <hr className="text-blue-500 border-1"/>
                </div>

                <fieldset dir="rtl" className="w-[90%] mb-[30px]">
                    <legend className="font-bold text-xl mb-[25px] text-blue-500 text-center">حول العقار و منطقة تواجده</legend>
                    <div className="w-[90%] m-auto lg:mt-[30px] flex flex-col justify-center lg:flex-row">
                        <label htmlFor="willaya" className="font-bold text-lg lg:w-[10%] lg:text-center">الولاية</label>

                        <select className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" id="willaya" required
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

                        <label htmlFor="baladia" className="font-bold text-lg lg:w-[10%] lg:text-center">البلدية</label>
                        <select onChange={(e) => setCommune(e.target.value)} className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" id="baladia" required>
                            <option value="">اختر البلدية</option>
                            {communes.map(c => (
                                <option value={c.value} key={c.value}>
                                    {c.text}
                                </option>
                            ))
                            }

                        </select>
                    </div>

                    <div className="w-[90%] m-auto flex flex-col justify-center lg:flex-row">
                        <label htmlFor="type" className="font-bold text-lg lg:w-[10%] lg:text-center">نوع العقار</label>
                        <select className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" id="type" required
                        onChange={ (e) => {
                            const type = e.target.value;
                            setEstate(type);

                            const selectedType = estateData.find(a => a.value === type);
                            if(selectedType){
                                setCarac(selectedType.caracs);
                            }
                        }}>
                            <option value="">اختر نوع العقار</option>
                            {estateData.map(a => (
                                <option key={a.value} value={a.value}>
                                    {a.text}
                                </option>
                            ))
                            }

                        </select>
                        <label htmlFor="surface" className="font-bold text-lg lg:w-[10%] lg:text-center">المساحة</label>
                        <input onChange={(e) => setSurface(e.target.value)} className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" type="number" placeholder="أدخل المساحة" id="surface" required/>
                    </div>

                    <div className="w-[90%] m-auto flex flex-col justify-center lg:flex-row">
                        {(estateType === "Appartement" || estateType === "House") && (
                            <>
                                <label htmlFor="roomsNbr" className="font-bold text-lg lg:w-[10%] lg:text-center">عدد الغرف</label>
                                <input onChange={(e) => setRooms(e.target.value)} className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" type="number" placeholder="أدخل عدد الغرف" id="roomsNbr" required/>

                                {estateType === "Appartement"  && (
                                    <>
                                        <label htmlFor="floor" className="font-bold text-lg lg:w-[10%] lg:text-center">الطابق</label>
                                        <input onChange={(e) => setFloor(e.target.value)} className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" type="number" placeholder="أدخل الطابق" id="floor" required/>
                                    </>
                                )}

                                {estateType === "House" && (
                                    <>
                                        <label htmlFor="floor" className="font-bold text-lg lg:w-[10%] lg:text-center">الطابق</label>
                                        <select onChange={(e) => setFloor(e.target.value)} className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" id="floor" required>
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

                        {(estateType === "Shop" || estateType === "Land")&& (
                            <>
                                <input onChange={(e) => setFloor(e.target.value)} id="floor" type="number" value={0} className="hidden"/>  {/*floor*/}
                                <input onChange={(e) => setRooms(e.target.value)} id="roomNbr" type="number" value={0} className="hidden"/>  {/*rooms*/}
                            </>
                        )}
                        
                    </div>

                    <div className="w-[90%] m-auto flex flex-col justify-center lg:flex-row">
                        <label htmlFor="price" className="font-bold text-lg lg:w-[10%] lg:text-center">السعر</label>
                        <input onChange={(e) => setPrice(e.target.value)} className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" type="number" placeholder="أدخل السعر" id="price" required/>
                    </div>

                    <div className="w-[90%] m-auto lg:mb-[30px] flex flex-col justify-center lg:flex-row">
                        <label htmlFor="estateCarac" className="font-bold text-lg lg:w-[10%] lg:text-center">خصائص العقار</label>
                        <select onChange={(e) => setEstateCarac(e.target.value)} className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" id="estateCarac" required>
                            <option value="">اختر خصائص العقار</option>
                            {carac.map(c => (
                                <option value={c.value} key={c.value}>
                                    {c.text}
                                </option>
                            ))
                            }
                        </select>
                        <label htmlFor="zoneCarac" className="font-bold text-lg lg:w-[10%] lg:text-center">خصائص المنطقة</label>
                        <select onChange={(e) => setZoneCar(e.target.value)} className="w-[90%] lg:w-[40%] h-[50px] m-auto focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 pr-2" id="zoneCarac" required>
                            <option value="Center">وسط المدينة</option>
                            <option value="closeToCenter">منطقة سكنية قريبة من الوسط</option>
                            <option value="CityBorder">أطراف المدينة</option>
                            <option value="OutOfCity">خارج المدينة</option>
                        </select>
                    </div>

                </fieldset>

                <div className="w-[90%] mb-[20px]">
                    <hr className="text-blue-500 border-1"/>
                </div>

                <fieldset dir="rtl" className="w-[90%] mb-[40px]">
                    <legend className="font-bold text-xl mb-[25px] text-blue-500 text-center">معلومات أخرى</legend>
                    <div className="w-[100%] flex flex-col md:flex-row">
                        <div className="w-[90%] m-auto">
                            <h3 className="font-bold text-lg mb-[25px]">معلومات التواصل</h3>
                            <label htmlFor="phoneNumber" className="font-bold text-lg mr-[50px]">رقم الهاتف</label>
                            <input onChange={(e) => setPhone(e.target.value)} className="w-[90%] h-[50px] mr-[5%] focus:outline-none pr-3 border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 p-2" type="tel" placeholder="0X12345678" id="phoneNumber" required/>
                        </div>
                        <div className="w-[90%] m-auto">
                            <h3 className="font-bold text-lg mb-[25px]">معلومات إضافية</h3>
                            <div className="flex flex-col">
                                <label htmlFor="description" className="font-bold text-lg text-center">وصف</label>
                                <br />
                                <textarea onChange={(e) => setDesc(e.target.value)} className="w-[300px] md:w-[400px] m-auto focus:outline-none focus:ring ring-blue-500 rounded-lg p-2 border-2 border-gray-300" id="description" cols="50" rows="4"></textarea>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <button type="submit" className="w-[200px] bg-blue-500 text-white h-[50px] text-center rounded-lg p-2 hover:bg-blue-600 hover:cursor-pointer text-xl font-bold shadow-lg hover:shadow-xl hover:transition hover:duration-300 md:mb-[20px]">التالي</button>
            </form>

            <div dir="rtl" className="w-[140px] h-[60px] bg-gray-100 rounded-lg shadow-lg rounded-lg flex justify-evenly items-center m-auto mb-[30px]">
                <div className="w-[40%] text-center border-2 rounded-2xl border-blue-600">1</div>
                <div className="w-[40%] text-center">2</div>
            </div>
        </>
    )
}

function PicsForm({ announceId, outImg, setOutImg, inImages, setInImages, estateType}) {

    const handlePicsForm = async (e) => {
        e.preventDefault();

        try{

            const formData = new FormData();
            formData.append("file", outImg);
            formData.append("upload_preset", "announces_pics");

            const res = await fetch("https://api.cloudinary.com/v1_1/dtt7yxces/image/upload",{
                method: "POST",
                body: formData
            });

            const data = await res.json();
            const outUrl = data.secure_url;

            await fetch("/api/Announces/sendPics",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        announce_id: announceId,
                        url: outUrl,
                        img_type: "out"
                    })
                }
            );

            if(inImages.length > 0){

                for(let i = 0;i < inImages.length; i++){

                    const fd = new FormData();
                    fd.append("file", inImages[i]);
                    fd.append("upload_preset", "announces_pics");

                    const r = await fetch("https://api.cloudinary.com/v1_1/dtt7yxces/image/upload",{
                        method: "POST",
                        body: fd
                    });

                    const d = await r.json();

                    await fetch("/api/Announces/sendPics",{
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            announce_id: announceId,
                            url: d.secure_url,
                            img_type: "in"
                        }
                        )
                    });
                }
            }

            alert("تم نشر الإعلان بنجاح");

        } catch (error) {
            alert("حدث خطأ");
        }
       
    }

    return (
        <>
            <form onSubmit={handlePicsForm} className="flex flex-col items-center w-[90%] mt-[10px] mb-[40px] m-auto pt-10 shadow-xl rounded-lg bg-gray-100">
                <h2 className="font-bold text-xl mb-[25px]">معلومات العقار</h2>

                <div className="w-[90%] mb-[20px]">
                    <hr className="text-blue-500 border-1"/>
                </div>

                <fieldset dir="rtl" className="w-[90%] mb-[30px]">
                    <legend className="font-bold text-xl mb-[25px] text-blue-500 text-center">إضافة صور العقار</legend>

                    {/* image of the estate from the outside */}
                    <div className="w-[90%] m-auto">
                        <label htmlFor="OutPic" className="font-bold text-lg">أضف صورة خارجية للعقار</label>
                        <input required id="OutPic" className="w-[90%] h-[50px] mr-[5%] focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 p-3 cursor-pointer hover:ring hover:ring-blue-200" type="file" accept="image/*" onChange={(e) => setOutImg(e.target.files[0])}/>
                    </div>

                    {/* indoor images in case of app/house/shop but not the land */}
                    {(estateType === "Appartement" || estateType === "House" || estateType === "Shop") && (
                        <div className="w-[90%] m-auto">
                            <label htmlFor="InPics" className="font-bold text-lg">أضف صور داخلية للعقار (360 درجة)</label>
                            <input id="InPics" className="w-[90%] h-[50px] mr-[5%] focus:outline-none border border-gray-300 rounded-lg mt-[10px] mb-[20px] focus:ring ring-blue-500 p-3 cursor-pointer hover:ring hover:ring-blue-200" type="file" multiple accept="image/*" onChange={(e) => setInImages([...e.target.files])}/>
                        </div>
                    )}
                </fieldset>

                <button type="submit" className="w-[200px] bg-blue-500 text-white h-[50px] text-center rounded-lg p-2 hover:bg-blue-600 hover:cursor-pointer text-xl font-bold shadow-lg hover:shadow-xl hover:transition hover:duration-300 mb-[30px]">نشر الإعلان</button>
            </form>

            <div dir="rtl" className="w-[140px] h-[60px] bg-gray-100 rounded-lg shadow-lg rounded-lg flex justify-evenly items-center m-auto mb-[30px]">
                <div className="w-[40%] text-center">1</div>
                <div className="w-[40%] text-center  border-2 rounded-2xl border-blue-600">2</div>
            </div>
        </>
    )
}


function AddannouncePage() {

    const [formStep, setStep] = useState(1);
    const [announceId, setAnnounceId] = useState(null);
    const [estateType, setEstate] = useState("");

    const [outImg, setOutImg] = useState(null);
    const [inImages, setInImages] = useState([]);

    return (
        <main className="pt-[65px]">
            <h1 className="font-bold text-2xl text-center mt-[10px]">إضافة إعلان</h1>
            
            { formStep === 1 && (
                <DataForm setStep={setStep} setAnnounceId={setAnnounceId} setEstate={setEstate} estateType={estateType}/>
            )}

            { formStep === 2 && (
                <PicsForm 
                    announceId={announceId} outImg={outImg} setOutImg={setOutImg} 
                    inImages={inImages} setInImages={setInImages} estateType={estateType}/>
            )}

        </main>
    )

}
export default AddannouncePage;