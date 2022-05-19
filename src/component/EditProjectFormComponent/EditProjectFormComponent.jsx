import React, { useEffect } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { SET_SUBMIT_EDIT_PROJECT_FUNCTION } from "../../util/constant/configSystem";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";

const { Option } = Select;
function EditProjectFormComponent(props) {
  const dispatch = useDispatch();

  const { callBackSubmit } = useSelector((state) => state.drawerReducer);

  const { id, projectCategory, description, projectName } = props.values;

  const submitForm = (e) => {
    // alert("success");
    console.log("first");
  };

  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_EDIT_PROJECT_FUNCTION,
      function: submitForm,
    });
  }, []);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;

  return (
    <Form
      layout="vertical"
      hideRequiredMark
      id="editProjectForm"
      onSubmitCapture={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Project ID">
            <Input disabled defaultValue={id} name="projectId" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Project Name">
            <Input
              placeholder="Please enter project name"
              name="projectName"
              defaultValue={projectName}
              onChange={handleChange}
            />
            <p className="m-0 text-red-600">{errors.projectName}</p>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="projectCategory" label="Project Category">
            <Select
              placeholder="Choose the project category"
              defaultValue={projectCategory.id}
            >
              <Option value={1}>Dự án web</Option>
              <Option value={2}>Dự án phần mềm"</Option>
              <Option value={3}>Dự án di động</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Description">
            <Input.TextArea
              rows={20}
              placeholder="Description"
              defaultValue={description}
              onChange={handleChange}
              name="description"
            />
            <p className="m-0 text-red-600">{errors.description}</p>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

const EditProjectFormWithFormik = withFormik({
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit.projectName,
      projectCategory: projectEdit.projectCategory,
      description: projectEdit.description,
    };
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("ád");
  },

  validationSchema: Yup.object().shape({
    projectName: Yup.string().required("Project name is required!"),
    projectCategory: Yup.string().matches(/^\d+$/, "asd"),
    description: Yup.string().required("Description is required!"),
  }),
})(EditProjectFormComponent);

const mapStateToProps = (state) => ({
  projectEdit: state.projectReducer.projectEdit,
});

export default connect(mapStateToProps)(EditProjectFormWithFormik);
