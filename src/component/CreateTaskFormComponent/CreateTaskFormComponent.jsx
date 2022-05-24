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

  console.log(taskType);

  const { values, errors, handleChange, handleSubmit, setValues } = props;

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
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            TASK NAME
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="taskName"
            type="text"
            name="taskName"
            onChange={handleChange}
          />
          <p className="text-red-500 text-xs italic">{errors.taskName}</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            TASK STATUS
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="statusId"
              name="statusId"
              onChange={handleChange}
              value={values.statusId}
            >
              {taskStatus.map((status, index) => {
                return (
                  <option value={status.statusId} key={index}>
                    {status.statusName}
                  </option>
                );
              })}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Task type
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="typeId"
              name="typeId"
              onChange={handleChange}
              value={values.typeId}
            >
              {taskType?.map((type, index) => {
                return (
                  <option value={type.id} key={index}>
                    {type.taskType}
                  </option>
                );
              })}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Assigness
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="assigness"
            type="text"
            name="assigness"
            onChange={handleChange}
          />
          <p className="text-red-500 text-xs italic">{errors.projectName}</p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Priority
          </label>
          <div className="relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="priorityId"
              name="priorityId"
              onChange={handleChange}
              value={values.priorityId}
            >
              {priority.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </option>
                );
              })}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 h-1/2">
        <div className="w-full px-3 h-full">
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
              height: 500,
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
