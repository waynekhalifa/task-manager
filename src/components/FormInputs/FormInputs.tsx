/* eslint-disable no-lone-blocks */
import React from 'react';
import { IField } from 'types/formFields';

interface Props {
  formFields: IField[]
  formName?: string
}

const FormInputs: React.FC<Props> = ({ formFields, formName }) => {
  return (
    <form>
      <div className={`${formName === 'employee' && 'container'}`}>
        <div className={`${formName === 'employee' && 'row g-3 mb-3'}`}>
          {formFields.map((formInfo: any, i: number) => {
            return <div key={"cfbdefs" + i} className={`${formInfo.width && formInfo.width}`}>
              <label htmlFor="exampleFormControlInput733" className="form-label">
                {formInfo.label}
              </label>
              {(formInfo.type === "text" || formInfo.type === "date" || formInfo.type === "password") && <input type={formInfo.type} className="form-control" id="exampleFormControlInput77" placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} />}
              {formInfo.type === "select" && <select className="form-select" name="value" value={formInfo.value} onChange={formInfo.onChange}>
                {formInfo.options?.map((option: any, i: number) => {
                  return <option key={"key" + i} value={option.value}>
                    {option.label}
                  </option>;
                })}
              </select>}
              {formInfo.type === "textarea" && <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} />}
              {formInfo.type === "file" && <input className="form-control" type="file" id="formFile" onChange={formInfo.onChange} />}
            </div>
          })}
        </div>
      </div>
    </form>
  )
}

export default FormInputs