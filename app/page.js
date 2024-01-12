"use client";

import React, { useState, useEffect, useRef } from "react";

import { useStopwatch } from "react-timer-hook";

import Image from "next/image";
import "./globals.css";
import Input from "./components/Input";
import Floater from "./components/Floater";
import Link from "next/link";

export default function Home() {
  // horizontal
  const [gameMode, setGameMode] = useState(4);
  const [gameOver, setGameOver] = useState(false);
  const [menu, setMenu] = useState(true);
  const [gameAnswer, setGameAnswer] = useState([]);
  const [showFloater, setShowFloater] = useState(false);
  const [gameIsLost, setGameIsLost] = useState(false);

  const [openLeaderboardModal, setOpenLeaderboardModal] = useState(false);
  const [quickestTime, setQuicketsTime] = useState(10000);

  const [userLost, setUserLost] = useState(false);

  const [qTName, setQTName] = useState("");

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

  useEffect(() => {
    const getGameStats = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        if (data && data.length > 0) {
          setQuicketsTime(data[0].timer); // Use 'data' here
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getGameStats();
  }, []);

  useEffect(() => {}, [attempts]);

  useEffect(() => {
    if (play) {
      inputRefs.current[focusIndex].current.focus();
    }
  }, [play, focusIndex]);

  useEffect(() => {
    if (gameOver) {
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
      }, 5000);

      return () => {
        clearTimeout(timeoutId);
      }; // Cleanup the timeout
    }
  }, [gameOver]); // This useEffect will run whenever gameOver changes

  useEffect(() => {
    if (userLost) {
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
    let userwon = true;

    if (totalSeconds < quickestTime) {
      setOpenLeaderboardModal(true);
    }

    setAttempts((prevAttempts) => [...prevAttempts]);

    postReq(userwon);
    setGameOver(true);
    setPlay(false);
    setShowFloater(true);
  };

  const postReq = async (userwon) => {
    if (totalSeconds < quickestTime) {
      quickestTimePostReq;
      return;
    }

    try {
      const response = await fetch("/api", {
        method: "post",

        body: JSON.stringify({
          attempts,
          gameAnswer: gameAnswer,
          timer: Number(totalSeconds),
          gameWon: userwon,
        }),
      });

      if (response.ok) {
        reset();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const gameLost = () => {
    let userwon = false;
    setAttempts((prevAttempts) => [...prevAttempts]);
    postReq(userwon);

    setUserLost(true);
    setPlay(false);
    setShowFloater(true);
  };

  const generateGameNumber = () => {
    let gameAnswer = [];
    let numberGenerator = Math.floor(Math.random() * 9 + 1);

    for (let i = 0; i < gameMode; i++) {
      let numberGenerator = Math.floor(Math.random() * 9 + 1);

      while (gameAnswer.includes(numberGenerator)) {
        numberGenerator = Math.floor(Math.random() * 9 + 1);
      }

      gameAnswer[i] = numberGenerator;
    }

    setGameAnswer(gameAnswer);
    return gameAnswer;
  };

  const handleInputChange = (attemptIndex, index, event) => {
    const newValue = event.target.value;
    const parsedValue = parseInt(newValue, 10); // Parse once and use the parsed value

    if (!Number.isInteger(parseInt(newValue))) {
      console.log("Not a valid integer number");

      return; // Early return to prevent further state updates
    }

    if (attempts[attemptIndex].inputValues.includes(parsedValue)) {
      return;
    }

    if (attemptIndex === 0 && index === 0 && attempts.length === 1) {
      startTimer();
    }

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
    setAttempts((prevAttempts) => {
      const currentAttempt = { ...prevAttempts[prevAttempts.length - 1] };
      currentAttempt.correctPlace = currentAttempt.inputValues.map(
        (value, index) => value === gameAnswer[index]
      );
      currentAttempt.correctNumber = currentAttempt.inputValues.map((value) =>
        gameAnswer.includes(value)
      );

      if (
        prevAttempts.length === 5 &&
        !currentAttempt.correctPlace.every(Boolean)
      ) {
        setGameIsLost(true);
        pause();
        gameLost();
      } else if (currentAttempt.inputValues.includes("")) {
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
        setGameIsLost(false);
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

  const deleteInput = () => {
    setAttempts((prevAttempts) => {
      // Copy the current attempts to a new array.
      const newAttempts = [...prevAttempts];
      // Get the current attempt.
      const currentAttempt = newAttempts[newAttempts.length - 1];
      // Check if the current input has a value.
      if (currentAttempt.inputValues[focusIndex] !== "") {
        // Clear the current input value.
        currentAttempt.inputValues[focusIndex] = "";
      } else if (focusIndex > 0) {
        // If the current input is already empty, clear the previous input value and update the focus index.
        currentAttempt.inputValues[focusIndex - 1] = "";
        setFocusIndex(focusIndex - 1);
      }
      // Return the updated attempts.
      return newAttempts;
    });
  };

  // enter key as input
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      checkAnswer();
    } else if (e.key === "Backspace" && e.target.value === "") {
      deleteInput();
    }
  };

  const quickestTimePostReq = async () => {
    setOpenLeaderboardModal((prev) => !prev);

    try {
      const response = await fetch("/api", {
        method: "POST",
        body: JSON.stringify({
          attempts,
          gameAnswer: gameAnswer,
          timer: Number(totalSeconds),
          gameWon: true,
          name: qTName,
        }),
      });

      if (response.ok) {
        console.log("Request was a success");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="">
      {openLeaderboardModal && (
        <>
          <div id="myModal" class="modal-backdrop ">
            <div class="modal-content rounded border main ">
              <h2 className="mx-auto modal_text_color">Congrats!</h2>
              <p className="mx-auto modal_text_color">
                You've got the fastest time
              </p>

              <p className="mx-auto modal_text_color">
                Please enter your name below!
              </p>
              <form className="mx-auto" onSubmit={quickestTimePostReq}>
                <input
                  onChange={(e) => setQTName(e.target.value)}
                  placeholder="Write your name"
                  className="my-3 form-control"></input>
                <div className="d-flex justify-content-center">
                  <button type="submit" className=" btn btn-outline-primary">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {!play && menu && (
        <>
          <div className="d-flex justify-content-center">
            <h1>Wordle but just numbers..</h1>
          </div>
          <div className="d-flex justify-content-center mt-5 ">
            <button
              id="start game"
              className="button"
              onClick={() => {
                setPlay((prev) => !prev);
                setMenu((prev) => !prev);
                generateGameNumber();
              }}>
              Start Game
              <div className="hoverEffect">
                <div></div>
              </div>
            </button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Link
              href="/HowToPlay"
              className="button"
              type="button"
              style={{ textDecoration: "none" }}>
              How to play
            </Link>
            <div className="hoverEffect">
              <div></div>
            </div>
          </div>
        </>
      )}

      {(gameOver || userLost) && showFloater && (
        <div className=" d-flex justify-content-center">
          <Floater userLost={userLost}></Floater>
        </div>
      )}

      {!gameOver &&
        !userLost &&
        play &&
        attempts.map((attempt, attemptIndex) => {
          return (
            <div
              className="d-flex justify-content-center mt-2  "
              key={attemptIndex}>
              <form className="" onKeyUp={handleKeyUp}>
                {play &&
                  attempt.inputValues.map((value, index) => {
                    return (
                      <Input
                        id={index}
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
