import { Spinner } from "react-bootstrap";
import React, { useCallback, useEffect } from "react";
import Dropzone from "./Dropzone";
import { projectAttachmentInput, useUploadProjectAttachment } from "framework/project/uploadProjectAttachment";
import { useDeleteProjectAttachment } from "framework/project/deleteProjectAttachment";

interface Props {
  project: any;
}

enum ModelKeys {
  ClOUD_FILES = "cloudFiles",
  FILES = "files",
  IS_SUBMITTING = "isSubmitting",
}

interface State {
  modelData: {
    [ModelKeys.FILES]: any[];
    [ModelKeys.ClOUD_FILES]: any[];
    [ModelKeys.IS_SUBMITTING]: boolean;
  };
}

const INITIAlIZE_DATA: State = {
  modelData: {
    [ModelKeys.ClOUD_FILES]: [] as any[],
    [ModelKeys.FILES]: [] as any[],
    [ModelKeys.IS_SUBMITTING]: false,
  },
};

const Attachment: React.FC<Props> = ({ project }) => {
  const [state, setState] = React.useState<State>(INITIAlIZE_DATA);
  const { modelData } = state;

  const { mutateAsync: uploadMutation } = useUploadProjectAttachment();
  const { mutateAsync: deleteMutation } = useDeleteProjectAttachment();

  useEffect(() => {
    if (project.projectfile_set && project.projectfile_set.length > 0) {
      setState((prevState) => ({
        modelData: {
          ...prevState.modelData,
          [ModelKeys.ClOUD_FILES]: project.projectfile_set,
        },
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);


  const handleModelData = (key: string, value: any) => {
    let files: any[] = modelData.files;
    files.push(value);
    setState((prevState) => ({
      modelData: {
        ...prevState.modelData,
        [key]: files,
      },
    }));
  };



  const onDrop = useCallback((acceptedFiles: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]);
    reader.onload = (url) => {
      handleModelData(ModelKeys.FILES, acceptedFiles[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteCloudFile = async (index: number) => {
    let files: any[] = modelData.cloudFiles;
    let file: any = modelData.cloudFiles[index];
    try {
      await deleteMutation({ id: file.id });
      files.splice(index, 1);
      setState((prevState) => ({
        modelData: {
          ...prevState.modelData,
          [ModelKeys.ClOUD_FILES]: files,
        },
      }));
    } catch (err) {
      alert(err);
    }

  }

  const handleDeleteFile = async (index: number) => {
    let files: File[] = modelData.files;
    files.splice(index, 1);
    setState((prevState) => ({
      modelData: {
        ...prevState.modelData,
        [ModelKeys.FILES]: files,
      },
    }));
  };

  const handleSave = async () => {
    setState((prevState) => ({
      modelData: {
        ...prevState.modelData,
        [ModelKeys.IS_SUBMITTING]: true,
      },
    }));

    try {
      let inputData = projectAttachmentInput({
        files: modelData.files,
        project: project.id,
      })
      await uploadMutation(inputData);
      window.location.reload();
    } catch (err) {
      alert(err);
      setState((prevState) => ({
        modelData: {
          ...prevState.modelData,
          [ModelKeys.IS_SUBMITTING]: false,
        },
      }));
    }
  };


  return (

    <div className="mt-3">
      <Dropzone onDrop={onDrop} files={modelData.files} cloudFiles={modelData.cloudFiles} onDelete={handleDeleteFile} onDeleteCloud={handleDeleteCloudFile} />
      {modelData.files && modelData.files.length > 0 && <div className="d-flex justify-content-center">
        <button className="btn btn-primary" onClick={handleSave}>
          {modelData.isSubmitting ? (
            <Spinner animation="border" variant="light" size="sm" />
          ) : (
            "Upload"
          )}
        </button>
      </div>}
    </div>

  );
};

export default Attachment;
