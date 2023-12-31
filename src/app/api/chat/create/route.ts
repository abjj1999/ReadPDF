import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
    const {userId} = await auth()
if(!userId){
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
}
    try {
        const body = await req.json();
        const {file_key, file_name} = body;
        // console.log(file_key, file_name);
        if(!file_key || !file_name){
            return NextResponse.json({error: "Invalid Request"}, {status: 400})
        }
         await loadS3IntoPinecone(file_key);
        // return NextResponse.json({message: "File Uploaded Successfully loading pages", pages }, {status: 200})
       const chat_id =  await db.insert(chats).values({
            fillKey: file_key,
            pdfName: file_name,
            pdfUrl: getS3Url(file_key),
            userId,
        }).returning({
            insertedId: chats.id,
        })

        return NextResponse.json({
            chat_id: chat_id[0].insertedId,
        }, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}