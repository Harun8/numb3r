"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

import "../styles/stats.css";

const Stats = () => {
  const [gameCompletionRatio, setGameCompletionRatio] = useState([]);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState();
  const [gameWonData, setGameWonData] = useState();

  useEffect(() => {
    const getGameStats = async () => {
      try {
        const response = await fetch("/api/stats", { method: "GET" });

        if (!response.ok) {
          console.log("Get request failed ui");
        }

        const data = await response.json();
        console.log("data", data);
        setGameCompletionRatio(data);
      } catch (error) {
        console.log(error);
      }
    };
    getGameStats();
  }, []);

  useEffect(() => {
    console.log("gameCompletionRatio", gameCompletionRatio);
    // console.log("roundwin", gameCompletionRatio[3].roundWin[0].round1Win);
    setData({
      labels: ["Won", "Lost"],
      datasets: [
        {
          label: "Win/lose",
          data: [
            gameCompletionRatio[1] ? gameCompletionRatio[1].gameWon : 0,
            gameCompletionRatio[2] ? gameCompletionRatio[2].gameLost : 0,
          ],
          backgroundColor: [
            "rgba(121, 182, 95, 0.8)",
            "rgba(182, 105, 95, 0.8)",
          ],
          borderColor: ["rgba(0, 165, 9, 0.8)", "rgba(165, 19, 0, 0.8)"],
          borderWidth: 2,
        },
      ],
    });

    setGameWonData({
      labels: ["1", "2", "3", "4", "5"],
      datasets: [
        {
          label: "Round win",
          data: [
            gameCompletionRatio[3]?.roundWin?.[0]?.round1Win,
            gameCompletionRatio[3]?.roundWin?.[1]?.round2Win,
            gameCompletionRatio[3]?.roundWin?.[2]?.round3Win,
            gameCompletionRatio[3]?.roundWin?.[3]?.round4Win,
            gameCompletionRatio[3]?.roundWin?.[4]?.round5Win,
          ],
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 0, 77, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(255, 0, 77)",
          ],
          borderWidth: 1,
        },
      ],
    });

    setOptions({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });
  }, [gameCompletionRatio]);

  return (
    <>
      <div class="container  text-center">
        <h3 className="text-white">Game statistics</h3>
        <div class="row justify-content-center gap-5 ">
          <div class="col-4 border rounded shadow chart_bg">
            <h1 className="text-white">
              {" "}
              Total
              <span className="games_color"> games </span>
              played{" "}
            </h1>

            <h1 className="games_color mt-5">
              {" "}
              {gameCompletionRatio[0]?.totalGames}{" "}
            </h1>
          </div>
          <div class="col-4 border rounded shadow chart_bg">
            <Chart type="bar" data={data} options={options} />
          </div>
        </div>

        <div className="row justify-content-center  mt-5">
          <div className="col-6 border rounded shadow  chart_bg">
            <Chart type="bar" data={gameWonData} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
