import enums from "@/enums";
import { z } from "zod";

const timeSchema = z.object({
  hours: z
    .number({
      required_error: "hours is required",
      invalid_type_error: "hours must be a number",
    })
    .min(0, "hours can be aleast 0")
    .max(12, "hours cannot exceed 12"),

  minutes: z
    .number({
      required_error: "minutes is required",
      invalid_type_error: "minutes must be a number",
    })
    .min(0, "minutes can be aleast 0")
    .max(59, "minutes cannot exceed 59"),

  period: z.enum([enums.PERIODS.AM, enums.PERIODS.PM], {
    required_error: "period is required",
    invalid_type_error: `period must be one of ${
      (enums.PERIODS.AM, enums.PERIODS.PM)
    }`,
  }),
});

const storeTimingSchema = z.object({
  isClosed: z
    .boolean({
      invalid_type_error: "isClosed must be a boolean",
    })
    .optional(),

  opensAt: timeSchema,
  closesAt: timeSchema,
});

const storeSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Store name is required",
        invalid_type_error: "Store name must be a string",
      })
      .min(8, "First name must be at least 8 characters")
      .max(80, "First name cannot be more than 80 characters")
      .trim(),

    address: z
      .string({
        required_error: "Store address is required",
        invalid_type_error: "Store address must be a string",
      })
      .min(8, "Store address must be at least 8 characters")
      .max(80, "Store address cannot be more than 80 characters")
      .trim(),

    phoneNumber: z
      .string({
        required_error: "Store phoneNumber is required",
        invalid_type_error: "Store phoneNumber must be a string",
      })
      .min(10, "Phone number must be at least 10 digits")
      .max(10, "Phone number cannot exceed 10 digits")
      .trim(),

    email: z
      .string({
        invalid_type_error: "Email must be a string",
        required_error: "Email is required",
      })
      .email("Invalid email")
      .trim(),

    description: z
      .string({
        required_error: "Store description is required",
        invalid_type_error: "Store description should be type string",
      })
      .min(8, "Store description must be at least 8 characters")
      .max(500, "Store description cannot be more than 500 characters")
      .trim(),

    timing: z.object(
      {
        monday: storeTimingSchema,
        tuesday: storeTimingSchema,
        wednessday: storeTimingSchema,
        thursday: storeTimingSchema,
        friday: storeTimingSchema,
        saturday: storeTimingSchema,
        sunday: storeTimingSchema,
      },
      {
        required_error: "Store timing is required",
        invalid_type_error: "Store timing must be an object",
      },
    ),
  }),
});

export default { storeSchema, storeTimingSchema, timeSchema };
