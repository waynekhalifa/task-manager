import { useState } from "react";

type IState = {
  carector: string;
  carector2: string;
  button: boolean;
  number: string;
  p: string;
  a: boolean;
  b: boolean;
  c: boolean;
  check1: boolean;
  check2: boolean;
  check3: boolean;
};

const INITIAL_STATE: IState = {
  carector: "",
  carector2: "",
  button: false,
  number: "",
  p: "",
  a: false,
  b: false,
  c: false,
  check1: false,
  check2: false,
  check3: false,
};

const AdvancedValidationForm: React.FC = () => {
  const [state, setState] = useState<IState>(INITIAL_STATE);

  return (
    <div className="card mb-3">
      <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
        <h6 className="mb-0 fw-bold ">Advanced Validation Form</h6>
      </div>
      <div className="card-body">
        <form id="advanced-form" data-parsley-validate="">
          <div className="row g-3 align-items-center">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="text-input1" className="form-label">
                  Min. 8 Characters
                </label>
                <input
                  type="text"
                  id="text-input1"
                  className="form-control"
                  value={state.carector}
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      carector: e.target.value,
                    }));
                  }}
                  required
                  data-parsley-minlength="8"
                />
                {state.carector.length <= 8 && state.button ? (
                  <span className="text-danger">
                    Please default checked your input filed
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="text-input2" className="form-label">
                  Between 5-10 Characters
                </label>
                <input
                  type="text"
                  id="text-input2"
                  className="form-control"
                  value={state.carector2}
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      carector2: e.target.value,
                    }));
                  }}
                  required
                  data-parsley-length="[5,10]"
                />
                {state.carector2.length <= 5 && state.button ? (
                  <span className="text-danger">
                    Please default checked your input filed
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="text-input3" className="form-label">
                  Min. Number ( &gt;= 5 )
                </label>
                <input
                  type="text"
                  id="text-input3"
                  className="form-control"
                  value={state.number}
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      number: e.target.value,
                    }));
                  }}
                  required
                  data-parsley-min="5"
                />
                {state.number.length <= 5 && state.button ? (
                  <span className="text-danger">
                    Please default checked your input filed
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="text-input4" className="form-label">
                  Between 20-30
                </label>
                <input
                  type="text"
                  id="text-input4"
                  className="form-control"
                  value={state.number}
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      p: e.target.value,
                    }));
                  }}
                  required
                  data-parsley-range="[20,30]"
                />
                {state.p.length <= 20 && state.button ? (
                  <span className="text-danger">
                    Please default checked your input filed
                  </span>
                ) : (
                  ""
                )}
                {state.p.length >= 30 && state.button ? (
                  <span className="text-danger">
                    Please default checked your input filed
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label">Select Min. 2 Options</label>
                <br />
                <label className="control-inline fancy-checkbox">
                  <input
                    type="checkbox"
                    name="checkbox2"
                    onChange={(e) => {
                      setState((prevState) => ({ ...prevState, a: true }));
                    }}
                    required
                    data-parsley-mincheck="2"
                    data-parsley-errors-container="#error-checkbox2"
                    data-parsley-multiple="checkbox2"
                  />
                  <span className="px-2">Option 1</span>
                </label>
                <label className="control-inline fancy-checkbox">
                  <input
                    type="checkbox"
                    name="checkbox2"
                    onChange={(e) => {
                      setState((prevState) => ({ ...prevState, b: true }));
                    }}
                    data-parsley-multiple="checkbox2"
                  />
                  <span className="px-2">Option 2</span>
                </label>
                <label className="control-inline fancy-checkbox">
                  <input
                    type="checkbox"
                    name="checkbox2"
                    onChange={(e) => {
                      setState((prevState) => ({ ...prevState, c: true }));
                    }}
                    data-parsley-multiple="checkbox2"
                  />
                  <span className="px-2">Option 3</span>
                </label>
                {state.a === false &&
                state.b === false &&
                state.c === false &&
                state.button ? (
                  <span className="text-danger d-block">
                    {" "}
                    meximum Any 2 default checked
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label">Select Between 1-2 Options</label>
                <br />
                <label className="control-inline fancy-checkbox">
                  <input
                    type="checkbox"
                    name="checkbox3"
                    onChange={(e) => {
                      setState((prevState) => ({ ...prevState, check1: true }));
                    }}
                    required
                    data-parsley-check="[1,2]"
                    data-parsley-errors-container="#error-checkbox3"
                    data-parsley-multiple="checkbox3"
                  />
                  <span className="px-2">Option 1</span>
                </label>
                <label className="control-inline fancy-checkbox">
                  <input
                    type="checkbox"
                    name="checkbox3"
                    onChange={(e) => {
                      setState((prevState) => ({ ...prevState, check2: true }));
                    }}
                    data-parsley-multiple="checkbox3"
                  />
                  <span className="px-2">Option 2</span>
                </label>
                <label className="control-inline fancy-checkbox">
                  <input
                    type="checkbox"
                    name="checkbox3"
                    onChange={(e) => {
                      setState((prevState) => ({ ...prevState, check3: true }));
                    }}
                    data-parsley-multiple="checkbox3"
                  />
                  <span className="px-2">Option 3</span>
                </label>
                {state.check1 === false &&
                state.check2 === false &&
                state.check3 === false &&
                state.button ? (
                  <span className="text-danger d-block">
                    {" "}
                    meximum Any 2 default checked
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={() => {
              setState((prevState) => ({ ...prevState, button: true }));
            }}
          >
            Validate
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdvancedValidationForm;
