import { Todo } from '.prisma/client';
import { AppError, HttpStatus } from '../utils/http-utils';
import { prisma } from '../lib/prisma-client';

const DEFAULT_LIMIT = 15;
const DEFAULT_OFFSET = 0;

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type TodoUpdateInput = Optional<Todo, 'description' | 'isCompleted'>;
export type TodoCreateInput = Pick<Todo, 'description'>;
/**
 * Get all todos
 */
const getTodos = async (offset?: number, limit?: number) => {
  try {
    const paginationEnabled = offset || limit;

    const todos = await prisma.todo.findMany(
      paginationEnabled && {
        skip: offset || DEFAULT_OFFSET,
        take: limit || DEFAULT_LIMIT
      }
    );

    return todos;
  } catch (e) {
    throw new AppError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Error getting todo list'
    );
  }
};

/**
 * Create a new todo
 */
const createTodo = async ({ description }: TodoCreateInput) => {
  try {
    const todo = await prisma.todo.create({
      data: {
        description
      }
    });

    return todo;
  } catch (e) {
    throw new AppError(HttpStatus.INTERNAL_SERVER_ERROR, 'Error creating todo');
  }
};

/**
 * Delete a todo by id
 */
const deleteTodoById = async (id: number) => {
  try {
    await prisma.todo.delete({
      where: {
        id
      }
    });
  } catch (e) {
    throw new AppError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      `Error deleting todo with id: ${id}`
    );
  }
};

/**
 * Get user by id
 */
const getTodoById = async (id: number) => {
  let todo: Todo;

  try {
    todo = await prisma.todo.findFirst({
      where: {
        id
      }
    });
  } catch (e) {
    throw new AppError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      `Error getting todo with id: ${id}`
    );
  }

  if (!todo) {
    throw new AppError(HttpStatus.NOT_FOUND, `Todo with id: ${id} not found`);
  }

  return todo;
};

/**
 * Update a todo
 * @param todo
 */
const updateTodo = async (todo: TodoUpdateInput) => {
  try {
    await prisma.todo.update({
      where: {
        id: todo.id
      },
      data: {
        ...(todo.description && { description: todo.description }),
        ...(todo.isCompleted !== undefined && {
          isCompleted: todo.isCompleted
        })
      }
    });
  } catch (e) {
    throw new AppError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      `Error updating todo with id: ${todo.id}`
    );
  }
};

export { getTodos, createTodo, getTodoById, deleteTodoById, updateTodo };
