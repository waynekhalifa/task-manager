import { useState } from "react";

interface Props {}

type IState = {
  check: "";
  text1: "";
  text2: "";
  text3: "";
  gender: "";
  select: "";
};
const INITIAL_STATE: IState = {
  check: "",
  text1: "",
  text2: "",
  text3: "",
  gender: "",
  select: "",
};

const BasicValidationForm: React.FC<Props> = ({}) => {
  const [state, setState] = useState<IState>(INITIAL_STATE);

  return (
    <div className="card mb-3">
      <div className="card-header py-3 d-flex justify-content-between bg-transparent border-bottom-0">
        <h6 className="mb-0 fw-bold ">Basic Validation Form</h6>
      </div>
      <div className="card-body">
        <form id="basic-form" method="post">
          <div className="row g-3 align-items-center">
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label">Text Input</label>
                <input
                  type="text"
                  className="form-control parsley-error"
                  value={state.text1}
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      text1: e.target.value as any,
                    }));
                  }}
                  required
                />
                {/* state.text1 === "" && state.button */}
                {state.text1 === "" ? (
                  <span className="text-danger">Please fill input filed</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label">Email Input</label>
                <input
                  type="email"
                  className="form-control parsley-error"
                  value={state.text2}
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      text2: e.target.value as any,
                    }));
                  }}
                  required
                  data-parslul
                />
                {/* state.text2 === "" && state.button */}
                {state.text2 === "" ? (
                  <span className="text-danger">Please fill input filed</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label">Text Area</label>
                <textarea
                  className="form-control parsley-error"
                  rows={5}
                  cols={30}
                  value={state.text3}
                  onChange={(e) => {
                    setState((prevState) => ({
                      ...prevState,
                      text3: e.target.value as any,
                    }));
                  }}
                  required
                  data-parsley-id="33"
                ></textarea>
                {/* state.text3 === "" && state.button */}
                {state.text3 === "" ? (
                  <span className="text-danger">Please fill input filed</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label">Checkbox</label>
                <br />
                <label className="fancy-checkbox parsley-error">
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="checkbox"
                    onChange={(e) => {
                      setState((prevState) => ({
                        ...prevState,
                        check: e.target.value as any,
                      }));
                    }}
                    required
                    data-parsley-errors-container="#error-checkbox"
                    data-parsley-multiple="checkbox"
                    data-parsley-id="36"
                  />
                  <span className="px-2">Option 1</span>
                </label>
                <label className="fancy-checkbox">
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="checkbox"
                    onChange={(e) => {
                      setState((prevState) => ({
                        ...prevState,
                        check: e.target.value as any,
                      }));
                    }}
                    data-parsley-multiple="checkbox"
                  />
                  <span className="px-2">Option 2</span>
                </label>
                <label className="fancy-checkbox">
                  <input
                    type="checkbox"
                    name="checkbox"
                    value="checkbox"
                    onChange={(e) => {
                      setState((prevState) => ({
                        ...prevState,
                        check: e.target.value as any,
                      }));
                    }}
                    data-parsley-multiple="checkbox"
                  />
                  <span className="px-2">Option 3</span>
                </label>
                {/* state.check === "" && state.button */}
                {state.check === "" ? (
                  <span className="text-danger d-block">
                    Please fill input filed
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label className="form-label">Radio Button</label>
                <br />
                <label className="fancy-radio parsley-error">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(e) => {
                      setState((prevState) => ({
                        ...prevState,
                        gender: e.target.value as any,
                      }));
                    }}
                    required
                    data-parsley-errors-container="#error-radio"
                    data-parsley-multiple="gender"
                    data-parsley-id="43"
                  />
                  <span className="px-2">
                    <i></i>Male
                  </span>
                </label>
                <label className="fancy-radio">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={(e) => {
                      setState((prevState) => ({
                        ...prevState,
                        gender: e.target.value as any,
                      }));
                    }}
                    data-parsley-multiple="gender"
                  />
                  <span className="px-2">
                    <i></i>Female
                  </span>
                </label>
                {/* state.select === "" && state.button */}
                {state.select === "" ? (
                  <span className="text-danger d-block">
                    Please fill input filed
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-2"
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

export default BasicValidationForm;
