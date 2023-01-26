import { useState, useCallback } from 'react';
import Head from 'next/head';
import axios from 'axios';
import Form from '../components/Form';
import Todo from '../components/Todo';
import Container from '../components/Container';
import { prisma } from '../db';

export async function getServerSideProps() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      created_at: 'desc',
    },
  });
  return {
    props: {
      intialTodos: JSON.parse(JSON.stringify(todos)),
    },
  };
}

const emptyTodo = {
  text: 'You have no todos, create one!',
  completed: false,
};

export default function Home({ intialTodos }) {
  const [todos, setTodos] = useState(intialTodos);
  const onCreate = useCallback(
    (text) => {
      // setTodos([{ text, id: todos.length, completed: false }, ...todos]);
      axios.post('/api/todos/create', { text }).then(({ data }) => {
        setTodos([data.newTodo, ...todos.splice(0)]);
      });
    },
    [todos]
  );

  const onDelete = useCallback(
    (todoId) => {
      axios.delete(`/api/todos/delete/${todoId}`).then(() => {
        const index = todos.findIndex((todo) => todo.id === todoId);
        setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
      });
    },
    [todos]
  );

  const onUpdate = useCallback(
    (todo) => {
      axios
        .put(`/api/todos/update/${todo.id}`, {
          completed: !todo.completed,
        })
        .then(() => {
          const index = todos.findIndex((i) => i.id === todo.id);
          setTodos([
            ...todos.slice(0, index),
            { ...todo, completed: !todo.completed },
            ...todos.slice(index + 1),
          ]);
        });
    },
    [todos]
  );

  return (
    <>
      <Head>
        <title>Todo App PREVIEW v78</title>
        <link rel='icon' href='https://neon.tech/favicon-32x32.png' />
      </Head>

      <div className='flex flex-col font-body min-h-screen'>
        <header className='sm:bg-desktop-light bg-mobile-light bg-cover bg-center min-h-[400px] sm:min-h-[500px]'>
          <Container>
            <div className='flex justify-between'>
              <h1 className='text-xl sm:text-3xl text-white font-bold tracking-[0.625rem]'>
                TODO
              </h1>
            </div>
            <Form onCreate={onCreate} />
          </Container>
        </header>
        <main className='flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'>
          <Container>
            {todos && todos.length ? (
              <ul className='-mt-16 sm:-mt-28 rounded-md overflow-hidden'>
                {todos.map((todo, index) => (
                  <li key={todo.id}>
                    <Todo todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                <Todo todo={emptyTodo} disabled={true} />
              </div>
            )}
          </Container>
        </main>
        <footer className='bg-gray-100 dark:bg-gray-900 text-gray-500 text-center'>
          <p className='mt-20 text-xs uppercase text-zinc-400 text-center font-bold tracking-[0.3em]'>
            Brought to you by
          </p>
          <div className='flex flex-col items-center my-12 space-y-4 sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-6 sm:grid-cols-5'>
            <div className='flex items-center justify-center'>
              <a href='https://vercel.com' aria-label='Vercel.com Link'>
                <img
                  src='/vercel.svg'
                  alt='Vercel.com Logo'
                  className='h-4 text-white'
                />
              </a>
            </div>
            <div className='flex items-center justify-center'>
              <a href='https://nextjs.org' aria-label='Next.js Link'>
                <img
                  src='/nextjs.png'
                  alt='Next.js Logo'
                  className='w-16 text-white'
                />
              </a>
            </div>
            <div className='flex items-center justify-center'>
              <a href='https://prisma.io' aria-label='prisma.io Link'>
                <img
                  src='/prisma.svg'
                  alt='prisma.io Logo'
                  className='h-6 text-white'
                />
              </a>
            </div>
            <div className='flex items-center justify-center'>
              <a
                href='https://tailwindcss.com'
                aria-label='tailwindcss.com Link'
              >
                <img
                  src='/tailwindcss.svg'
                  alt='tailwindcss.com Logo'
                  className='sm:h-12 h-4 text-white'
                />
              </a>
            </div>
            <div className='flex items-center justify-center'>
              <a href='https://neon.tech' aria-label='neon.tech Link'>
                <img
                  src='/neon.svg'
                  alt='neon.tech Logo'
                  className='h-6 text-white'
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
