import React from 'react';
import ReactDOM from 'react-dom';

import Day from './components/Day';

function layOutDay(events) {
  ReactDOM.render(<Day events={events} />, document.getElementById('day-calendar'));
}

window.layOutDay = layOutDay;

function getRandomEvents() {
  let events = [];
  for (let i = 0; i < 20; i += 1) {
    let start = Math.floor(Math.random() * 700);
    let duration = Math.ceil(Math.random() * 4) * 20;
    events.push({start: start, end: start + duration});
  }
  events.sort((a, b) => a.start - b.start);
  return events;
}

//layOutDay(getRandomEvents());

layOutDay(
  [
    {start: 30, end: 150},
    {start: 540, end: 600},
    {start: 560, end: 620},
    {start: 610, end: 670}
  ]
);
