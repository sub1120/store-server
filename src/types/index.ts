import { z } from "zod";

import storeValidation from "@/validations/store.validation";

export interface IStore extends Document {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  timing: {
    monday: StoreTimingType;
    tuesday: StoreTimingType;
    wednessday: StoreTimingType;
    thursday: StoreTimingType;
    friday: StoreTimingType;
    saturday: StoreTimingType;
    sunday: StoreTimingType;
  };
  description: string;
}

export type StoreType = z.infer<typeof storeValidation.storeSchema>["body"];
export type StoreTimingType = z.infer<typeof storeValidation.storeTimingSchema>;
export type TimeType = z.infer<typeof storeValidation.timeSchema>;
