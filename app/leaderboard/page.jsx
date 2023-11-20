"use client";

import React, { useState, useEffect } from "react";
import "../styles/leaderboard.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Leaderboard = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        console.log("data", data);
        setList(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    getLeaderboard();
  }, []);

  return (
    <div className="d-flex justify-content-center ">
      <div
        className=" card   p-3 shadow "
        style={{ backgroundColor: "#2E4053" }}>
        <DataTable
          value={list}
          stripedRows
          showGridlines
          tableStyle={{ minHeight: "25rem", minWidth: "25rem" }}>
          <Column field="name" header="Name"></Column>
          <Column field="timer" header="Time">
            {" "}
          </Column>

          <Column field="Round.length" header="Tries"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Leaderboard;
