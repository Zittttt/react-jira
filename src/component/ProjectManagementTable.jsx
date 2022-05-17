import { Table } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectAction } from "../redux/actions/getProjectAction";

export default function ProjectManagementTable(props) {
  //   const { data } = props;

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
      // sorter: (a, b) => a.projectName.length - b.projectName.length,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "categoryName",
      width: 200,

      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.category.indexOf(value) === 0,
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
        <div>
          <button className="mr-3 bg-cyan-500 w-8 h-6 rounded-md">
            <i className="fa fa-edit" />
          </button>
          <button className="bg-red-500 w-8 h-6 rounded-md">
            <i className="fa fa-trash" />
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
