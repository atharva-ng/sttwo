CREATE OR REPLACE FUNCTION deletenotice(p_notice_id INT, p_userId INT)
RETURNS VOID AS $$
DECLARE
    v_society_id INT;
BEGIN
    -- Check if the notice belongs to the user
    SELECT society_id INTO v_society_id
    FROM notices
    WHERE id = p_notice_id;

    -- If no notice is found or if the society_id is not equal to the provided userId, raise an exception
    IF v_society_id IS NULL THEN
        RAISE EXCEPTION 'Notice does not exist';
    ELSIF v_society_id != p_userId THEN
        RAISE EXCEPTION 'You do not have permission to delete this notice';
    END IF;

    -- If check passes, delete the notice
    DELETE FROM notices
    WHERE id = p_notice_id;

END;
$$ LANGUAGE plpgsql;
