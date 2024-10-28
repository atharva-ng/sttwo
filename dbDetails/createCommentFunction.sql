CREATE OR REPLACE FUNCTION createComment(
    p_complaint_id INTEGER,
    p_content TEXT,
    p_society_id INTEGER DEFAULT NULL,
    p_room_transaction_id INTEGER DEFAULT NULL
)
RETURNS INTEGER AS $$
DECLARE
    v_new_comment_id INTEGER;
BEGIN
    IF p_complaint_id IS NULL THEN
        RAISE EXCEPTION 'complaint_id cannot be null';
    END IF;

    IF p_content IS NULL OR p_content = '' THEN
        RAISE EXCEPTION 'content cannot be null or empty';
    END IF;

    -- Validate that either society_id or room_transaction_id is provided
    IF p_society_id IS NULL AND p_room_transaction_id IS NULL THEN
        RAISE EXCEPTION 'Either society_id or room_transaction_id must be provided';
    END IF;

    -- Validate that not both society_id and room_transaction_id are provided
    IF p_society_id IS NOT NULL AND p_room_transaction_id IS NOT NULL THEN
        RAISE EXCEPTION 'Cannot provide both society_id and room_transaction_id';
    END IF;

    -- Insert the comment
    INSERT INTO comments (
        complaint_id,
        society_id,
        room_transaction_id,
        content
    ) VALUES (
        p_complaint_id,
        p_society_id,
        p_room_transaction_id,
        p_content
    )
    RETURNING id INTO v_new_comment_id;

    RETURN v_new_comment_id;
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'Invalid reference: Please check complaint_id, society_id, or room_transaction_id';
    WHEN check_violation THEN
        RAISE EXCEPTION 'Check constraint violation: Either society_id or room_transaction_id must be provided';
    WHEN others THEN
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;