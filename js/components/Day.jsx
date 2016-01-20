import React, { PropTypes } from 'react';

import Event from './Event';
import HourLabel from './HourLabel';
import HalfHourLabel from './HalfHourLabel';

export default class Day extends React.Component {
  static propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape({
        start: PropTypes.number,
        end: PropTypes.number
      })
    ),
    labelWidth: PropTypes.number,
    labelHeight: PropTypes.number,
    gridWidth: PropTypes.number,
    gridPadding: PropTypes.number,
    pixelsPerMinute: PropTypes.number,
    startHour: PropTypes.number,
    endHour: PropTypes.number
  };

  static defaultProps = {
    labelWidth: 80,
    labelHeight: 20,
    gridWidth: 620,
    gridPadding: 10,
    pixelsPerMinute: 1,
    startHour: 9,
    endHour: 21
  };

  static gridBorderWidth = 1;
  static columnGapWidth = 10;

  render() {
    let style = {
      position: 'relative',
      width: this.props.gridWidth + this.props.labelWidth,
      height: (this.props.endHour - this.props.startHour) * 60 * this.props.pixelsPerMinute
    };
    let events = this.props.events.map(
      e => ({
        times: e,
        realTimes: {
          start: e.start + this.props.startHour * 60,
          end: e.end + this.props.startHour * 60
        }
      })
    );
    let eventsGroupedByOverlap = groupOverlappingEvents(events);
    eventsGroupedByOverlap.map(eventGroup => {
      this._layoutEventGroup(eventGroup);
    });
    return (
      <div style={style}>
        {this._renderGrid()}
        {this._renderLabels()}
        {events.map((e, i) => <Event name={`Event ${i + 1}`} {...e.realTimes} layout={e.layout} />)}
      </div>
    );
  }

  _layoutEventGroup(eventGroup) {
    let eventsInColumns = arrangeEventsInColumns(eventGroup);
    let noOfColumns = eventsInColumns.length;
    let noOfInterColumnGaps = noOfColumns - 1;
    let columnsWidth = this.props.gridWidth - 2 * this.props.gridPadding;
    let colWidth = columnsWidth / noOfColumns;
    let whiteSpaceWidth = Day.columnGapWidth * noOfInterColumnGaps;
    let eventWidth = (columnsWidth - whiteSpaceWidth) / noOfColumns;
    eventsInColumns.forEach((col, i) => this._layoutEventColumn(col, i, colWidth, eventWidth));
  }

  _layoutEventColumn(column, colIndex, colWidth, eventWidth) {
    let left = colIndex * (Day.columnGapWidth + eventWidth);
    left += this.props.labelWidth + this.props.gridPadding;
    column.forEach(event => {
      event.layout = {
        left: left,
        width: eventWidth,
        top: event.times.start * this.props.pixelsPerMinute,
        height: this.props.pixelsPerMinute * (event.times.end - event.times.start)
      };
    });
  }

  _renderGrid() {
    let grid = [];
    let borderParams = `${Day.gridBorderWidth}px solid #ccc`;
    let hours = this.props.endHour - this.props.startHour;
    for (let i = 0; i < hours; i += 1) {
      let style = {
        borderLeft: borderParams,
        borderRight: borderParams,
        borderTop: borderParams,
        marginLeft: this.props.labelWidth,
        height: this.props.pixelsPerMinute * 60
      };
      if (i === hours - 1) {
        style.borderBottom = borderParams;
      }
      grid.push(
        <div style={style} />
      );
    }
    return grid;
  }

  _renderLabels() {
    let labels = [];
    let labelComponent;
    let hours = this.props.endHour - this.props.startHour;
    for (let i = 0; i <= hours; i += 0.5) {
      let style = {
        position: 'absolute',
        top: i * 60 * this.props.pixelsPerMinute - this.props.labelHeight / 2,
        height: this.props.labelHeight,
        width: this.props.labelWidth,
        verticalAlign: 'middle',
        textAlign: 'right',
        paddingRight: 10,
        lineHeight: this.props.labelHeight + 'px'
      };
      if (i % 1 === 0) {
        labelComponent = HourLabel;
      } else {
        labelComponent = HalfHourLabel;
        style.fontSize = '70%';
      }
      let label = React.createElement(labelComponent, {minutes: (i + this.props.startHour) * 60});
      labels.push(
        <div style={style}>
          {label}
        </div>
      );
    }
    return labels;
  }
}

function groupOverlappingEvents(events) {
  let groups = [];
  events.forEach((e, i) => {
    if (i === 0) {
      groups.push([e]);
    } else {
      let currentGroup = groups[groups.length - 1];
      if (isEventOverlappingGroup(e, currentGroup)) {
        currentGroup.push(e);
      } else {
        groups.push([e]);
      }
    }
  });
  return groups;
}

function isEventOverlappingGroup(event, group) {
  for (let otherEvent of group) {
    if (
      event.times.start >= otherEvent.times.start &&
      event.times.start < otherEvent.times.end
    ) {
      return true;
    }
  }
  return false;
}

function arrangeEventsInColumns(eventGroup) {
  let columns = [];
  eventGroup.forEach((event, i) => {
    if (i === 0) {
      columns.push([event]);
    } else {
      placeEventInColumn(event, columns);
    }
  });
  return columns;
}

function placeEventInColumn(event, columns) {
  for (let col of columns) {
    let lastEvent = col[col.length - 1];
    if (lastEvent.times.end < event.times.start) {
      col.push(event);
      return;
    }
  }
  columns.push([event]);
}
