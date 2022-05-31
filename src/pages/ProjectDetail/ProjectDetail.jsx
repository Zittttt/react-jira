import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Popover, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetailAction } from "../../redux/actions/getProjectDetailAction";
import { getTaskStatusAction } from "../../redux/actions/getTaskStatusAction";
import { OPEN_FORM } from "../../util/constant/configSystem";
import StatusTaskCardComponent from "./StatusTaskCardComponent/StatusTaskCardComponent";
import CreateTaskFormComponent from "../../component/CreateTaskFormComponent/CreateTaskFormComponent";
import { removeUserFromProject } from "../../redux/actions/removeUserFromProjectAction";
import MemberListComponent from "../../component/MemberListComponent/MemberListComponent";
import { DragDropContext } from "react-beautiful-dnd";
import { updateStatusAction } from "../../redux/actions/updateStatusAction";

export default function ProjectDetail(props) {
  const { projectId } = props.match.params;
  const dispatch = useDispatch();
  const projectDetail = useSelector(
    (state) => state.projectReducer.projectDetail
  );

  useEffect(() => {
    dispatch(getProjectDetailAction(projectId));
    dispatch(getTaskStatusAction());
  }, []);

  const handleDragEnd = (result) => {
    // console.log("result", result);

    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    //Nếu drag-drop ở 1 taskStatus thì return
    if (source.droppableId === destination.droppableId) {
      return;
    }

    let data = {
      taskId: draggableId,
      statusId: destination.droppableId,
    };

    // dispatch(updateStatusAction(data, projectId));
    dispatch({ type: "REMOVE_PROJECT_DETAIL" });
  };

  console.log(projectDetail);

  return (
    <div>
      <h1 className="text-2xl text-[#1f2937]">{projectDetail.projectName}</h1>
      <div className="taskInfo flex justify-between mb-10">
        <div className="flex">
          <div className="member-avatar">
            <MemberListComponent projectDetail={projectDetail} />
          </div>
        </div>
        <button
          className="bg-[#1f2937] text-white text-xl flex justify-center items-center w-8 h-8"
          onClick={() => {
            const actionOpenForm = {
              type: OPEN_FORM,
              Component: <CreateTaskFormComponent />,
              title: `Create task (Project: ${projectDetail.projectName})`,
            };
            dispatch(actionOpenForm);
          }}
        >
          <PlusOutlined />
        </button>
      </div>

      <div className="statusTask flex justify-between gap-3 w-full">
        <DragDropContext onDragEnd={handleDragEnd}>
          {projectDetail.lstTask?.map((lstTask, index) => {
            return (
              <StatusTaskCardComponent
                task={lstTask}
                projectDetail={projectDetail}
                key={index}
              />
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}
