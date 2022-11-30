import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  getBuilding,
  movePassenger,
  startElevators,
  startSimulation,
  stopElevators,
  whichElevator,
} from "../api";
import {
  Divider,
  List,
  Typography,
  Descriptions,
  Form,
  Button,
  Select,
  message,
  Table,
} from "antd";

import { Loader } from "../component/Loader";
import { useForm } from "antd/es/form/Form";

const { Title } = Typography;

const columns = [
  {
    title: "From",
    dataIndex: "passengerFloor",
    key: "passengerFloor",
  },
  {
    title: "To",
    dataIndex: "passengerTarget",
    key: "passengerTarget",
  },
];

export const BuildingView = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [building, setBuilding] = useState({});
  const { id } = useParams();
  const [form] = useForm();
  useEffect(() => {
    const fetchBuilding = async () => {
      setIsFetching(true);
      try {
        const { data } = await getBuilding(id);
        setBuilding(data);
      } catch (error) {
      } finally {
        setIsFetching(false);
      }
    };
    fetchBuilding();
  }, [id]);

  const handleWhichElevator = async () => {
    const { from, to } = form.getFieldsValue(true);
    console.log(form.getFieldsValue(true));
    try {
      const { elevator } = await whichElevator(id, from, to);
      message.success(`Elevator ${elevator.id} will pick up the passenger`, 2);
    } catch (error) {
      message.error(`Something went wrong. please try again later`, 1);
    }
  };

  const handleMovePassenger = async () => {
    const { from, to } = form.getFieldsValue(true);

    try {
      const response = await movePassenger(id, from, to);
      if (response.ok) message.success(`Your request under process`, 1);
      else message.info(response.message, 1);
    } catch (error) {
      message.error(`Something went wrong. please try again later`);
    }
  };

  const handleStartElevators = async () => {
    try {
      const response = await startElevators(id);
      if (response.ok) message.success(`Building Elevator is On`, 1);
    } catch (error) {
      message.error(`Something went wrong. please try again later`);
    }
  };

  const handleStopElevators = async () => {
    try {
      const response = await stopElevators(id);
      if (response.ok) message.success(`Building Elevator is Off`, 1);
    } catch (error) {
      message.error(`Something went wrong. please try again later`);
    }
  };

  const handleSimulation = async () => {
    try {
      const response = await startSimulation(id);
      if (response.ok) message.success(`Simulation started`, 1);
    } catch (error) {
      message.error(`Something went wrong. please try again later`);
    }
  };

  const { floors = 0 } = building;

  const floorsDropDownOptions = new Array(floors)
    .fill()
    .map((v, idx) => ({ title: `Floor ${idx + 1}`, value: idx + 1 }));
  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : (
        <div>
          <Title>Building Configurator</Title>
          <Descriptions title="Details">
            <Descriptions.Item labelStyle={{ fontWeight: 700 }} label="ID">
              {building.id}
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: 700 }}
              label="Number of Elevators"
            >
              {building.elevatorsCount}
            </Descriptions.Item>
            <Descriptions.Item
              labelStyle={{ fontWeight: 700 }}
              label="Number of Floors"
            >
              {floors}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Actions</Divider>
          <Form
            form={form}
            layout="inline"
            initialValues={{
              from: floorsDropDownOptions[0].value,
              to: floorsDropDownOptions[floorsDropDownOptions.length - 1].value,
            }}
          >
            <Form.Item
              name="from"
              label="From"
              rules={[
                {
                  required: true,
                  message: "Please from floor",
                },
              ]}
            >
              <Select
                style={{ width: 120 }}
                options={floorsDropDownOptions}
              ></Select>
            </Form.Item>

            <Form.Item
              name="to"
              label="To"
              rules={[
                {
                  required: true,
                  message: "Please To floor",
                },
              ]}
            >
              <Select
                style={{ width: 120 }}
                options={floorsDropDownOptions}
              ></Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleWhichElevator}
              >
                Which Elevator
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleMovePassenger}
              >
                move passenger
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleStartElevators}
              >
                Start Elevators
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleStopElevators}
              >
                Stop Elevators
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSimulation}
              >
                Start Simulation
              </Button>
            </Form.Item>
          </Form>

          <Divider orientation="left">Elevators Status</Divider>
          <List
            itemLayout="vertical"
            bordered
            dataSource={building.statuses || []}
            renderItem={(item, idx) => (
              <List.Item key={item.id}>
                <div>
                  <strong>Elevator ID: {idx + 1}</strong>
                </div>
                <div>
                  <strong>Current Floor: {item.floor}</strong>
                </div>
                <div>
                  <strong>Direction: {item.direction}</strong>
                </div>
                <div>
                  <strong>Status: {item.status}</strong>
                </div>
                <Divider orientation="left">Pending Requests</Divider>

                <div>
                  {Boolean(item.pendingRequests.length) && (
                    <Table
                      dataSource={item.pendingRequests}
                      columns={columns}
                    />
                  )}
                </div>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};
