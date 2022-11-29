import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { createBuilding } from "../api";
import { ROUTES } from "../constant";
import { useHistory } from "react-router-dom";

export const BuildingCreate = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      setIsProcessing(true);

      const { building } = await createBuilding(values);
      message.success("New building configuration has been created", 2, () => {
        history.push(`${ROUTES.BULGING.list}/${building.id}`);
      });
    } catch (error) {
      message.error("Cannot create new building, please try again", 2);
    } finally {
      setIsProcessing(false);
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
        <Button loading={isProcessing} type="primary" htmlType="submit">
          Add new building
        </Button>
      </Form.Item>
    </Form>
  );
};
