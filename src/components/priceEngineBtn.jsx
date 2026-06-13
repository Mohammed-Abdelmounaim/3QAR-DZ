import Link from "next/link";

function PriceEngineButton() {
    return (
        <Link
            href="/priceEngine"
            className="fixed bottom-20 right-6 sm:right-15 md:right-20 lg:right-25 z-50 group"
        >
            <div className="flex items-center bg-blue-500 text-white rounded-xl shadow-xl overflow-hidden hover:bg-blue-600 transition-all duration-300">
                
                <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[120px] transition-all duration-300 px-0 group-hover:px-3 font-bold text-lg">
                    تقييم عقار
                </span>

                <span className="w-14 h-14 flex items-center justify-center text-2xl font-bold">
                    $
                </span>

            </div>
        </Link>
    );
}

export default PriceEngineButton;