import React from "react";

export default function Image({ url }) {
    return (
        <div className="row-span-4 w-full h-full">
            <img
                className="w-full h-full object-contain drop-shadow-2xl rounded-3xl"
                src={url}
                alt="screenshot"
            ></img>
        </div>
    );
}
