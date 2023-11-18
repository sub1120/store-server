import ENUMS from "@/enums";
import { z } from "zod";

const createStoreSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Store name is required",
        invalid_type_error: "Store name must be a string",
      })
      .min(5, {
        message: "First name must be at least 5 characters",
      })
      .max(80, "First name cannot be more than 80 characters")
      .trim(),

    address: z
      .string({
        required_error: "Store address is required",
        invalid_type_error: "Store address must be a string",
      })
      .min(5, {
        message: "Store address must be at least 5 characters",
      })
      .max(160, "Store address cannot be more than 160 characters")
      .trim(),

    phoneNumber: z
      .string({
        required_error: "Store phoneNumber is required",
        invalid_type_error: "Store phoneNumber must be a string",
      })
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(15, {
        message: "Phone number cannot exceed 15 digits",
      }),

    email: z
      .string({
        invalid_type_error: "Email must be a string",
        required_error: "Email is required",
      })
      .email({
        message: "Invalid email",
      }),

    timing: z
      .array(
        z.object(
          {
            isClosed: z
              .boolean({
                invalid_type_error: "opensAt hours must be a boolean",
              })
              .optional(),
            weekDay: z.enum([
              ...(Object.values(ENUMS.DAYS) as [string, ...string[]]),
            ]),
            opensAt: z.object({
              hours: z
                .number({
                  required_error: "opensAt hours is required",
                  invalid_type_error: "opensAt hours must be a number",
                })
                .gte(0, { message: "opensAt hours cannot be less than 0" })
                .lte(12, { message: "opensAt hours cannot be more than 12" }),

              minutes: z
                .number({
                  required_error: "opensAt minutes is required",
                  invalid_type_error: "opensAt minutes must be a number",
                })
                .gte(0, { message: "opensAt minutes cannot be less than 0" })
                .lte(59, { message: "opensAt minutes cannot be more than 59" }),

              period: z.enum(
                Object.values(ENUMS.PERIODS) as [string, ...string[]],
                {
                  required_error: "opensAt period is required",
                  invalid_type_error: `opensAt period must be one of ${Object.values(
                    ENUMS.PERIODS,
                  )}`,
                },
              ),
            }),

            closesAt: z.object({
              hours: z
                .number({
                  required_error: "closesAt hours is required",
                  invalid_type_error: "closesAt hours must be a number",
                })
                .gte(0, { message: "closesAt hours cannot be less than 0" })
                .lte(12, { message: "closesAt hours cannot be more than 12" }),

              minutes: z
                .number({
                  required_error: "closesAt minutes is required",
                  invalid_type_error: "closesAt minutes must be a number",
                })
                .gte(0, { message: "closesAt minutes cannot be less than 0" })
                .lte(59, {
                  message: "closesAt minutes cannot be more than 59",
                }),

              period: z.enum(
                Object.values(ENUMS.PERIODS) as [string, ...string[]],
                {
                  required_error: "closesAt period is required",
                  invalid_type_error: `closesAt period must be one of ${ENUMS.PERIODS}`,
                },
              ),
            }),
          },
          {
            invalid_type_error: `Each item in timing array should be an object eg. {"weekDay":"MONDAY', "opensAt": {"hours": 12, "minutes": 0, "period": "PM'}, "closesAt":  {"hours": 9, "minutes": 0, "period": "PM"} }`,
          },
        ),
        {
          required_error: "timing is required",
          invalid_type_error: "timing should be an array",
        },
      )
      .nonempty({
        message: "timing array cannot be empty",
      }),
  }),
});

type CreateStoreSchemaType = z.infer<typeof createStoreSchema>["body"];

export default { createStoreSchema };
export type { CreateStoreSchemaType };
