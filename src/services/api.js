const BASE_URL = "http://localhost:8080/api";

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

export const getUser = async (id) => {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  return res.json();
};

export const addUser = async (data) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateUser = async (id, data) => {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteUser = async (id) => {
  await fetch(`${BASE_URL}/delete/${id}`, { method: "DELETE" });
};