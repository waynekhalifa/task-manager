import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import EventDetails from "./EventDetails";

interface Props {
  tasks: any;
}

type IState = { showDetails: boolean; selectedEvent: any };
const INITIAL_STATE: IState = { showDetails: false, selectedEvent: null };

const Calendar: React.FC<Props> = ({ tasks }) => {
  const [state, setState] = useState<IState>(INITIAL_STATE);
  const { showDetails, selectedEvent } = state;
  const calendarData: any[] = [];

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

  const handleClick = (e: any) =>
    setState({ ...state, showDetails: true, selectedEvent: e.event });

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
