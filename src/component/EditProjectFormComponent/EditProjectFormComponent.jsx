import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_SUBMIT_EDIT_PROJECT_FUNCTION } from "../../util/constant/configSystem";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { getProjectCategoryAction } from "../../redux/actions/getProjectCategoryAction";
import { projectService } from "../../services/baseService";
import { updateProjectAction } from "../../redux/actions/updateProjectAction";

function EditProjectFormComponent(props) {
  const dispatch = useDispatch();

  const action = getProjectCategoryAction();

  useEffect(() => {
    dispatch(action);
    dispatch({
      type: SET_SUBMIT_EDIT_PROJECT_FUNCTION,
      function: handleSubmit,
    });
  }, []);

  const { categoryArr } = useSelector((state) => state.projectReducer);
  const { values, errors, handleChange, handleSubmit } = props;

  let { id, projectName, categoryId, description } = values;

  return (
    <form className="w-full h-full" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="id"
          >
            PROJECT ID
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="id"
            type="text"
            value={id}
            onChange={handleChange}
            disabled
          />
        </div>
      </div>
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
            value={projectName}
            onChange={handleChange}
            name="projectName"
          />
          <p className="text-red-500 text-xs italic">{errors.projectName}</p>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
              value={categoryId}
              onChange={handleChange}
              name="categoryId"
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
      <div className="flex flex-wrap -mx-3 h-1/2">
        <div className="w-full px-3 h-full">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            DESCRIPTION
          </label>
          <textarea
            className="appearance-none block w-full h-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            type="text"
            value={description}
            onChange={handleChange}
            name="description"
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
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      categoryId: projectEdit.projectCategory.id,
      description: projectEdit.description,
    };
  },

  handleSubmit: async (values, { props, setSubmitting }) => {
    console.log(values);

    const action = updateProjectAction(values);
    props.dispatch(action);
  },

  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Project name is required!"),
    description: Yup.string().required("Description is required!"),
  }),
})(EditProjectFormComponent);

const mapStateToProps = (state) => ({
  projectEdit: state.projectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectFormWithFormik);
