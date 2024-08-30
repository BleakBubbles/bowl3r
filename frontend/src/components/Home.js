import { React, useState } from "react";
import { Transition } from "@headlessui/react";

import Title from "./Title";
import Analyzer from "./Analyzer";
import Switch from "./Switch";
import Help from "./Help";

import Question from "../assets/question.png" 

export default function Home() {
    const [dark, setDark] = useState(
        window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    const [help, setHelp] = useState(true);

    return (
        <div
            className={
                dark
                    ? "dark bg-gradient-to-tl from-slate-800 to-slate-900 w-screen h-screen grid grid-rows-6 place-items-center"
                    : "bg-gradient-to-tl from-slate-300 to-slate-100 w-screen h-screen grid grid-rows-6 place-items-center"
            }
        >
            <Transition
                show={help}
                appear={true}
                enter="transition ease-out duration-50"
                enterFrom="opacity-0 backdrop-blur-none"
                enterTo="opacity-100 backdrop-blur-[2px]"
                leave="transition ease-in duration-50"
                leaveFrom="opacity-100 backdrop-blur-[2px]"
                leaveTo="opacity-0 backdrop-blur-none"
            >
                <div
                    className="absolute grid grid-rows-1 place-items-center z-10 w-full h-full backdrop-blur-[2px]"
                    onClick={() => setHelp(false)}
                >
                    <Help handleClose={() => setHelp(false)} />
                </div>
            </Transition>
            <div className="grid grid-rows-2 gap-4 bg-slate-200 dark:bg-slate-800 p-2 rounded-3xl absolute z-20 top-12 right-12">
                <Switch isDark={dark} handleSwitch={() => setDark(!dark)} />
                <img
                    className="w-12 h-12 cursor-pointer hover:scale-105"
                    src={Question}
                    alt="Help"
                    title="Help"
                    onClick={() => setHelp(!help)}
                ></img>
            </div>
            <Title />
            <Analyzer />
        </div>
    );
}
