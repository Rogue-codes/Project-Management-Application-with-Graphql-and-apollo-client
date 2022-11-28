import { gql } from "@apollo/client";
const UPDATE_PROJECT = gql`
mutation UpdateProject(
  $id: ID!
  $name: String!
  $description: String!
  $status: projectStatusUpdate!
) {
  updateProject(
    id: $id
    name: $name
    description: $description
    status: $status
  ) {
    id
    name
    description
    status
    client {
      id
      name
      email
      phone
    }
  }
}
`
const DELETE_PROJECT = gql`
  mutation deleteProject($id :ID!){
    deleteProject(id:$id){
      id
      name
      description
      status
    }
  }
`
const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String!
    $description: String!
    $status: projectStatus!
    $clientId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      status: $status
      clientId: $clientId
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

export { DELETE_CLIENT, ADD_CLIENT, ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
