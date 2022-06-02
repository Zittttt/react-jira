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
import EditButtonComponent from "../../component/EditButtonComponent/EditButtonComponent";
import DeleteButtonComponent from "../../component/DeleteButtonComponent/DeleteButtonComponent";

export default function ProjectManagement(props) {
  const action = getProjectAction();

  console.log("ProjectManagement");

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
          <EditButtonComponent
            onClick={async () => {
              //dispatch action getProjectDetailAction => gửi lên redux
              const action = await getProjectDetailAction(record.id);
              dispatch(action);
              const actionOpenForm = {
                type: OPEN_FORM,
                Component: <EditProjectFormWithFormik />,
                title: `Edit Project (${record.id})`,
              };
              //dispatch actionOpenForm với nội dung component là EditProjectFormWithFormik
              dispatch(actionOpenForm);
            }}
          />
          {/* <button
            className="mr-1 bg-[#1890ff] w-8 h-6 rounded-md flex justify-center items-center pb-1 edit-project"
            onClick={async () => {
              //dispatch action getProjectDetailAction => gửi lên redux
              const action = await getProjectDetailAction(record.id);
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
          </button> */}
          <DeleteButtonComponent
            title="Are you sure to delete this project?"
            onConfirm={() => {
              //dispatch action deleteProject
              const action = deleteProjectAction(record.id);
              dispatch(action);
            }}
          />
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
          className="font-medium text-secondary-600 relative hover:text-primary-500 after:content-[''] after:absolute after:w-full after:h-4 after:-bottom-1 after:left-0  after:border-b-2 after:border-primary-500 after:scale-x-0 hover:after:scale-x-100 after:block after:duration-300"
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
      <h3 className="title">Project management</h3>
      <form
        onSubmit={(e) => {
          searchProject(e);
        }}
      >
        <input
          type="text"
          placeholder="Project"
          className="input"
          ref={inputSearch}
        />
        <button className="btn ml-5" type="submit">
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
