import React from "react";

export default function Back({ handleBack }) {
    return (
        <div
            className="text-blurple row-span-2 drop-shadow-2xl align-middle text-center bg-white dark:bg-black rounded-3xl p-6 text-4xl font-poppinsSemiBold cursor-pointer hover:scale-105"
            onClick={handleBack}
        >
            Back
        </div>
    );
}
 