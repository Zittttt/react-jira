import React from "react";
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

const { Option } = Select;
export default function EditProjectFormComponent() {
  return (
    <Form layout="vertical" hideRequiredMark>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item name="projectId" label="Project ID">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="projectName"
            label="Project Name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input placeholder="Please enter project name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="projectCategory"
            label="Project Category"
            rules={[{ required: true, message: "Choose the project category" }]}
          >
            <Select placeholder="Choose the project category">
              <Option value="xiao">Category 1</Option>
              <Option value="mao">Category 2</Option>
              <Option value="mao">Category 3</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter description",
              },
            ]}
          >
            <Input.TextArea rows={20} placeholder="Description" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
