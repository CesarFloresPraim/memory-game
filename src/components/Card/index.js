import React, { useEffect } from "react";
import CometIcon from "../../assets/svg/comet.svg";
import MoonIcon from "../../assets/svg/moon.svg";
import StarIcon from "../../assets/svg/star.svg";
import SunIcon from "../../assets/svg/sun.svg";

export default function Card({ data, setFlip }) {
  const handleFlip = () => {
    setFlip(data.id, true);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div
      onClick={handleFlip}
      className={`card`}
    >
      <div className={`content ${data.cardFlipped ? "cardFlipRight" : "cardFlipLeft"}`}>
        <div className="front flex items-center justify-center">
            <img className="" src={require("../../assets/img/question.png")} alt="" />
        </div>
        <div className="back flex items-center justify-center">
          {data.cardType === "comet" && (
            <CometIcon className="h-20 w-20 md:h-40 md:w-40"></CometIcon>
          )}
          {data.cardType === "moon" && (
            <MoonIcon className="h-20 w-20 md:h-40 md:w-40"></MoonIcon>
          )}
          {data.cardType === "star" && (
            <StarIcon className="h-20 w-20 md:h-40 md:w-40"></StarIcon>
          )}
          {data.cardType === "sun" && (
            <SunIcon className="h-20 w-20 md:h-40 md:w-40"></SunIcon>
          )}
        </div>
      </div>
    </div>
  );
}
