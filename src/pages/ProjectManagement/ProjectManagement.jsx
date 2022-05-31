import React, { useEffect, useRef, useState } from "react";
import { projectService, userServices } from "../../services/baseService";
import { Table, Tag, Space, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProjectAction } from "../../redux/actions/getProjectAction";
import ProjectManagementTable from "../../component/ProjectTableComponent/ProjectManagementTable";
import { testTokenAction } from "../../redux/actions/testTokenAction";
import { deleteProjectAction } from "../../redux/actions/deleteProjectAction";
import { getProjectDetailAction } from "../../redux/actions/getProjectDetailAction";
import MemberListComponent from "../../component/MemberListComponent/MemberListComponent";
import { NavLink } from "react-router-dom";
import { OPEN_FORM } from "../../util/constant/configSystem";
import EditProjectFormWithFormik from "../../component/EditProjectFormComponent/EditProjectFormComponent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function ProjectManagement(props) {
  const action = getProjectAction();

  let projectArr = useSelector(
    (rootReducer) => rootReducer.projectReducer.projectArr
  );

  useEffect(() => {
    dispatch(action);
  }, []);

  const dispatch = useDispatch();
  const inputSearch = useRef();

  const userLoginId = useSelector((state) => state.userReducer.userLogin.id);

  const searchProject = (e) => {
    e.preventDefault();
    let action = getProjectAction(inputSearch.current.value);
    dispatch(action);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
      width: "5%",
      align: "center",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      width: "40%",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "categoryName",
      width: "10%",
      filters: [
        {
          text: "Dự án web",
          value: "Dự án web",
        },
        {
          text: "Dự án phần mềm",
          value: "Dự án phần mềm",
        },
        {
          text: "Dự án di động",
          value: "Dự án di động",
        },
      ],
      render: (text, record, index) => {
        return (
          <span>
            <Tag
              color={
                record.categoryName === "Dự án phần mềm"
                  ? "volcano"
                  : record.categoryName === "Dự án web"
                  ? "green"
                  : "geekblue"
              }
            >
              {record.categoryName.toUpperCase()}
            </Tag>
          </span>
        );
      },
      onFilter: (value, record) => record.categoryName.indexOf(value) === 0,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      width: "10%",
    },
    {
      title: "Member",
      key: "members",
      dataIndex: "members",
      width: "25%",
      render: (text, record, index) => {
        return <MemberListComponent projectDetail={record} />;
      },
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: "10%",
      align: "center",
      render: (data, record, index) => (
        <div className="flex justify-center text-white">
          <button
            className="mr-1 bg-[#1890ff] w-8 h-6 rounded-md flex justify-center items-center pb-1 edit-project"
            onClick={() => {
              //dispatch action getProjectDetailAction => gửi lên redux
              const action = getProjectDetailAction(record.id);
              dispatch(action);
              const actionOpenForm = {
                type: OPEN_FORM,
                Component: <EditProjectFormWithFormik />,
                title: `Edit Project (${record.id})`,
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
              //dispatch action deleteProject
              const action = deleteProjectAction(record.id);
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
    },
  ];

  const data = projectArr.map((project, index) => {
    return {
      key: index,
      id: project.id,
      projectName: (
        <NavLink
          to={`/projectdetail/${project.id}`}
          className="font-medium text-[#0747a6]"
        >
          {project.projectName}
        </NavLink>
      ),
      categoryName: project.categoryName,
      creator: project.creator.name,
      members: project.members,
    };
  });

  return (
    <div>
      <h3 className="text-2xl text-[#1f2937]">Project management</h3>
      <form
        onSubmit={(e) => {
          searchProject(e);
        }}
      >
        <input
          type="text"
          placeholder="Project"
          className="h-8 w-100 p-2 border-2 border-[#0049b0] hover:border-[#002380] rounded-md"
          ref={inputSearch}
        />
        <button
          className="ml-5 bg-[#002140] rounded-md h-8 px-2 text-white hover:bg-[#1890ff] transition-all duration-200"
          type="submit"
        >
          Search Project
        </button>
      </form>
      <Table
        columns={columns}
        dataSource={data}
        size={"middle"}
        className="table-project w-full"
        pagination={{ position: ["topRight"] }}
      />
    </div>
  );
}
