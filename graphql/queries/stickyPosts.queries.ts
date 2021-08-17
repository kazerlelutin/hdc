const stickyPosts = `
stickyPosts: posts(where: {onlySticky: true}, first: 10) {
    edges {
        node {
          id
          categories {
            nodes {
              slug
              name
            }
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
          title(format: RENDERED)
          excerpt(format: RENDERED)
          dateGmt
        }
      }
    }
`;

export default stickyPosts;
