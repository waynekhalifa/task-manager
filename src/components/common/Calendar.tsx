import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

interface Props {
  projects: any;
  tasks: any;
}

const Calendar: React.FC<Props> = ({ projects, tasks }) => {
  const calendarData: any[] = [];

  for (let i = 0; i < projects.length; i++) {
    calendarData.push({
      id: projects[i].id,
      title: projects[i].name,
      start: new Date(projects[i].start_at),
      end: new Date(projects[i].end_at),
      color: "#c39546",
    });
  }

  for (let i = 0; i < tasks.length; i++) {
    calendarData.push({
      id: tasks[i].id,
      title: tasks[i].name,
      start: new Date(tasks[i].start_at),
      end: new Date(tasks[i].end_at),
      color: "#3357d0",
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
