"use client";

import { useState, useEffect, useRef } from "react";

import { useStopwatch } from "react-timer-hook";

import Image from "next/image";
import "./globals.css";
import Input from "./components/Input";
import Floater from "./components/Floater";

export default function Home() {
  // horizontal
  const [gameMode, setGameMode] = useState(4);
  const [gameOver, setGameOver] = useState(false);
  const [menu, setMenu] = useState(true);
  const [gameAnswer, setGameAnswer] = useState([]);
  const [showFloater, setShowFloater] = useState(false);

  const [secs, setSecs] = useState();

  const [inputValues, setInputValues] = useState(Array(gameMode).fill(""));
  const [correctPlace, setCorrectPlace] = useState(Array(gameMode).fill(false));
  const [correctNumber, setCorrectNumber] = useState(
    Array(gameMode).fill(false)
  );
  const [attempts, setAttempts] = useState([
    {
      inputValues: Array(gameMode).fill(""),
      correctPlace: Array(gameMode).fill(false),
      correctNumber: Array(gameMode).fill(false),
    },
  ]);

  const [play, setPlay] = useState(false);

  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  // useEffect(() => {
  //   console.log("seconds", totalSeconds);
  // }, [seconds]);

  // useEffect(() => {
  //   generateGameNumber();
  // }, []);

  useEffect(() => {
    console.log("attempts:", attempts);
  }, [attempts]);

  useEffect(() => {
    if (gameOver) {
      // console.log("gameover?", gameOver);
      // console.log("showFloater?", showFloater);

      const timeoutId = setTimeout(() => {
        setShowFloater(false);
        setMenu((prev) => !prev); // generate the menu after the floater is done celebraiting the win for the user
        setGameOver((prev) => !prev);

        setAttempts([
          {
            inputValues: Array(gameMode).fill(""),
            correctPlace: Array(gameMode).fill(false),
            correctNumber: Array(gameMode).fill(false),
          },
        ]);
      }, 3000);

      // console.log("menu?", menu);
      // console.log("play?", play);
      return () => {
        clearTimeout(timeoutId);
      }; // Cleanup the timeout
    }
  }, [gameOver]); // This useEffect will run whenever gameOver changes

  // useEffect(() => {
  //   console.log("GAMEOVER?", gameOver);
  // }, [gameOver]);

  const startTimer = () => {
    console.log("timer started");
    start();
  };

  const stopTimer = () => {
    console.log("timer stopped");

    setAttempts((prevAttempts) => [
      ...prevAttempts,
      { timer: { hours, minutes, seconds } }, // Append the timer object
    ]);
    // gameDone()
    setGameOver(true);
    setPlay(false);
    setShowFloater(true);
  };

  const generateGameNumber = () => {
    let gameAnswer = [];
    console.log("length", gameAnswer.length);
    let numberGenerator = Math.floor(Math.random() * 9 + 1);

    for (let i = 0; i < gameMode; i++) {
      let numberGenerator = Math.floor(Math.random() * 9 + 1);

      while (gameAnswer.includes(numberGenerator)) {
        console.log(
          "Dette tal findes allerede så jeg generere et nyt",
          numberGenerator
        );
        numberGenerator = Math.floor(Math.random() * 9 + 1);
      }

      gameAnswer[i] = numberGenerator;
    }

    setGameAnswer(gameAnswer);
    console.log("game", gameAnswer);
    return gameAnswer;
  };

  const handleInputChange = (attemptIndex, index, event) => {
    if (attemptIndex === 0 && index === 0 && attempts.length === 1) {
      startTimer();
    }
    // console.log("attempts", attempts);
    // console.log("HandleInputChange");
    // console.log("attamptindex", attemptIndex);
    // console.log("index", index);
    // console.log("event", event.target.value);
    const newValue = event.target.value;
    setAttempts((prevAttempts) => {
      const newAttempts = [...prevAttempts];
      newAttempts[attemptIndex].inputValues[index] =
        newValue === "" ? "" : parseInt(newValue, 10);
      return newAttempts;
    });

    // if (condition) {

    // }
  };
  const checkAnswer = (event) => {
    console.log("game answer", gameAnswer);
    setAttempts((prevAttempts) => {
      const currentAttempt = { ...prevAttempts[prevAttempts.length - 1] };
      currentAttempt.correctPlace = currentAttempt.inputValues.map(
        (value, index) => value === gameAnswer[index]
      );
      currentAttempt.correctNumber = currentAttempt.inputValues.map((value) =>
        gameAnswer.includes(value)
      );
      if (
        !currentAttempt.correctPlace.every(Boolean) &&
        prevAttempts.length < 5
      ) {
        // User hasn't guessed correctly and has more attempts remaining.
        // Create a new attempt.
        return [
          ...prevAttempts.slice(0, prevAttempts.length - 1),
          currentAttempt,
          {
            inputValues: Array(gameMode).fill(""),
            correctPlace: Array(gameMode).fill(false),
            correctNumber: Array(gameMode).fill(false),
          },
        ];
      } else if (currentAttempt.correctPlace.every(Boolean)) {
        pause();
        stopTimer(); // stop if needed
      }
      // Update the current attempt and return the updated list of attempts.
      return [
        ...prevAttempts.slice(0, prevAttempts.length - 1),
        currentAttempt,
      ];
    });
  };

  return (
    <div className="">
      {/* <button onClick={start}>Start</button> */}

      {!play && menu && (
        <>
          <div className="d-flex justify-content-center mt-4 ">
            <button
              class="button"
              onClick={() => {
                setPlay((prev) => !prev);
                setMenu((prev) => !prev);
                generateGameNumber();

                console.log("gameover??", gameOver);
                console.log("play???", play);
              }}>
              Start Game
              <div class="hoverEffect">
                <div></div>
              </div>
            </button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button class="button">
              How to play
              <div class="hoverEffect">
                <div></div>
              </div>
            </button>
          </div>
        </>
      )}

      <button
        className="btn btn-outline-success btn-sm mt-5"
        onClick={checkAnswer}>
        Click me
      </button>

      {gameOver && showFloater && (
        <div className=" d-flex justify-content-center">
          <Floater></Floater>
        </div>
      )}
      {!gameOver &&
        play &&
        attempts.map((attempt, attemptIndex) => {
          return (
            <div
              className="d-flex justify-content-center mt-2 "
              key={attemptIndex}>
              <form>
                {play &&
                  attempt.inputValues.map((value, index) => {
                    return (
                      <Input
                        correctNumber={attempt.correctNumber[index]}
                        correctPlace={attempt.correctPlace[index]}
                        key={index}
                        value={value}
                        onChange={(event) => {
                          handleInputChange(attemptIndex, index, event);
                        }}
                      />
                    );
                  })}
              </form>
            </div>
          );
        })}
    </div>
  );
}
