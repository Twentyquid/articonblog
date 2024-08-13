import client from "@/lib/mongodb";
import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server";

export async function GET(_, {params}) {
    // console.log("request received")
    // console.log("slug inside api is: ", params.slug)
    try {
        const client = await clientPromise;
        const filter = {};
        const projection = {
          'slug': 1, 
          'description': 1, 
          'cover-url': 1, 
          'title': 1,
          'created-at': 1,
          'author': 1
        };
        const sort = {
          'created-at': -1
        };
        const postCollection = client.db('BlogDatabase').collection('sample')
        let post = await postCollection.find(filter, {projection, sort})
        let result = await post.toArray();
        console.log(result)
        if(result) {

            return NextResponse.json(result, {status: 200})
        }else {
            return NextResponse.json({"error": "not able to fetch"}, {status: 404})
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({"error": "not able to fetch"}, {status: 404})
    }
}