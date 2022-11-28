import cookie from "react-cookies";

export const cookiesCreate = (name: string, token: string): void => {
  cookie.save(name, token, { path: "/" });
};

export const cookiesToken = (): string => {
  return cookie.load("dss-at");
};

export const cookiesRemove = (): void => {
  cookie.remove("dss-at", { path: "/" });
  cookie.remove("dss-rt", { path: "/" });
};
