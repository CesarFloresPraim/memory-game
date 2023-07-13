import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Mute from "../assets/svg/sound--off.svg";
import Unmute from "../assets/svg/sound--on.svg";
import Swal from "sweetalert2";

import CorrectAudio from "../assets/audio/correct.mp3";
import BackgroundAudio from "../assets/audio/background.mp3";
import IncorrectAudio from "../assets/audio/incorrect.mp3";
import TickingAudio from "../assets/audio/ticking.mp3";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChangeOverStatus } from "../store/actionCreators/game";

let correctAudio = new Audio(CorrectAudio);
let incorrectAudio = new Audio(IncorrectAudio);
let tickingAudio = new Audio(TickingAudio);
let backgroundAudio = new Audio(BackgroundAudio);

export default function Game() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cards, setCards] = useState([
    {
      id: 0,
      cardType: "comet",
      cardFlipped: false,
      cardMatched: false,
    },
    {
      id: 1,
      cardType: "star",
      cardFlipped: false,
      cardMatched: false,
    },
    {
      id: 2,
      cardType: "moon",
      cardFlipped: false,
      cardMatched: false,
    },
    {
      id: 3,
      cardType: "sun",
      cardFlipped: false,
      cardMatched: false,
    },
    {
      id: 4,
      cardType: "comet",
      cardFlipped: false,
      cardMatched: false,
    },
    {
      id: 5,
      cardType: "star",
      cardFlipped: false,
      cardMatched: false,
    },
    {
      id: 6,
      cardType: "moon",
      cardFlipped: false,
      cardMatched: false,
    },
    {
      id: 7,
      cardType: "sun",
      cardFlipped: false,
      cardMatched: false,
    },
  ]);

  const [mute, setMute] = useState(true);
  const [timer, setTimer] = useState(30);

  const handleCardClicked = (id, value) => {
    //Before flipping check number of flipped cards
    const flippedCards = cards.filter(
      (card) => card.cardFlipped && !card.cardMatched
    );
    if (flippedCards.length >= 2) {
      return;
    }

    const newCards = cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          cardFlipped: value,
        };
      }
      return card;
    });
    setCards(newCards);
  };

  useEffect(() => {
    setTimeout(() => {
      const allMatched = cards.every(
        (card) => card.cardFlipped && card.cardMatched
      );
      if(allMatched) {
        dispatch(ChangeOverStatus("Congrats you won!"))
        navigate({pathname: "/over"});
      }
      //Check if pair is matched
      const flippedCards = cards.filter(
        (card) => card.cardFlipped && !card.cardMatched
      );
      if (flippedCards.length === 2) {
        //Matched
        if (flippedCards[0].cardType === flippedCards[1].cardType) {
          correctAudio.play().catch((err) => {});
          Swal.fire({
            icon: "success",
            title: "Good job!",
            text: "nice! it’s a match",
            timer: 1500,
            showConfirmButton: false,
          });
          const newCards = cards.map((card) => {
            if (
              card.id === flippedCards[0].id ||
              card.id === flippedCards[1].id
            ) {
              return {
                ...card,
                cardMatched: true,
              };
            }
            return card;
          });
          setCards(newCards);
        } else {
          //Not matched
          incorrectAudio.play().catch((err) => {});
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Sorry, but it’s not a match",
            timer: 1500,
            showConfirmButton: false,
          });

          const newCards = cards.map((card) => {
            if (
              card.id === flippedCards[0].id ||
              card.id === flippedCards[1].id
            ) {
              return {
                ...card,
                cardFlipped: false,
              };
            }
            return card;
          });
          setCards(newCards);
        }
      }
    }, 1500);
  }, [cards]);

  useEffect(() => {
    //Randomize cards
    const randomizedCards = cards
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setCards(randomizedCards);

    backgroundAudio.loop = true;

    //Start timer
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          tickingAudio.pause();
          clearInterval(interval);
          dispatch(ChangeOverStatus("Game Over"))
          navigate({pathname: "/over"});
          return 0;
        }
        if(prev < 10) {
          tickingAudio.play().catch((err) => {});
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (mute) {
      backgroundAudio.pause();
    } else {
      backgroundAudio.play();
    }
  }, [mute]);

  return (
    <div className="h-screen w-screen flex flex-col bg-indigo-100">
      <div className="flex items-center">
        <div className="grow text-center text-lg">
          {timer}
        </div>
        <button onClick={() => setMute(!mute)} className="mr-4 p-2">
          {mute ? (
            <Mute className="h-12 w-12"></Mute>
          ) : (
            <Unmute className="h-12 w-12"></Unmute>
          )}
        </button>
      </div>
      <div className="w-full h-full grid gap-6 p-10 grid-cols-2 md:grid-cols-4">
        {cards.map((card, index) => {
          return (
            <div key={card.id} className="col-span-1 relative">
              <Card data={card} setFlip={handleCardClicked}></Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
