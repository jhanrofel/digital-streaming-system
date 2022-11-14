import reducer, {
  usersRegister,
  usersLogin,
  usersApproval,
  usersApprove,
  usersApproved,
  usersDelete,
  usersOne,
  usersUpdate,
  clearUser,
  selectUsers,
} from "../../utilities/slice/userSlice";
import {
  mockUsersList,
  mockNewUserRegister,
  mockUsersListAfterRegister,
  mockUsersPendingForApproval,
  mockUsersApprovedId,
  mockUsersPendingAfterApproved,
  mockUsersDeleteId,
  mockUsersListAfterDelete,
  mockUsersOne,
  mockUsersListAfterEdit,
  mockUsersOneEdited,
} from "../../mocks/users.mocks";
import { mockEditedActor } from "../../mocks/actors.mocks";

interface UsersDataOne {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}
interface UsersData {
  logged: boolean;
  data: UsersDataOne[] | [];
  dataOne: UsersDataOne;
}

const dataOneEmpty: UsersDataOne = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  status: "",
};

describe("Users Slice ExtraReducers", () => {
  const initialState: UsersData = {
    logged: false,
    data: [],
    dataOne: dataOneEmpty,
  };

  describe("register a users", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, data: mockUsersList },
          {
            type: usersRegister.fulfilled.type,
            payload: mockNewUserRegister,
          }
        )
      ).toEqual({
        logged: false,
        data: mockUsersListAfterRegister,
        dataOne: dataOneEmpty,
      });
    });
  });

  describe("users login", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: usersLogin.fulfilled.type,
        })
      ).toEqual({
        logged: true,
        data: [],
        dataOne: dataOneEmpty,
      });
    });
  });

  describe("users pending for approval", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: usersApproval.fulfilled.type,
          payload: [mockNewUserRegister],
        })
      ).toEqual({
        logged: false,
        data: [mockNewUserRegister],
        dataOne: dataOneEmpty,
      });
    });
  });

  describe("approved users", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, data: mockUsersPendingForApproval },
          {
            type: usersApprove.fulfilled.type,
            payload: mockUsersApprovedId,
          }
        )
      ).toEqual({
        logged: false,
        data: mockUsersPendingAfterApproved,
        dataOne: dataOneEmpty,
      });
    });
  });

  describe("list of approved users", () => {
    it("fulfilled", () => {
      expect(
        reducer(
            initialState,
          {
            type: usersApproved.fulfilled.type,
            payload: mockUsersList,
          }
        )
      ).toEqual({
        logged: false,
        data: mockUsersList,
        dataOne: dataOneEmpty,
      });
    });
  });

  describe("delete users", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, data: mockUsersList },
          {
            type: usersDelete.fulfilled.type,
            payload: mockUsersDeleteId,
          }
        )
      ).toEqual({
        logged: false,
        data: mockUsersListAfterDelete,
        dataOne: dataOneEmpty,
      });
    });
  });

  describe("users get by id", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: usersOne.fulfilled.type,
          payload: mockUsersOne,
        })
      ).toEqual({
        logged: false,
        data: [],
        dataOne: mockUsersOne,
      });
    });
  });

  describe("update users", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, data: mockUsersList },
          {
            type: usersUpdate.fulfilled.type,
            payload: mockUsersOneEdited,
          }
        )
      ).toEqual({
        logged: false,
        data: mockUsersListAfterEdit,
        dataOne: dataOneEmpty,
      });
    });
  });

  describe("clear users state", () => {
    it("fulfilled", () => {
      expect(
        reducer(
          { ...initialState, data: mockUsersList },
          {
            type: clearUser,
          }
        )
      ).toEqual({
        logged: false,
        data: [],
        dataOne: dataOneEmpty,
      });
    });
  });

  describe("select users", () => {
    it("fulfilled", () => {
      expect(
        reducer(initialState, {
          type: selectUsers,
          payload: mockUsersOne,
        })
      ).toEqual({
        logged: false,
        data: [],
        dataOne: mockUsersOne,
      });
    });
  });
});
