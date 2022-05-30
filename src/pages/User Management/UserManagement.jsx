import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm, Table } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditUserFormComponent from "../../component/EditUserFormComponent/EditUserFormComponent";
import { deleteUserAction } from "../../redux/actions/deleteUserAction";

import { getAllUserAction } from "../../redux/actions/getAllUserAction";
import { OPEN_DRAWER, OPEN_FORM } from "../../util/constant/configSystem";

export default function UserManagerment(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUserAction());
  }, []);

  const userLst = useSelector((state) => state.userReducer.userSearch);

  const data = userLst.map((user, index) => ({
    key: index,
    userId: user.userId,
    name: user.name,
    avatar: user.avatar,
    email: user.email,
    phoneNumber: user.phoneNumber,
  }));

  const columns = [
    {
      title: "ID",
      dataIndex: "userId",
      sorter: (a, b) => a.userId - b.userId,
      defaultSortOrder: "ascend",
      key: "userId",
      width: "5%",
      align: "center",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record, index) => {
        return <Avatar src={record.avatar} />;
      },
      width: "10%",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "20%",
    },
    {
      title: "Action",
      render: (text, record, index) => (
        <div className="flex justify-center text-white">
          <button
            className="mr-1 bg-[#1890ff] w-8 h-6 rounded-md flex justify-center items-center pb-1 edit-project"
            onClick={async () => {
              await dispatch(getAllUserAction(record.userId, "one"));
              dispatch({
                type: OPEN_FORM,
                Component: <EditUserFormComponent />,
                title: `Edit User (${record.userId})`,
              });
            }}
          >
            <EditOutlined className="text-lg" />
          </button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              const action = deleteUserAction(record.userId);
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
      align: "center",
      width: "10%",
    },
  ];

  const inputSearch = useRef();

  const searchUser = (e) => {
    e.preventDefault();
    let action = getAllUserAction(inputSearch.current.value);
    dispatch(action);
  };

  return (
    <div>
      <h3 className="text-2xl text-[#1f2937]">User Management</h3>
      <form
        className="mb-10"
        onSubmit={(e) => {
          searchUser(e);
        }}
      >
        <input
          type="text"
          placeholder="User"
          className="h-8 w-100 p-2 border-2 border-[#0049b0] hover:border-[#002380] rounded-md"
          ref={inputSearch}
        />
        <button
          className="ml-5 bg-[#002140] rounded-md h-8 px-2 text-white hover:bg-[#1890ff] transition-all duration-200"
          type="submit"
        >
          Search User
        </button>
      </form>
      <Table
        columns={columns}
        dataSource={data}
        size={"middle"}
        className="w-full"
      />
    </div>
  );
}
