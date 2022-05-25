import { Avatar } from "antd";
import React from "react";
import { useDispatch } from "react-redux";

import EditTaskFormComponent from "../../../component/EditTaskFormComponent/EditTaskFormComponent";
import { OPEN_MODAL } from "../../../util/constant/configSystem";

export default function StatusTaskCardComponent(props) {
  const dispatch = useDispatch();
  const { task } = props;
  console.log(task);

  const taskSorted = task.lstTaskDeTail?.sort((a, b) =>
    a.priorityTask.priorityId > b.priorityTask.priorityId ? 1 : -1
  );

  console.log(taskSorted);

  return (
    <div className="p-2 pb-0 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 w-1/4">
      <h3 className="my-2 text-gray-900 text-xs dark:text-white ml-3">
        {task.statusName}
      </h3>
      <ul className="my-3 space-y-2">
        {taskSorted?.map((task, index) => {
          return (
            <li key={index}>
              <div
                className="flex flex-col justify-between p-3 text-sm text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                onClick={(e) => {
                  console.log(e);
                  dispatch({
                    type: OPEN_MODAL,
                    modalContent: <EditTaskFormComponent />,
                  });
                }}
              >
                <span className="flex-1">{task.taskName}</span>

                <div className="taskStatus flex justify-between items-center h-3 mt-5">
                  <span
                    className={`text-xs ${
                      task.priorityTask?.priority === "High"
                        ? "text-red-500"
                        : task.priorityTask?.priority === "Medium"
                        ? "text-orange-500"
                        : task.priorityTask?.priority === "Low"
                        ? "text-cyan-500"
                        : "text-blue-500"
                    } `}
                  >
                    {task.priorityTask.priority}
                  </span>
                  <div>
                    {task.assigness.map((member, index) => {
                      return (
                        <Avatar
                          src={member.avatar}
                          size={"small"}
                          key={index}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
