import React, { useEffect, useState } from "react";
import { LogoSVG } from "../assets/svg/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Start() {

  const navigate = useNavigate();

  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-teal-500 to-indigo-500">
      <div
        className={`w-screen h-screen z-10 absolute transform ease-linear transition duration-1000 -top-full ${
          !start ? "" : "translate-y-full"
        } flex items-center justify-center`}
      >
        <div className="h-40 w-40">
          <LogoSVG></LogoSVG>
        </div>
      </div>
      <div
        className={`absolute z-20 flex items-center justify-center w-full transform ease-linear transition duration-1000 ${
          !start ? "" : "-translate-y-[120px]"
        } -bottom-[56px] `}
      >
        <button onClick={
          () => navigate("/game")
        } className="bg-white text-indigo-500 h-14 px-10 py-4 rounded-[32px] animate-bounce">
          Start
        </button>
      </div>
    </div>
  );
}
