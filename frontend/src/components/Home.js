import { React, useState } from "react";
import Title from "./Title";
import Analyzer from "./Analyzer";
import Switch from "./Switch";

export default function Home() {
    const [dark, setDark] = useState(false);

    return (
        <div className={dark ? 
            "dark bg-gradient-to-tl from-slate-800 to-black w-screen h-screen grid grid-rows-6 place-items-center":
            "bg-gradient-to-tl from-slate-200 to-white w-screen h-screen grid grid-rows-6 place-items-center"}>
            <Switch isDark={dark} handleSwitch={() => setDark(!dark)} />
            <Title />
            <Analyzer />
        </div>
    );
}
