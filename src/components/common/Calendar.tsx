import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Props {
  events: any;
}

const Calendar: React.FC<Props> = ({ events }) => {
  const calendarData: any[] = [];

  for (let i = 0; i < events.length; i++) {
    calendarData.push({
      title: events[i].name,
      start: new Date(events[i].start_at),
      end: new Date(events[i].end_at),
    });
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      editable={true}
      // eventDrop={this.handleEventDrop}
      // eventClick={this.handleEventClick}
      events={calendarData}
    />
  );
};

export default Calendar;
