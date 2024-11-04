CREATE OR REPLACE FUNCTION deleteComment(
    p_comment_id    INTEGER,
    p_complaint_id INTEGER,
    p_soc_id INTEGER DEFAULT NULL,
    p_owner_id INTEGER DEFAULT NULL
    
) RETURNS VOID AS $$
BEGIN
    -- Check if the comment exists and the user has permission
    IF EXISTS (
        SELECT 1
        FROM comments
        WHERE comments.id=p_comment_id
            AND complaint_id = p_complaint_id
          AND society_id = p_soc_id
    ) THEN
        -- Delete the comment
        DELETE FROM comments
        WHERE comments.id=p_comment_id
            AND complaint_id = p_complaint_id
          AND society_id = p_soc_id;
    ELSE
        -- Check if the comment exists but the user lacks permission
        IF EXISTS (
            SELECT 1
            FROM comments
            WHERE comments.id=p_comment_id
            AND complaint_id = p_complaint_id
        ) THEN
            RAISE EXCEPTION 'You do not have permission to delete this comment'
                USING ERRCODE = 'P0001';
        ELSE
            RAISE EXCEPTION 'Comment does not exist'
                USING ERRCODE = 'P0002';
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;

