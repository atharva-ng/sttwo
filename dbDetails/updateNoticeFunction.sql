CREATE OR REPLACE FUNCTION update_notice(
    _id INT,
    _society_id INT,
    _title VARCHAR DEFAULT NULL,
    _content TEXT DEFAULT NULL,
    _start_date TIMESTAMP DEFAULT NULL,
    _end_date TIMESTAMP DEFAULT NULL
)
RETURNS TABLE (id INT, society_id INT, title VARCHAR, CONTENT TEXT, start_date TIMESTAMP, end_date TIMESTAMP)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    UPDATE notices
    SET title = COALESCE(_title, title),
        content = COALESCE(_content, content),
        start_date = COALESCE(_start_date, start_date),
        end_date = COALESCE(_end_date, end_date)
    WHERE id = _id
    AND society_id = _society_id
    RETURNING id, society_id, title, content, start_date, end_date;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No notice found with id: %, society_id: %', _id, _society_id;
    END IF;
END;
$$;
