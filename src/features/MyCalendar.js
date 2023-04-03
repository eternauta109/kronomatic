/* import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

export default class MyCalendar extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={this.handleDateClick}
      />
    );
  }

  handleDateClick = (arg) => {
    // bind with an arrow function
    alert(arg.dateStr);
  };
} */
import React, { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Calendar,
  Views,
  DateLocalizer,
  momentLocalizer
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const mLocalizer = momentLocalizer(moment);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue"
    }
  });

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function Basic({
  localizer = mLocalizer,
  showDemoLink = true,
  ...props
}) {
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper
      },
      defaultDate: new Date(),

      /*  max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours'), */
      views: Object.keys(Views).map((k) => Views[k])
    }),
    []
  );

  return (
    <div className="calendarContainer" {...props}>
      <Calendar
        components={components}
        defaultDate={defaultDate}
        localizer={localizer}
        max={max}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 880 }}
        step={60}
        views={views}
      />
    </div>
  );
}
Basic.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool
};
