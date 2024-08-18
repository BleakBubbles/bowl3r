import React from "react";

export default function Container({ children }) {
    return (
        <div className="grid gap-4 grid-rows-7 w-3/4 h-3/4 place-items-center">
            {children}
        </div>
    );
}
