import React, { Fragment, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ModalEvent from "../event/ModalEvent";

import useStore from "../../store/DataContext";
import dayjs from "dayjs";

import {
  Calendar,
  Views,
  DateLocalizer,
  dayjsLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

/**
 * We are defaulting the localizer here because we are using this same
 * example on the main 'About' page in Storybook
 */
export default function Basic({ ...props }) {
  const [open, setOpen] = useState(false);
  const [event, setEvenet] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { events } = useStore();

  const { components, defaultDate, max, views } = useMemo(
    () => ({
      /*  max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours'), */
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  );

  const handleSelect = (e) => {
    let person = prompt("Please enter Event ");
    let date = e.start;
    console.log(person);
    console.log(date);
  };
  const onSelectEvent = (event) => {
    setEvenet(event);
    handleOpen();
  };

  return (
    <div className="calendarContainer" {...props}>
      <Calendar
        defaultDate={dayjs()}
        localizer={localizer}
        max={max}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 880 }}
        selectable={true}
        step={60}
        views={views}
        onSelectEvent={(event) => onSelectEvent(event)}
        onSelectSlot={handleSelect}
        eventPropGetter={(event) => {
          const backgroundColor = event.color;
          return { style: { backgroundColor } };
        }}
      />
      <ModalEvent event={event} open={open} handleClose={handleClose} />
    </div>
  );
}
Basic.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
  showDemoLink: PropTypes.bool,
};
