import React from "react";
import dark from "../assets/dark.png";
import light from "../assets/light.png";

export default function Switch({ isDark, handleSwitch }) {
    return (
        <img
            className="absolute top-12 right-12 w-12 h-12 cursor-pointer hover:scale-105"
            src={isDark ? light : dark}
            alt={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={handleSwitch}
        ></img>
    );
}
