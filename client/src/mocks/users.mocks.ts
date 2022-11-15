import { IUserData } from "../utilities/types";

export const mockUsersList: IUserData[] = [
  {
    id: "636b1ec790fe4644667becae",
    role: "ADMIN",
    email: "admin@mail.com",
    firstName: "Admin",
    lastName: "Root",
    approval: "approved",
    status: "ACTIVATED",
  },
  {
    id: "636b1f0a90fe4644667becb1",
    role: "USER",
    email: "john.doe@mail.com",
    firstName: "John",
    lastName: "Doe",
    approval: "approved",
    status: "ACTIVATED",
  },
  {
    id: "636b1f0a90fe4644667becb0",
    role: "USER",
    email: "jane.doe@mail.com",
    firstName: "Jane",
    lastName: "Doe",
    approval: "pending",
    status: "ACTIVATED",
  },
];

export const mockNewUserRegister = {
  id: "636b337290fe4644667becbe",
  role: "USER",
  email: "new.anne@mail.com",
  firstName: "Anne",
  lastName: "New",
  approval: "pending",
  status: "ACTIVATED",
};

export const mockUsersListAfterRegister: IUserData[] = [
  {
    id: "636b1ec790fe4644667becae",
    role: "ADMIN",
    email: "admin@mail.com",
    firstName: "Admin",
    lastName: "Root",
    approval: "approved",
    status: "ACTIVATED",
  },
  {
    id: "636b1f0a90fe4644667becb1",
    role: "USER",
    email: "john.doe@mail.com",
    firstName: "John",
    lastName: "Doe",
    approval: "approved",
    status: "ACTIVATED",
  },
  {
    id: "636b1f0a90fe4644667becb0",
    role: "USER",
    email: "jane.doe@mail.com",
    firstName: "Jane",
    lastName: "Doe",
    approval: "pending",
    status: "ACTIVATED",
  },
  {
    id: "636b337290fe4644667becbe",
    role: "USER",
    email: "new.anne@mail.com",
    firstName: "Anne",
    lastName: "New",
    approval: "pending",
    status: "ACTIVATED",
  },
];
export const mockUsersPendingForApproval: IUserData[] = [
  {
    id: "636b337290fe4644667becbe",
    role: "USER",
    email: "new.anne@mail.com",
    firstName: "Anne",
    lastName: "New",
    approval: "pending",
    status: "ACTIVATED",  
  },
  {
    id: "636b337290fe4644667becbf",
    role: "USER",
    email: "hannah@mail.com",
    firstName: "Hannah",
    lastName: "Hannah",
    approval: "pending",
    status: "ACTIVATED",  
  },
  {
    id: "636b337290fe4644667becbg",
    role: "USER",
    email: "Mary@mail.com",
    firstName: "Mary",
    lastName: "Grace",
    approval: "pending",
    status: "ACTIVATED",  
  },
];

export const mockUsersApprovedId = {id:"636b337290fe4644667becbf"};

export const mockUsersPendingAfterApproved: IUserData[] = [
  {
    id: "636b337290fe4644667becbe",
    role: "USER",
    email: "new.anne@mail.com",
    firstName: "Anne",
    lastName: "New",
    approval: "pending",
    status: "ACTIVATED",  
  },
  {
    id: "636b337290fe4644667becbg",
    role: "USER",
    email: "Mary@mail.com",
    firstName: "Mary",
    lastName: "Grace",
    approval: "pending",
    status: "ACTIVATED",  
  },
];



export const mockUsersDeleteId = "636b1f0a90fe4644667becb0";

export const mockUsersListAfterDelete: IUserData[] = [
    {
        id: "636b1ec790fe4644667becae",
        role: "ADMIN",
        email: "admin@mail.com",
        firstName: "Admin",
        lastName: "Root",
        approval: "approved",
        status: "ACTIVATED",
      },
      {
        id: "636b1f0a90fe4644667becb1",
        role: "USER",
        email: "john.doe@mail.com",
        firstName: "John",
        lastName: "Doe",
        approval: "approved",
        status: "ACTIVATED",
      },
];

export const mockUsersOne: IUserData = {
    id: "636b1f0a90fe4644667becb1",
    role: "USER",
    email: "john.doe@mail.com",
    firstName: "John",
    lastName: "Doe",
    approval: "approved",
    status: "ACTIVATED",
  };

  export const mockUsersOneEdited = {
    id: "636b1f0a90fe4644667becb1",
    status: "DEACTIVATED",
  };

  export const mockUsersListAfterEdit: IUserData[] = [
    {
      id: "636b1ec790fe4644667becae",
      role: "ADMIN",
      email: "admin@mail.com",
      firstName: "Admin",
      lastName: "Root",
      approval: "approved",
      status: "ACTIVATED",
    },
    {
      id: "636b1f0a90fe4644667becb1",
      role: "USER",
      email: "john.doe@mail.com",
      firstName: "John",
      lastName: "Doe",
      approval: "approved",
      status: "DEACTIVATED",
    },
    {
      id: "636b1f0a90fe4644667becb0",
      role: "USER",
      email: "jane.doe@mail.com",
      firstName: "Jane",
      lastName: "Doe",
      approval: "pending",
      status: "ACTIVATED",
    },
  ];
