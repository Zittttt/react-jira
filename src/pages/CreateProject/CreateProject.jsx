import { withFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectCategoryAction } from "../../redux/actions/getProjectCategoryAction";
import * as Yup from "yup";
import { Editor } from "@tinymce/tinymce-react";
import { connect } from "react-redux";
import { createProjectAction } from "../../redux/actions/createProjectAction";

function CreateProject(props) {
  const action = getProjectCategoryAction();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action);
  }, []);

  const { categoryArr } = useSelector((state) => state.projectReducer);
  const { values, errors, handleChange, handleSubmit, setValues } = props;

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const editorHandleChange = (content, editor) => {
    console.log(content);
    setValues({ ...values, description: content });
  };

  return (
    <div className="h-full">
      <h3 className="text-4xl">Create Project</h3>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-last-name"
            >
              PROJECT NAME
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="projectName"
              type="text"
              name="projectName"
              onChange={handleChange}
            />
            <p className="text-red-500 text-xs italic">{errors.projectName}</p>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              CATEGORY
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="categoryId"
                name="categoryId"
                onChange={handleChange}
                value={values.categoryId}
              >
                {categoryArr?.map((category, index) => {
                  return (
                    <option value={category.id} key={index}>
                      {category.projectCategoryName}
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
        <div className="flex flex-wrap -mx-3">
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
        <div className="button">
          <button
            className="rounded-md px-5 py-2 bg-[#002380] text-white"
            type="submit"
          >
            Create project
          </button>
        </div>
      </form>
    </div>
  );
}

const CreateProjectFormik = withFormik({
  enableReinitialize: true,

  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.categoryArr[0]?.id,
    };
  },

  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    console.log(values);
    const action = createProjectAction(values);
    props.dispatch(action);
    // console.log(resetForm);
  },

  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Project name is required!"),
    description: Yup.string().required("Description is required!"),
  }),
})(CreateProject);

const mapStateToProps = (state) => ({
  categoryArr: state.projectReducer.categoryArr,
});

export default connect(mapStateToProps)(CreateProjectFormik);
