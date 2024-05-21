"use client";

import { useCallback, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
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
  const reCaptcha = useRef<ReCAPTCHA>(null);
  const {
    control,
    clearErrors,
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
    clearErrors("email");

    if (reCaptcha && reCaptcha.current) {
      const captcha = await reCaptcha.current.executeAsync();

      if (captcha) {
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

              await useSendWelcomeEmailApi.mutateAsync({
                email: emailToLowerCase,
              });

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
      } else {
        setError("email", {
          type: "custom",
          message: "Seems you may be a bot. Sorry.",
        });
      }
    }
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
    return <p>Thanks! We got it.</p>;
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
              onChange={(e) => {
                clearErrors("email");
                onChange(e);
              }}
              value={value}
            />
          )}
        />
        <LeafButton type="submit" fullWidth>
          {isSubmitting ? "Submitting..." : "Submit"}
        </LeafButton>
        <ReCAPTCHA
          ref={reCaptcha}
          size="invisible" // v3
          sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        />
        <input type="submit" hidden />
      </form>
      {errors.email ? (
        <p className={styles.formError}>{errorMessage()}</p>
      ) : null}
    </div>
  );
};

export default NewsletterForm;
