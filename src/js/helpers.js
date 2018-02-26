import moment from 'moment';

export function setHours() {
  const now = moment();
  const hours = document.getElementById("hours--" + now.format("dddd"));
  hours.classList.add("today");

  const upper = document.getElementsByClassName("section-heading-upper")[0],
    lower = document.getElementsByClassName("section-heading-lower")[0];
  let open, close, next;
  switch (now.day()) {
    case 0:
    case 1:
      console.log("closed");
      break;
    case 6:
      open = moment().set({ 'hour': 10, 'minute': 0, 'second': 0 });
      close = moment().set({ 'hour': 18, 'minute': 0, 'second': 0 });
      next = "Tuesday";

      if (!now.isBetween(open, close)) {
        setHeadings();
        // (now.isBefore(open)) ? upper.innerHTML = "Come back at " + open.format("ha") : upper.innerHTML = "Come back Tuesday";
      }
      break;
    default:
      open = moment().set({ 'hour': 12, 'minute': 0, 'second': 0 });
      close = moment().set({ 'hour': 18, 'minute': 0, 'second': 0 });
      next = "tomorrow";

      if (!now.isBetween(open, close)) {
        setHeadings();
      }
  }

  function setHeadings() {
    (now.isBefore(open)) ? upper.innerHTML = "Come back at " + open.format("ha") : upper.innerHTML = "Come back " + next;
    lower.innerHTML = "We're Closed";
  }
}
