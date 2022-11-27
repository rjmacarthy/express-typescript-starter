import React from "react";
import { Button, Form, Input, message } from "antd";
import { createBuilding } from "../api";

export const BuildingCreate = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values) => {
    try {
      await createBuilding(values);
      messageApi.open({
        type: "success",
        content: "New building configuration has been created",
      });
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: "error",
        content: "Cannot create new building, please try again",
      });
    }
  };
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={(values) => handleSubmit(values)}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 6,
      }}
      layout="horizontal"
      autoComplete="off"
    >
      <Form.Item
        label="number of floors"
        name="floorNum"
        rules={[
          {
            required: true,
            message: "Please add number of floors",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="number of elevators"
        name="elevatorNum"
        rules={[
          {
            required: true,
            message: "Please add number of elevators",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add new building
        </Button>
      </Form.Item>
      {contextHolder}
    </Form>
  );
};
