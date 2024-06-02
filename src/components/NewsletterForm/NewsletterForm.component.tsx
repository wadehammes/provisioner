"use client";

import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LeafButton from "src/components/LeafButton/LeafButton.component";
import LeafInput from "src/components/LeafInput/LeafInput.component";
import styles from "src/components/NewsletterForm/NewsletterForm.module.css";
import { useNotionNewsletterAddApiMutation } from "src/hooks/mutations/useNotionNewsletterAddApi.mutation";
import { useNotionNewsletterDeleteApiMutation } from "src/hooks/mutations/useNotionNewsletterDeleteApi.mutation";
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
  const [emailExists, setEmailExists] = useState(false);
  const [removeText, setRemoveText] = useState("Remove me, please!");
  const {
    control,
    clearErrors,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    getValues,
  } = useForm<NewsletterFormInputs>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const useNotionNewsletterAddApi = useNotionNewsletterAddApiMutation();
  const useNotionNewsletterDeleteApi = useNotionNewsletterDeleteApiMutation();
  const useSendWelcomeEmailApi = useSendWelcomeEmailApiMutation();

  const onSubmit: SubmitHandler<NewsletterFormInputs> = async (
    data: NewsletterFormInputs,
  ) => {
    setEmailExists(false);
    clearErrors("email");

    if (reCaptcha && reCaptcha.current) {
      const captcha = await reCaptcha.current.executeAsync();

      if (captcha) {
        const { email } = data;

        const emailToLowerCase = email.toLowerCase();

        await useNotionNewsletterAddApi.mutateAsync(
          { email: emailToLowerCase },
          {
            onSuccess: async (response) => {
              if (response.status === 409) {
                setEmailExists(true);

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

  if (emailExists) {
    return (
      <div className={styles.postSubmitContainer}>
        <p>We already have you in our list.</p>
        <button
          className="text-button"
          onClick={() => {
            setRemoveText("Removing now...");

            useNotionNewsletterDeleteApi.mutate(
              { email: getValues().email },
              {
                onSuccess: () => {
                  setRemoveText("Remove me, please!");
                  setEmailExists(false);
                },
              },
            );
          }}
        >
          {removeText}
        </button>
      </div>
    );
  }

  if (isSubmitSuccessful) {
    return (
      <div className={styles.postSubmitContainer}>
        <p>Thanks! We got it.</p>
      </div>
    );
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
              aria-labelledby="newsletter-form-header"
            />
          )}
        />
        <LeafButton type="submit" fullWidth isDisabled={isSubmitting}>
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
