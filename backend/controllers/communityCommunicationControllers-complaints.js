const HttpError = require("../models/http-error");

// const { validationResult } = require("express-validator");

const {createComplaintQuery, getComplaintsQuery, deleteComplaintQuery } = require("../dbUtils/communityCommunicationQuery");

const getComplaints= async(req, res, next) => {
  // const userId=req.userData.userId;

  try{
    const { socid, active, start_date, end_date } = req.query;
    if(active !== undefined &&(!(active === "true" || active === "false" ))) {
      return next(new HttpError("Invalid Input for active parameter", 400));
    }
    const queryParams = {
      socid: socid,
      active: active !== undefined ? JSON.parse(active) : null,
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null
    };
    const result= await getComplaintsQuery(queryParams);
    return res.status(200).json({"complaints":result});
  }catch(error){
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong-getComplaints", 500));
    }
  }
}

const createComplaint= async (req, res, next) => {
  // const userId=req.userData.userId;
  const userId= 75;
  
  try {
    const complaintId=await createComplaintQuery(userId,110,'title', 'description');
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

const deleteComplaint = async (req, res, next) => {
  // const userId=req.userData.userId;
  const userId= 75;
  
  try {
    const result=await deleteComplaintQuery(userId,110,'title', 'description');
    return res.status(201).json({"message":"Successfully Deleted"});
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong-delete complaint", 500));
    }
  }
}

// complaint_id
// society_id
// room_transaction_id
// content

const createComment=async (req, res, next) => {
  const userId=req.userData.userId;
  const {complaint_id, society_id, room_transaction_id, content}= req.body;

  try{
    const complaintData = await createCommentQuery(userId, complaint_id, society_id, room_transaction_id, content);
    return res.status(200).json({"message": "Success"});
  }catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }
} 

exports.createComplaint = createComplaint;
exports.getComplaints = getComplaints;
exports.deleteComplaint = deleteComplaint;
exports.createComment = createComment;
