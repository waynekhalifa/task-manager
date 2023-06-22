import { TaskStatusBadge } from "enums/global";

export const getBadge = (status: string) => {
  switch (status) {
    case TaskStatusBadge.TODO:
      return "badge rounded-pill bg-gray text-wite";
    case TaskStatusBadge.ON_PROGRESS:
      return "badge rounded-pill bg-blue text-wite";
    case TaskStatusBadge.ON_REVIEW:
      return "badge rounded-pill bg-yalow text-white";
    case TaskStatusBadge.COMPLETED:
      return "badge rounded-pill bg-success text-white";
    default:
      return "badge rounded-pill bg-info text-white";
  }
}