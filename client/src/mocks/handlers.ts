import { rest } from "msw";
import { mockActorsList } from "./actors.mocks";
import { mockUsersList } from "./users.mocks";

const baseAPIUrl = "http://localhost:3001";

export const handlers  = [
  rest.get(`${baseAPIUrl}/actors`, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockActorsList,
      }),
      ctx.delay(150)
    );
  }),

  rest.get(`${baseAPIUrl}/users`, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockUsersList,
      }),
      ctx.delay(150)
    );
  }),
];


