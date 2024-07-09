import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req){
    const name = await req.nextUrl.searchParams.get("name");
    //console.log(name);

    const session = await getServerSession(authOptions);
    const result = await fetch(`${process.env.API_URL}/user?name=${name}`,{
        method:'GET',
        headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${session?.user.apiToken}`
        }
    }); 

    const data = await result.json();
    const list = data.data.map((u)=>{
        return {label:u.fullName, value:u.id, type:"U"}
    });
    return NextResponse.json(list);
}


export async function POST(req){
    const {username, password, email, fullName} = await req.json();

    const response = await fetch(`${process.env.API_URL}/auth/register`, {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({username,password,email,fullName}),
    });

    if (response.status !==200) throw new Error("Failed to register user");
    const responseData = await response.json();

    if(responseData.statusCode === 201) return NextResponse.json(responseData);
}