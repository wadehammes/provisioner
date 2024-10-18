"use client";

import { useCallback, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import LeafButton from "src/components/LeafButton/LeafButton.component";
import LeafInput from "src/components/LeafInput/LeafInput.component";
import styles from "src/components/NewsletterForm/NewsletterForm.module.css";
import { showToast } from "src/components/Toast/showToast";
import { useResendNewsletterCreateContactApiMutation } from "src/hooks/mutations/useResendNewsletterCreateContactApi.mutation";
import { useResendUnsubscribeContactApiMutation } from "src/hooks/mutations/useResendUnsubscribeContactApi.mutation";
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
  const useResendNewsletterCreateContactApi =
    useResendNewsletterCreateContactApiMutation();
  const useResendUnsubscribeContactApi =
    useResendUnsubscribeContactApiMutation();
  const useSendWelcomeEmailApi = useSendWelcomeEmailApiMutation();

  const onSubmit: SubmitHandler<NewsletterFormInputs> = async (
    data: NewsletterFormInputs,
  ) => {
    setEmailExists(false);
    clearErrors("email");

    if (reCaptcha?.current) {
      const captcha = await reCaptcha.current.executeAsync();

      if (captcha) {
        const { email } = data;

        const emailToLowerCase = email.toLowerCase();

        try {
          await useResendNewsletterCreateContactApi.mutateAsync(
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
                    message: await response.json(),
                  });

                  return false;
                }

                await useSendWelcomeEmailApi.mutateAsync({
                  email: emailToLowerCase,
                });

                return true;
              },
              onError: (error) => {
                setError("email", {
                  type: "custom",
                  message: error.message,
                });
              },
            },
          );
        } catch (_e) {
          showToast({
            type: "error",
            content:
              "Failed to add email to newsletter list. Please try again.",
          });

          return true;
        }
      } else {
        showToast({
          type: "error",
          content: "Error with reCAPTCHA, refresh and try again.",
        });

        return true;
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
        <p>Wow! We already have you in our list. Exciting!</p>
        <button
          type="button"
          className="text-button"
          onClick={async () => {
            await useResendUnsubscribeContactApi.mutateAsync(
              { email: getValues().email },
              {
                onSuccess: () => {
                  setEmailExists(false);
                },
              },
            );
          }}
        >
          {useResendUnsubscribeContactApi.isPending
            ? "Unsubscribing now..."
            : "Unsubscribe me"}
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
              aria-label="Drop your email and we'll stay in touch."
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
