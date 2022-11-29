const BASE_URL = process.env.REACT_APP_BASE_URL || "//localhost:3000";

export const getBuildings = async () => {
  const response = await fetch(`${BASE_URL}/building`);
  const buildings = await response.json();
  return buildings;
};

export const getBuilding = async (buildingId) => {
  const response = await fetch(`${BASE_URL}/building/${buildingId}`);
  const buildings = await response.json();
  return buildings;
};

export const whichElevator = async (buildingId, from, to) => {
  const response = await fetch(
    `${BASE_URL}/building/${buildingId}/which?from=${from}&to=${to}`
  );
  const elevator = await response.json();
  return elevator;
};

export const movePassenger = async (buildingId, from, to) => {
  const response = await fetch(
    `${BASE_URL}/building/${buildingId}/movePassenger?from=${from}&to=${to}`
  );
  const responseJSON = await response.json();
  return responseJSON;
};

export const startElevators = async (buildingId) => {
  const response = await fetch(`${BASE_URL}/building/${buildingId}/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJSON = await response.json();

  return responseJSON;
};

export const stopElevators = async (buildingId) => {
  const response = await fetch(`${BASE_URL}/building/${buildingId}/stop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJSON = await response.json();

  return responseJSON;
};

export const startSimulation = async (buildingId) => {
  const response = await fetch(
    `${BASE_URL}/building/${buildingId}/simulation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseJSON = await response.json();

  return responseJSON;
};

export const createBuilding = async (payload) => {
  const response = await fetch(`${BASE_URL}/building`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseJSON = await response.json();

  return responseJSON;
};
