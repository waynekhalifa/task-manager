import { useMutation } from "@tanstack/react-query";
import { Endpoints } from "enums/endpoints";
import { Attachment } from "types/project";
import http from "utils/http";

export const useUploadTaskAttachment = () => {
  return useMutation<any, Error, FormData>(async createInput => {
    const { data } = await http.post(Endpoints.TASK_ATTACHMENT, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { session: { data: data as any } };
  });
};

export const taskAttachmentInput = (data: Attachment): FormData => {
  const formData = new FormData();
  formData.append("task", `${data.task}`);
  for (let file of data.files) {
    formData.append("files", file);
  }
  return formData;
};
