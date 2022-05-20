import { Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectAction } from "../../redux/actions/getProjectAction";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  OPEN_DRAWER,
  OPEN_PROJECT_EDIT_FORM,
} from "../../util/constant/configSystem";
import EditProjectFormComponent from "../EditProjectFormComponent/EditProjectFormComponent";
import { projectService } from "../../services/baseService";
import { getProjectDetailAction } from "../../redux/actions/getProjectDetailAction";

import EditProjectFormWithFormik from "../../component/EditProjectFormComponent/EditProjectFormComponent";

export default function ProjectManagementTable(props) {
  //   const { data } = props;

  const dispatch = useDispatch();

  const categoryArr = useSelector(
    (rootReducer) => rootReducer.projectReducer.categoryArr
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
      width: 100,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      defaultSortOrder: "descend",
      width: 400,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "categoryName",
      width: 200,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      width: 200,
    },
    {
      title: "Member",
      key: "member",
      dataIndex: "member",
      width: 500,
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
    },
  ];

  const data = props.projectArr.map((project, index) => {
    return {
      key: index,
      id: project.id,
      projectName: project.projectName,
      categoryName: project.categoryName,
      creator: project.creator.name,
      member: project.members.map((member, index) => {
        return (
          <img
            className="inline rounded-full"
            src={member.avatar}
            alt="..."
            width={27}
            key={index}
          />
        );
      }),
      action: (
        <div className="flex">
          <button
            className="mr-1 bg-cyan-500 w-8 h-6 rounded-md flex justify-center items-center pb-1 edit-project"
            onClick={() => {
              let { id } = project;
              let action = getProjectDetailAction(id);
              dispatch(action);
              const actionOpenForm = {
                type: OPEN_PROJECT_EDIT_FORM,
                Component: <EditProjectFormWithFormik />,
              };
              dispatch(actionOpenForm);
            }}
          >
            <EditOutlined className="text-lg" />
          </button>
          <button className="bg-red-500 w-8 h-6 rounded-md flex justify-center items-center pb-1">
            <DeleteOutlined className="text-lg" />
          </button>
        </div>
      ),
    };
  });

  return (
    <Table
      columns={columns}
      dataSource={data}
      size={"default"}
      className="table-project"
    />
  );
}
