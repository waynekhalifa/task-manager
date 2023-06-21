import { Link } from "react-router-dom";
import GoogleImg from "../../assets/images/forgot-password.svg";
import useApp from "hooks/useApp";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetSendValidation } from "validators/resetPasswordSend";
import { ResetPasswordSendInput } from "types/resetPasswordSend";
import { useResetPasswordSend } from "framework/auth/resetPasswordSend";
import { Screens } from "enums/screens";
import { Pages } from "enums/pages";

const defaultValues: ResetPasswordSendInput = { user: "" };

const PasswordReset: React.FC = () => {
  const { push } = useApp();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<any>({
    resolver: yupResolver(resetSendValidation),
    mode: "onChange",
    defaultValues,
  });
  const { mutateAsync } = useResetPasswordSend();

  const onSubmit: SubmitHandler<ResetPasswordSendInput> = async (
    data: ResetPasswordSendInput
  ) => {
    try {
      await mutateAsync(data);

      push(Screens.MAIN + Pages.VERIFY_EMAIL);
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
            <img src={GoogleImg} className="w240 mb-4" alt="" />
            <h1>Forgot password?</h1>
            <span>
              Enter the email address you used when you joined and we'll send
              you instructions to reset your password.
            </span>
          </div>
          <div className="col-12">
            <div className="mb-2">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="name@example.com"
                {...register("user")}
              />
            </div>
          </div>
          <div className="col-12 text-center mt-4">
            <button
              disabled={isSubmitting}
              className="btn btn-lg btn-block btn-light lift text-uppercase"
            >
              SUBMIT
            </button>
          </div>
          <div className="col-12 text-center mt-4">
            <span className="text-muted">
              <Link to="/" className="text-secondary">
                Back to Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
