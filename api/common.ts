export function guessType(value) {
  const number = /^-?\d*\.?\d*$/;
  const boolean = /(true|false)/;

  if (number.test(value)) {
      return Number;
  }

  if (boolean.test(value)) {
      return JSON.parse;
  }

  return ((v) => v);
}

export function convert(value, type) {
  const typemap = {
      'number': Number,
      'boolean': Boolean,
      'string': String,
  };
  const converter = typemap[type] || guessType(value);
  return converter(value);
}

export function splitPath(path) {
  const parts = path.split('/');
  return {
    id: path[0],
    path: path.slice(1)
  };
}
