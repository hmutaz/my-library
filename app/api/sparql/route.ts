import { NextResponse } from 'next/server'
import ParsingClient from 'sparql-http-client/ParsingClient.js'

const endpointUrl = 'http://localhost:3030/lib/query'

async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('query');

    if (!q){
      const query = `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX lib: <http://www.semanticweb.org/m13/ontologies/2024/4/library/>
      SELECT ?book ?title ?author ?isbn ?year ?publisher ?subjects ?collection ?location ?reportdate ?count
      WHERE {
        ?book lib:title ?title .
        ?book lib:author ?author .
        ?book lib:isbn ?isbn .
        ?book lib:year ?year .
        ?book lib:publisher ?publisher .
        ?book lib:subjects ?subjects .
        ?book lib:collection ?collection .
        ?book lib:location ?location .
        ?book lib:reportdate ?reportdate .
        ?book lib:count ?count .
      }
      LIMIT 25
      `
      const client = new ParsingClient({ endpointUrl })
      const result = await client.query.select(query)
      return new NextResponse(JSON.stringify(result))
    } else {
      const query = `
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX lib: <http://www.semanticweb.org/m13/ontologies/2024/4/library/>
      SELECT ?book ?title ?author ?isbn ?year ?publisher ?subjects ?collection ?location ?reportdate ?count
      WHERE {
        ?book lib:title ?title .
        ?book lib:author ?author .
        ?book lib:isbn ?isbn .
        ?book lib:year ?year .
        ?book lib:publisher ?publisher .
        ?book lib:subjects ?subjects .
        ?book lib:collection ?collection .
        ?book lib:location ?location .
        ?book lib:reportdate ?reportdate .
        ?book lib:count ?count .
        FILTER (regex(?title, "`+  q + `", "i") || 
        regex(?author, "`+  q + `", "i") || 
        regex(?year, "`+  q + `", "i") ||
        regex(?publisher, "`+  q + `", "i") ||
        regex(?subjects, "`+  q + `", "i"))
      }
      LIMIT 25
      `
      const client = new ParsingClient({ endpointUrl })
      const result = await client.query.select(query)
      return new NextResponse(JSON.stringify(result))
    }
  } catch (error) {
    console.error('Error retrieving post:', error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  } 
}

export { GET }
