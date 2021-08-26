import { gql } from "@apollo/client";

export default gql`
mutation UpdateName($didToken: String!, $name:String!) {
  updateName(didToken: $didToken, name:$name) {
    name
  }
}
`;
