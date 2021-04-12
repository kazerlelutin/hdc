import { createMocks } from 'node-mocks-http';
import handler from "../functionsEnabled"

describe("/api/functionsEnabled handler", () => {

  it("responds 200 to authed GET",() => {
    const { req, res } = createMocks({
        method: 'GET',
        query: {},
      });
      
      handler(req, res);
      expect(res._getStatusCode()).toBe(200);

  })
});