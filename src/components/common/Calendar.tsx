import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import useApp from "hooks/useApp";
import { useState } from "react";
import EventDetails from "./EventDetails";

interface Props {
  projects: any;
  tasks: any;
}

type IState = { showDetails: boolean; selectedEvent: any };
const INITIAL_STATE: IState = { showDetails: false, selectedEvent: null };

const Calendar: React.FC<Props> = ({ projects, tasks }) => {
  const [state, setState] = useState<IState>(INITIAL_STATE);
  const { showDetails, selectedEvent } = state;
  const { push } = useApp();
  const calendarData: any[] = [];

  // for (let i = 0; i < projects.length; i++) {
  //   calendarData.push({
  //     type: "project",
  //     id: projects[i].id,
  //     title: projects[i].name,
  //     start: new Date(projects[i].start_at),
  //     end: new Date(projects[i].end_at),
  //     color: "#c39546",
  //   });
  // }

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
    setState({ ...state, showDetails: true, selectedEvent: e.event });
    // if (e.event._def.extendedProps.type === "project")
    //   push(Screens.DASHBOARD + Pages.PROJECTS + "/" + e.event._def.publicId);
    // if (e.event._def.extendedProps.type === "task")
    //   push(Screens.DASHBOARD + Pages.TASKS + "/" + e.event._def.publicId);
  };

  return (
    <div className="row">
      <div className={showDetails ? "col-7" : "col-12"}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          editable={true}
          // eventDrop={this.handleEventDrop}
          eventClick={handleClick}
          datesSet={() =>
            setState({ ...state, showDetails: false, selectedEvent: null })
          }
          events={calendarData}
        />
      </div>
      <div className={showDetails ? "col-5" : "col-12"}>
        <div className={showDetails ? "d-block" : "d-none"}>
          {selectedEvent && <EventDetails id={selectedEvent._def.publicId} />}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
