import Link from "next/link";
import prisma from "./db";
import { TodoItem } from "@/components/TodoItem";
// const create = await prisma.todo.create({ data: { title: "test", complete: false } });
// console.log(create);

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleToDo(id: string, complete: boolean) {
  "use server";
  console.log(id, complete);
  await prisma.todo.update({ where: { id: id }, data: { complete } });
  const todos = await getTodos();
  console.log(todos);
}
export default async function Home() {
  const todos = await getTodos();
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          href="/new"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          New
        </Link>
      </header>
      <ul className="pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleToDo={toggleToDo}></TodoItem>
        ))}
      </ul>
    </>
  );
}
