export default () =>
  Math.random(100 + 1 * 10)
    .toString(36)
    .replace('.', new Date().getTime().toString(36)) +
  new Date().getUTCDate().toString() +
  new Date().getFullYear().toString(36);
