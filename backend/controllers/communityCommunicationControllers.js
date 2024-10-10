const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const { createNoticeQuery } = require("../dbUtils/communityCommunicationQuery");

const createNotice= async (req, res, next) => {
  try{
    const userId = req.userData.userId;
    if(userId === null){
      throw HttpError("Authentication Failed", 401);
    }
  }catch(error){
    if (err instanceof HttpError) {
      return next(err);
    } else {
      console.log(err);
      return next(new HttpError("Something went wrong", 500));
    }
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const {title, content, start_date, end_date } = req.body;

  try {
    const noticeData = await createNoticeQuery(title, content, start_date, end_date, userId);
    return res.status(200).json();
  } catch (error) {
    if (err instanceof HttpError) {
      return next(err);
    } else {
      console.log(err);
      return next(new HttpError("Something went wrong", 500));
    }
  }
};



exports.createNotice = createNotice;