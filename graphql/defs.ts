import { gql } from "apollo-server-micro";

export default gql`
  type Hello {
    txt: String
    status: Int
  }

  type Query {
    hello: Hello
    poke: String
  }
`;
