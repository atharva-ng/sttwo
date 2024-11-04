CREATE OR REPLACE FUNCTION getComments(comp_id INT, soc_id INT DEFAULT NULL, owner_id INT DEFAULT NULL)
RETURNS TABLE (id INT, complaint_id INT, society_id INT, room_transaction_id INT, "content" TEXT, created TIMESTAMP)
AS $$
BEGIN
    -- Ensure exactly one of soc_id or owner_id is provided
    IF (soc_id IS NULL AND owner_id IS NULL) OR (soc_id IS NOT NULL AND owner_id IS NOT NULL) THEN
        RAISE EXCEPTION 'Exactly one of soc_id or owner_id must be provided, not both or none';
    END IF;

    -- Main query with error handling
    BEGIN
        RETURN QUERY 
        SELECT comments.id, comments.complaint_id, comments.society_id, comments.room_transaction_id, comments.content, comments.created
        FROM comments
        WHERE comments.complaint_id = comp_id 
          AND ((soc_id IS NOT NULL AND comments.society_id = soc_id) OR 
               (owner_id IS NOT NULL AND comments.room_transaction_id = owner_id))
        ORDER BY created DESC;
    EXCEPTION
        WHEN others THEN
            -- Catch any unexpected errors and raise a custom message
            RAISE EXCEPTION 'An error occurred while retrieving comments for complaint ID %: %', comp_id, SQLERRM;
    END;
END;
$$ LANGUAGE plpgsql;
