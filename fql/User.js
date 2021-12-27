import { 
  Client,
  Create,
  Collection
} from "faunadb"


const client = new Client({ 
  secret: process.env.NEXT_PUBLIC_FAUNA_SECRET_KEY,
  domain: 'db.us.fauna.com'
})

export async function UserRegistration(username, email, password) {
  return await client.query(
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
  )
}