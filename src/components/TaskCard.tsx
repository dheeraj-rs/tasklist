import React, { useCallback, useState } from "react";

import { Formtype } from "../types/Formtype";
import { state } from "../pages/Homepage";

function TaskCard({ task }) {
  const [selected, setSelected] = useState(false);

  const handleEdit = useCallback((task: Formtype) => {
    console.log("handleEdit");
    
    if(state.selectedData?.id === task?.id){
        state.selectedData = null
    }else{
        setSelected(true);
        state.selectedData = task;
        console.log("task", task);
    }
   
  }, []);

  return (
    <div
      className={`flex items-center gap-4 relative w-full `}
      key={task._id}
      onClick={() => handleEdit(task)} // Show options on double click
    >
      <div
        className={`flex-grow p-3 min-w-0 rounded-lg border overflow-x-scroll ${
          state.selectedData?.id === task?.id
            ? "border-[#f5bd6c] shadow-lg"
            : "border-[#edeff3]"
        }`}
      >
        <div className="flex gap-4 w-full items-center  ">
          <picture className="min-w-[40px] h-10 text-xl rounded-xl flex items-center justify-center bg-[#ffffff] l">
            {task.icon}
          </picture>

          <h1 className="font-medium w-max md:text-lg ">
            {task.title?.slice(0, 20)}
          </h1>
        </div>

        <div className="pl-[60px] text-xs">
          {task.description?.map(
            (
              detail:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined,
              index: number
            ) => (
              <li
                className={
                  detail ? (index < 1 ? "list-none" : "list-disc") : ""
                }
                key={index}
              >
                {detail || ""}
              </li>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
