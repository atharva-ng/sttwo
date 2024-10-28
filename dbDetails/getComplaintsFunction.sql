CREATE OR REPLACE FUNCTION getcomplaints(
    socid INT, 
    complaint_id INT DEFAULT NULL,
    active TEXT DEFAULT NULL,
    start_date TIMESTAMP DEFAULT NULL,
    end_date TIMESTAMP DEFAULT NULL,
    categoryId INT DEFAULT NULL
)
RETURNS TABLE (
    id INTEGER,
    room_transaction_id INTEGER,
    title VARCHAR,
    description TEXT,
    closedby INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    category_id INT
) AS $$
BEGIN
    IF active IS NULL THEN
        RETURN QUERY
        SELECT 
            complaintdetails.id,
            complaintdetails.room_transaction_id,
            complaintdetails.title,
            complaintdetails.description,
            complaintdetails.closedby,
            complaintdetails.created_at,
            complaintdetails.updated_at,
            complaintdetails.category_id
        FROM complaintdetails
        WHERE complaintdetails.society_id = socid
        AND (complaint_id IS NULL OR complaintdetails.id = complaint_id)
        AND (start_date IS NULL OR complaintdetails.created_at >= start_date)
        AND (end_date IS NULL OR complaintdetails.created_at <= end_date)
        AND (categoryId IS NULL OR complaintdetails.category_id = categoryId);
    ELSIF active = 'true' THEN
        RETURN QUERY
        SELECT 
            complaintdetails.id,
            complaintdetails.room_transaction_id,
            complaintdetails.title,
            complaintdetails.description,
            complaintdetails.closedby,
            complaintdetails.created_at,
            complaintdetails.updated_at,
            complaintdetails.category_id
        FROM complaintdetails
        WHERE complaintdetails.society_id = socid
        AND complaintdetails.closedby IS NULL
        AND (complaint_id IS NULL OR complaintdetails.id = complaint_id)
        AND (start_date IS NULL OR complaintdetails.created_at >= start_date)
        AND (end_date IS NULL OR complaintdetails.created_at <= end_date)
        AND (categoryId IS NULL OR complaintdetails.category_id = categoryId);
    ELSIF active = 'false' THEN
        RETURN QUERY
        SELECT 
            complaintdetails.id,
            complaintdetails.room_transaction_id,
            complaintdetails.title,
            complaintdetails.description,
            complaintdetails.closedby,
            complaintdetails.created_at,
            complaintdetails.updated_at,
            complaintdetails.category_id
        FROM complaintdetails
        WHERE complaintdetails.society_id = socid
        AND complaintdetails.closedby IS NOT NULL
        AND (complaint_id IS NULL OR complaintdetails.id = complaint_id)
        AND (start_date IS NULL OR complaintdetails.created_at >= start_date)
        AND (end_date IS NULL OR complaintdetails.created_at <= end_date)
        AND (categoryId IS NULL OR complaintdetails.category_id = categoryId);
    ELSE
        RAISE EXCEPTION 'Incorrect active status: % ', active;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'An error occurred while fetching complaints: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
