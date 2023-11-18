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

    description: z
      .string({
        required_error: "Store description is required",
        invalid_type_error: "Store description should be type string",
      })
      .min(8, "Store description must be at least 8 characters")
      .max(500, "Store description cannot be more than 500 characters")
      .trim(),
  }),
});

type CreateStoreSchemaType = z.infer<typeof createStoreSchema>["body"];

export default { createStoreSchema };
export type { CreateStoreSchemaType };
