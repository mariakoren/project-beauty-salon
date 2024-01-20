import Time from "../models/times.js";
import Service from "../models/service.js";
import { createError } from "../utils/error.js";

export const createTime = async (req, res, next) => {
  const serviceId = req.params.serviceid;
  const newTime = new Time(req.body);

  try {
    const savedTime = await newTime.save();
    try {
      await Service.findByIdAndUpdate(serviceId, {
        $push: { times: savedTime._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedTime);
  } catch (err) {
    next(err);
  }
};


export const updateTime = async (req, res, next) => {
  try {
    const updatedTime = await Time.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTime);
  } catch (err) {
    next(err);
  }
};

export const updateTimeAvailability = async (req, res, next) => {
    try {
      await Time.updateOne(
        { "timeNumber._id": req.params.id },
        {
          $push: {
            "timeNumber.$.unavailableDates": req.body.date
          },
        }
      );
      res.status(200).json("Time status has been updated.");
    } catch (err) {
      next(err);
    }
  };

export const deleteTime = async (req, res, next) => {
  const serviceId = req.params.serviceid;
  try {
    await Time.findByIdAndDelete(req.params.id);
    try {
      await Service.findByIdAndUpdate(serviceId, {
        $pull: { times: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Time has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getTime = async (req, res, next) => {
  try {
    const time = await Time.findById(req.params.id);
    res.status(200).json(time);
  } catch (err) {
    next(err);
  }
};
export const getTimes = async (req, res, next) => {
  try {
    const times = await Time.find();
    res.status(200).json(times);
  } catch (err) {
    next(err);
  }
};

export const removeTimeAvailability = async (req, res, next) => {
  try {
    await Time.updateOne(
      { "timeNumber._id": req.params.id },
      {
        $pull: {
          "timeNumber.$.unavailableDates": req.body.date
        },
      }
    );
    res.status(200).json("Time status has been updated.");
  } catch (err) {
    next(err);
  }
};