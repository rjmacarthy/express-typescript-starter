const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export const getBuildings = async () => {
  const response = await fetch(`${BASE_URL}/building`);
  const buildings = await response.json();
  console.log(buildings);
  return buildings;
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
