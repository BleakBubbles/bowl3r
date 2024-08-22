import React from "react";
import Title from "./Title";
import Analyzer from "./Analyzer";

export default function Home() {
    return (
        <div className="bg-dark-blurple w-screen h-screen grid grid-rows-6 place-items-center">
			<Title />
			<Analyzer />
		</div>
    );
}
