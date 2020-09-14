import * as API from '../utils/DataApi';
export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_CORRECT_ANSWER = 'ADD_CORRECT_ANSWER';
export const RESET_CORRECT_ANSWER = 'RESET_CORRECT_ANSWER';

export function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function deleteDeck(id) {
  return {
    type: DELETE_DECK,
    id,
  };
}

export function addQuestion(id, card) {
  return {
    type: ADD_QUESTION,
    id,
    card,
  };
}

export function correctAnswer(id, answer) {
  return {
    type: ADD_CORRECT_ANSWER,
    id,
    answer,
  };
}

export function resetCorrectAnswer(id) {
  return {
    type: RESET_CORRECT_ANSWER,
    id,
  };
}

export function handleResetCorrectAnswer(id) {
  return (dispatch) => {
    dispatch(resetCorrectAnswer(id));
    API.resetAnswer(id);
  };
}

export function handleCorrectAnswer(id, answer) {
  return (dispatch) => {
    dispatch(correctAnswer(id, answer));
    return API.updateCorrectAnswer(id, answer);
  };
}

export function handleDeleteDeck(id) {
  return (dispatch) => {
    dispatch(deleteDeck(id));
    return API.removeDeck(id);
  };
}

export function handleAddQuestion(id, card) {
  return (dispatch) => {
    dispatch(addQuestion(id, card));
    return API.updateQuestion(id, card);
  };
}

export function handleAddDecks(deck) {
  return (dispatch) => {
    dispatch(addDeck(deck));
    return API.create(deck);
  };
}

export function handleGetDecks() {
  return (dispatch) => {
    API.getAll().then((data) => {
      dispatch(getDecks(data));
    });
  };
}
