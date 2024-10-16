CREATE OR REPLACE FUNCTION getcomplaints(
    socid INT, 
    active BOOLEAN DEFAULT NULL,
    start_date TIMESTAMP DEFAULT NULL,
    end_date TIMESTAMP DEFAULT NULL
)
RETURNS TABLE (
    id INTEGER,
    room_transaction_id INTEGER,
    title VARCHAR,
    description TEXT,
    closedby INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
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
            complaintdetails.updated_at
        FROM complaintdetails
        WHERE complaintdetails.society_id = socid
        AND (start_date IS NULL OR complaintdetails.created_at >= start_date)
        AND (end_date IS NULL OR complaintdetails.created_at <= end_date);
    ELSIF active = TRUE THEN
        RETURN QUERY
        SELECT 
            complaintdetails.id,
            complaintdetails.room_transaction_id,
            complaintdetails.title,
            complaintdetails.description,
            complaintdetails.closedby,
            complaintdetails.created_at,
            complaintdetails.updated_at
        FROM complaintdetails
        WHERE complaintdetails.society_id = socid
        AND complaintdetails.closedby IS NULL
        AND (start_date IS NULL OR complaintdetails.created_at >= start_date)
        AND (end_date IS NULL OR complaintdetails.created_at <= end_date);
    ELSIF active = FALSE THEN
        RETURN QUERY
        SELECT 
            complaintdetails.id,
            complaintdetails.room_transaction_id,
            complaintdetails.title,
            complaintdetails.description,
            complaintdetails.closedby,
            complaintdetails.created_at,
            complaintdetails.updated_at
        FROM complaintdetails
        WHERE complaintdetails.society_id = socid
        AND complaintdetails.closedby IS NOT NULL
        AND (start_date IS NULL OR complaintdetails.created_at >= start_date)
        AND (end_date IS NULL OR complaintdetails.created_at <= end_date);
    ELSE
        RAISE EXCEPTION 'Incorrect active status: % ', active;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'An error occurred while fetching complaints: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
