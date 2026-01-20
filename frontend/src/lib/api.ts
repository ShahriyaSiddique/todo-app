export type TodoStatus = "PENDING" | "IN_PROGRESS" | "DONE";

export interface Todo {
    id: string;
    title: string;
    description?: string | null;
    status: TodoStatus;
    createdAt: string;
    updatedAt: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
const token = process.env.NEXT_PUBLIC_JWT_TOKEN!;

function authHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function fetchTodos(status?: TodoStatus): Promise<Todo[]> {
    const url = new URL(`${baseUrl}/todos`);
    if (status) url.searchParams.set("status", status);

    const res = await fetch(url.toString(), { headers: authHeaders() });
    if (!res.ok) throw new Error(`Failed to fetch todos: ${res.status}`);
    return res.json();
}

export async function createTodo(input: { title: string; description?: string; }) {
    const res = await fetch(`${baseUrl}/todos`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Failed to create todo: ${res.status}`);
    return res.json();
}

export async function markDone(id: string) {
    const res = await fetch(`${baseUrl}/todos/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ status: "DONE" }),
    });
    if (!res.ok) throw new Error(`Failed to update todo: ${res.status}`);
    return res.json();
}

export async function deleteTodo(id: string) {
    const res = await fetch(`${baseUrl}/todos/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
    });
    if (!res.ok) throw new Error(`Failed to delete todo: ${res.status}`);
}
