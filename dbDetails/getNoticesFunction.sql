CREATE OR REPLACE FUNCTION getnotices(soc_id INT, active VARCHAR DEFAULT NULL) 
RETURNS TABLE(
    id INT, 
    title VARCHAR, 
    CONTENT TEXT, 
    start_date TIMESTAMP, 
    end_date TIMESTAMP, 
    isactive BOOLEAN, 
    created_at TIMESTAMP, 
    updated_at TIMESTAMP
) AS $$
BEGIN
    IF active IS NULL THEN
        RETURN QUERY 
        SELECT notices.id, notices.title, notices.content, notices.start_date, notices.end_date, notices.isactive, notices.created_at, notices.updated_at 
        FROM notices 
        WHERE notices.society_id = soc_id;
    ELSIF active = 'true' THEN
        RETURN QUERY 
        SELECT notices.id, notices.title, notices.content, notices.start_date, notices.end_date, notices.isactive, notices.created_at, notices.updated_at 
        FROM notices 
        WHERE notices.society_id = soc_id AND notices.isactive = true;
    ELSIF active = 'false' THEN
        RETURN QUERY 
        SELECT notices.id, notices.title, notices.content, notices.start_date, notices.end_date, notices.isactive, notices.created_at, notices.updated_at 
        FROM notices 
        WHERE notices.society_id = soc_id AND notices.isactive = false;
    END IF;
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Error occurred: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
