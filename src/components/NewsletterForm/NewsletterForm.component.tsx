"use client";

import { useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LeafButton from "src/components/LeafButton/LeafButton.component";
import LeafInput from "src/components/LeafInput/LeafInput.component";
import styles from "src/components/NewsletterForm/NewsletterForm.module.css";
import { useNotionNewsletterApiMutation } from "src/hooks/mutations/useNotionNewsletterApi.mutation";
import { useSendWelcomeEmailApiMutation } from "src/hooks/mutations/useSendWelcomeEmailApi.mutation";
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
            <LeafInput
              placeholder="Your email, please."
              ref={ref}
              name={name}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <LeafButton type="submit" fullWidth>
          {isSubmitting ? "Submitting..." : "Submit"}
        </LeafButton>
        <input type="submit" hidden />
      </form>
      {errors.email ? (
        <p className={styles.formError}>{errorMessage()}</p>
      ) : null}
    </div>
  );
};

export default NewsletterForm;
