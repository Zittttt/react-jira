import { AutoComplete, Avatar, Popover, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectAction } from "../../redux/actions/getProjectAction";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  OPEN_DRAWER,
  OPEN_PROJECT_EDIT_FORM,
} from "../../util/constant/configSystem";
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

export default function ProjectManagementTable(props) {
  const dispatch = useDispatch();

  const { userSearch } = useSelector((state) => state.userReducer);

  const [value, setValue] = useState("");

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
      render: (text, record, index) => {
        return (
          <div className="flex">
            <Popover
              placement="bottom"
              title={"Member"}
              content={() => {
                const dataSource = record.member.map((member, index) => {
                  console.log(member);
                  return {
                    key: index,
                    id: member.userId,
                    name: member.name,
                    avatar: <Avatar src={member.avatar}></Avatar>,
                    action: (
                      <button
                        className="bg-red-500 w-8 h-6 rounded-md flex justify-center items-center pb-1"
                        onClick={() => {
                          console.log(record);
                          const action = removeUserFromProject({
                            projectId: record.id,
                            userId: member.userId,
                          });
                          dispatch(action);
                          // removeUserFromProject({ projectId: member.userid })
                        }}
                      >
                        <DeleteOutlined className="text-lg" />
                      </button>
                    ),
                  };
                });

                const columns = [
                  {
                    title: "ID",
                    dataIndex: "id",
                    key: "id",
                    width: 1,
                  },
                  {
                    title: "Avatar",
                    dataIndex: "avatar",
                    key: "avatar",
                    width: 1,
                  },
                  {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                    width: 160,
                  },
                  {
                    title: "",
                    dataIndex: "action",
                    key: "action",
                  },
                ];

                return (
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ pageSize: 5 }}
                    className="w-[350px]"
                  />
                );
              }}
              trigger="click"
            >
              <Tooltip placement="top" title="Click to view member">
                {record.member?.slice(0, 5).map((member, index) => {
                  return <Avatar src={member.avatar} alt="..." key={index} />;
                })}
                {record.member?.length > 5 ? <Avatar>...</Avatar> : ""}
              </Tooltip>
            </Popover>

            <Tooltip placement="top" title={"Add member"}>
              <Popover
                placement="rightTop"
                title={"Add member"}
                trigger="click"
                content={() => {
                  return (
                    <AutoComplete
                      options={userSearch.map((user, index) => {
                        return {
                          label: user.name,
                          value: user.userId.toString(),
                        };
                      })}
                      style={{ width: "100%" }}
                      onSelect={(value, option) => {
                        setValue(option.label);
                        dispatch(
                          assignUserProjectAction({
                            projectId: record.id,
                            userId: Number(value),
                          })
                        );
                      }}
                      onSearch={(value) => {
                        dispatch(getAllUserAction(value));
                      }}
                      onChange={(text) => {
                        setValue(text);
                      }}
                      // placeholder="input here"
                      value={value}
                    />
                  );
                }}
              >
                <UserAddOutlined className="flex justify-center items-center w-[32px]" />
              </Popover>
            </Tooltip>
          </div>
        );
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
      projectName: project.projectName,
      categoryName: project.categoryName,
      creator: project.creator.name,
      member: project.members,
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
                type: OPEN_PROJECT_EDIT_FORM,
                Component: <EditProjectFormWithFormik />,
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
