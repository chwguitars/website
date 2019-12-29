import moment from 'moment';

class Hours {
  constructor(openNow, days) {
    this.openNow = openNow;
    this.days = days;
  }
}

class Day {
  constructor(id, name, open, close) {
    this.id = id;
    this.name = name;
    this.open = open;
    this.close = close;
  }
}

export function setHours() {
  const now = moment(),
        upper = document.getElementsByClassName("section-heading-upper").item(0),
        lower = document.getElementsByClassName("section-heading-lower").item(0),
        hoursMap = new Map([[0, 'Sunday'], [1, 'Monday'], [2, 'Tuesday'], [3, 'Wednesday'], [4, 'Thursday'], [5, 'Friday'], [6, 'Saturday']]),
        api = 'https://api.purdy.dev/v1/hours/chwguitars';

  let hours = new Hours(false, [])
  let xhr = createCORSRequest('GET', api);
  if (!xhr) {
    throw new Error('CORS not supported');
  }
  
  xhr.onload = function () {
    // Begin accessing JSON data here
    let data = JSON.parse(this.response)
    hours.openNow = data.result.opening_hours.open_now

    data.result.opening_hours.periods.forEach(period => { 
      let day = new Day(period.open.day, hoursMap.get(period.open.day), moment(period.open.time, 'HH:mm').format('h:mm A'), moment(period.close.time, 'HH:mm').format('h:mm A'))
      const dayBlock = document.getElementById("hours--" + day.name)
      const openTime = dayBlock.getElementsByTagName('span').item(0)
      openTime.innerHTML = day.open + ' to ' + day.close
      hours.days.push(day)
    })

    // Vanity work
    // set open/close msg
    if (hours.openNow) {
    setOpen();
    } else {
    setClosed();
    }

    // set current day
    const today = document.getElementById("hours--" + now.format('dddd'))
    today.classList.add("today")
  }
  xhr.send();

  function setOpen() {
    upper.innerHTML = "Come On In"
    lower.innerHTML = "We're Open"
  }

  function setClosed() {
    // let next = now.add(1, 'd')
    // upper.innerHTML = "Come back " + next.format('dddd');
    upper.innerHTML = "Come back Later"
    lower.innerHTML = "We're Closed"
  }

  function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    return xhr;
  }
}
