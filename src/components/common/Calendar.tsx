import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import useApp from "hooks/useApp";
import { Screens } from "enums/screens";
import { Pages } from "enums/pages";

interface Props {
  projects: any;
  tasks: any;
}

const Calendar: React.FC<Props> = ({ projects, tasks }) => {
  const { push } = useApp();
  const calendarData: any[] = [];

  for (let i = 0; i < projects.length; i++) {
    calendarData.push({
      type: "project",
      id: projects[i].id,
      title: projects[i].name,
      start: new Date(projects[i].start_at),
      end: new Date(projects[i].end_at),
      color: "#c39546",
    });
  }

  for (let i = 0; i < tasks.length; i++) {
    calendarData.push({
      type: "task",
      id: tasks[i].id,
      title: tasks[i].name,
      start: new Date(tasks[i].start_at),
      end: new Date(tasks[i].end_at),
      color: "#3357d0",
    });
  }

  const handleClick = (e: any) => {
    if (e.event._def.extendedProps.type === "project")
      push(Screens.DASHBOARD + Pages.PROJECTS + "/" + e.event._def.publicId);
    if (e.event._def.extendedProps.type === "task")
      push(Screens.DASHBOARD + Pages.TASKS + "/" + e.event._def.publicId);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      editable={true}
      // eventDrop={this.handleEventDrop}
      eventClick={handleClick}
      events={calendarData}
    />
  );
};

export default Calendar;
