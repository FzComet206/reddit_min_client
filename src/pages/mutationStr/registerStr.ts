const REGISTER = `
mutation Register($username: String!, $password: String!) {
  register(options: { username: $username, password: $password }) {
    errors {
      field
      message
    }
    user {
    	id
      username
      createdAt
      updatedAt
    }
  }
}
`

export default REGISTER;