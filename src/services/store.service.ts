import enums from "@/enums";

import StoreModel, { IStoreTime, ITime } from "@/models/store.model";
import compareTime from "@/utils/compareTime";

const create = async (
  name: string,
  address: string,
  phoneNumber: string,
  email: string,
  timing: string,
  description: string,
) => {
  const store = await StoreModel.create({
    name,
    address,
    phoneNumber,
    email,
    timing,
    description,
  });

  return store;
};

const getAll = async () => {
  const stores = await StoreModel.find();
  return stores;
};

const getById = async (id: string) => {
  const store = await StoreModel.findById(id);
  return store;
};

const getStoreStatus = (storeTiming: {
  monday: IStoreTime;
  tuesday: IStoreTime;
  wednessday: IStoreTime;
  thursday: IStoreTime;
  friday: IStoreTime;
  saturday: IStoreTime;
  sunday: IStoreTime;
}) => {
  const currentDay = new Date().getDay();
  const currentTime: ITime = {
    hours: new Date().getHours() % 12,
    minutes: new Date().getMinutes(),
    period: new Date().getHours() >= 12 ? "PM" : "AM",
  };

  const index = enums.DAYS[(currentDay + 1) % 7].toLowerCase();
  const currentDayStoreTiming = storeTiming[index as keyof typeof storeTiming];

  let storeCurrentStatus = "";

  if (compareTime(currentTime, currentDayStoreTiming.opensAt) === -1) {
    storeCurrentStatus = `Closed - Opens ${currentDayStoreTiming.opensAt.hours}`;
  } else if (
    compareTime(currentTime, currentDayStoreTiming.opensAt) >= 0 &&
    compareTime(currentTime, currentDayStoreTiming.closesAt) === -1
  ) {
    storeCurrentStatus = `Open - Closes ${currentDayStoreTiming.closesAt.hours}`;
  } else {
    storeCurrentStatus = `Closed - Opens Next Day ${currentDayStoreTiming.closesAt.hours}`;
  }

  return storeCurrentStatus;
};

export default {
  create,
  getAll,
  getById,
  getStoreStatus,
};
