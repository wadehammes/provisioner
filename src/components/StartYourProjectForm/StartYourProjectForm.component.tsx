"use client";

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import LeafButton from "src/components/LeafButton/LeafButton.component";
import LeafInput from "src/components/LeafInput/LeafInput.component";
import LeafTextArea from "src/components/LeafInput/LeafTextArea.component";
import styles from "src/components/StartYourProjectForm/StartYourProjectForm.module.css";
import { showToast } from "src/components/Toast/showToast";
import { useHubspotLeadGenerationFormApiMutation } from "src/hooks/mutations/useHubspotLeadGenerationFormApi.mutation";
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
  marketingConsent: boolean;
  name: string;
  phone: string;
}

const defaultValues: ProjectFormInputs = {
  briefDescription: "",
  companyName: "",
  email: "",
  marketingConsent: true,
  name: "",
  phone: "",
};

export const StartYourProjectForm = () => {
  const reCaptcha = useRef<ReCAPTCHA>(null);
  const {
    handleSubmit,
    control,
    clearErrors,
    reset,
    register,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const useHubspotLeadGenerationApi = useHubspotLeadGenerationFormApiMutation();
  const useSendProjectRequestEmailApi = useSendProjectRequestEmailApiMutation();

  const submitToNotion: SubmitHandler<ProjectFormInputs> = async (data) => {
    clearErrors("email");

    if (reCaptcha?.current) {
      const captcha = await reCaptcha.current.executeAsync();

      if (captcha) {
        const { briefDescription, companyName, email, name, phone } = data;

        const emailToLowerCase = email.toLowerCase();

        try {
          await useHubspotLeadGenerationApi.mutateAsync(
            {
              briefDescription,
              companyName,
              email: emailToLowerCase,
              name,
              phone,
            },
            {
              onSuccess: async (response) => {
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
        } catch (_e) {
          showToast({
            type: "error",
            content: "Failed to submit project request. Please try again.",
          });

          return true;
        }
      } else {
        showToast({
          type: "error",
          content: "Error with reCAPTCHA, refresh and try again.",
        });

        reset();

        return true;
      }
    }
  };

  const hasMissingFields = errors.phone || errors.companyName;

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
      <div className={styles.marketingConsentContainer}>
        <label htmlFor="marketingConsent" className={styles.marketingConsent}>
          <input
            {...register("marketingConsent")}
            type="checkbox"
            id="marketingConsent"
          />
          Join our email/newsletter list and receive future updates from us
        </label>
      </div>
      <div className={styles.formSubmitContainer}>
        <div>
          {hasMissingFields ? (
            <p>You are missing some required fields!</p>
          ) : null}
        </div>
        <div>
          <LeafButton type="submit" isDisabled={isSubmitting}>
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
