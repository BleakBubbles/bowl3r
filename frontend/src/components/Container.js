import React from "react";

export default function Container({ children }) {
    return (
        <div className="grid grid-rows-6 w-5/6 h-5/6 place-items-center">
            {children}
        </div>
    );
}
