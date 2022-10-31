import { cookiesToken, cookiesRemove } from "./cookies";

export const authenticationToken = (): string => {
  const token = cookiesToken();
  return `Bearer ${token}`;
};

export const unauthorize = () => {
  cookiesRemove();
};
