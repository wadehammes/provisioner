"use client";

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LeafButton from "src/components/LeafButton/LeafButton.component";
import LeafInput from "src/components/LeafInput/LeafInput.component";
import LeafTextArea from "src/components/LeafInput/LeafTextArea.component";
import styles from "src/components/StartYourProjectForm/StartYourProjectForm.module.css";
import { useNotionProjectRequestsApiMutation } from "src/hooks/mutations/useNotionProjectRequestsApi.mutation";
import { useSendProjectRequestEmailApiMutation } from "src/hooks/mutations/useSendProjectRequestEmailApi.mutation";
import { ActionTypes, EventTypes, trackEvent } from "src/lib/analytics";
import {
  EMAIL_VALIDATION_REGEX,
  PHONE_NUMBER_VALIDATION_REGEX,
} from "src/utils/regex";

export interface ProjectFormInputs {
  briefDescription: string;
  companyName: string;
  email: string;
  name: string;
  phone: string;
}

const defaultValues: ProjectFormInputs = {
  briefDescription: "",
  companyName: "",
  email: "",
  name: "",
  phone: "",
};

export const StartYourProjectForm = () => {
  const reCaptcha = useRef<ReCAPTCHA>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const useNotionProjectRequestsApi = useNotionProjectRequestsApiMutation();
  const useSendProjectRequestEmailApi = useSendProjectRequestEmailApiMutation();

  const submitToNotion: SubmitHandler<ProjectFormInputs> = async (data) => {
    clearErrors("email");

    if (reCaptcha && reCaptcha.current) {
      const captcha = await reCaptcha.current.executeAsync();

      if (captcha) {
        const { briefDescription, companyName, email, name, phone } = data;

        const emailToLowerCase = email.toLowerCase();

        await useNotionProjectRequestsApi.mutateAsync(
          {
            briefDescription,
            companyName,
            email: emailToLowerCase,
            name,
            phone,
          },
          {
            onSuccess: async (response) => {
              if (response.status === 409) {
                setError("email", {
                  message: "We have you in our client list already!",
                  type: "emailExists",
                });

                return false;
              }

              trackEvent({
                event: EventTypes.FormSubmit,
                properties: {
                  action: ActionTypes.StartProjectFormSubmitted,
                  category: "provisioner.start-your-project",
                  label: "Submitted Start Your Project Form",
                  value: true,
                },
              });

              await useSendProjectRequestEmailApi.mutateAsync({
                companyName,
                email: emailToLowerCase,
                name,
              });

              return true;
            },
          },
        );
      } else {
        if (submitRef.current) {
          submitRef.current.textContent = "You failed ReCAPTCHA ☹️";
          submitRef.current.disabled = true;
        }
      }
    }
  };

  const hasMissingFields =
    errors.phone ||
    errors.companyName ||
    (errors.email && errors.email?.type !== "emailExists");

  const emailExists = errors.email?.type === "emailExists";

  if (isSubmitSuccessful) {
    return (
      <div className={styles.formSubmitSuccess}>
        Thanks for the request! We can't wait to talk to you. Check your inbox
        in the next 24-48 hours. 🌱 💪🏼
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitToNotion)}>
      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        render={({ field: { onChange, value, name, ref } }) => (
          <LeafInput
            largeInput
            placeholder="Your name, please."
            ref={ref}
            name={name}
            onChange={onChange}
            value={value}
            hasError={errors.name}
            label="Your full name *"
            id="name"
          />
        )}
      />
      <Controller
        control={control}
        name="email"
        rules={{ required: true, pattern: EMAIL_VALIDATION_REGEX }}
        render={({ field: { onChange, value, name, ref } }) => (
          <LeafInput
            largeInput
            placeholder="Your email, please."
            ref={ref}
            name={name}
            onChange={(e) => {
              clearErrors("email");
              onChange(e);
            }}
            value={value}
            hasError={errors.email}
            label="Your email *"
            id="email"
          />
        )}
      />
      <Controller
        control={control}
        name="phone"
        rules={{ required: true, pattern: PHONE_NUMBER_VALIDATION_REGEX }}
        render={({ field: { onChange, value, name, ref } }) => (
          <LeafInput
            largeInput
            placeholder="Your phone number, please."
            ref={ref}
            name={name}
            onChange={onChange}
            value={value}
            hasError={errors.phone}
            label="Your digits *"
            id="phone"
          />
        )}
      />
      <Controller
        control={control}
        name="companyName"
        render={({ field: { onChange, value, name, ref } }) => (
          <LeafInput
            largeInput
            placeholder="Your company's name, please."
            ref={ref}
            name={name}
            onChange={onChange}
            value={value}
            hasError={errors.companyName}
            label="Your company name"
            id="companyName"
          />
        )}
      />
      <Controller
        control={control}
        name="briefDescription"
        render={({ field: { onChange, value, name, ref } }) => (
          <LeafTextArea
            largeInput
            placeholder="What can we help you with?"
            ref={ref}
            name={name}
            onChange={onChange}
            value={value}
            hasError={errors.briefDescription}
            label="Tell us a little about your needs"
            id="briefDescription"
          />
        )}
      />
      <div className={styles.formSubmitContainer}>
        <div>
          {emailExists ? <p>We already have you in our client list!</p> : null}
          {hasMissingFields ? (
            <p>You are missing some required fields!</p>
          ) : null}
        </div>
        <div>
          <LeafButton type="submit" ref={submitRef}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </LeafButton>
        </div>
      </div>
      <ReCAPTCHA
        ref={reCaptcha}
        size="invisible" // v3
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
      />
      <input type="submit" hidden />
    </form>
  );
};
