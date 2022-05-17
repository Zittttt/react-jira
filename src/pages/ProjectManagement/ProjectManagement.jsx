import React, { useEffect, useRef, useState } from "react";
import { userServices } from "../../services/baseService";
import { Table, Tag, Space } from "antd";

export default function ProjectManagement(props) {
  // useEffect(() => {
  //   userServices.checkLogin(props);
  // }, []);

  const [state, setState] = useState([
    {
      members: [
        {
          userId: 1027,
          name: "thanh",
          avatar: "https://ui-avatars.com/api/?name=thanh",
        },
        {
          userId: 1191,
          name: "khai 123",
          avatar: "https://ui-avatars.com/api/?name=khai 123",
        },
        {
          userId: 1342,
          name: "thanh",
          avatar: "https://ui-avatars.com/api/?name=thanh",
        },
        {
          userId: 850,
          name: "thangedit2",
          avatar: "https://ui-avatars.com/api/?name=thangedit2",
        },
        {
          userId: 1688,
          name: "anh",
          avatar: "https://ui-avatars.com/api/?name=anh",
        },
      ],
      creator: {
        id: 1804,
        name: "admin123",
      },
      id: 4541,
      projectName: "Project T",
      description: "<p>cba</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project-t",
      deleted: false,
    },
    {
      members: [
        {
          userId: 862,
          name: "nhuong2334",
          avatar: "https://ui-avatars.com/api/?name=nhuong2334",
        },
        {
          userId: 1027,
          name: "thanh",
          avatar: "https://ui-avatars.com/api/?name=thanh",
        },
        {
          userId: 1342,
          name: "thanh",
          avatar: "https://ui-avatars.com/api/?name=thanh",
        },
        {
          userId: 1024,
          name: "zoro112212",
          avatar: "https://ui-avatars.com/api/?name=zoro112212",
        },
      ],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4559,
      projectName: "Project 4",
      description: "<p>Project d&eacute;scription</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project-4",
      deleted: false,
    },
    {
      members: [
        {
          userId: 850,
          name: "thangedit2",
          avatar: "https://ui-avatars.com/api/?name=thangedit2",
        },
      ],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4584,
      projectName: "projectName 44",
      description: "<p>projectName 2</p>",
      categoryId: 2,
      categoryName: "Dự án phần mềm",
      alias: "projectname-44",
      deleted: false,
    },
    {
      members: [
        {
          userId: 1191,
          name: "khai 123",
          avatar: "https://ui-avatars.com/api/?name=khai 123",
        },
        {
          userId: 1616,
          name: "demo",
          avatar: "https://ui-avatars.com/api/?name=demo",
        },
      ],
      creator: {
        id: 1729,
        name: "dinh",
      },
      id: 4585,
      projectName: "newPJedit",
      description: "<p>sadsadsadad</p>",
      categoryId: 2,
      categoryName: "Dự án phần mềm",
      alias: "newpjedit",
      deleted: false,
    },
    {
      members: [
        {
          userId: 1655,
          name: "Quan1",
          avatar: "https://ui-avatars.com/api/?name=Quan1",
        },
        {
          userId: 1705,
          name: "Nguyễn Đình Quốc",
          avatar: "https://ui-avatars.com/api/?name=Nguyễn Đình Quốc",
        },
        {
          userId: 1733,
          name: "Anh Quân",
          avatar: "https://ui-avatars.com/api/?name=Anh Quân",
        },
        {
          userId: 1191,
          name: "khai 123",
          avatar: "https://ui-avatars.com/api/?name=khai 123",
        },
      ],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4587,
      projectName: "ndviet",
      description: "<p>wqewqewqeqwe</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "ndviet",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1729,
        name: "dinh",
      },
      id: 4588,
      projectName: "createTask555",
      description: "",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "createtask555",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1804,
        name: "admin123",
      },
      id: 4589,
      projectName: "project test new",
      description: "<p>222222des22222</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project-test-new",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1729,
        name: "dinh",
      },
      id: 4590,
      projectName: "da",
      description: "",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "da",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4591,
      projectName: "Project K",
      description: "<p>string</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project-k",
      deleted: false,
    },
    {
      members: [
        {
          userId: 1024,
          name: "zoro112212",
          avatar: "https://ui-avatars.com/api/?name=zoro112212",
        },
      ],
      creator: {
        id: 1729,
        name: "dinh",
      },
      id: 4598,
      projectName: "NEUTASK1",
      description: "<p>CONTENT</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "neutask1",
      deleted: false,
    },
    {
      members: [
        {
          userId: 1537,
          name: "Ngọc Long",
          avatar: "https://ui-avatars.com/api/?name=Ngọc Long",
        },
      ],
      creator: {
        id: 1729,
        name: "dinh",
      },
      id: 4599,
      projectName: "CREATENEWTASK2",
      description: "<p>CONTENT2</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "createnewtask2",
      deleted: false,
    },
    {
      members: [
        {
          userId: 1672,
          name: "Kham",
          avatar: "https://ui-avatars.com/api/?name=Kham",
        },
        {
          userId: 1741,
          name: "khaicute",
          avatar: "https://ui-avatars.com/api/?name=khaicute",
        },
        {
          userId: 1191,
          name: "khai 123",
          avatar: "https://ui-avatars.com/api/?name=khai 123",
        },
        {
          userId: 1661,
          name: "Khiem Khong Khoc",
          avatar: "https://ui-avatars.com/api/?name=Khiem Khong Khoc",
        },
        {
          userId: 1027,
          name: "thanh",
          avatar: "https://ui-avatars.com/api/?name=thanh",
        },
      ],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4600,
      projectName: "Project Test2",
      description: "<p>dshfjsdkdsf</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project-test2",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4601,
      projectName: "Project 1",
      description: "<p>hello</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project-1",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4602,
      projectName: "Thèm ăn phở",
      description: "<p>Ăn b&uacute;n b&ograve; Huế</p>",
      categoryId: 2,
      categoryName: "Dự án phần mềm",
      alias: "them-an-pho",
      deleted: false,
    },
    {
      members: [
        {
          userId: 1756,
          name: "Crystal",
          avatar: "https://ui-avatars.com/api/?name=Crystal",
        },
      ],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4603,
      projectName: "Project CH",
      description: "<p>Hello</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project-ch",
      deleted: false,
    },
    {
      members: [
        {
          userId: 1756,
          name: "Crystal",
          avatar: "https://ui-avatars.com/api/?name=Crystal",
        },
        {
          userId: 1734,
          name: "nguyen",
          avatar: "https://ui-avatars.com/api/?name=nguyen",
        },
      ],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4604,
      projectName: "Test comment",
      description: "<p>hello</p>",
      categoryId: 3,
      categoryName: "Dự án di động",
      alias: "test-comment",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4605,
      projectName: "Project PPP",
      description: "<p>string</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project-ppp",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1729,
        name: "dinh",
      },
      id: 4606,
      projectName: "Project999",
      description: "<p>dasd</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project999",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1729,
        name: "dinh",
      },
      id: 4607,
      projectName: "Projec",
      description: "<p>dasd</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "projec",
      deleted: false,
    },
    {
      members: [
        {
          userId: 1191,
          name: "khai 123",
          avatar: "https://ui-avatars.com/api/?name=khai 123",
        },
        {
          userId: 1027,
          name: "thanh",
          avatar: "https://ui-avatars.com/api/?name=thanh",
        },
        {
          userId: 827,
          name: "ca map shark tank",
          avatar: "https://ui-avatars.com/api/?name=ca map shark tank",
        },
      ],
      creator: {
        id: 1729,
        name: "dinh",
      },
      id: 4608,
      projectName: "Projectwqa",
      description: "<p>ddda</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "projectwqa",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1729,
        name: "dinh",
      },
      id: 4609,
      projectName: "",
      description: "",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4611,
      projectName: "web",
      description: "<p>lam viec</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "web",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1779,
        name: "dinh",
      },
      id: 4612,
      projectName: "userName",
      description: "<p>This is the initial content of the editor.dasdasd</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "username",
      deleted: false,
    },
    {
      members: [
        {
          userId: 1777,
          name: "hung",
          avatar: "https://ui-avatars.com/api/?name=hung",
        },
      ],
      creator: {
        id: 1777,
        name: "hung",
      },
      id: 4613,
      projectName: "Movie",
      description: "<p>Movie</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "movie",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 827,
        name: "ca map shark tank",
      },
      id: 4614,
      projectName: "bagus",
      description: "<p>ttset</p>",
      categoryId: 2,
      categoryName: "Dự án phần mềm",
      alias: "bagus",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 827,
        name: "ca map shark tank",
      },
      id: 4615,
      projectName: "dasdsa",
      description: "<p>asdsad</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "dasdsa",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1717,
        name: "demotest",
      },
      id: 4616,
      projectName: "Đặt sân ",
      description:
        "<p>L&agrave;m chức năng quản l&yacute; s&acirc;n cho chủ s&acirc;n</p>",
      categoryId: 3,
      categoryName: "Dự án di động",
      alias: "dat-san",
      deleted: false,
    },
    {
      members: [
        {
          userId: 1782,
          name: "luan",
          avatar: "https://ui-avatars.com/api/?name=luan",
        },
      ],
      creator: {
        id: 1782,
        name: "luan",
      },
      id: 4617,
      projectName: "Test Create Project",
      description: "<p>mo ta</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "test-create-project",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1755,
        name: "hiep",
      },
      id: 4618,
      projectName: "Thuyetdsadsa",
      description:
        '<p>fdsfdsfdsfds<span style="background-color: #f1c40f;">fdsfdsfdsfds</span></p>',
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "thuyetdsadsa",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 827,
        name: "ca map shark tank",
      },
      id: 4619,
      projectName: "zxcvbnm",
      description: "<p>sndvfsndfnbsdf</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "zxcvbnm",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 827,
        name: "ca map shark tank",
      },
      id: 4620,
      projectName: "asdfgh",
      description: "<p>qwertyhj</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "asdfgh",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1792,
        name: "hoang khiem3k",
      },
      id: 4621,
      projectName: "project khiem123",
      description: "<p>zxcvbnm,.</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project-khiem123",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1792,
        name: "hoang khiem3k",
      },
      id: 4622,
      projectName: "Le DO HOANG KHIEM11111",
      description: "<p>qweqwerqwer</p>",
      categoryId: 2,
      categoryName: "Dự án phần mềm",
      alias: "le-do-hoang-khiem11111",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1792,
        name: "hoang khiem3k",
      },
      id: 4623,
      projectName: "project khiem2",
      description:
        '<p><span style="background-color: rgb(241, 196, 15);"><strong><em>asdASDasdASD</em></strong></span></p>',
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "project-khiem2",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1792,
        name: "hoang khiem3k",
      },
      id: 4624,
      projectName: "mmmmmm",
      description: "<p>sadgfsdfgsdfg</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "mmmmmm",
      deleted: false,
    },
    {
      members: [],
      creator: {
        id: 1792,
        name: "hoang khiem3k",
      },
      id: 4625,
      projectName: "dsfgsdfgsdfg",
      description: "<p>asdfasdfasdfasdf</p>",
      categoryId: 1,
      categoryName: "Dự án web",
      alias: "dsfgsdfgsdfg",
      deleted: false,
    },
  ]);

  const data = state.map((project, index) => {
    return {
      key: index,
      id: project.id,
      projectName: project.projectName,
      categoryName: project.categoryName,
      creator: project.creator.name,
      member: project.members.map((member, index) => {
        return (
          <img
            className="inline-block rounded-full px"
            src={member.avatar}
            alt="..."
            width={35}
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

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
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

      // render: (categoryName) => (
      //   <>
      //     {categoryName.map((categoryName) => {
      //       let color = categoryName.length > 5 ? "geekblue" : "green";
      //       if (categoryName === "loser") {
      //         color = "volcano";
      //       }
      //       return (
      //         <Tag color={color} key={categoryName}>
      //           {categoryName.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
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
      // render: () => (
      //   <div>
      //     <button className="mr-3 bg-cyan-500 w-8 h-6 rounded-md">
      //       <i className="fa fa-edit" />
      //     </button>
      //     <button className="bg-red-500 w-8 h-6 rounded-md">
      //       <i className="fa fa-trash" />
      //     </button>
      //   </div>
      // ),
    },
  ];

  const inputSearch = useRef();

  const searchProject = (e) => {
    e.preventDefault();
    console.log(inputSearch.current.value);
    console.log(data);
    const result = state.filter(
      (project) =>
        project.projectName
          .toLowerCase()
          .indexOf(inputSearch.current.value.toLowerCase()) > -1
    );

    console.log(result);
    setState(result);
  };

  return (
    <div>
      <h3 className="text-4xl">Project management</h3>
      <form
        className="search-project mb-10"
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
          className="ml-5 bg-[#002380] rounded-md h-8 px-2 text-white hover:bg-[#5574e3] hover:text-black transition-all duration-200"
          type="submit"
        >
          Search Project
        </button>
      </form>
      <Table
        columns={columns}
        dataSource={data}
        size={"default"}
        className="h-full w-full table-project"
      />
    </div>
  );
}
