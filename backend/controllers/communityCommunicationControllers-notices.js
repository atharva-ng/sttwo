const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");

const { createNoticeQuery, getNoticesQuery, getNoticeCategoriesQuery, updateNoticeQuery, deleteNoticeQuery } = require("../dbUtils/communityCommunicationQuery");

const getNotices= async (req, res, next) => {
  const userId=req.userData.userId;

  const { id, active, start_date, end_date, categoryId } = req.query;

  if(active !== undefined &&(!(active === "true" || active === "false" ))) {
    return next(new HttpError("Invalid Input for active parameter", 400));
  }

  var categoryData;
  try{
    categoryData= await getNoticeCategoriesQuery();
  }catch(error){
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }
  
  try {
    const queryParams = {
      socid: userId,
      id: id !== undefined ? Number(id) : null,
      active: active !== undefined ? JSON.parse(active) : null,
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
      categoryId: categoryId !== undefined ? Number(categoryId) : null
    };

    const noticeData= await getNoticesQuery(queryParams);

    if(noticeData.length===0){
      return res.status(404).json({
        "categories":categoryData,
        "notices": "No Notices Found for the given filters"
      });
    }

    return res.status(200).json({
      "categories":categoryData,
      "notices":noticeData
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

const createNotice= async (req, res, next) => {
  const userId=req.userData.userId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const {title, content, start_date, end_date, categoryId } = req.body;
  try {
    const noticeData = await createNoticeQuery(title, content, start_date, end_date, userId, categoryId);
    console.log(noticeData);
    return res.status(201).json({
        "title":title, 
    "content": content, 
    "start_date":start_date,
    "end_date":end_date,
    "category":categoryId
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
  const id=Number(req.params.id);
  if(id==NaN){
    return next(new HttpError("Id of the notice is invalid", 400));
  }

  try{
    const queryParams = {
      socid: userId,
      id: id !== undefined ? Number(id) : null,
      active: null,
      start_date: null,
      end_date: null,
      categoryId: null
    };
    const noticeGetData = await getNoticesQuery(queryParams);
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

  const {title, content, start_date, end_date, categoryId } = req.body;
  
  try{
    const noticeData = await updateNoticeQuery(title, content, start_date, end_date, userId, id, categoryId);

    return res.status(200).json({
      "title":noticeData[0].o_title, 
      "content": noticeData[0].o_content, 
      "start_date":noticeData[0].o_start_date,
      "end_date":noticeData[0].o_end_date,
      "category":noticeData[0].o_category
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

const deleteNotice=async (req, res, next)=>{
  const userId=req.userData.userId;
  const id=Number(req.params.id);
  if(id===NaN){
    return next(new HttpError("Id of the notice is invalid and should be a number", 400));
  }

  try{
    const noticeGetData = await getNoticesQuery(userId, null, id);
    if(noticeGetData.length===0){
      return next(new HttpError("You do not have permission to delete this notice", 403));
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
    const noticeData = await deleteNoticeQuery(id, userId);
    return res.status(200).json({
      "message":"Successfully Deleted"
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
exports.deleteNotice=deleteNotice;