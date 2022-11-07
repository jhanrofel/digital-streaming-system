import { cookiesToken } from "./cookies";

interface UserLoggedIn {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const loggedInCreate = (user: UserLoggedIn): void => {
  localStorage.setItem(
    "loggedIn",
    JSON.stringify({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    })
  );
};

export const isLogged = (): number => {
  const token = cookiesToken();
  return localStorage.getItem("loggedIn") && token ? 1 : 0;
};

export const loggedInData = (): UserLoggedIn => {
  const loggedIn: string = localStorage.getItem("loggedIn") || "";
  return JSON.parse(loggedIn);
};

export const loggedInRemove = (): void => {
  localStorage.removeItem("loggedIn");
};
