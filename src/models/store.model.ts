import ENUMS from "@/enums";
import mongoose from "mongoose";

export interface IStoreTime {
  isClosed: boolean;
  weekDay: string;
  opensAt: {
    hours: number;
    minutes: number;
    period: "AM" | "PM";
  };
  closesAt: {
    hours: number;
    minutes: number;
    period: "AM" | "PM";
  };
}

interface IStore extends Document {
  name: string;
  address: string;
  phoneNumber: number;
  email: string;
  timing: IStoreTime[];
  description: string;
}

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

  // timing is array of day wise times
  timing: {
    type: [
      {
        isClosed: Boolean,
        weekDay: {
          type: String,
          enum: Object.values(ENUMS.DAYS),
          required: [true, "weekDay is required"],
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
            enum: Object.values(ENUMS.PERIODS),
            required: [true, "Store opensAt period(AM/PM) is required"],
          },
        },
      },
    ],
    required: [true, "timing is required"],
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
