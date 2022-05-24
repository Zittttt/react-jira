import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SUBMIT_FUNCTION } from "../../util/constant/configSystem";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { getProjectCategoryAction } from "../../redux/actions/getProjectCategoryAction";
import { projectService } from "../../services/baseService";
import { updateProjectAction } from "../../redux/actions/updateProjectAction";
import { Editor } from "@tinymce/tinymce-react";
import { getTaskStatusAction } from "../../redux/actions/getTaskStatusAction";
import { getTaskTypeAction } from "../../redux/actions/getTaskTypeAction";
import { getPriorityAction } from "../../redux/actions/getPriorityAction";

import { Input, InputNumber, Select, Slider } from "antd";
import { getAllUserAction } from "../../redux/actions/getAllUserAction";

const { Option } = Select;

function CreateTaskFormComponent(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTaskStatusAction());
    dispatch(getTaskTypeAction());
    dispatch(getPriorityAction());
    dispatch({
      type: SET_SUBMIT_FUNCTION,
      function: handleSubmit,
    });
  }, []);

  const { taskStatus, taskType, priority } = useSelector(
    (state) => state.taskReducer
  );

  const { userSearch } = useSelector((state) => state.userReducer);

  console.log(taskType);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;

  let {
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
  } = values;

  const editorRef = useRef(null);

  const editorHandleChange = (content, editor) => {
    console.log(content);
    setValues({ ...values, description: content });
  };

  return (
    <form className="w-full grid grid-rows-2" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-1 -mx-3 mb-2">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            TASK NAME
          </label>
          <Input
            id="taskName"
            type="text"
            name="taskName"
            onChange={handleChange}
          />
          {errors.taskName ? (
            <p className="text-red-500 text-xs italic">{errors.taskName}</p>
          ) : (
            ""
          )}
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            TASK STATUS
          </label>
          <div className="relative">
            <Select
              id="statusId"
              name="statusId"
              onChange={(option) => setFieldValue("statusId", option)}
              value={values.statusId}
              style={{
                width: "100%",
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
      </div>
      <div className="grid grid-cols-2 gap-1 -mx-3 mb-2">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Task type
          </label>
          <div className="relative">
            <Select
              id="typeId"
              name="typeId"
              value={values.typeId}
              onChange={(option) => setFieldValue("typeId", option)}
              style={{
                width: "100%",
              }}
            >
              {taskType?.map((type, index) => {
                return (
                  <Option value={type.id} key={index}>
                    {type.taskType}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Priority
          </label>
          <div className="relative">
            <Select
              id="priorityId"
              name="priorityId"
              onChange={(option) => setFieldValue("typeId", option)}
              value={values.priorityId}
              style={{
                width: "100%",
              }}
            >
              {priority.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className="-mx-3 mb-2">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Assigness
          </label>
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Member"
            onChange={(option) => setFieldValue("typeId", option)}
          ></Select>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Time Tracking
          </label>
          <Slider defaultValue={30} tooltipPlacement="right" />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Time spent (hours)
              </label>
              <InputNumber
                className="w-full"
                name="timeTrackingSpent"
                min={1}
                max={10}
                defaultValue={3}
                onChange={(option) => setFieldValue("timeTracking", option)}
              />
            </div>
            <div>
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Time remaining (hours)
              </label>
              <InputNumber
                className="w-full"
                name="timeTrackingRemaining"
                min={1}
                max={10}
                defaultValue={3}
                onChange={(option) => setFieldValue("timeTracking", option)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="h-full -mx-3">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            DESCRIPTION
          </label>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={editorHandleChange}
            name="description"
            id="description"
            init={{
              // height: 300,
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
          <p className="text-red-500 text-xs italic">{errors.description}</p>
        </div>
      </div>
    </form>
  );
}

const EditProjectFormWithFormik = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    return {
      listUserAsign: [0],
      taskName: "",
      description: "string",
      statusId: props.taskStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: props.projectDetail.id,
      typeId: props.taskType[0]?.id,
      priorityId: props.priority[0]?.priorityId,
    };
  },

  handleSubmit: async (values, { props, setSubmitting }) => {
    console.log(values);
  },

  validationSchema: Yup.object().shape({
    taskName: Yup.string().required("Task name is required!"),
    description: Yup.string().required("Description is required!"),
  }),
})(CreateTaskFormComponent);

const mapStateToProps = (state) => {
  const { taskStatus, taskType, priority } = state.taskReducer;
  const { projectDetail } = state.projectReducer;

  return { taskStatus, taskType, priority, projectDetail };
};

export default connect(mapStateToProps)(EditProjectFormWithFormik);
