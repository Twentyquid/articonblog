import client from "@/lib/mongodb";
import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server";

// export async function GET(_, {params}) {
//     console.log("request received")
//     console.log("slug inside api is: ", params.slug)
//     try {
//         const client = await clientPromise;
//         const postCollection = client.db('BlogDatabase').collection('sample')
//         let post = await postCollection.findOne({slug: params.slug})
//         console.log(post)
//         if(post) {

//             return NextResponse.json(post, {status: 200})
//         }else {
//             return NextResponse.json({"error": "not able to fetch"}, {status: 404})
//         }
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({"error": "not able to fetch"}, {status: 404})
//     } 
    
// }