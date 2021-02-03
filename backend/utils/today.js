const todayString = () => {
  const d = new Date();
  let date = d.getFullYear();
  date += "-";
  date += d.getMonth() < 10 ? `0${d.getMonth() + 1}` : d.getMonth();
  date += "-";
  date += d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  return date;
};

module.exports = todayString;
