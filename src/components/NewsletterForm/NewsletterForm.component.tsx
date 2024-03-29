"use client";

import { useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "src/components/NewsletterForm/NewsletterForm.module.css";
import { useNotionNewsletterApiMutation } from "src/hooks/mutations/useNotionNewsletterApi.mutation";
import { useSendWelcomeEmailApiMutation } from "src/hooks/mutations/useSendWelcomeEmailApi.mutation";
import { Button } from "src/ui/Button/Button.component";
import { Input } from "src/ui/Input/Input.component";
import { EMAIL_VALIDATION_REGEX } from "src/utils/regex";

export interface NewsletterFormInputs {
  email: string;
}

const defaultValues: NewsletterFormInputs = {
  email: "",
};

export const NewsletterForm = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<NewsletterFormInputs>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const useNotionNewsletterApi = useNotionNewsletterApiMutation();
  const useSendWelcomeEmailApi = useSendWelcomeEmailApiMutation();

  const onSubmit: SubmitHandler<NewsletterFormInputs> = async (
    data: NewsletterFormInputs,
  ) => {
    const { email } = data;

    const emailToLowerCase = email.toLowerCase();

    await useNotionNewsletterApi.mutateAsync(
      { email: emailToLowerCase },
      {
        onSuccess: async (response) => {
          if (response.status === 409) {
            setError("email", {
              type: "custom",
              message: "We have your email already!",
            });

            return false;
          }

          if (response.status === 400) {
            setError("email", {
              type: "custom",
              message: "Error sending email, refresh and try again.",
            });

            return false;
          }

          await useSendWelcomeEmailApi.mutateAsync({ email: emailToLowerCase });

          return true;
        },
        onError: (response) => {
          setError("email", {
            type: "custom",
            message: response.message,
          });
        },
      },
    );
  };

  const errorMessage = useCallback(() => {
    if (errors.email && !errors.email.message) {
      return "Email is invalid.";
    }

    if (errors.email?.message) {
      return errors.email.message;
    }

    return "";
  }, [errors.email]);

  if (isSubmitSuccessful) {
    return <p>Thanks! You'll be the first to know.</p>;
  }

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.newsletterForm}>
        <Controller
          control={control}
          name="email"
          rules={{ required: true, pattern: EMAIL_VALIDATION_REGEX }}
          render={({ field: { onChange, value, name, ref } }) => (
            <Input
              placeholder="Your email, please."
              hasError=""
              ref={ref}
              name={name}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <Button type="submit">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <input type="submit" hidden />
      </form>
      {errors.email ? (
        <p className={styles.formError}>{errorMessage()}</p>
      ) : null}
    </div>
  );
};
