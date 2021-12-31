import { 
  Client,
  Create,
  Collection,
  Login,
  Match,
  Index,
  Let,
  Select,
  Paginate,
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
        Ref(Collection('spells'), '181388642581742080'),
        {
          data: {
            name: 'Mountain\'s Thunder',
            cost: null,
          },
        },
      )
    )
  }
}
