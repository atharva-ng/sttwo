const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const { createNoticeQuery, getNoticesQuery } = require("../dbUtils/communityCommunicationQuery");

const getNotices= async (req, res, next) => {
  const userId=req.userData.userId;
  var active=req.params.active;
  
  Number(active);
  
  try {
    var noticeData;
    if(!isNaN(active) && isFinite(active)){
      if (active>2147483647) {
        return next(new HttpError("Invalid Input1", 400));
      }

      noticeData = await getNoticesQuery(userId, null, active);
    }else if (typeof active === "string" || isNaN(active)){
      noticeData = await getNoticesQuery(userId, active, null);
    }else{
      return next(new HttpError("Invalid Input", 400));
    }

    if(noticeData.length===0){
      return res.status(200).json({
        "message": "No Notices Found"
      });
    }

    return res.status(200).json(noticeData);

  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }
}

const createNotice= async (req, res, next) => {
  const userId=req.userData.userId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const {title, content, start_date, end_date } = req.body;

  try {
    const noticeData = await createNoticeQuery(title, content, start_date, end_date, userId);
    return res.status(200).json({
        "title":title, 
    "content": content, 
    "start_date":start_date,
    "end_date":end_date
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }
};


exports.createNotice = createNotice;
exports.getNotices = getNotices;