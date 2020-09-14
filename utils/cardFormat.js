import Id from './idGenerator';

export default (name) => ({
  name: name,
  id: Id(),
  cards: [],
  correctAnswers: [],
});
