import { gql } from "@apollo/client";
import MENU from "./menu.queries";
import stickyPosts from "./stickyPosts.queries";

export default gql`

query Home{
    ${MENU}
    ${stickyPosts}
    posts(first: 10) {
        nodes {
            id
            title
            author {
            node {
                name
            }
            }
        }
    }
   
}
`;
