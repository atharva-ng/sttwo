CREATE OR REPLACE FUNCTION updateComplaints(
    socid INTEGER,
    complaint_id INTEGER,
    new_title VARCHAR(100) DEFAULT NULL,
    new_description TEXT DEFAULT NULL,
    new_category_id INTEGER DEFAULT NULL
) RETURNS TABLE (
    title VARCHAR,
    description TEXT,
    category_id INTEGER
) AS $$

BEGIN
    -- Attempt to update the complaint details and return the updated row
    RETURN QUERY
    UPDATE complaintdetails
    SET title = COALESCE(new_title, complaintdetails.title),
        description = COALESCE(new_description, complaintdetails.description),
        category_id = COALESCE(new_category_id, complaintdetails.category_id),
        updated_at = CURRENT_TIMESTAMP
    WHERE complaintdetails.society_id = socid AND id = complaint_id
    RETURNING complaintdetails.title, complaintdetails.description, complaintdetails.category_id ;
--     INTO title, description, category_id;

    -- Check if any row was updated
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No complaint found with society_id = % and id = %', socid, complaint_id;
    END IF;

    -- Return the updated values
    RETURN;

EXCEPTION
    WHEN OTHERS THEN
        -- Catch any unexpected errors
        RAISE NOTICE 'An error occurred: %', SQLERRM;
        RETURN;
END;
$$ LANGUAGE plpgsql;
