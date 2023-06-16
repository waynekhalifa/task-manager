import { IModal } from "types/modal";

export const openModal = (id: string, content: React.ReactNode): IModal => ({
  open: true,
  id,
  content,
});
