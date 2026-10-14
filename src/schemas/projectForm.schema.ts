import {
  EMAIL_VALIDATION_REGEX,
  PHONE_NUMBER_VALIDATION_REGEX,
} from "src/utils/regex";
import { z } from "zod";

export const projectFormSchema = z.object({
  briefDescription: z.string(),
  companyName: z.string(),
  email: z
    .string()
    .min(1)
    .regex(EMAIL_VALIDATION_REGEX, { message: "Invalid email." }),
  jobTitle: z.string(),
  marketingConsent: z.boolean(),
  name: z.string().min(1),
  phone: z
    .string()
    .min(1)
    .regex(PHONE_NUMBER_VALIDATION_REGEX, { message: "Invalid phone." }),
  trafficSource: z.string(),
});

export type ProjectFormInputs = z.infer<typeof projectFormSchema>;
