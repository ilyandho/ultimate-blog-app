const store = async (key: string, value: any): Promise<void> => {
  await localStorage.setItem(key, JSON.stringify(value));
};

const retrieve = (key: string, returnType: string = "[]"): any => {
  return JSON.parse(localStorage.getItem(key) || returnType);
};

export { store, retrieve };
