import React from "react";

export default function Button({ text, action }) {
    return (
        <div
            className="text-blurple drop-shadow-2xl align-middle text-center bg-slate-100 dark:bg-slate-900 rounded-3xl p-4 text-4xl font-poppinsSemiBold cursor-pointer hover:scale-105"
            onClick={action}
        >
            {text}
        </div>
    );
}
 