import React, { PropTypes } from 'react';

import { minutesToTime } from '../utils';

export default class HourLabel extends React.Component {
  static propTypes = {
    minutes: PropTypes.number
  };

  render() {
    let [hour, minute, period] = minutesToTime(this.props.minutes);
    // TODO no built in way to zero fill?
    if (minute < 10) {
      minute = `0${minute}`;
    }
    return (
      <span><strong>{hour}:{minute}</strong> <small>{period}</small></span>
    );
  }
}
