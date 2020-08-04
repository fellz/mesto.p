import Vue from 'vue';

Vue.filter('formatDate', val => {
  if (!val) return ''
  const new_date = new Date(Date.parse(val))
  let dayOfMonth = new_date.getDate();
  let month = new_date.getMonth() + 1;
  let year = new_date.getFullYear();
  let hour = new_date.getHours();
  let minutes = new_date.getMinutes();
  let diffMs = new Date() - new_date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = Math.round(diffSec / 60);
  let diffHour = diffMin / 60;

  // formatting
  year = year.toString().slice(-2);
  month = month < 10 ? "0" + month : month;
  dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? "0" + hour : hour;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  if (diffSec < 1) {
    return "right now";
  } else if (diffMin < 1) {
    return `${diffSec} sec. ago`;
  } else if (diffHour < 1) {
    return `${diffMin} min. ago`;
  } else {
    return `${dayOfMonth}.${month}.${year}`;
  }
})
