import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getBuilding } from "../api";
import { Divider, List, Typography, Descriptions } from "antd";

import { Loader } from "../component/Loader";

const { Title } = Typography;

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export const BuildingView = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [building, setBuilding] = useState({});
  let { id } = useParams();

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

  useEffect(() => {
    fetchBuilding();
  }, []);

  return (
    <div>
      {isFetching ? (
        <Loader />
      ) : (
        <div>
          <Title>Building Configurator</Title>
          <Descriptions title="Building Info">
            <Descriptions.Item label="ID">{building.id}</Descriptions.Item>
            <Descriptions.Item label="# Elevators">
              {building.elevatorsCount}
            </Descriptions.Item>
          </Descriptions>

          <Divider orientation="left">Elevators Status</Divider>
          <List
            itemLayout="vertical"
            bordered
            dataSource={building.statuses || []}
            renderItem={(item, idx) => (
              <List.Item key={item.id}>
                <div>Elevator #: {idx + 1}</div>
                <div>Current Floor: {item.floor}</div>
                <div>Direction: {item.direction}</div>
                <div>Status: {item.status}</div>
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};
