export const obj = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.iterator]() {
    const values = Object.values(this); // получаем массив значений [1, 2, 3]
    let index = 0;

    return {
      next() {
        if (index < values.length) {
          return { value: values[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};