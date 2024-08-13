import clientPromise from "@/lib/mongodb"


export async function GET(request, {params}) {
    const client = await clientPromise;
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('title');
    const coll = client.db('BlogDatabase').collection('sample');
    const pipeline = [
        {
          '$search': {
            'index': 'searchBlogs', 
            'text': {
              'query': `{title: {$eq: \'${query}\'}}`, 
              'path': {
                'wildcard': '*'
              }
            }
          }
        }, {
          '$limit': 4
        }, {
          '$project': {
            'title': 1, 
            'slug': 1
          }
        }
      ];
      let result = await coll.aggregate(pipeline);
      let data = await result.toArray();

    return Response.json(data, {status: 200})
}