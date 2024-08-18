import React from "react";

export default function Back({ handleBack }) {
    return (
        <div
            className=" row-span-2 drop-shadow-2xl w-1/4 h-1/2 align-middle text-center bg-slate-300 rounded-3xl p-2 text-4xl font-poppinsSemiBold cursor-pointer hover:scale-105"
            onClick={handleBack}
        >
            Back
        </div>
    );
}
 