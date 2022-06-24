import * as schemaBuilder from 'api-schema-builder';

const schemaValidator = schemaBuilder.buildSchemaSync(
  './src/api/todos-api-client/openapi.yaml'
);

function _pathMatcherInternal(routes, path, exactMatch) {
  return Object.keys(routes).find((route) => {
    const routeArr = route.split('/');
    const pathArr = path.split('/');

    if (routeArr.length !== pathArr.length) return false;

    return routeArr.every((seg, idx) => {
      if (seg === pathArr[idx]) return true;

      if (!exactMatch) {
        // if current path segment is param
        if (seg.startsWith(':') && idx in pathArr) return true;
      }

      return false;
    });
  });
}

function pathMatcher(routes, path) {
  return (
    _pathMatcherInternal(routes, path, true) ||
    _pathMatcherInternal(routes, path, false)
  );
}

export { schemaValidator, pathMatcher };
