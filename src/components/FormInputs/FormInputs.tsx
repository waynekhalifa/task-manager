import React from 'react';
import { IField } from 'types/formFields';


interface Props {
  formFields: IField[]
}




const FormInputs: React.FC<Props> = ({ formFields }) => {
  return (
    <form>
      {formFields.map((d: any, i: number) => {
        return (
          <div key={"ljsdhl" + i} className="mb-3">
            <label htmlFor="exampleFormControlInput77" className="form-label">
              {d.label}
            </label>
            {(d.type === "text" || d.type === "date") && <input
              type={d.type}
              className="form-control"
              id="exampleFormControlInput77"
              placeholder={d.placeholder}
              value={d.value}
              onChange={d.onChange}
            />}
            {d.type === "select" && <select

              className="form-select"
              value={d.value}
              onChange={d.onChange}
            >
              {d.options.map((d: any, i: number) => {
                return (
                  <option key={"ljsdhl" + i} value={d.value}>{d.label}</option>
                );
              })}
            </select>}
            {d.type === "textarea" && <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              placeholder={d.placeholder}
              value={d.value}
              onChange={d.onChange}
            />}
            {d.type === "file" && <input
              className="form-control"
              type="file"
              id="formFile"
              onChange={d.onChange}
            />}
          </div>
        );
      })}
    </form>
  )
}

export default FormInputs