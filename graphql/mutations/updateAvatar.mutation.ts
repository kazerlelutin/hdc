import { gql } from "@apollo/client";

export default gql`
mutation UpdateAvatar($didToken: String!, $thumb:String!,$original:String!) {
  updateAvatar(didToken: $didToken, thumb:$thumb,original:$original) {
    avatar
  }
}
`;
