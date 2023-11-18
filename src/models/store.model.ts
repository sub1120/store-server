import ENUMS from "@/enums";
import mongoose from "mongoose";

export interface ITime {
  hours: number;
  minutes: number;
  period: keyof typeof ENUMS.PERIODS;
}

export interface IStoreTime {
  isClosed: boolean;
  opensAt: ITime;
  closesAt: ITime;
}

export interface IStore extends Document {
  name: string;
  address: string;
  phoneNumber: number;
  email: string;
  timing: {
    monday: IStoreTime;
    tuesday: IStoreTime;
    wednessday: IStoreTime;
    thursday: IStoreTime;
    friday: IStoreTime;
    saturday: IStoreTime;
    sunday: IStoreTime;
  };
  description: string;
}

const storeTimeSchema = new mongoose.Schema<IStoreTime>({
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
});

const storeSchema = new mongoose.Schema<IStore>({
  name: {
    type: String,
    requied: [true, "Store name is required"],
  },

  address: {
    type: String,
    required: [true, "Store address is required"],
  },

  phoneNumber: {
    type: Number,
    required: [true, "Store phoneNumber is required"],
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
    minlength: [8, "Store description should be minimum 8 charactors long"],
    maxlength: [500, "Store description should be maximum 500 charactors long"],
  },
});

const StoreModel = mongoose.model<IStore>("Store", storeSchema);

export default StoreModel;
