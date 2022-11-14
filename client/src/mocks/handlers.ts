import { rest } from "msw";
import { mockActorList } from "./actor.mocks";

const baseAPIUrl = "http://localhost:3001";

export const handlers  = [
  rest.get(`${baseAPIUrl}/actors`, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: mockActorList,
      }),
      ctx.delay(150)
    );
  }),
];
