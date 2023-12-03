const getDisplayedDigit = (number: number) => (number < 10 ? `0${number}` : String(number));

const getDisplayedTime = (secondsWithMs: number) => {
  if (secondsWithMs <= 0) return "00:00";

  const seconds = Math.trunc(secondsWithMs);
  const minutes = Math.trunc(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${getDisplayedDigit(minutes)}:${getDisplayedDigit(remainingSeconds)}`;
};

export { getDisplayedTime };
