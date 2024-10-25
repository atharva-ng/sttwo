CREATE OR REPLACE FUNCTION getnotices(
    _soc_id INTEGER,
    _id INTEGER DEFAULT NULL,
    _active BOOLEAN DEFAULT NULL,
    _start_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    _end_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NULL,
    _categoryId INTEGER DEFAULT NULL
) RETURNS TABLE (
    id INTEGER,
    title CHARACTER VARYING,
    CONTENT TEXT,
    start_date TIMESTAMP WITHOUT TIME ZONE,
    end_date TIMESTAMP WITHOUT TIME ZONE,
    isactive BOOLEAN,
    created_at TIMESTAMP WITHOUT TIME ZONE,
    updated_at TIMESTAMP WITHOUT TIME ZONE,
    category INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        notices.id,
        notices.title,
        notices.content,
        notices.start_date,
        notices.end_date,
        notices.isactive,
        notices.created_at,
        notices.updated_at,
        notices.category
    FROM 
        notices
    WHERE 
        notices.society_id = _soc_id
        AND (_id IS NULL OR notices.id = _id)
        AND (_active IS NULL OR notices.isactive = _active)
        AND (_start_date IS NULL OR notices.start_date >= _start_date)
        AND (_end_date IS NULL OR notices.end_date <= _end_date)
        AND (_categoryId IS NULL OR notices.category = _categoryId);
END;
$$ LANGUAGE plpgsql;
