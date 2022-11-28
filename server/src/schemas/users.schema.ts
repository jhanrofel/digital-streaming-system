import {SchemaObject} from '@loopback/rest';

export const UsersChangePasswordSchema: SchemaObject = {
  type: 'object',
  title: 'Change Password',
  required: ['email', 'oldPassword', 'newPassword', 'confirmPassword'],
  properties: {
    email: {type: 'string', format: 'email'},
    oldPassword: {type: 'string'},
    newPassword: {type: 'string'},
    confirmPassword: {type: 'string'},
  },
};

export const UsersLoginSchema: SchemaObject = {
  type: 'object',
  title: 'Login',
  required: ['email', 'password'],
  properties: {
    email: {type: 'string', format: 'email'},
    password: {type: 'string'},
  },
};

export const UsersPatchSchema: SchemaObject = {
  type: 'object',
  title: 'Update users',
  properties: {
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    email: {type: 'string', format: 'email'},
    role: {type: 'string', enum: ['USER', 'ADMIN']},
    approval: {type: 'string', enum: ['approved', 'disapproved']},
    status: {type: 'string', enum: ['active', 'inactive']},
  },
};

export const UsersRegisterSchema: SchemaObject = {
  type: 'object',
  title: 'Registration',
  required: ['firstName', 'lastName', 'email', 'password'],
  properties: {
    firstName: {type: 'string'},
    lastName: {type: 'string'},
    email: {type: 'string', format: 'email'},
    password: {type: 'string'},
  },
};

export const UsersRegisterApprovalSchema: SchemaObject = {
  type: 'object',
  title: 'Registration Approval',
  required: ['id', 'approval', 'role'],
  properties: {
    id: {type: 'string'},
    approval: {type: 'string', enum: ['approved', 'disapproved']},
    role: {type: 'string', enum: ['USER', 'ADMIN']},
  },
};

export const UsersConditionSchema: SchemaObject = {
  type: 'object',
  title: 'Users condition',
  properties: {
    where: {type: 'object', default: {}},
  },
};

export const RefreshGrantSchema: SchemaObject = {
  type: 'object',
  required: ['refreshToken'],
  properties: {
    refreshToken: {
      type: 'string',
    },
  },
};
