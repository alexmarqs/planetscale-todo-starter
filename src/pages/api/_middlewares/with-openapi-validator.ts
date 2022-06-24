import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next/types';
import { AppError, HttpStatus } from '../../../utils/http-utils';
import { pathMatcher, schemaValidator } from '../../../utils/openapi-utils';

/**
 * OpenAPI validation middleware
 */
export function withOpenAPIValidation(handler: NextApiHandler) {
  return async function (request: NextApiRequest, response: NextApiResponse) {
    // get request parameters
    const { queryParams, pathParams } = _getNextReqParameters(request);
    // schema endpoint resolver
    const method = request.method.toLowerCase();
    const path =
      !queryParams || Object.keys(queryParams).length == 0
        ? request.url
        : request.url.split('?')[0];

    const routePath = pathMatcher(schemaValidator, path);

    const schemaRoute = schemaValidator[routePath];

    const schemaEndpoint = schemaRoute && schemaRoute[method];

    if (!schemaEndpoint) {
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        `Invalid validation schema for ${method} ${path}`
      );
    }

    //validate request's parameters
    if (schemaEndpoint.parameters) {
      const isParametersMatch = schemaEndpoint.parameters.validate({
        query: queryParams || {},
        headers: {},
        path: pathParams || {},
        files: undefined
      });

      if (!isParametersMatch) {
        throw new AppError(
          HttpStatus.BAD_REQUEST,
          `Invalid request parameters for ${method} ${path}: ${JSON.stringify(
            schemaEndpoint.parameters.errors
          )}`
        );
      }
    }

    // validate request's body
    if (schemaEndpoint.body) {
      const bodyValidator =
        schemaEndpoint.body[request.headers['content-type']] ||
        schemaEndpoint.body;
      const isBodyMatch = bodyValidator.validate({ ...request.body });

      if (!isBodyMatch) {
        throw new AppError(
          HttpStatus.BAD_REQUEST,
          `Invalid request body for ${method} ${path}: ${JSON.stringify(
            bodyValidator.errors
          )}`
        );
      }
    }

    // validate request
    return handler(request, response);
  };
}

/**
 * Next.js request parameters parser
 * @param request
 * @returns
 */
const _getNextReqParameters = (
  request: NextApiRequest
): {
  queryParams: {
    [key: string]: unknown;
  };
  pathParams: {
    [key: string]: unknown;
  };
} => {
  const requestQuery = { ...request.query };

  const NextRequestMetaSymbol = Reflect.ownKeys(request).find(
    (key) => key.toString() === 'Symbol(NextRequestMeta)'
  );

  const queryParams =
    (NextRequestMetaSymbol &&
      (request[NextRequestMetaSymbol].__NEXT_INIT_QUERY
        ? request[NextRequestMetaSymbol].__NEXT_INIT_QUERY
        : {})) ||
    {};

  if (requestQuery) {
    Object.keys(requestQuery).forEach((key) => {
      if (Object.keys(queryParams).includes(key)) {
        delete requestQuery[key];
      }
    });
  }

  return {
    queryParams: queryParams,
    pathParams: requestQuery
  };
};
