/* eslint-disable no-lone-blocks */
import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { IField } from 'types/formFields';

interface Props {
  formFields: IField[]
  grid?: boolean
}

const FormInputs: React.FC<Props> = ({ formFields, grid }) => {
  return (
    <form>
      <div className={`${grid && 'container'}`}>
        <div className={`${grid && 'row g-3 mb-3'}`}>
          {formFields.map((formInfo: any, i: number) => {
            return <div key={"cfbdefs" + i} className={`${formInfo.width && formInfo.width}`}>
              {<label htmlFor="exampleFormControlInput733" className="form-label" hidden={formInfo.hide}>
                {formInfo.label}
              </label>}
              {(formInfo.type === "text" || formInfo.type === "date" || formInfo.type === "password") && <input type={formInfo.type} className="form-control" id="exampleFormControlInput77" placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} defaultValue={formInfo.default} hidden={formInfo.hide} />}
              {formInfo.type === "select" && <select className="form-select" name="value" value={formInfo.value} onChange={formInfo.onChange} defaultValue={formInfo.default} hidden={formInfo.hide} >
                {formInfo.options?.map((option: any, i: number) => {
                  return <option key={"key" + i} value={option.value}>
                    {option.label}
                  </option>;
                })}
              </select>}
              {formInfo.type === "textarea" && <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} placeholder={formInfo.placeholder} value={formInfo.value} onChange={formInfo.onChange} defaultValue={formInfo.default} hidden={formInfo.hide} />}
              {formInfo.type === "file" && <input className="form-control" type="file" id="formFile" onChange={formInfo.onChange} defaultValue={formInfo.default} hidden={formInfo.hide} />}

              {formInfo.type === "multiselect" && <>
                <Form.Group as={Col} controlId="my_multiselect_field" hidden={formInfo.hide}
                  disabled={formInfo.disabled}
                >
                  <Form.Control as="select" multiple value={formInfo.value} onChange={formInfo.onChange}>
                    {formInfo.options?.map((option: any, i: number) => {
                      return <option key={"key" + i} value={option.value} >
                        {option.label}
                      </option>;
                    })}
                  </Form.Control>
                </Form.Group>
              </>
              }

            </div>
          })}
        </div>
      </div>
    </form>
  )
}

export default FormInputs