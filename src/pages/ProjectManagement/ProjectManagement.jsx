import React, { useEffect, useRef, useState } from "react";
import { projectService, userServices } from "../../services/baseService";
import { Table, Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProjectAction } from "../../redux/actions/getProjectAction";
import ProjectManagementTable from "../../component/ProjectManagementTable";
import { testTokenAction } from "../../redux/actions/testTokenAction";

export default function ProjectManagement(props) {
  const action = getProjectAction();
  testTokenAction();

  useEffect(() => {
    dispatch(action);
    dispatch(testTokenAction(props));
  }, []);

  const dispatch = useDispatch();
  const inputSearch = useRef();

  const projectArr = useSelector(
    (rootReducer) => rootReducer.projectReducer.projectArr
  );

  const searchProject = (e) => {
    e.preventDefault();
    let action = getProjectAction(inputSearch.current.value);
    dispatch(action);
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
      <ProjectManagementTable projectArr={projectArr} />
    </div>
  );
}
