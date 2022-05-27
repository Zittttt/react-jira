import { Avatar, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentAction } from "../../redux/actions/deleteCommentAction";
import { getAllCommentAction } from "../../redux/actions/getAllCommentAction";
import { inserCommentAction } from "../../redux/actions/insertCommentAction";
import { GET_ALL_COMMENT } from "../../util/constant/configSystem";

export default function CommentComponent(props) {
  const { userLogin } = useSelector((state) => state.userReducer);
  const { taskId } = props;

  console.log(taskId);

  const dispatch = useDispatch();

  const [state, setState] = useState();

  useEffect(() => {
    dispatch(getAllCommentAction(taskId));
  }, [taskId, state]);

  const { lstComment } = useSelector((state) => state.commentReducer);

  console.log(lstComment);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      contentComment: "",
      taskId,
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(inserCommentAction(values));
      //   resetForm();
      setState();
    },
  });

  return (
    <div>
      <div className="flex justify-between">
        <div className="mr-2 mt-2">
          <Avatar src={userLogin.avatar} />
        </div>
        <TextArea
          placeholder="Add a comment..."
          className="w-full"
          name="contentComment"
          value={formik.values.contentComment}
          onChange={formik.handleChange}
        />
        <Button type="button" onClick={formik.handleSubmit}>
          Send
        </Button>
      </div>
      <li>
        {lstComment?.map((comment, index) => {
          return (
            <ul className="mt-5" key={index}>
              <div className="info flex">
                <div className="mr-2">
                  <Avatar src={comment.user.avatar} />
                </div>
                <div>
                  <span className="font-medium text-[15px] pr-[12px]">
                    {comment.user.name}
                  </span>
                  <span className="text-[14.5px]">an hour ago</span>
                </div>
              </div>
              <div className="comment-content pl-[40px] ">
                <p className="text-[15px]">{comment.contentComment}</p>
                <button className="text-[14.5px] mr-2" type="button">
                  Edit
                </button>
                <button
                  className="text-[14.5px]"
                  type="button"
                  onClick={() => {
                    dispatch(deleteCommentAction(comment.id));
                  }}
                >
                  Delete
                </button>
              </div>
            </ul>
          );
        })}
      </li>
    </div>
  );
}
