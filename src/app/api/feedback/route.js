import { NextResponse } from "next/server";

export const POST = async ( request ) => {
    const data = await request.json();

    console.log(data);
    const { name, email, message } = data;
    
    return NextResponse.json({ name, email, message });
}