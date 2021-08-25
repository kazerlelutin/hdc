import { gql } from "@apollo/client";

export default gql`
mutation LoginByTokenMutation($token: String!) {
  user: loginByToken(token: $token) {
    email
    name
    avatar
    id
    issuer
  }
}
`;
