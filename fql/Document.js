import { 
  Client,
  Create,
  Collection,
  Get,
  Ref,
  Update,
  Var
} from "faunadb"


const client = new Client({ 
  secret: process.env.NEXT_PUBLIC_FAUNA_SECRET_KEY,
  domain: 'db.us.fauna.com'
})

export async function UpsertDocument(id, value) {
  if(!id) {
    return await client.query(
      Create(
        Collection('Document'),
        {
          data: {
            value
          },
        },
      )
    )
  } else {
    return await client.query(
      Update(
        Ref(Collection('Document'), id),
        {
          data: {
            value
          },
        },
      )
    )
  }
}

export async function GetDocument(id) { 
  if(id) { 
    return await client.query(
      Get(Ref(Collection('Document'), id))
    )
  }
}