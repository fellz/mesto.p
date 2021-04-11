import Vue from 'vue';

Vue.filter('formatDate', (val) => {
  if (!val) return '';
  const newDate = new Date(Date.parse(val));
  let dayOfMonth = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hour = newDate.getHours();
  let minutes = newDate.getMinutes();
  const diffMs = new Date() - newDate;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = diffMin / 60;

  // formatting
  year = year.toString().slice(-2);
  month = month < 10 ? `0${month}` : month;
  dayOfMonth = dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth;
  // eslint-disable-next-line no-unused-vars
  hour = hour < 10 ? `0${hour}` : hour;
  // eslint-disable-next-line no-unused-vars
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  if (diffSec < 1) {
    return 'right now';
  } if (diffMin < 1) {
    return `${diffSec} sec. ago`;
  } if (diffHour < 1) {
    return `${diffMin} min. ago`;
  }
  return `${dayOfMonth}.${month}.${year}`;
});
