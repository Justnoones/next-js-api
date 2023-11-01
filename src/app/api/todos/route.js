import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY = process.env.DATA_API_KEY

export const GET = async (request) => {
    const res = await fetch(DATA_SOURCE_URL);
    const todos = await res.json();

    return NextResponse.json(todos);
}

export const POST = async (request) => {
    const { userId, title } = await request.json();

    if (!userId) return NextResponse.json({ "message": "Missing required data!" });

    const res = await fetch(DATA_SOURCE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': API_KEY
        },
        body: JSON.stringify({
            userId,
            title,
            completed: false
        })
    });

    const newTodo = await res.json();

    return NextResponse.json(newTodo);
}

export const PUT = async (request) => {
    const { userId, id, title, completed } = await request.json();

    if (!userId || !id || !title || typeof(completed) !== 'boolean') return NextResponse.json({ "message": "Missing required data!" });

    const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': API_KEY
        },
        body: JSON.stringify({
            userId,
            id,
            title,
            completed
        })
    });

    const updatedTodo = await res.json();

    return NextResponse.json(updatedTodo);
}

export const DELETE = async (request) => {
    const { id } = await request.json();

    if (!id) return NextResponse.json({ "message": "Todo id required!" });

    await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'API_KEY': API_KEY
        },
    });

    return NextResponse.json({ "message": `Todo ${id} is deleted.` });
}