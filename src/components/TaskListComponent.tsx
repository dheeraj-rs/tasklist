import React, { useEffect, useState, useCallback, useMemo } from "react";
import { subscribe, useSnapshot } from "valtio";
import Addform from "./Addform";
import { Formtype } from "../types/Formtype";
import TaskCard from "./TaskCard";
import { state } from "../pages/Homepage";

const TaskListComponent: React.FC = ({listData,setListData}) => {
  const snapshot = useSnapshot(state);
  const [userid, setUserid] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [selectDate, setSelectDate] = useState(new Date());

  

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    try {
      const storedData = localStorage.getItem("taskData");
      if (storedData) {
        console.log("storedData", storedData);
        setListData(JSON.parse(storedData));
      }
      setShowForm(false);
    } catch (error) {
      console.error("NO fetching data");
    }
  };


  const handleAdd = useCallback(() => {
    state.formToggle = true;
  }, []);



  useEffect(() => {
    setUserid(snapshot.userId);
  }, [snapshot.userId]);

  useEffect(() => {
    const calenderSelectDate = subscribe(state, () => {
      setSelectDate(state.calenderDate || new Date());
    });
    return () => calenderSelectDate();
  }, []);

  useEffect(() => {
    const toggleEditBtn = subscribe(state, () => {
      setShowForm(state.formToggle || false);
    });
    return () => toggleEditBtn();
  }, []);

  

  return (
    <section className="w-full md:min-w-[calc(100vw-55vw)] pt-5 xl:p-14 text-[#47425b] md:order-2">
      <main className="flex min-w-max px-5 mb-12 relative">
        <header className="w-full">
          <h1 className="text-3xl leading-[60px] tracking-normal md:text-2xl lg:text-4xl">
            Today's schedule
          </h1>
          <aside className="flex items-center gap-4  mt-3">
            {/* show selected Date */}
            <h1 className="text-3xl leading-[50px] tracking-wide text-[#f5bd6c] md:text-2xl lg:text-4xl w-52 lg:w-64">
              {selectDate.toLocaleDateString(undefined, {
                weekday: "long",
                day: "numeric",
              })}
            </h1>
          </aside>
        </header>
        <button
          className="w-14 h-14 logobox text-2xl font-extrabold flex items-center justify-center cursor-pointer select-none active:bg-[#fcc22f] bg-[#f7d57e] text-white md:w-10 md:h-10 md:text-xl lg:text-2xl lg:w-14 lg:h-14"
          onClick={handleAdd}
        >
          ＋
        </button>
        <div
          className={`${
            showForm
              ? "opacity-100 right-0 transition-all duration-1000"
              : "hidden right-[-100px] transition-all duration-1000"
          } absolute z-50 top-24 shadow-lg shadow-[#3454742a]`}
        >
          <Addform fetchTodos={() => fetchTodos()} />
        </div>
      </main>

      <main className="h-[calc(100vh-24vh)] rounded-xl flex flex-col gap-3 overflow-y-scroll p-5 relative ">
        {listData.map((task) => <TaskCard task={task} setListData={setListData} />)}
      </main>
    </section>
  );
};

export default TaskListComponent;
