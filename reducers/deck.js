import {
  GET_DECKS,
  ADD_DECK,
  DELETE_DECK,
  ADD_QUESTION,
  ADD_CORRECT_ANSWER,
  RESET_CORRECT_ANSWER,
} from '../actions/index';

export default decks = (state = [], action) => {
  switch (action.type) {
    case GET_DECKS:
      return (state = action.decks);

    case ADD_DECK:
      return (state = [...state, action.deck]);

    case DELETE_DECK:
      return (state = state.filter((d) => d.id !== action.id));
    case ADD_QUESTION:
      return (state = state.map((d) => {
        return d.id === action.id
          ? {
              ...d,
              cards: !d.cards.includes(action.card)
                ? d.cards.concat(action.card)
                : d.cards,
            }
          : d;
      }));
    case ADD_CORRECT_ANSWER:
      return (state = state.map((d) => {
        return d.id === action.id
          ? {
              ...d,
              correctAnswers: !d.correctAnswers.includes(
                action.answer,
              )
                ? d.correctAnswers.concat(action.answer)
                : d.correctAnswers,
            }
          : d;
      }));

    case RESET_CORRECT_ANSWER:
      return (state = state.map((d) => {
        return d.id === action.id
          ? {
              ...d,
              correctAnswers: [],
            }
          : d;
      }));
    default:
      return state;
  }
};
