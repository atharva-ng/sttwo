const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const { createNoticeQuery, getNoticesQuery, updateNoticeQuery } = require("../dbUtils/communityCommunicationQuery");

const getNotices= async (req, res, next) => {
  const userId=req.userData.userId;
  var active=req.params.active;
  
  Number(active);
  
  try {
    var noticeData;
    if(!isNaN(active) && isFinite(active)){
      if (active>2147483647) {
        return next(new HttpError("Invalid Input", 400));
      }

      noticeData = await getNoticesQuery(userId, null, active);
    }else if (typeof active === "string" || isNaN(active)){
      noticeData = await getNoticesQuery(userId, active, null);
    }else{
      return next(new HttpError("Invalid Input", 400));
    }

    if(noticeData.length===0){
      return res.status(404).json({
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
    return res.status(201).json({
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

const updateNotice=async (req, res, next)=>{
  const userId=req.userData.userId;
  const id=req.params.id;
  Number(id);
  if(id===NaN){
    return next(new HttpError("Id of the notice is invalid", 400));
  }

  const {title, content, start_date, end_date } = req.body;

  try{
    const noticeGetData = await getNoticesQuery(userId, null, id);
    if(noticeGetData.length===0){
      return next(new HttpError("Id of the notice is invalid", 404));
    }
  }catch(error){
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }

  try{
    const noticeData = await updateNoticeQuery(title, content, start_date, end_date, userId, id);
    return res.status(200).json({
      "title":noticeData[0].o_title, 
      "content": noticeData[0].o_content, 
      "start_date":noticeData[0].o_start_date,
      "end_date":noticeData[0].o_end_date
    });
  }catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }
}

exports.createNotice = createNotice;
exports.getNotices = getNotices;
exports.updateNotice=updateNotice;