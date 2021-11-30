export const timeLag = (timeoutMs: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeoutMs);
  });
};

export const typeDisplayValue = (
  str: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  prevStr: string | undefined = ''
) => {
  return new Promise((resolve) => {
    str = prevStr + str;
    const ln = str.length;
    let counter = prevStr.length - 1;

    const timer = setInterval(() => {
      const newString = str.slice(0, counter);
      if (counter >= ln) {
        resolve(newString);
        clearInterval(timer);
      }
      setValue(newString);
      counter++;
    }, 25);
  });
};
