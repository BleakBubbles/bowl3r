import React from "react";

export default function Image({ url, pulse }) {
    return (
        <div className="row-span-4 w-full h-full">
            <img
                className={
                    pulse
                        ? "w-full h-full object-contain drop-shadow-2xl animate-pulse rounded-3xl"
                        : "w-full h-full object-contain drop-shadow-2xl rounded-3xl"
                }
                src={url}
                alt="screenshot"
            ></img>
        </div>
    );
}
