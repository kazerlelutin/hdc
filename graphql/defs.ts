import { gql } from "apollo-server-micro";

export default gql`
  scalar Date

  enum SourceFood {
    ciqual
    hdc
    user
  }

  type DietRelation {
    ciqualId: Int
    dietId: Int
    assignedAt: Date
    diet: Diet
  }

  type Diet {
    id: Int
    name: String
    description: String
    updatedAt: Date
    createdAt: Date
  }

  type Hello {
    txt: String
    status: Int
  }

  type User {
    email: String
    id: Int
    avatar: String
    name: String
    issuer: String
  }

  type food {
    id: Int
    name: String
    source: SourceFood
    kcal: String
    image: String
    alim_grp_nom_fr: String
    updatedAt: Date
    createdAt: Date
    diets: [DietRelation]
    season_month: [Int]
  }

  type Query {
    foods(search: String!): [food]
    food(id: Int!): food
    all_foods: [food]
  }

  type Mutation {
    login(didToken:String!): User
    loginByToken(token:String!):User
    updateAvatar(didToken:String!,thumb: String!,original:String!): User
  }
`;
