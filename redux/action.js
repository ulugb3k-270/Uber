export const fromLocationAction = (from) => {
  return {
    type: "FROM_ACTION",
    payload: from,
  };
};

export const toLocationAction = (to) => {
  return {
    type: "TO_ACTION",
    payload: to,
  };
};

