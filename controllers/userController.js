import User from "../models/userModel.js";

export const getUser = async (req, res) => {
  res.send("Get user");
};

export const createUser = async (req, res) => {
  res.send("Create user");
};

export const updateUser = async (req, res) => {
  res.send("Update user");
};

export const deleteUser = async (req, res) => {
  res.send("Delete user");
};
