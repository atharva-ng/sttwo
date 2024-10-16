const HttpError = require("../models/http-error");

// const { validationResult } = require("express-validator");

const {createComplaintQuery } = require("../dbUtils/communityCommunicationQuery");

const createComplaint= async (req, res, next) => {
  const userId=req.userData.userId;
  
  try {
    const complaintId=await createComplaintQuery(75,110,'title', 'description', 'Open');
    return res.status(201).json({"complaintId":complaintId});
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong-createComplaint", 500));
    }
  }
}

exports.createComplaint = createComplaint;

