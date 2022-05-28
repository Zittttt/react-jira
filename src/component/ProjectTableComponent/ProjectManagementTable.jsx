import { AutoComplete, Avatar, Popover, Table, Tooltip } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { OPEN_FORM } from "../../util/constant/configSystem";
import EditProjectFormComponent from "../EditProjectFormComponent/EditProjectFormComponent";
import { projectService } from "../../services/baseService";
import { getProjectDetailAction } from "../../redux/actions/getProjectDetailAction";

import EditProjectFormWithFormik from "../../component/EditProjectFormComponent/EditProjectFormComponent";
import { deleteProjectAction } from "../../redux/actions/deleteProjectAction";
import { getProjectCategoryAction } from "../../redux/actions/getProjectCategoryAction";
import { Popconfirm, Button } from "antd";
import { getAllUserAction } from "../../redux/actions/getAllUserAction";
import { assignUserProjectAction } from "../../redux/actions/assignUserProjectAction";
import { removeUserFromProject } from "../../redux/actions/removeUserFromProjectAction";
import { NavLink } from "react-router-dom";
import MemberListComponent from "../MemberListComponent/MemberListComponent";

export default function ProjectManagementTable(props) {
  const dispatch = useDispatch();

  const { userSearch } = useSelector((state) => state.userReducer);

  const [value, setValue] = useState("");

  const searchRef = useRef(null);

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
      key: "projectName",
      // sorter: (item2, item1) => {
      //   let projectName1 = item1.projectName?.trim().toLowerCase();
      //   let projectName2 = item2.projectName?.trim().toLowerCase();
      //   if (projectName2 < projectName1) {
      //     return -1;
      //   }
      //   return 1;
      // },
      // sorter: (a, b) => {
      //   return a.projectName.localeCompare(b.projectName);
      // },
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
      key: "members",
      dataIndex: "members",
      width: 500,
      render: (text, record, index) => {
        return <MemberListComponent projectDetail={record} />;
      },
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
      projectName: (
        <NavLink to={`/projectdetail/${project.id}`} className="font-semibold">
          {project.projectName}
        </NavLink>
      ),
      categoryName: project.categoryName,
      creator: project.creator.name,
      members: project.members,
      action: (
        <div className="flex">
          <button
            className="mr-1 bg-cyan-500 w-8 h-6 rounded-md flex justify-center items-center pb-1 edit-project"
            onClick={() => {
              const { id } = project;
              //dispatch action getProjectDetailAction => gửi lên redux
              const action = getProjectDetailAction(id);
              dispatch(action);
              const actionOpenForm = {
                type: OPEN_FORM,
                Component: <EditProjectFormWithFormik />,
                title: `Edit Project (${project.projectName})`,
              };
              //dispatch actionOpenForm với nội dung component là EditProjectFormWithFormik
              dispatch(actionOpenForm);
            }}
          >
            <EditOutlined className="text-lg" />
          </button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              const { id } = project;
              //dispatch action deleteProject
              const action = deleteProjectAction(id);
              dispatch(action);
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="bg-red-500 w-8 h-6 rounded-md flex justify-center items-center pb-1">
              <DeleteOutlined className="text-lg" />
            </button>
          </Popconfirm>
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
