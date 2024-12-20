CREATE OR REPLACE FUNCTION updatenotice(
    _id INT,
    _society_id INT,
    _title VARCHAR DEFAULT NULL,
    _content TEXT DEFAULT NULL,
    _start_date TIMESTAMPTZ DEFAULT NULL,
    _end_date TIMESTAMPTZ DEFAULT NULL,
    _categoryid INT DEFAULT NULL
)
RETURNS TABLE (
    o_id INT,
    o_title VARCHAR,
    o_content TEXT,
    o_start_date TIMESTAMP,
    o_end_date TIMESTAMP,
    o_category INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    UPDATE notices
    SET title = COALESCE(_title, title),
        content = COALESCE(_content, content),
        start_date = COALESCE(_start_date, start_date),
        end_date = COALESCE(_end_date, end_date),
        updated_at = CURRENT_TIMESTAMP,
        category = COALESCE(_categoryid, category)
    WHERE id = _id
    AND society_id = _society_id
    RETURNING id, title, content, start_date, end_date, category;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'No notice found with id: %, society_id: %', _id, _society_id;
    END IF;
END;
$$;


-- drop FUNCTION updatenotice(
--     _id INT,
--     _society_id INT,
--     _title VARCHAR,
--     _content TEXT,
--     _start_date TIMESTAMPTZ,
--     _end_date TIMESTAMPTZ ,
--     _categoryid INT
-- )