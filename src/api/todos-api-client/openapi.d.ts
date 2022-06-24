/* eslint-disable */
import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig
} from 'openapi-client-axios';

declare namespace Components {
  namespace Parameters {
    export type PageLimit = number;
    export type PageOffset = number;
  }
  export interface QueryParameters {
    PageLimit?: Parameters.PageLimit;
    PageOffset?: Parameters.PageOffset;
  }
  namespace Schemas {
    export interface Error {
      status?: number;
      message: string;
    }
    export interface Todo {
      id?: number;
      description: string;
      isCompleted?: boolean;
    }
    export interface TodoUpdateInput {
      id: number;
      description?: string;
      isCompleted?: boolean;
    }
  }
}
declare namespace Paths {
  namespace CreateTodo {
    export type RequestBody = Components.Schemas.Todo;
    namespace Responses {
      export interface $201 {}
      export type $400 = Components.Schemas.Error;
    }
  }
  namespace DeleteTodoById {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export interface $204 {}
      export type $400 = Components.Schemas.Error;
    }
  }
  namespace GetTodoById {
    namespace Parameters {
      export type Id = number;
    }
    export interface PathParameters {
      id: Parameters.Id;
    }
    namespace Responses {
      export type $200 = Components.Schemas.Todo;
      export type $400 = Components.Schemas.Error;
      export type $404 = Components.Schemas.Error;
    }
  }
  namespace GetTodos {
    namespace Parameters {
      export type $0 = Components.Parameters.PageLimit;
      export type $1 = Components.Parameters.PageOffset;
    }
    namespace Responses {
      export type $200 = Components.Schemas.Todo[];
      export type $400 = Components.Schemas.Error;
    }
  }
  namespace UpdateTodo {
    export type RequestBody = Components.Schemas.TodoUpdateInput;
    namespace Responses {
      export interface $200 {}
      export type $400 = Components.Schemas.Error;
    }
  }
}

export interface OperationMethods {
  /**
   * getTodos - Returns a list of todos
   */
  'getTodos'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetTodos.Responses.$200>;
  /**
   * updateTodo - Update a todo
   */
  'updateTodo'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateTodo.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.UpdateTodo.Responses.$200>;
  /**
   * createTodo - Create a new todo
   */
  'createTodo'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateTodo.RequestBody,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.CreateTodo.Responses.$201>;
  /**
   * getTodoById - Obtain information about a todo by id
   */
  'getTodoById'(
    parameters?: Parameters<Paths.GetTodoById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.GetTodoById.Responses.$200>;
  /**
   * deleteTodoById - Delete a todo by id
   */
  'deleteTodoById'(
    parameters?: Parameters<Paths.DeleteTodoById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig
  ): OperationResponse<Paths.DeleteTodoById.Responses.$204>;
}

export interface PathsDictionary {
  ['/todos']: {
    /**
     * getTodos - Returns a list of todos
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetTodos.Responses.$200>;
    /**
     * createTodo - Create a new todo
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateTodo.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.CreateTodo.Responses.$201>;
    /**
     * updateTodo - Update a todo
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateTodo.RequestBody,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.UpdateTodo.Responses.$200>;
  };
  ['/todos/{id}']: {
    /**
     * getTodoById - Obtain information about a todo by id
     */
    'get'(
      parameters?: Parameters<Paths.GetTodoById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.GetTodoById.Responses.$200>;
    /**
     * deleteTodoById - Delete a todo by id
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteTodoById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig
    ): OperationResponse<Paths.DeleteTodoById.Responses.$204>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;
