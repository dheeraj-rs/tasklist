import React, { useEffect, useState } from "react";
import Timer from "./Timer";

const ControllerComponent: React.FC = ({ listData, setListData }) => {
  return (
    <section className="w-full md:min-w-[calc(100vw-70vw)] max-h-full p-5 xl:p-14 bg-[#e7f0fa] text-[#47425b] md:order-1 duration-1000 relative">
      <header className="flex gap-4 items-center 2xl:gap-10">
        <span className="w-10 h-10 logobox text-lg font-extrabold flex items-center justify-center bg-[#f7d57e] text-white md:w-8 md:h-8 md:text-base lg:w-10 lg:h-10 lg:text-lg ">
          ＋
        </span>
        <h1 className="font-semibold text-xl md:text-base lg:text-xl css-1t1abw3 animate-charcter">
          Time Tracker
        </h1>
      </header>
      <Timer listData={listData} setListData={setListData} />
    </section>
  );
};

export default ControllerComponent;
