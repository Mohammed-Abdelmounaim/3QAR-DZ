"use client";
import { useState } from "react";

function Viewer({ images }) {
    const [index, setIndex] = useState(0);

    return (
        <main className="w-full bg-gray-100 m-auto shadow-xl rounded-xl p-2">
            <iframe
                key={index}
                width="100%"
                height="500"
                allowFullScreen
                className="rounded-xl mt-[10px]"
                src={`https://cdn.pannellum.org/2.5/pannellum.htm#panorama=${images[index]?.url}&autoLoad=true&hfov=120`}
            ></iframe>

            <p className="w-[100px] m-auto text-center font-bold text-xl p-3 mt-[30px] mb-[30px] rounded-xl">{index + 1} / {images.length}</p>

            <div className="flex justify-evenly mt-[25px] mb-[25px]">
                <button className="w-[150px] h-[50px] bg-blue-500 text-white rounded-xl shadow-xl hover:cursor-pointer hover:bg-blue-600 hover:transition hover:duration-300" onClick={() => setIndex((i) => Math.max(i - 1, 0))}>
                    الصورة السابقة
                </button>

                <button className="w-[150px] h-[50px] bg-blue-500 text-white rounded-xl shadow-xl hover:cursor-pointer hover:bg-blue-600 hover:transition hover:duration-300" onClick={() => setIndex((i) => Math.min(i + 1, images.length - 1))}>
                    الصورة التالية
                </button>
            </div>

        </main>
    );
}
export default Viewer;