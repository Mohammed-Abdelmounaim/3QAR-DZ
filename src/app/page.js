"use client"
import "./globals.css";
import { useState, useEffect } from "react";
import {DZcommunes} from "@/data/DZcommunes";
import { useRouter } from "next/navigation";
import PriceEngineButton from "@/components/priceEngineBtn";

function HeroSection() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [matchWilaya, setMatching] = useState([]);
  const [selectedWilaya, setSelectedWilaya] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    setSelectedWilaya("");

    const filtered = DZcommunes.filter((w) =>
        w.text.startsWith(value)
    );

    setMatching(filtered);
};

  return (
    <section className="min-h-[500px] w-[100%] md:w-[95%] m-auto p-4 rounded-xl shadow-lg bg-cover bg-center flex flex-col justify-center items-center gap-8 lg:w-[90%]" dir="rtl" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/4.jpg')"}}>
      <div className="flex flex-col gap-5 items-center">
        <h1 className="font-bold text-white text-4xl text-center">اعثر على العقار المناسب لك في الجزائر</h1>
        <p dir="rtl" className="font-bold text-white text-xl text-center"><span className="font-bold text-white text-2xl">3QAR DZ </span>منصة عقارية تساعدك في العثور على أفضل العروض العقارية</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault();
        if (!selectedWilaya) return;
        router.push(`/searchResults?type=wilaya&value=${selectedWilaya}`);}} 
        className="bg-white w-[400px] sm:w-[550px] mt-[40px] pt-1 pb-1 flex rounded-lg shadow-2xl border-2 border-white gap-3 justify-evenly relative">
        <input value={search} onChange={(e) => handleSearch(e.target.value)} type="text" placeholder="أدخل اسم الولاية" className="w-[70%] h-[40px] outline-2 outline-blue-200 focus:outline-blue-500 rounded-lg pr-[8px]"/>
        <button type="submit" className="w-[20%] max-w-[100px] text-center text-white text-xl rounded-lg bg-blue-500 h-[40px] hover:bg-blue-600 hover:cursor-pointer hover:transition hover:duration-300">بحث</button>
      </form>
      {   search &&
          matchWilaya.map((w) => (
              <div
                  className="absolute bg-white top-102 sm:top-95 w-[200px] p-2 rounded-lg text-center cursor-pointer"
                  key={w.id}
                  onClick={() => {
                      setSearch(w.text);
                      setSelectedWilaya(w.value);
                      setMatching([]);
                  }}
              >
                  {w.text}
              </div>
          ))
      }
      <p className="font-bold text-lg text-white mt-[-15px] mb-[-15px]">أو</p>
      <div className="w-[35%] h-[40px] bg-white max-w-[170px] rounded-xl pt-[8px] text-center">
        <a href="#categories" className=" underline text-gray-500 hover:text-blue-500 hover:transition hover:duration-300 font-bold">تصفح حسب النوع</a>
      </div>
    </section>
  )
}

function HouseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}

function AppartementIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
    </svg>
  )
}

function ShopIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
</svg>
  )
}

function LandIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  )
}

function Category({icon, title}) {
  const wantedCategory = {
    منازل: "House",
    شقق: "Appartement",
    محلات: "Shop",
    أراضي: "Land"
  };

  return (
    <a href={`/searchResults?type=category&value=${wantedCategory[title]}`} className="flex-col border-2 border-blue-500 rounded-2xl w-[220px] h-[150px] md:w-[200px] md:h-[120px] lg:w-[200px] lg:h-[130px] content-center m-[10px] pt-[15px] pb-[15px] hover:shadow-xl hover:transition hover:duration-300 hover:cursor-pointer">
      <div className="mb-[15px] flex justify-center">
        {icon}
      </div>
      <h3 className="text-center">{title}</h3>
    </a>
  )
}

function CategoriesSection() {
  return (
    <section className="w-[90%] m-auto shadow-xl rounded-lg h-fit p-3 pb-5 mt-[60px] md:h-[420px] lg:h-[320px] bg-gray-100 scroll-mt-20" id="categories">
      <h2 className="text-center text-2xl font-bold mt-[20px] mb-[40px]">تصفح حسب النوع</h2>
      <div className="flex justify-evenly flex-wrap text-blue-500 font-bold text-lg">
        <Category icon={<HouseIcon />} title="منازل"/>
        <Category icon={<AppartementIcon />} title="شقق"/>
        <Category icon={<ShopIcon />} title="محلات"/>
        <Category icon={<LandIcon />} title="أراضي"/>
      </div>
    </section>
  )
}

function NoteSection() {
  return (
    <section className="bg-gray-100 w-[70%] min-h-[200px] md:flex mb-[60px] m-auto p-5 mt-[80px] rounded-xl shadow-2xl" dir="rtl">
      <div className="md:w-[70%] p-3 m-auto text-center mb-[20px]">
        <h2 className="text-2xl font-bold mb-[30px]">هل لديك عقار للبيع؟</h2>
        <p className="font-semibold text-lg">انشر إعلانك الآن للوصول إلى أكبر عدد من المشترين المحتملين في الجزائر</p>
      </div>
      <div className="flex md:w-[30%] justify-center">
        <a href="/addAnnounce" className="bg-linear-to-bl from-blue-500 to-cyan-400 p-3 text-white rounded-lg h-fit self-center w-[90%] text-center font-bold hover:cursor-pointer hover:shadow-xl hover:transition hover:duration:300">انشر إعلانك الآن</a>
      </div>
    </section>
  )
}

export default function Home() {
  const [token, setToken] = useState(null);
      
  useEffect(() =>{
    setToken(localStorage.getItem("token"));
  },[])

  return (
    <main className="pt-[65px]">
      <HeroSection />
      <CategoriesSection />
      {token && <NoteSection />}
      <PriceEngineButton />
    </main>
  );
}