const HttpError = require("../models/http-error");

//Notices Start================================================================================================
const createNoticeQuery = async (client,title, content, start_date, end_date, userId, categoryId) => {
  try {
    const result = await client.query('CALL createNotice($1,$2,$3,$4,$5,$6, $7);', [
      title, content, start_date, end_date, userId, categoryId, null
    ]);
    
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-createNoticeQuery", 500);
    }
  }
};

const getNoticesQuery = async (client, queryParams) => {
  try {
    const result = await client.query('SELECT * FROM getnotices($1, $2, $3, $4, $5, $6);', [
      queryParams.socid,
      queryParams.id,
      queryParams.active,
      queryParams.start_date,
      queryParams.end_date,
      queryParams.categoryId
    ]);
    
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-getNoticesQuery", 500);
    }
  }
};

const getNoticeCategoriesQuery = async (client) => {
  try {
    const result = await client.query('select * from get_notice_categories();');
    
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-getNoticeCategoriesQuery", 500);
    }
  }
};

const updateNoticeQuery = async (client, title, content, start_date, end_date, userId, id, categoryId) => {
  try {
    const result = await client.query('SELECT * FROM updatenotice($1, $2, $3, $4, $5, $6, $7);', [
      id,
      userId,
      title,
      content,
      start_date,
      end_date,
      categoryId
    ]);
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-updateNoticesQuery", 500);
    }
  }
};

const deleteNoticeQuery=async (client, id, userId)=>{
  try{
    const result = await client.query('SELECT * FROM deletenotice($1, $2);', [
      id,
      userId
    ]);
  }catch(error){
    if (error instanceof HttpError) {
      throw error;
    } else {
      if(error.length==176){
        throw new HttpError("You do not have permission to delete this notice", 403);
      }else if(error.length===149){
        throw new HttpError("Notice does not exist", 404);
      }
      throw new HttpError("Something went wrong-deleteNoticesQuery", 500);
    }
  }
}

//Notices End================================================================================================

//Complaints Start===========================================================================================
const getComplaintsQuery = async (client, queryParams) => {
  try {
    const result = await client.query('SELECT * FROM getcomplaints($1, $2, $3, $4, $5, $6);', [
      queryParams.socid, 
      queryParams.complaintId,
      queryParams.active,
      queryParams.start_date, 
      queryParams.end_date,
      queryParams.categoryId
    ]);
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-getComplaintsQuery", 500);
    }
  }
};
const createComplaintQuery = async (client, soc_id, room_transaction_id,title, description, categoryId) => {
  try {
    const result = await client.query('SELECT * FROM insert_complaint($1,$2,$3,$4,$5);', [
      soc_id, 
      room_transaction_id,
      title, 
      description,
      categoryId
    ]);
    return result.rows[0].insert_complaint;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-createComplaintQuery", 500);
    }
  }
};

const deleteComplaintQuery = async (client, soc_id, comp_id)=>{
  try {
    const result = await client.query('SELECT * FROM deleteComplaint($1,$2);', [soc_id,comp_id]);
    return result;
  } catch (error) {
      throw new HttpError("Something went wrong-createComplaintQuery", 500);
  }
}

const updateComplaintQuery = async (client, queryParams) => {
  
  try {
    const result = await client.query('SELECT * FROM updateComplaints($1, $2, $3, $4, $5);', [
      queryParams.socid,
      queryParams.complaintId,
      queryParams.title,
      queryParams.description,
      queryParams.categoryId
    ]);
    
    return result.rows;
  } catch (error) {
      throw new HttpError("Something went wrong-updateComplaintQuery", 500);
  }
};

//Complaints End================================================================================================

//Comments Start================================================================================================
const createCommentQuery = async (client, complaint_id, content, society_id) => {
  try {
    const result = await client.query('SELECT * FROM createComment($1, $2, $3);', [
      complaint_id,
      content,
      society_id
    ]);
    return result.rows[0].createcomment;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-createCommentQuery", 500);
    }
  }
};

const getCommentsQuery=async (client, complaint_id, userId)=>{
  try {
    const result = await client.query('SELECT * FROM getComments($1, $2);', [
      complaint_id,
      userId
    ]);
    
    return result.rows;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    } else {
      console.log(error);
      throw new HttpError("Something went wrong-createCommentQuery", 500);
    }
  }
}

// const updateCommentQuery= async(queryParams)=>{
//   try {
//     const result = await pool.query('SELECT * FROM updateComment($1, $2, $3);', [
//       queryParams.complaint_id,
//       queryParams.userId,
//       queryParams.content
//     ]);
//     return result.rows;
//   } catch (error) {
//     if (error instanceof HttpError) {
//       throw error;
//     } else {
//       console.log(error);
//       throw new HttpError("Something went wrong-createCommentQuery", 500);
//     }
//   }
// }


const deleteCommentQuery=async (client, comment_id, complaint_id, userId)=>{
  try{
    const result = await client.query('SELECT * FROM deleteComment($1, $2, $3);', [
      comment_id,
      complaint_id,
      userId
    ]);
  }catch(error){
    if (error instanceof HttpError) {
      throw error;
    } else {
      console.log(error);
      if(error.length==176){
        throw new HttpError("You do not have permission to delete this comment", 403);
      }else if(error.length===149){
        throw new HttpError("Comment does not exist", 404);
      }
      throw new HttpError("Something went wrong-deleteCommentQuery", 500);
    }
  }
}
//Comments End====================================================================================================

module.exports = { createNoticeQuery, getNoticesQuery, getNoticeCategoriesQuery, updateNoticeQuery, deleteNoticeQuery, createComplaintQuery, getComplaintsQuery, deleteComplaintQuery, updateComplaintQuery, createCommentQuery, getCommentsQuery, deleteCommentQuery};


