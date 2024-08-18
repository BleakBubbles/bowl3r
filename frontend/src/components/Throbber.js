import React from "react";

import throbber from "../assets/throbber.svg"

export default function Throbber() {
  return (
    <div className="h-full">
      <img
        className="w-full h-full object-contain animate-spin"
        src={throbber}
        alt="loading"
      ></img>
    </div>
  );
}
