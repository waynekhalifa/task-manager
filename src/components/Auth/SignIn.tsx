import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginValidation } from "validators/loginValidation";
import { yupResolver } from "@hookform/resolvers/yup";

import useApp from "hooks/useApp";
import { AuthLoginInput } from "types/login";
import { useLogin } from "framework/auth/login";
import { Pages } from "enums/pages";
import { useAuth } from "contexts/AuthContext";
import { Screens } from "enums/screens";

const defaultValues: AuthLoginInput = { username: "", password: "" };

const SignIn: React.FC = () => {
  const { setSession } = useAuth();
  const { push } = useApp();
  const { handleSubmit, register, formState: { isSubmitting } } = useForm<any>({
    resolver: yupResolver(loginValidation),
    mode: "onChange",
    defaultValues
  });
  const { mutateAsync } = useLogin();

  const onSubmit: SubmitHandler<AuthLoginInput> = async (
    data: AuthLoginInput
  ) => {
    try {
      const result = await mutateAsync(data);
      console.log({ result });

      setSession(result);
      localStorage.setItem("session", JSON.stringify(result));
      localStorage.setItem("access_token", result.access);


      push(Screens.DASHBOARD + Pages.SUMMARY);
    } catch (err: Error | any) {
      //  @TODO should handle error

      console.log(err);
    }
  };

  return (
    <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
      <div
        className="w-100 p-3 p-md-5 card border-0 bg-dark text-light"
        style={{ maxWidth: "32rem" }}
      >
        <form className="row g-1 p-3 p-md-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="col-12 text-center mb-1 mb-lg-5">
            <h1>Sign in</h1>
            <span>Sign in to your dashboard.</span>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Username</label>
              <input
                {...register("username")}
                type="text"
                className="form-control form-control-lg"
                placeholder="name123"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <div className="form-label">
                <span className="d-flex justify-content-between align-items-center">
                  Password
                  <Link className="text-secondary" to="password-reset">
                    Forgot Password?
                  </Link>
                </span>
              </div>
              <input
                {...register("password")}
                type="password"
                className="form-control form-control-lg"
                placeholder="***************"
              />
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-lg btn-block btn-light lift text-uppercase"
            >
              SIGN IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
