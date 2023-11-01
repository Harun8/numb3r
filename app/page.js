"use client";

import React, { useState, useEffect, useRef } from "react";

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

  const [userLost, setUserLost] = useState(false);

  const [secs, setSecs] = useState();
  const [focusIndex, setFocusIndex] = useState(0);

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
  const inputRefs = useRef(
    Array(gameMode)
      .fill(null)
      .map((_, i) => {
        return React.createRef();
      })
  );

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
    if (play) {
      inputRefs.current[focusIndex].current.focus();
    }
  }, [play, focusIndex]);

  useEffect(() => {
    if (gameOver) {
      // console.log("gameover?", gameOver);
      // console.log("showFloater?", showFloater);

      const timeoutId = setTimeout(() => {
        setShowFloater(false);
        setMenu((prev) => !prev); // generate the menu after the floater is done celebraiting the win for the user
        setGameOver((prev) => !prev);
        setFocusIndex(0);

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

  useEffect(() => {
    if (userLost) {
      // console.log("gameover?", gameOver);
      // console.log("showFloater?", showFloater);

      const timeoutId = setTimeout(() => {
        setShowFloater(false);
        setMenu((prev) => !prev); // generate the menu after the floater is done celebraiting the win for the user
        setUserLost((prev) => !prev);
        setFocusIndex(0);

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
  }, [userLost]); // This useEffect will run whenever gameOver changes

  const startTimer = () => {
    console.log("timer started");
    start();
  };

  const gameWon = () => {
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

  const gameLost = () => {
    setAttempts((prevAttempts) => [
      ...prevAttempts,
      { timer: { hours, minutes, seconds } }, // Append the timer object
    ]);

    setUserLost(true);
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

    const newValue = event.target.value;
    setAttempts((prevAttempts) => {
      const newAttempts = [...prevAttempts];
      newAttempts[attemptIndex].inputValues[index] =
        newValue === "" ? "" : parseInt(newValue, 10);
      return newAttempts;
    });

    if (newValue) {
      const nextIndex = index + 1;
      if (nextIndex < gameMode) {
        setFocusIndex(nextIndex);
      }
    }
  };
  const checkAnswer = (event) => {
    console.log("event", event);
    console.log("game answer", gameAnswer);
    setAttempts((prevAttempts) => {
      const currentAttempt = { ...prevAttempts[prevAttempts.length - 1] };
      currentAttempt.correctPlace = currentAttempt.inputValues.map(
        (value, index) => value === gameAnswer[index]
      );
      currentAttempt.correctNumber = currentAttempt.inputValues.map((value) =>
        gameAnswer.includes(value)
      );

      if (prevAttempts.length === 5) {
        console.log("game over, u didnt solve it in time");
        pause();
        gameLost();
      } else if (currentAttempt.inputValues.includes("")) {
        console.log("U STILL GOT SOME EMPTY BOXESS LEFT");
        return prevAttempts;
      } else if (
        !currentAttempt.correctPlace.every(Boolean) &&
        prevAttempts.length < 5
      ) {
        setFocusIndex(0); // reset the focus back to
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
        gameWon(); // stop if needed
      }
      // Update the current attempt and return the updated list of attempts.
      return [
        ...prevAttempts.slice(0, prevAttempts.length - 1),
        currentAttempt,
      ];
    });
  };

  // enter key as input
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      console.log("enter pressed");
      checkAnswer();
    }
  };

  return (
    <div className="">
      {/* <button onClick={start}>Start</button> */}

      {!play && menu && (
        <>
          <div className="d-flex justify-content-center mt-5 ">
            <button
              class="button"
              onClick={() => {
                setPlay((prev) => !prev);
                setMenu((prev) => !prev);
                generateGameNumber();

                console.log("gameover??", gameOver);
                console.log("play???", play);
                console.log("autofocuss??", focusIndex, inputRefs.current);
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
      {/* 
      <button
        className="btn btn-outline-success btn-sm mt-5"
        onClick={checkAnswer}>
        Click me
      </button> */}

      {(gameOver || userLost) && showFloater && (
        <div className=" d-flex justify-content-center">
          <Floater></Floater>
        </div>
      )}
      {!gameOver &&
        !userLost &&
        play &&
        attempts.map((attempt, attemptIndex) => {
          return (
            <div
              className="d-flex justify-content-center mt-2 "
              key={attemptIndex}>
              <form onKeyUp={handleKeyUp}>
                {play &&
                  attempt.inputValues.map((value, index) => {
                    // console.log("indexxx", index, inputRefs.current[index]);
                    return (
                      <Input
                        ref={inputRefs.current[index]}
                        autoFocus={index === focusIndex}
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
