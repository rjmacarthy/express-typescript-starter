import React, { useState, useEffect } from "react";
import { getBuildings } from "../api";
import { Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { sliceIntoChunks } from "../utils";
import { ROUTES } from "../constant";
import { Loader } from "../component/Loader";
const { Title } = Typography;

export const BuildingList = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [buildingList, setBuildingList] = useState([]);
  const history = useHistory();

  const fetchBuildings = async () => {
    setIsFetching(true);
    try {
      const { data } = await getBuildings();
      setBuildingList(data);
    } catch (error) {
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const buildingChunks = sliceIntoChunks(buildingList, 3);

  const handleClick = (buildingId) =>
    history.push(`${ROUTES.BULGING.list}/${buildingId}`);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : buildingChunks.length ? (
        <>
          {buildingChunks.map((group, idx) => (
            <div className="site-card-wrapper">
              <Row key={idx} gutter={16}>
                {group.map((building, index) => (
                  <Col key={index} span={8}>
                    <Card
                      title={`Building ${building.id}`}
                      bordered={false}
                      onClick={() => handleClick(building.id)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
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
      ) : (
        <>
          <Title>No Buildings available </Title>
          <Link to={ROUTES.BULGING.create}>Add new building configuration</Link>
        </>
      )}
    </>
  );
};
