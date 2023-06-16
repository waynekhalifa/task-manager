import { IModal } from "types/modal";

export const closeModal = (): IModal => ({
  open: false,
  id: "",
  content: null,
});
