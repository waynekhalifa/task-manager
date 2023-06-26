import { TaskStatusBadge } from "enums/global";
import { CategoryUpdateInput } from "types/category";

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
export const getBtn = (status: string) => {
  switch (status) {
    case TaskStatusBadge.TODO:
      return "btn btn-gray text-white";
    case TaskStatusBadge.ON_PROGRESS:
      return "btn  btn-blue text-white";
    case TaskStatusBadge.ON_REVIEW:
      return "btn btn-yalow text-white";
    case TaskStatusBadge.COMPLETED:
      return "btn  btn-success text-white";
    default:
      return "btn  btn-info text-white";
  }
}

export const getShortString = (str: string, length: number) => {
  if (!str) return "";
  if (str.length > length) {
    return str.substring(0, length) + "...";
  } else {
    return str;
  }
};

export const getCategory = (categories: CategoryUpdateInput[], id: number) => {
  let category = categories.find((category) => category.id === id);
  return category?.name;
};


export const checkImage = (url: string) => {
  if (!url) return false;
  return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

export const checkIfExist = (array: any[], item: any) => {
  return array.some((element: any) => element === item);
};
