import { 
  Client,
  Create,
  Collection
} from "faunadb"


export function UserRegistration(username, email, password) {
  console.log('UserRegistration', process.env.NEXT_PUBLIC_FAUNA_SECRET_KEY)
  const client = new Client({ 
    secret: process.env.NEXT_PUBLIC_FAUNA_SECRET_KEY,
    domain: 'db.us.fauna.com'
  })
  client.query(
    Create(
      Collection("User"),
      {
        credentials: { password: password },
        data: {
          username: username,
          email: email,
        },
      }
    )
  ).then(response => {
    console.log("success", response)
  }).catch(error => {
    console.log("error", error)
  })
}