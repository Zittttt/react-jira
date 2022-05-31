import { Avatar } from "antd";
import Item from "antd/lib/list/Item";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import EditTaskFormComponent from "../../../component/EditTaskFormComponent/EditTaskFormComponent";
import { getTaskDetailAction } from "../../../redux/actions/getTaskDetailAction";
import { OPEN_MODAL } from "../../../util/constant/configSystem";

export default function StatusTaskCardComponent(props) {
  const dispatch = useDispatch();
  const { task } = props;

  const taskSorted = task.lstTaskDeTail?.sort((a, b) =>
    a.priorityTask.priorityId > b.priorityTask.priorityId ? 1 : -1
  );

  return (
    <div className="p-2 pb-3 bg-[#f4f5f7] rounded-sm shadow-md w-1/4">
      <h3 className="my-2 text-[#5e6c84] text-[12.5px] ml-3">
        {task.statusName}
      </h3>
      <Droppable droppableId={task.statusId.toString()}>
        {(provided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className="m-0 space-y-2">
                {taskSorted?.map((task, index) => {
                  return (
                    <li key={index}>
                      <Draggable
                        key={task.taskId}
                        index={index}
                        draggableId={task.taskId.toString()}
                      >
                        {(provided) => {
                          return (
                            <div
                              className="flex flex-col justify-between p-3 text-[15px] bg-white rounded-md hover:bg-[#ebecf0] group shadow-b-md shadow-md text-[#0747a6]"
                              onClick={async (e) => {
                                await dispatch(
                                  getTaskDetailAction(task.taskId)
                                );
                                dispatch({
                                  type: OPEN_MODAL,
                                  modalContent: <EditTaskFormComponent />,
                                });
                              }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <span className="flex-1">{task.taskName}</span>

                              <div className="taskStatus flex justify-between items-center h-3 mt-5">
                                <span
                                  className={`text-[14px] font-medium ${
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
                          );
                        }}
                      </Draggable>
                    </li>
                  );
                })}
              </ul>
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
