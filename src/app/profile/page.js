"use client";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import {DZcommunes} from "@/data/DZcommunes";

function ButtonLogout() {
    const router = useRouter();
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <button  onClick={handleLogout} type="submit" className="w-[150px] bg-red-500 text-white h-[50px] text-center rounded-lg p-2 hover:bg-red-600 hover:cursor-pointer text-xl font-bold shadow-lg hover:shadow-xl hover:transition hover:duration-300">تسجيل الخروج</button>
    );
}

function Infos() {
    const [user, setUser] = useState(null);

    useEffect(() =>{
        const fetchUser = async () =>{
            const token = localStorage.getItem("token");

            const res = await fetch('/api/user/me',{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (data.success) {
                setUser(data.user);
            }
        };

        fetchUser();
    }, []);

    console.log(user);
    if(!user) return <p>جارٍ التحميل  ...</p>

    const roleTranslated = {
        user: "مستخدم",
        agency: "وكالة",
    };

    return (
        <div className="rounded-xl shadow-xl m-auto mt-[20px] max-w-[400px] flex flex-col items-center pt-3 pb-3 gap-8 md:justify-evenly">
            <div>
                <p className="mb-[5px] font-bold text-gray-600">الاسم <span className="text-black mr-[5px]">{user.firstname}</span></p>
                <p className="mb-[5px] font-bold text-gray-600">اللقب <span className="text-black mr-[5px]">{user.lastname}</span></p>
                <p className="mb-[5px] font-bold text-gray-600">البريد الإلكتروني <span className="text-black mr-[5px]">{user.email}</span></p>
            </div>
            <div>
                <p className="mb-[5px] font-bold text-gray-600">نوع الحساب <span className="text-black mr-[5px] text-lg">{roleTranslated[user.role]}</span></p>
                <p className="text-black">قام بنشر 2 إعلانات</p>
            </div>
        </div>
    );
}

function Buttons() {
    return (
    <div className="m-auto flex flex-row h-[150px] justify-center items-center gap-4">
        <a href="/addAnnounce" className="w-[150px] bg-blue-500 text-white h-[50px] text-center rounded-lg p-2 pt-[12px] hover:bg-blue-600 hover:cursor-pointer text-xl font-bold shadow-lg hover:shadow-xl hover:transition hover:duration-300">إضافة إعلان</a>
        <ButtonLogout />
    </div>
    );
}

function PersonalInfoSection() {
    return (
        <section className="bg-gray-100 m-auto w-[90%] sm:w-[85%] md:w-[80%] lg:w-[55%] p-3 shadow-xl rounded-xl mb-[50px]" dir="rtl">
            <h2 className="text-center mt-[20px] mb-[20px] font-bold text-lg">معلوماتك الشخصية</h2>
            <div className="w-[90%] m-auto">
                <hr className="text-blue-500 mb-[20px] border-1"/>
            </div>

            <div className="flex flex-col md:flex-row">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" 
                    className="lucide lucide-square-user-icon lucide-square-user m-auto w-30 h-30 md:mt-[60px] text-blue-400">
                    <rect width="18" height="18" x="3" y="3" rx="2"/>
                    <circle cx="12" cy="10" r="3"/>
                    <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
                </svg>
                <div className="w-[90%] m-auto md:w-[70%]">
                    <Infos />
                    <Buttons />
                </div>
            </div>
        </section>
    );
}

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
            <div className="w-[90%] flex justify-between m-auto pl-[10px]">
                <button className="w-[35%] h-[40px] shadow-xl flex justify-around p-2 mt-1 mr-3 font-bold text-white rounded-lg bg-red-500 hover:cursor-pointer hover:bg-red-600 hover:outline-1 hover:outline-gray-300">
                    <p className="text-center text-lg">حذف</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash">
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
                <p className="text-center font-bold pt-[15px]">id: {announce.id}</p>
            </div>

            <img src={announce.url} alt="صورة خارجية" className="w-[90%] h-[150px] m-auto mt-[15px] rounded-xl"/>

            <div className={`w-[35%] mt-[15px] shadow-lg border-1 p-2 text-center rounded-xl mr-[160px] font-bold flex justify-around ${announce.is_active ? "text-green-500" : "text-red-500"}`} dir="ltr">
    
                <p>{announce.is_active ? "مفعل" : "غير مفعل"}</p>
                {announce.is_active ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                        <path d="m9 12 2 2 4-4"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2"/>
                        <path d="m15 9-6 6"/>
                        <path d="m9 9 6 6"/>
                    </svg>
                )}

            </div>

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

function Announces() {
    const [announces, setAnnounces] = useState([]);

    useEffect(() =>{
        const fetchAnnounces = async () => {
            const Token = localStorage.getItem("token");
            const Res = await fetch("/api/Announces/fetchProfileAnnounces", {
                headers: {
                    Authorization: `Bearer ${Token}`,
                },
            });

            const data = await Res.json();
            if(data.success) {
                setAnnounces(data.announces);
            } else {
                setAnnounces([]);
            }
        };

        fetchAnnounces();
    }, []);

    return (
    <section className="m-auto w-[90%] p-3 shadow-xl rounded-xl bg-gray-100">
        <h2 className="text-center mt-[20px] mb-[20px] font-bold text-lg">إعلاناتك المنشورة</h2>
        <div className="w-[90%] m-auto min-h-[200px] flex flex-col md:flex-row gap-1 md:gap-2" dir="rtl">
            {announces.length === 0 ? (
                <p className="mt-[100px] text-xl text-gray-600">لا توجد إعلانات</p>
            ) : (
                announces.map((a) => (
                    <AnnounceCard key={a.id} announce={a} />
                ))
            )}
        </div>
    </section>
    
    );
}
 
function Profile() {
    const router = useRouter();
    useEffect (() => {
        const token = localStorage.getItem("token");
        if(!token){
            router.push("/login");
        }
    }, []);

    return (
        <main className="pt-[65px] mb-[50px] flex flex-col">
            <h1 className="text-center mt-[20px] mb-[20px] font-bold text-2xl">الملف الشخصي</h1>
            <PersonalInfoSection />
            <Announces />
            <a href="/activateAnnounce" className="w-[150px] bg-blue-500 text-white h-[50px] text-center rounded-lg p-2 pt-[12px] hover:bg-blue-600 hover:cursor-pointer text-xl font-bold shadow-lg hover:shadow-xl hover:transition hover:duration-300 mt-[30px] m-auto">تفعيل إعلان</a>
        </main>
    );

}
export default Profile;