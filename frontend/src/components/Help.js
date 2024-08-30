import React from "react";

import Button from "./Button";

import Scaling from "../assets/scaling.png";
import Screenshot from "../assets/screenshot.png";

export default function Help({ handleClose }) {
    return (
        <div
            className="w-1/2 max-h-[90%] overflow-y-scroll scroll-smooth flex flex-col shadow-3xl p-8 place-items-center bg-slate-200 dark:bg-slate-800"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="font-poppinsBlack text-6xl text-blurple">
                HOW TO USE
                <div className="border-b-2 w-full my-4 border-blurple"></div>
            </div>
            <p className="text-blurple font-poppinsSemiBold text-left text-xl leading-relaxed">
                <b className="text-red-600">The app will not work as intended if the following conditions are not met:</b><br></br>
                <b>1. </b>Scaling mode must be set to{" "}
                <b>pixel perfect</b> in video options.<br></br>
                <img
                    src={Scaling}
                    alt="scaling mode"
                    className="object-contain rounded-3xl shadow-lg"
                ></img>
                <br></br>
                <b>2. </b>The uploaded screenshot must be of your{" "}
                <b>whole game screen</b>.<br></br>
                <small>
                    This can be done in Windows using{" "}
                    <code className="bg-slate-400 dark:bg-slate-600 text-black dark:text-white text-lg">
                        PrtSc
                    </code>{" "}
                    or{" "}
                    <code className="bg-slate-400 dark:bg-slate-600 text-black dark:text-white text-lg">
                        ⊞Win
                    </code>{" "}
                    +
                    {" "}
                    <code className="bg-slate-400 dark:bg-slate-600 text-black dark:text-white text-lg">
                        ⇧Shift
                    </code>{" "}
                    +
                    {" "}
                    <code className="bg-slate-400 dark:bg-slate-600 text-black dark:text-white text-lg">
                        S
                    </code>{" "}
                    (Window/Full screen capture):
                </small>
                <br></br>
                <img
                    src={Screenshot}
                    alt="screenshot"
                    className="object-contain rounded-3xl shadow-lg"
                ></img>
                <br></br>
                <b>3. </b> Items should be visible and unobstructed, as in the screenshot above.
            </p>
            <br></br>
            <Button text="Got it" action={(e) => {
                e.stopPropagation();
                handleClose();
            }}/>
        </div>
    );
}
