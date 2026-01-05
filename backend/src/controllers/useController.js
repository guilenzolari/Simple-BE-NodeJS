import User from '../models/User.js';
import { userValidationSchema } from '../models/UserValidation.js';
import { AppError } from '../erros/AppErrors.js';
import mongoose from 'mongoose';

// Criar um novo usuário
export const createUser = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details.map((detail) => detail.message).join(', '), 422);
  }

  const user = await User.create(req.body);
  res.status(201).json(user);
};

// Listar todos usuários
export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

//Listar um usuário por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid ID format', 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json(user);
};

//Listar usuários por ID
export const getUsersByIDs = async (req, res) => {
  const users = await User.find({ _id: { $in: req.body.ids } });

  if (!Array.isArray(req.body.ids) || req.body.ids.length === 0) {
    throw new AppError('IDs array is required', 400);
  }

  if (users.length === 0) {
    throw new AppError('No users found', 404);
  }
  res.json(users);
};

//Listar usuário por username
export const getUserByUsername = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.json(user);
};

//PUT -> atualizar usuário já existente
export const updateUserByID = async (req, res) => {
  const { error } = userValidationSchema.validate(req.body, { presence: 'optional' });
  if (error) {
    throw new AppError(error.details.map((detail) => detail.message).join(', '), 422);
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json(user);
};

// Adicionar ID de amigo ao usuário
export const addFriend = async (req, res) => {
  const { id } = req.params;
  const { friendId } = req.body;

  if (id === friendId) {
    throw new AppError('Cannot add yourself as a friend', 400);
  }

  const [user, friend] = await Promise.all([User.findById(id), User.findById(friendId)]);

  if (!user || !friend) throw new AppError('User or Friend not found', 404);

  if (user.friends.includes(friendId)) {
    throw new AppError('Friend already added', 409);
  }

  user.friends.push(friendId);
  friend.friends.push(id);

  await Promise.all([user.save(), friend.save()]);

  res.json({ message: 'Friend added successfully', user });
};

//DELETE usuário por ID
export const deleteUserByID = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  res.json(user);
};

//Listar amigos de um usuário
export const getFriends = async (req, res) => {
  const user = await User.findById(req.params.id).populate('friends');
  if (!user) throw new AppError('User not found', 404);

  res.json(user.friends);
};
