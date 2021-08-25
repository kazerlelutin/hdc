import { gql } from "@apollo/client";

export default gql`
mutation LoginMutation($didToken: String!) {
  login(didToken: $didToken) {
    email
    id
    issuer
    name
    avatar
  }
}
`;
