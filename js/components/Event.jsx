import React, { PropTypes } from 'react';

import Time from './Time';

export default class Event extends React.Component {
  static propTypes = {
    start: PropTypes.number,
    end: PropTypes.number
  };

  render() {
    let style = {
      position: 'absolute',
      borderLeft: '5px solid #4c214c',
      padding: 10,
      backgroundColor: '#eee',
      ...this.props.layout
    };
    return (
      <div style={style}>
        <p style={{marginBottom: 0, color: '#4c214c', lineHeight: 1}}>{this.props.name}</p>
        <p style={{lineHeight: 1}}>
          <small>
          <Time minutes={this.props.start} />
          {' - '}
          <Time minutes={this.props.end} />
          </small>
        </p>
      </div>
    );
  }
}
