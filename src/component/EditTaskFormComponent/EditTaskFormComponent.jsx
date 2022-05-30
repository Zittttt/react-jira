import { BugOutlined, CheckOutlined, DeleteOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { Avatar, InputNumber, Popconfirm, Select, Slider } from "antd";
import Input from "antd/lib/input/Input";
import { withFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getAllCommentAction } from "../../redux/actions/getAllCommentAction";
import { getPriorityAction } from "../../redux/actions/getPriorityAction";
import { getTaskDetailAction } from "../../redux/actions/getTaskDetailAction";
import { getTaskTypeAction } from "../../redux/actions/getTaskTypeAction";
import { removeTaskAction } from "../../redux/actions/removeTaskAction";
import { updateTaskAction } from "../../redux/actions/updateTaskAction";
import { SET_SUBMIT_MODAL_FUNCTION } from "../../util/constant/configSystem";
import CommentComponent from "../CommentComponent/CommentComponent";
import parse from "html-react-parser";

const { Option } = Select;

function EditTaskFormComponent(props) {
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const { taskDetail } = useSelector((state) => state.taskReducer);
  const { isModalVisible } = useSelector((state) => state.modalReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);

  useEffect(() => {
    dispatch(getPriorityAction());
    dispatch(getTaskTypeAction());
    dispatch(getAllCommentAction(taskDetail.taskId));
    dispatch({ type: SET_SUBMIT_MODAL_FUNCTION, function: handleSubmit });
  }, []);

  useEffect(() => {
    //resetForm khi bật/tắt modal
    resetForm();
    setVisibleEditor(false);
  }, [isModalVisible]);

  const {
    values,
    setValues,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
    errors,
    setErrors,
    setSubmitting,
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

  const renderDescription = () => {
    const htmlString = description;
    const parse = require("html-react-parser");
    return (
      <div className="mt-2 w-full h-full">
        {visibleEditor ? (
          <div>
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
            <button
              className="mt-4 px-3 py-1 rounded-[3px] bg-[#0052cc] text-white font-medium text-[14.5px]"
              onClick={() => {
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
          </div>
        ) : (
          // <div
          //   dangerouslySetInnerHTML={{ __html: htmlString }}
          //   onClick={() => {
          //     setVisibleEditor(true);
          //   }}
          //   className="w-full h-full"
          //   value={description}
          // />
          <div
            onClick={() => {
              setVisibleEditor(true);
            }}
            className="w-full h-full"
            value={description}
          >
            {parse(htmlString)}
          </div>
        )}
      </div>
    );
  };

  const editorHandleChange = (content, editor) => {
    setFieldValue("description", content);
  };

  const { taskStatus, taskType, priority } = useSelector(
    (state) => state.taskReducer
  );

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
                      {type.id === 1 ? (
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
        <div className="w-full px-3 text-right pr-10 relative">
          <button className="bg-red-500 w-8 h-6 rounded-md flex justify-center items-center pb-1 absolute top-0 right-10">
            <DeleteOutlined className="text-lg" />
          </button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => {
              dispatch(removeTaskAction(taskId, projectId));
            }}
            okText="Yes"
            cancelText="No"
          >
            <button className="bg-red-500 w-8 h-6 rounded-md flex justify-center items-center pb-1 absolute top-0 right-10">
              <DeleteOutlined className="text-lg" />
            </button>
          </Popconfirm>
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
            style={{ width: "100%" }}
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
          <label className="text-[15px] font-medium mb-10">Description</label>
          {renderDescription()}
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
              style={{ width: "100%" }}
              value={priorityId}
              className={` ${
                priorityId == 1
                  ? "text-red-500"
                  : priorityId == 2
                  ? "text-orange-400"
                  : priorityId == 3
                  ? "text-cyan-500"
                  : "text-blue-500"
              }`}
              onChange={(option) => {
                setFieldValue("priorityId", option);
              }}
              name="priorityId"
            >
              {priority.map((priority, index) => {
                return (
                  <Option
                    value={priority.priorityId}
                    key={index}
                    className={
                      priority.priorityId == 1
                        ? "text-red-500"
                        : priority.priorityId == 2
                        ? "text-orange-500"
                        : priority.priorityId == 3
                        ? "text-cyan-500"
                        : "text-blue-500"
                    }
                  >
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
              className="w-full"
              name="originalEstimate"
              value={originalEstimate}
              onChange={(e) => {
                setFieldValue("originalEstimate", e);
              }}
              type="number"
              min={0}
            />
            {errors.originalEstimate && (
              <p className="text-red-500 text-xs italic">
                {errors.originalEstimate}
              </p>
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
      .min(0, "Estimate must be greater than or equal to 0")
      .nullable(),
  }),
})(EditTaskFormComponent);

const mapStateToProps = (state) => ({
  taskDetail: state.taskReducer.taskDetail,
});

export default connect(mapStateToProps)(EditTaskFormWithFormik);
