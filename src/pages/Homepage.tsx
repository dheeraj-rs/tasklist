import { proxy } from "valtio";

import { Formtype, valtioDataType } from "../types/Formtype";
import TaskListComponent from "../components/TaskListComponent";
import ControllerComponent from "../components/ControllerComponent";
import { useState } from "react";


export const state = proxy<valtioDataType>({
    userId: "",
    calenderDate: null,
    formToggle: false,
    selectedData: null,
  });

function Homepage() {

    const [listData, setListData] = useState<Formtype[]>([]);

    return (
      <div className="w-screen xl:h-screen md:flex overflow-hidden">
        <TaskListComponent listData={listData} setListData={setListData} />
        <ControllerComponent setListData={setListData} listData={listData} />
      </div>
    );
}

export default Homepage