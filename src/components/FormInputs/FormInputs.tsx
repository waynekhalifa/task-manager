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
          <label htmlFor="exampleFormControlInput77" className="form-label" hidden={formInfo.hide}>
            {formInfo.label}
          </label>
          {(formInfo.type === "text" || formInfo.type === "date") && <input type={formInfo.type} className="form-control" id="exampleFormControlInput77" placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} hidden={formInfo.hide} />}
          {formInfo.type === "select" && <select className="form-select" value={formInfo.value} onChange={formInfo.onChange} hidden={formInfo.hide}>
            {formInfo.options?.map((d: any, i: number) => {
              return <option key={"ljsdhl" + i} value={d.value}>
                {d.label}
              </option>;
            })}
          </select>}
          {formInfo.type === "textarea" && <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} hidden={formInfo.hide} />}
          {formInfo.type === "file" &&
            <div className="form-group">
              <input className="form-control" type="file" id="formFile" name="files[]" onChange={formInfo.onChange} multiple={formInfo.multiple} hidden={formInfo.hide} />
            </div>
          }
        </div>;
      })}
    </form>
  )
}

export default FormInputs