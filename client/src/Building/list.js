import React, { useState, useEffect } from "react";
import { getBuildings } from "../api";
import { Card, Col, Row } from "antd";
import { sliceIntoChunks } from "../utils";

export const BuildingList = () => {
  const [buildingList, setBuildingList] = useState([]);

  const fetchBuildings = async () => {
    try {
      const { data } = await getBuildings();
      setBuildingList(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const buildingChunks = sliceIntoChunks(buildingList, 3);
  return (
    <>
      {buildingChunks.map((group, idx) => (
        <div className="site-card-wrapper">
          <Row key={idx} gutter={16}>
            {group.map((building, index) => (
              <Col key={index} span={8}>
                <Card title={`Building ${building.id}`} bordered={false}>
                  Number of Floors: {building.floors}
                  <br />
                  Number of Elevators: {building.elevatorsCount}
                  <br />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </>
  );
};
