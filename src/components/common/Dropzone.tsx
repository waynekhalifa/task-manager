import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';



interface Props {
  onDrop: (acceptedFiles: any) => void;
  files: any[];
  cloudFiles?: any[];
  onDelete: (index: number) => void;
  onDeleteCloud: (index: number) => void;
}


const Dropzone: React.FC<Props> = ({ onDrop, files, cloudFiles, onDelete, onDeleteCloud }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size >= 1024 && size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }




  return (
    <div className="dropzone">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...  <i className="icofont-upload-alt"></i></p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files  <i className="icofont-upload-alt"></i></p>
        )}
      </div>

      {files && files.length > 0 && <div className="uploaded-files">
        <h5>Local Files</h5>
        <ul className='text-center' style={{
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {files.map((file, index) => (
            <li key={index} style={{ margin: 10 }}>
              <div className="file-name">
                <i className="icofont-file-document"></i>
                <span>{file.name}</span>
              </div>
              <div className="file-size">
                <span>{getFileSize(file.size)}</span>
              </div>
              <div className="file-action">
                <i className="icofont-trash" style={{ cursor: 'pointer', marginLeft: 5 }} onClick={() => onDelete(index)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      }
      {cloudFiles && cloudFiles.length > 0 && <div className="uploaded-files">
        <h5>Cloud Files</h5>
        <ul className='text-center' style={{
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {cloudFiles.map((file, index) => (
            <li key={index} style={{ margin: 10 }}>
              <div className="file-name">
                <i className="icofont-file-document"></i>
                <span>{file.name}</span>
              </div>
              <div className="file-size">
                <span>{file.size}</span>
              </div>
              <div className="file-action">
                <Link to={file.file} target="_blank" download><i className="icofont-download"></i></Link>
                <i className="icofont-trash" style={{ cursor: 'pointer', marginLeft: 5 }} onClick={() => onDeleteCloud(index)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      }

      {/* <div className="progress" >
        <div className="progress-bar" />
      </div> */}
    </div>

  );
}

export default Dropzone;