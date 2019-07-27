const formatTime = time => {
  let minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  let hours = 0;
  if (minutes >= 60) {
    hours = Math.floor(minutes / 60);
    minutes = Math.floor(minutes % 60);
  }
  return (
    (hours ? hours + ":" : "") +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds
  );
};

const formatMove = move => {
  return (move < 10 ? "0" : "") + move;
};

export { formatTime, formatMove };
