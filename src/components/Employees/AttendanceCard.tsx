import { getCurrentDate } from "utils/getCurrentDate";
import { getCurrentMonthDays } from "utils/getCurrentMonthDays";
import { getHoursDiff } from "utils/getHoursDiff";
import { profileName } from "utils/profileName";

interface Props {
  data: any;
}

const AttendanceCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="atted-info d-flex mb-3 flex-wrap">
          <div className="full-present me-2">
            <i className="icofont-check-circled text-success me-1"></i>
            <span>Full Day Present</span>
          </div>
          <div className="Half-day me-2">
            <i className="icofont-wall-clock text-warning me-1"></i>
            <span>Half Day Present</span>
          </div>
          <div className="absent me-2">
            <i className="icofont-close-circled text-danger me-1"></i>
            <span>Full Day Absence</span>
          </div>
        </div>
        <div className="table-responsive">
          <table
            className="table table-hover align-middle mb-0"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Employee</th>
                {getCurrentMonthDays().map((day) => (
                  <th key={day} className="text-center">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.results.map((item: any) => (
                <tr key={item.id}>
                  <td>
                    <span className="fw-bold small">{profileName(item)}</span>
                  </td>
                  {getCurrentMonthDays().map((day) => {
                    const today: number = new Date().getDate();

                    if (day > today) {
                      return (
                        <th key={day} className="text-center">
                          -
                        </th>
                      );
                    } else {
                      for (let i = 0; i < item?.attendance_set.length; i++) {
                        let login_time: string = "";
                        let logout_time: string = "";

                        /** Get user login time */
                        if (item?.attendance_set[i]?.login_time)
                          login_time = item?.attendance_set[i]?.login_time;
                        /** Get user logout time */
                        if (item?.attendance_set[i]?.logout_time)
                          logout_time = item?.attendance_set[i]?.logout_time;

                        if (
                          login_time !== "" &&
                          getCurrentDate(login_time) === day &&
                          getCurrentDate(logout_time) === day
                        ) {
                          if (
                            getHoursDiff(
                              new Date(login_time),
                              new Date(logout_time)
                            ) <= 8
                          )
                            return (
                              <th key={day} className="text-center">
                                <i className="icofont-check-circled text-warning"></i>
                              </th>
                            );

                          return (
                            <th key={day} className="text-center">
                              <i className="icofont-check-circled text-success"></i>
                            </th>
                          );
                        }
                      }

                      return (
                        <th key={day} className="text-center">
                          <i className="icofont-wall-clock text-danger"></i>
                        </th>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
