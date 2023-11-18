import React, { useEffect, useState } from "react";

import { subscribe } from "valtio";
import { state } from "../pages/Homepage";

function Timer({setListData,listData}) {
  const [timerCount, setTimerCount] = useState(0);
  const [timerPlay, setTimerPlay] = useState(false);


  useEffect(() => {
    const toggleEditBtn = subscribe(state, () => {
        console.log("state.selectedData",state.selectedData)
        if(state.selectedData?.totalTimeSpend){
            setTimerCount(state.selectedData?.totalTimeSpend)
        }
    });
    return () => toggleEditBtn();
  }, []);


  useEffect(() => {
    let intervalId;

    if (timerPlay) {
      intervalId = setInterval(() => {
        setTimerCount((prevCount) => prevCount + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timerPlay]);

  const formatTime = (number) => (number < 10 ? "0" + number : number);

  const handlePlay = () => {
    setTimerPlay((prev) => !prev);
  };

  const handleSave = () => {
    setTimerPlay(false);
    let taskList = JSON.parse(localStorage.getItem("taskData"));

    console.log("taskList", taskList);

    let editedData = taskList.map((item) =>
      item.id === state.selectedData?.id
        ? { ...item, totalTimeSpend: timerCount }
        : item
    );
    console.log("editedData", editedData);

    localStorage.setItem("taskData", JSON.stringify(editedData));

    setListData(editedData)

    state.selectedData = null

    setTimerCount(0)
  };

  return (
    <div className="">
      <div className="bg-gray-200 p-8 rounded-2xl border-2 shadow-lg mt-5 relative">
        <div className="flex justify-between text-4xl">
          <div>{formatTime(Math.floor(timerCount / 3600))}</div>
          <div>:</div>
          <div>{formatTime(Math.floor((timerCount % 3600) / 60))}</div>
          <div>:</div>
          <div>{formatTime(timerCount % 60)}</div>
        </div>
        <div className="text-center mt-4">
          <span className="text-gray-500">HH</span>
          <span className="mx-2">:</span>
          <span className="text-gray-500">MM</span>
          <span className="mx-2">:</span>
          <span className="text-gray-500">SS</span>
        </div>

        <div
          className="absolute right-4 bottom-2 rounded-full"
          onClick={() => handlePlay()}
        >
          {!timerPlay ? "▶️" : "⏸️"}
        </div>
      </div>
      <div className="w-full p-5 flex justify-center ">
        <button
          className="bg-yellow-500 text-white shadow-lg px-3 rounded-lg py-1 "
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Timer;
