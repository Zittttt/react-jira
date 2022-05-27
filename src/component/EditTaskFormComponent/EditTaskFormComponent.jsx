import { BugOutlined, CheckOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Avatar, Button, InputNumber, Select, Slider } from "antd";
import ErrorList from "antd/lib/form/ErrorList";
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import { withFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getAllCommentAction } from "../../redux/actions/getAllCommentAction";
import { getPriorityAction } from "../../redux/actions/getPriorityAction";
import { getTaskTypeAction } from "../../redux/actions/getTaskTypeAction";
import { updateTaskAction } from "../../redux/actions/updateTaskAction";
import { SET_SUBMIT_FUNCTION } from "../../util/constant/configSystem";
import CommentComponent from "../CommentComponent/CommentComponent";

const { Option } = Select;

function EditTaskFormComponent(props) {
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const { isModalVisible } = useSelector((state) => state.modalReducer);
  const { taskDetail } = useSelector((state) => state.taskReducer);

  useEffect(() => {
    dispatch(getPriorityAction());
    dispatch(getTaskTypeAction());
    dispatch(getAllCommentAction(taskDetail.taskId));

    dispatch({ type: SET_SUBMIT_FUNCTION, function: handleSubmit });
    //resetForm khi bật/tắt modal
    resetForm();
  }, []);

  // const [state, setState] = useState();

  const editorHandleChange = (content, editor) => {
    setFieldValue("description", content);
  };

  const { lstComment } = useSelector((state) => state.commentReducer);

  const { taskStatus, taskType, priority } = useSelector(
    (state) => state.taskReducer
  );

  const {
    values,
    setValues,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    errors,
  } = props;

  const {
    listUserAsign,
    taskName,
    description,
    statusId,
    originalEstimate,
    timeTrackingSpent,
    timeTrackingRemaining,
    projectId,
    typeId,
    priorityId,
    taskId,
    contentComment,
  } = values;

  const { projectDetail } = useSelector((state) => state.projectReducer);

  const userOptions = projectDetail.members?.map((user, index) => {
    return { value: user.userId, label: user.name };
  });

  const children = projectDetail.members?.map((user, index) => {
    return (
      <Option value={user.userId} key={index}>
        <Avatar src={user.avatar} className="mr-3" size={18} />
        {user.name}
      </Option>
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className="left-side grid grid-cols-3 -mx-3 mb-5">
        <div className="w-full px-3 col-span-2">
          <div className="col-span-2">
            <Select
              bordered={false}
              value={typeId}
              className="text-[13px] w-[120px]"
              optionFilterProp="label"
              onChange={(option) => setFieldValue("typeId", option)}
              name="typeId"
            >
              {taskType.map((type, index) => {
                return (
                  <Option value={type.id} label="bug" key={index}>
                    <div className="flex items-center">
                      {type.id == 1 ? (
                        <BugOutlined className="bg-red-500 mr-2 text-white p-1 rounded-full" />
                      ) : (
                        <CheckOutlined className="bg-cyan-500 mr-2 text-white p-1 rounded-full" />
                      )}

                      <span>{type.taskType}</span>
                    </div>
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className="left-side grid grid-cols-3 -mx-3 mb-5">
        <div className="w-full px-3 col-span-2">
          <label
            // bordered={false}
            className="text-[24px] font-medium rounded-md border-transparent hover:border-blue-400 transition-all duration-300 pl-3"
            id="taskName"
            type="text"
            name="taskName"
          >
            {taskName}
          </label>
        </div>
        <div className="w-full px-3">
          <label className="text-[12.5px] font-medium block">STATUS</label>
          <Select
            style={{ width: "50%" }}
            value={statusId}
            className="text-[13px]"
            name="statusId"
            onChange={(option) => {
              setFieldValue("statusId", option);
            }}
          >
            {taskStatus.map((status, index) => {
              return (
                <Option value={status.statusId} key={index}>
                  {status.statusName}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
      <div className="left-side grid grid-cols-3 -mx-3 mb-5 pl-3">
        <div className="w-full px-3 col-span-2">
          <label className="text-[15px] font-medium">Description</label>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={editorHandleChange}
            value={description}
            name="description"
            id="description"
            init={{
              height: 350,
              menubar: false,
              plugins: [
                "a11ychecker",
                "advlist",
                "advcode",
                "advtable",
                "autolink",
                "checklist",
                "export",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "powerpaste",
                "fullscreen",
                "formatpainter",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
                "onEditorChange",
              ],
              toolbar:
                "undo redo | casechange blocks | bold italic backcolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          {errors.description ? (
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          ) : (
            ""
          )}
        </div>
        <div className="w-full px-3">
          <div className="mb-5">
            <label className="text-[12.5px] font-medium block">ASSIGNESS</label>
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Add member"
              className="text-[13px]"
              optionFilterProp="label"
              onChange={(option) => {
                setFieldValue("listUserAsign", option);
              }}
              value={listUserAsign}
              options={userOptions}
              name="listUserAsign"
            >
              {children}
            </Select>
            {errors.listUserAsign ? (
              <p className="text-red-500 text-xs italic">
                {errors.listUserAsign}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-5">
            <label className="text-[12.5px] font-medium block">PRIORITY</label>
            <Select
              style={{ width: "50%" }}
              value={priorityId}
              className="text-[13px]"
              onChange={(option) => {
                setFieldValue("priorityId", option);
              }}
              name="priorityId"
            >
              {priority.map((priority, index) => {
                return (
                  <Option value={priority.priorityId} key={index}>
                    {priority.priority}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="mb-5">
            <label className="text-[12.5px] font-medium block">
              ORIGINAL ESTIMATE (HOURS)
            </label>
            <InputNumber
              style={{ width: "100%" }}
              name="originalEstimate"
              value={originalEstimate}
              onChange={(option) => setFieldValue("originalEstimate", option)}
              type="number"
            />
            {errors.originalEstimate ? (
              <p className="text-red-500 text-xs italic">
                {errors.originalEstimate}
              </p>
            ) : (
              ""
            )}
          </div>

          <div className="mb-5">
            <label className="text-[12.5px] font-medium block">
              TIME TRACKING
            </label>
            <Slider
              value={timeTrackingSpent}
              max={timeTrackingSpent + timeTrackingRemaining}
              tooltipPlacement="right"
            />
            <div className="grid grid-cols-2 mb-2">
              <span className="text-green-500 font-bold">
                {timeTrackingSpent}h logged
              </span>
              <span className="text-right text-red-500 font-bold">
                {timeTrackingRemaining}h remaining
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Time spent (hours)
                </label>
                <InputNumber
                  className="w-full"
                  name="timeTrackingSpent"
                  min={0}
                  value={timeTrackingSpent}
                  type="number"
                  onChange={(option) => {
                    setFieldValue("timeTrackingSpent", option);
                  }}
                />
              </div>
              <div>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Time remaining (hours)
                </label>
                <InputNumber
                  className="w-full"
                  name="timeTrackingRemaining"
                  min={0}
                  value={timeTrackingRemaining}
                  type="number"
                  onChange={(option) => {
                    setFieldValue("timeTrackingRemaining", option);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="left-side grid grid-cols-3 -mx-3 mb-5 pl-3">
        <div className="w-full px-3 col-span-2">
          <label className="text-[15px] font-medium">Comments</label>
          <CommentComponent taskId={taskId} />
        </div>
      </div>
    </form>
  );
}

const EditTaskFormWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { taskDetail } = props;
    const listUserId = taskDetail.assigness?.map((user) => {
      return user.id;
    });
    return {
      listUserAsign: listUserId,
      taskName: taskDetail.taskName,
      description: taskDetail.description,
      statusId: taskDetail.statusId,
      originalEstimate: taskDetail.originalEstimate,
      timeTrackingSpent: taskDetail.timeTrackingSpent,
      timeTrackingRemaining: taskDetail.timeTrackingRemaining,
      projectId: taskDetail.projectId,
      typeId: taskDetail?.typeId,
      priorityId: taskDetail.priorityTask?.priorityId,
      taskId: taskDetail.taskId,
    };
  },

  handleSubmit: async (values, { props, resetForm, setSubmitting }) => {
    console.log("value", values);
    props.dispatch(updateTaskAction(values));
  },

  validationSchema: Yup.object().shape({
    description: Yup.string().required("Description is required!"),
    originalEstimate: Yup.number()
      .required("Original Estimate is required!")
      .min(1, "Estimate must be greater than or equal to 1"),
  }),
})(EditTaskFormComponent);

const mapStateToProps = (state) => ({
  taskDetail: state.taskReducer.taskDetail,
});

export default connect(mapStateToProps)(EditTaskFormWithFormik);
