import { IStore } from "@/types";
import mongoose from "mongoose";

const storeTimeSchema = new mongoose.Schema(
  {
    isClosed: {
      type: Boolean,
      default: false,
    },

    opensAt: {
      hours: {
        type: Number,
        required: [true, "Store opensAt hours is required"],
        min: [0, "Store opensAt hours should be more than 0"],
        max: [12, "Store opensAt hours should be less than 12"],
      },
      minutes: {
        type: Number,
        required: [true, "Store opensAt minutes is required"],
        min: [0, "Store opensAt minutes should be more than 0"],
        max: [59, "Store opensAt minutes should be less than 59"],
      },
      period: {
        type: String,
        required: [true, "Store opensAt period(AM/PM) is required"],
      },
    },

    closesAt: {
      hours: {
        type: Number,
        required: [true, "Store opensAt hours is required"],
        min: [0, "Store opensAt hours should be more than 0"],
        max: [12, "Store opensAt hours should be less than 12"],
      },
      minutes: {
        type: Number,
        required: [true, "Store opensAt minutes is required"],
        min: [0, "Store opensAt minutes should be more than 0"],
        max: [59, "Store opensAt minutes should be less than 59"],
      },
      period: {
        type: String,
        required: [true, "Store opensAt period(AM/PM) is required"],
      },
    },
  },
  { _id: false },
);

const storeSchema = new mongoose.Schema<IStore>({
  name: {
    type: String,
    requied: [true, "Store name is required"],
    minlength: [
      8,
      "Store name should be minimum 8 charecters long, got {VALUE}",
    ],
    maxlength: [
      80,
      "Store name should be maximum 80 charecters long, got {VALUE}",
    ],
  },

  address: {
    type: String,
    required: [true, "Store address is required"],
    minlength: [
      8,
      "Store address should be minimum 8 charecters long, got {VALUE}",
    ],
    maxlength: [
      80,
      "Store address should be maximum 80 charecters long, got {VALUE}",
    ],
  },

  phoneNumber: {
    type: String,
    required: [true, "Store phoneNumber is required"],
    minlength: [
      10,
      "phoneNumber should be minimum 10 digits long, got {VALUE}",
    ],
    maxlength: [
      10,
      "phoneNumber should be maximum 10 digits long, got {VALUE}",
    ],
  },

  // timing day wise
  timing: {
    type: {
      monday: {
        type: storeTimeSchema,
      },
      tuesday: {
        type: storeTimeSchema,
      },
      wednessday: {
        type: storeTimeSchema,
      },
      thursday: {
        type: storeTimeSchema,
      },
      friday: {
        type: storeTimeSchema,
      },
      saturday: {
        type: storeTimeSchema,
      },
      sunday: {
        type: storeTimeSchema,
      },
    },
  },

  description: {
    type: String,
    required: [true, "Store description is required"],
    minlength: [
      8,
      "Store description should be minimum 8 charactors long, got {VALUE}",
    ],
    maxlength: [
      500,
      "Store description should be maximum 500 charactors long, got {VALUE}",
    ],
  },
});

const StoreModel = mongoose.model<IStore>("Store", storeSchema);

export default StoreModel;
