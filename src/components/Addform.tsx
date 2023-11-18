import React, { useEffect, useState } from "react";
import { Formtype, valtioDataType } from "../types/Formtype";
import { proxy, useSnapshot } from "valtio";
import { state } from "../pages/Homepage";

const currentDate = Date.now();



const icons = ["🦋", "😍", "😎"];

const Addform: React.FC = ({ fetchTodos }) => {
  const snapshot = useSnapshot(state);
  const [formState, setFormState] = useState<Formtype>({
    date: "",
    icon: "",
    title: "",
    description: [],
    totalTimeSpend: 0,
    id: currentDate,
  });

  const handleSubmit = () => {
    setFormState((prevState) => ({
      ...prevState,
      date: Date.now(),
      id: currentDate,
    }));

    const newTask: Formtype = {
      ...formState,
    };

    let taskData = JSON.parse(localStorage.getItem("taskData"));

    console.log("taskData from addform",taskData)
    if (taskData) {
      localStorage.setItem("taskData", JSON.stringify([...taskData, newTask]));
    } else {
      localStorage.setItem("taskData", JSON.stringify([newTask]));
    }

    state.formToggle = false;
    resetFormFields();
    fetchTodos();
  };

  const resetFormFields = () => {
    setFormState({
      date: "",
      time: "",
      icon: "",
      description: [],
      title: "",
    });
  };

  const handleCancel = () => {
    state.formToggle = false;
    state.selectedData = null;
    resetFormFields();
  };

  const buttonClasses =
    "bg-[#f5bd6c] text-white px-4 py-2 mt-4 rounded hover:bg-[#f0a742]";

  return (
    <div className="bg-[#f9fbfd] p-5 z-50">
      <span className="w-6 h-6 bg-[#f9fbfd] absolute -top-3 right-1.5 shadow-sm shadow-[#f9fbfd] rotate-45 z-40"></span>
      <div>
        <table className="w-full">
          <tbody>
            <tr>
              <td className="py-2">Title:</td>
              <td className="relative">
                <input
                  type="text"
                  value={formState.title}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                  className="w-[calc(100%-25%)] px-2 py-1 rounded border border-gray-300"
                  placeholder="Type title..."
                />
                <span
                  className={`material-symbols-outlined absolute top-2.5 right-2  text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer`}
                  onClick={() =>
                    setFormState((prevState) => ({ ...prevState, title: "" }))
                  }
                >
                  clear_all
                </span>
              </td>
            </tr>

            <tr>
              <td className="py-2">icon:</td>
              <td className="relative">
                <select
                  value={formState.icon}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      icon: e.target.value,
                    }))
                  }
                  className="w-[calc(100%-25%)] px-2 py-1 rounded border border-gray-300 bg-[#f9fbfd] text-gray-700 shadow-sm focus:outline-none cursor-pointer "
                >
                  <option value="" disabled>
                    Select an icon
                  </option>
                  {icons.map((icon) => (
                    <option
                      key={icon}
                      value={icon}
                      className={`bg-[#f9fbfd] text-gray-900 p-2 rounded hover:bg-[#f5bd6c]  `}
                    >
                      {icon}
                    </option>
                  ))}
                </select>
                <span
                  className={`material-symbols-outlined absolute top-2.5 right-2  text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer`}
                  onClick={() =>
                    setFormState((prevState) => ({ ...prevState, icon: "" }))
                  }
                >
                  clear_all
                </span>
              </td>
            </tr>

            <tr>
              <td className="">Description:</td>
              <td className="relative overflow-x-visible">
                <textarea
                  value={formState.description.join("\n")}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      description: e.target.value.split("\n"),
                    }))
                  }
                  className="w-full px-2  py-1 rounded border border-gray-300 "
                  placeholder="Type description..."
                ></textarea>
                {formState.description.length > 0 && (
                  <span
                    className={`material-symbols-outlined absolute bottom-1 right-2  text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer`}
                    onClick={() =>
                      setFormState((prevState) => ({
                        ...prevState,
                        description: [],
                      }))
                    }
                  >
                    clear_all
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <span className="flex gap-5">
          <button onClick={handleSubmit} className={buttonClasses}>
            {" "}
            Add Task{" "}
          </button>
          <button className={buttonClasses} onClick={handleCancel}>
            Cancel
          </button>
        </span>
      </div>
    </div>
  );
};

export default Addform;
