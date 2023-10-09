import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
    try {
        const body = await req.json();
        const {file_key, file_name} = body;
        console.log(file_key, file_name);
        if(!file_key || !file_name){
            return NextResponse.json({error: "Invalid Request"}, {status: 400})
        }
        await loadS3IntoPinecone(file_key);
        return NextResponse.json({message: "File Uploaded Successfully"}, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}