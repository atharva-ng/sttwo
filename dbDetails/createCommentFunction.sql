CREATE OR REPLACE PROCEDURE insert_comment(
    p_complaint_id INTEGER,
    p_society_id INTEGER DEFAULT NULL,
    p_room_transaction_id INTEGER DEFAULT NULL,
    p_content TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    IF p_society_id IS NULL AND p_room_transaction_id IS NULL THEN
        RAISE EXCEPTION 'Either society_id or room_transaction_id must be provided';
    END IF;

    INSERT INTO comments(complaint_id, society_id, room_transaction_id, content, created)
    VALUES (p_complaint_id, p_society_id, p_room_transaction_id, p_content, CURRENT_TIMESTAMP);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE EXCEPTION 'Foreign key violation: Please check the complaint_id, society_id, or room_transaction_id references';

    WHEN OTHERS THEN
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
END;
$$;
