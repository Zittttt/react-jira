import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetailAction } from "../../redux/actions/getProjectDetailAction";
import { getTaskStatusAction } from "../../redux/actions/getTaskStatusAction";
import { OPEN_FORM } from "../../util/constant/configSystem";
import StatusTaskCardComponent from "./StatusTaskCardComponent/StatusTaskCardComponent";
import EditProjectFormWithFormik from "../../component/EditProjectFormComponent/EditProjectFormComponent";
import CreateTaskFormComponent from "../../component/CreateTaskFormComponent/CreateTaskFormComponent";

export default function ProjectDetail(props) {
  const { projectId } = props.match.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectDetailAction(projectId));
  }, []);

  const projectDetail = useSelector(
    (state) => state.projectReducer.projectDetail
  );

  return (
    <div>
      <header>
        <h1 className="text-4xl">Project: {projectDetail.projectName}</h1>
      </header>

      <div className="taskInfo flex justify-between mb-10">
        <div className="flex">
          <form
            className="search-task"
            // onSubmit={(e) => {
            //   searchProject(e);
            // }}
          >
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
            {projectDetail.members?.map((member, index) => {
              return <Avatar src={member.avatar} key={index} />;
            })}
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
        {projectDetail.lstTask?.map((lstTask, index) => {
          return (
            <StatusTaskCardComponent
              task={lstTask}
              projectDetail={projectDetail}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
