import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Popover, Table, Tooltip } from "antd";
import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getProjectDetailAction(projectId));
    dispatch(getTaskStatusAction());
  }, []);

  const projectDetail = useSelector(
    (state) => state.projectReducer.projectDetail
  );

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

    dispatch(updateStatusAction(data, projectId));
  };

  console.log(projectDetail);

  return (
    <div>
      <header>
        <h1 className="text-4xl">Project: {projectDetail.projectName}</h1>
      </header>

      <div className="taskInfo flex justify-between mb-10">
        <div className="flex">
          <form className="search-task">
            <input
              type="text"
              placeholder="Project"
              className="h-8 w-100 p-2 border-2 border-[#0049b0] hover:border-[#002380] rounded-md"
            />
            <button
              className="ml-5 bg-[#002380] rounded-md h-8 px-2 text-white hover:bg-[#5574e3] hover:text-black transition-all duration-200"
              type="submit"
            >
              Search Task
            </button>
          </form>
          <div className="member-avatar ml-5">
            <MemberListComponent projectDetail={projectDetail} />
          </div>
        </div>
        <button
          className="bg-[#1f2937] text-white flex justify-center items-center w-8 h-8"
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

      <div className="statusTask flex justify-between gap-1 w-full">
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
