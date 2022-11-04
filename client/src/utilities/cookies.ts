import cookie from "react-cookies";

export const cookiesCreate = (token: string): void => {
  cookie.save("proj-dss", token, { path: "/" });
};

export const cookiesToken = (): string => {
  return cookie.load("proj-dss");
};

export const cookiesRemove = (): void => {
  cookie.remove("proj-dss", { path: "/" });
};
