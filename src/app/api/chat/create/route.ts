import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response){
    try {
        const body = await req.json();
        const {file_key, file_name} = body;
        if(!file_key || !file_name){
            return NextResponse.json({error: "Invalid Request"}, {status: 400})
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}