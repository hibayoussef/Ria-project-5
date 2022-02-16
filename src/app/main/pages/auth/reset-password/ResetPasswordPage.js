import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
  oldPassword: yup.string().required("Please enter your old password."),
  newPassword: yup
    .string()
    .required("Please enter your new password.")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

const defaultValues = {
  email: "",
  oldPassword: "",
  newPassword: "",
};

function ResetPasswordPage() {
  const classes = useStyles();

  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit() {
    reset(defaultValues);
  }

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-auto items-center justify-center p-16 sm:p-32"
      )}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="w-full max-w-384 m-16">
            <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
              <img
                className="w-128"
                width="90rem"
                src="assets/images/logos/person-with-lock.png"
                alt="logo"
              />

              <Typography
                variant="h6"
                className="mt-16 mb-24 font-semibold text-18 sm:text-24"
              >
                Reset your password
              </Typography>

              <form
                name="resetForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Email"
                      autoFocus
                      type="email"
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="oldPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="old Password"
                      type="password"
                      name="oldPassword"
                      error={!!errors.oldPassword}
                      helperText={errors?.oldPassword?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="new Password"
                      type="password"
                      error={!!errors.newPassword}
                      helperText={errors?.newPassword?.message}
                      variant="outlined"
                      required
                      fullWidth
                    />
                  )}
                />

                <Button
                  variant="contained"
                  color="primary"
                  className="w-224 mx-auto mt-16"
                  aria-label="Reset"
                  // disabled={_.isEmpty(dirtyFields) || !isValid}
                  type="submit"
                >
                  Reset my password
                </Button>
              </form>

              <div className="flex flex-col items-center justify-center pt-32 pb-24">
                <Link className="font-normal" to="/pages/auth/login">
                  Go back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
