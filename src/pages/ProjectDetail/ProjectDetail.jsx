import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetailAction } from "../../redux/actions/getProjectDetailAction";
import StatusTaskCardComponent from "./StatusTaskCardComponent/StatusTaskCardComponent";

export default function ProjectDetail(props) {
  const { projectId } = props.match.params;
  console.log(projectId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectDetailAction(projectId));
  }, []);

  const projectDetail = useSelector(
    (state) => state.projectReducer.projectDetail
  );

  console.log(projectDetail);

  return (
    <div>
      <header>
        <h1 className="text-4xl">Project detail id:{projectId}</h1>
      </header>

      <div>search bar</div>

      <div className="statusTask flex justify-between gap-1 w-full">
        <StatusTaskCardComponent />
        <StatusTaskCardComponent />
        <StatusTaskCardComponent />
        <StatusTaskCardComponent />
      </div>
    </div>
  );
}
