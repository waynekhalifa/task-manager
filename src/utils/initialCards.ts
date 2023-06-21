import { ICard } from "types/card";
import { v1 as uuidv1 } from "uuid";

export const initialCards: ICard[] = [
  {
    id: uuidv1(),
    text: "Feed cat",
    listId: "id0",
  },
  {
    id: uuidv1(),
    text: "Take out bins",
    listId: "id0",
  },
  {
    id: uuidv1(),
    text: "Housework",
    listId: "id1",
  },
];
