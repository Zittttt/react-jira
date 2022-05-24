import { Avatar } from "antd";
import React from "react";

export default function StatusTaskCardComponent(props) {
  const { task } = props;
  return (
    <div className="p-2 pb-0 bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700 w-1/4">
      <h3 className="my-2 text-gray-900 text-xs dark:text-white ml-3">
        {task.statusName}
      </h3>
      <ul className="my-3 space-y-2">
        <li>
          <a
            href="#"
            className="flex flex-col justify-between p-3 text-sm text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            <span className="flex-1">
              You can track how many hours were spent working on an issue, and
              how many hours remain.t
            </span>

            <div className="taskStatus flex justify-between items-center h-3 mt-5">
              <span className="text-xs text-red-500">Priority</span>
              <Avatar size={"small"} />
            </div>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex flex-col justify-between p-3 text-sm text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            <span className="flex-1">
              You can track how many hours were spent working on an issue, and
              how many hours remain.t
            </span>

            <div className="taskStatus flex justify-between items-center h-3 mt-5">
              <span className="text-xs text-red-500">Priority</span>
              <Avatar size={"small"} />
            </div>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex flex-col justify-between p-3 text-sm text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          >
            <span className="flex-1">
              You can track how many hours were spent working on an issue, and
              how many hours remain.t
            </span>

            <div className="taskStatus flex justify-between items-center h-3 mt-5">
              <span className="text-xs text-red-500">Priority</span>
              <Avatar size={"small"} />
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
}
