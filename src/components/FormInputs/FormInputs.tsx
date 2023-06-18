import React from 'react';
import { IField } from 'types/formFields';


interface Props {
  formFields: IField[]
}




const FormInputs: React.FC<Props> = ({ formFields }) => {
  return (
    <form>
      {formFields.map((formInfo: any, i: number) => {
        return <div key={"ljsdhl" + i} className="mb-3">
          <label htmlFor="exampleFormControlInput77" className="form-label">
            {formInfo.label}
          </label>
          {(formInfo.type === "text" || formInfo.type === "date") && <input type={formInfo.type} className="form-control" id="exampleFormControlInput77" placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} />}
          {formInfo.type === "select" && <select className="form-select" value={formInfo.value} onChange={formInfo.onChange}>
            {formInfo.options?.map((d: any, i: number) => {
              return <option key={"ljsdhl" + i} value={d.value}>
                {d.label}
              </option>;
            })}
          </select>}
          {formInfo.type === "textarea" && <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} />}
          {formInfo.type === "file" && <input className="form-control" type="file" id="formFile" onChange={formInfo.onChange} />}
        </div>;
      })}
    </form>
  )
}

export default FormInputs