import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm, Table, Tooltip } from "antd";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteButtonComponent from "../../component/DeleteButtonComponent/DeleteButtonComponent";
import EditButtonComponent from "../../component/EditButtonComponent/EditButtonComponent";
import EditUserFormComponent from "../../component/EditUserFormComponent/EditUserFormComponent";
import { deleteUserAction } from "../../redux/actions/deleteUserAction";

import { getAllUserAction } from "../../redux/actions/getAllUserAction";
import {
  OPEN_DRAWER,
  OPEN_FORM,
  OPEN_MODAL,
} from "../../util/constant/configSystem";
import CreateUserComponent from "./CreateUserComponent/CreateUserComponent";

export default function UserManagerment(props) {
  const dispatch = useDispatch();
  const userLst = useSelector((state) => state.userReducer.userSearch);

  console.log("UserManagement");

  useEffect(() => {
    dispatch(getAllUserAction());
  }, []);

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
          <EditButtonComponent
            onClick={async () => {
              await dispatch(getAllUserAction(record.userId, "one"));
              dispatch({
                type: OPEN_FORM,
                Component: <EditUserFormComponent />,
                title: `Edit User (${record.userId})`,
              });
            }}
          />
          <DeleteButtonComponent
            title="Are you sure to delete this user?"
            onConfirm={() => {
              const action = deleteUserAction(record.userId);
              dispatch(action);
            }}
          />
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
      <h3 className="title">User Management</h3>
      <div className="flex justify-between">
        <form
          onSubmit={(e) => {
            searchUser(e);
          }}
        >
          <input
            type="text"
            placeholder="User"
            className="input"
            ref={inputSearch}
          />
          <button className="ml-5 btn" type="submit">
            Search User
          </button>
        </form>
        <Tooltip
          placement="left"
          title="Click to create user"
          className="cursor-pointer"
        >
          <button
            className="bg-[#002140] hover:bg-[#1890ff] rounded-sm text-white text-xl flex justify-center items-center w-8 h-8"
            onClick={() => {
              const actionOpenForm = {
                type: OPEN_MODAL,
                modalContent: <CreateUserComponent />,
                // title: "Create User",
              };
              dispatch(actionOpenForm);
            }}
          >
            <PlusOutlined />
          </button>
        </Tooltip>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        size={"middle"}
        className="w-full"
        pagination={{ position: ["topRight"] }}
      />
    </div>
  );
}
