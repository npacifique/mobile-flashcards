import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = '3c5286fdc21';

export const getAll = () => {
  const data = async () => await AsyncStorage.getItem(STORAGE_KEY);
  return data().then((response) => {
    return response !== null ? JSON.parse(response) : [];
  });
};

export const create = async (data) => {
  let value = [];
  const currentValue = await AsyncStorage.getItem(STORAGE_KEY);

  if (currentValue === null) {
    value.push(data);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  }

  if (currentValue !== null) {
    value = [...JSON.parse(currentValue), data];
  }

  value.length >= 1 &&
    (await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value)));
};

export const updateQuestion = async (id, card) => {
  let value = [];
  const currentValue = await AsyncStorage.getItem(STORAGE_KEY);
  value = JSON.parse(currentValue);

  let updatedValue = value.map((d) => {
    return d.id === id
      ? {
          ...d,
          cards: !d.cards.includes(card)
            ? d.cards.concat(card)
            : d.cards,
        }
      : d;
  });

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedValue),
  );
};

export const updateCorrectAnswer = async (id, answer) => {
  let value = [];
  const currentValue = await AsyncStorage.getItem(STORAGE_KEY);
  value = JSON.parse(currentValue);

  let updatedValue = value.map((d) => {
    return d.id === id
      ? {
          ...d,
          correctAnswers: !d.correctAnswers.includes(answer)
            ? d.correctAnswers.concat(answer)
            : d.correctAnswers,
        }
      : d;
  });

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedValue),
  );
};

export const resetAnswer = async (id) => {
  let value = [];

  const currentValue = await AsyncStorage.getItem(STORAGE_KEY);
  value = JSON.parse(currentValue);

  let updatedValue = value.map((d) => {
    return d.id === id
      ? {
          ...d,
          correctAnswers: [],
        }
      : d;
  });

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedValue),
  );
};

export const removeDeck = async (id) => {
  let value = [];

  const currentValue = await AsyncStorage.getItem(STORAGE_KEY);
  value = JSON.parse(currentValue);

  let updatedValue = value.filter((d) => d.id !== id);

  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedValue),
  );
};
