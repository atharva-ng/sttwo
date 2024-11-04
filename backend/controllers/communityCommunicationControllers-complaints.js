const HttpError = require("../models/http-error");

const {createComplaintQuery, getComplaintsQuery, deleteComplaintQuery, updateComplaintQuery, createCommentQuery, getCommentsQuery, deleteCommentQuery } = require("../dbUtils/communityCommunicationQuery");


const getComplaints= async(req, res, next) => {
  const userId=req.userData.userId;

  try{
    var { active, start_date, end_date, category, complaintId } = req.query;
    if(active !== undefined &&(!(active === "true" || active === "false" ))) {
      return next(new HttpError("Invalid Input for active parameter", 400));
    }
    
    const queryParams = {
      socid: userId,
      complaintId: complaintId !== undefined ? Number(complaintId) : null,
      active: active !== undefined ? JSON.parse(active) : null,
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
      categoryId: category !== undefined ? Number(category) : null
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
  const userId= 68;
  
  try {
    const complaintId=await createComplaintQuery(userId,110,'title', 'description',4);
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
  const userId=req.userData.userId;
  const id=Number(req.params.id);
  if(id===NaN){
    return next(new HttpError("Id of the complaint is invalid and should be a number", 400));
  }

  try{
    const queryParams = {
      socid: userId,
      complaintId: id,
      active: null,
      start_date: null,
      end_date: null,
      categoryId: null
    };

    const complaintGetData = await getComplaintsQuery(queryParams);

    if(complaintGetData.length===0){
      return next(new HttpError("You do not have permission to delete this complaint", 403));
    }
    
  }catch(error){
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }

  try {
    const result=await deleteComplaintQuery(userId,id);
    return res.status(204).json({"message":"Successfully Deleted"});
  } catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      return next(new HttpError("Something went wrong-delete complaint", 500));
    }
  }
}

const updateComplaint = async (req, res, next) => {
  const userId=req.userData.userId;
  const id=Number(req.params.id);

  if(id===NaN){
    return next(new HttpError("Id of the Complaint is invalid and should be a number", 400));
  }
  
  try{
    const queryParams = {
      socid: userId,
      complaintId: id,
      title: null,
      description: null,
      categoryId: null
    };
    
    const complaintGetData = await getComplaintsQuery(queryParams);
    
    if(complaintGetData.length===0){
      return next(new HttpError("You do not have permission to update this complaint", 403));
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
    var { title, description, categoryId } = req.body;

    
    const queryParams = {
      socid: Number(userId),
      complaintId: id,
      title: title!== undefined? title : null,
      description: description!== undefined? description : null,
      categoryId: categoryId!== undefined? Number(categoryId) : null
    };
    
    const result = await updateComplaintQuery(queryParams);

    return res.status(200).json(result[0]);
  }catch(error){
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong-updateComplaint", 500));
    }
  }
}


const createComment=async (req, res, next) => {
  const userId=req.userData.userId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const {complaint_id, content}= req.body;

  try{
    const commentData = await createCommentQuery(complaint_id, content, userId);

    return res.status(201).json({"commentId": commentData});
  }catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }
} 

const getComments = async (req, res, next) => {
  const userId=req.userData.userId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const {complaint_id}= req.body;

  try{
    const commentData = await getCommentsQuery(complaint_id, userId);

    return res.status(200).json({"commentId": commentData});
  }catch (error) {
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong", 500));
    }
  }
}

const deleteComment = async (req, res, next) => {
  const userId=req.userData.userId;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid inputs passed, please check your data", 422);
    error.data = errors.array();
    return next(error);
  }

  const {complaint_id, comment_id}= req.body;

  if(complaint_id===NaN){
    return next(new HttpError("Id of the comment is invalid and should be a number", 400));
  }

  try{
    
    const commentGetData = await getCommentsQuery(complaint_id, userId);
    if(commentGetData.length===0){
      return next(new HttpError("You do not have permission to delete this comment", 403));
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
    await deleteCommentQuery(comment_id, complaint_id, userId);

    return res.status(200).json({"message":"Successfully Deleted"});
  }catch(error){
    if (error instanceof HttpError) {
      return next(error);
    } else {
      console.log(error);
      return next(new HttpError("Something went wrong-delete comment", 500));
    }
  }
}

// const updateComment = async (req, res, next) => {
//   const userId=req.userData.userId;
//   const {complaint_id}= req.body;

//   if(complaint_id===NaN){
//     return next(new HttpError("Id of the comment is invalid and should be a number", 400));
//   }

//   try{
//     const commentGetData = await getCommentsQuery(complaint_id, userId);
//     if(commentGetData.length===0){
//       return next(new HttpError("You do not have permission to update this comment", 403));
//     }
//   }catch(error){
//     if (error instanceof HttpError) {
//       return next(error);
//     } else {
//       console.log(error);
//       return next(new HttpError("Something went wrong", 500));
//     }
//   }
//   try{
//     var { content } = req.body;

//     const queryParams = {
//       userId: userId,
//       complaintId: complaint_id,
//       content: content
//     };
    
//     const result = await updateCommentQuery(queryParams);

//     return res.status(200).json(result[0]);
//   }catch(error){
//     if (error instanceof HttpError) {
//       return next(error);
//     } else {
//       console.log(error);
//       return next(new HttpError("Something went wrong-updateComplaint", 500));
//     }
//   }
// }

exports.createComplaint = createComplaint;
exports.getComplaints = getComplaints;
exports.deleteComplaint = deleteComplaint;
exports.updateComplaint = updateComplaint;

exports.createComment = createComment;
exports.getComments = getComments;
exports.deleteComment = deleteComment;
// exports.updateComment = updateComment;