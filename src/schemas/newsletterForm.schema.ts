import { EMAIL_VALIDATION_REGEX } from "src/utils/regex";
import { z } from "zod";

export const newsletterFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is invalid." })
    .regex(EMAIL_VALIDATION_REGEX, { message: "Email is invalid." }),
});

export type NewsletterFormInputs = z.infer<typeof newsletterFormSchema>;
