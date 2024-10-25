CREATE OR REPLACE PROCEDURE createNotice(
    _title VARCHAR(255), 
    _content TEXT, 
    _start_date TIMESTAMP,
    _end_date TIMESTAMP, 
    _userId INT,
    _category INT,
    OUT idOut INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    flag BOOLEAN; 
    current_date TIMESTAMP := CURRENT_TIMESTAMP;
BEGIN
    IF current_date >= _start_date AND current_date <= _end_date THEN
        flag := TRUE;  
    ELSE
        flag := FALSE; 
    END IF;
    
    INSERT INTO notices(title, content, start_date, end_date, isactive, society_id, category)
    VALUES (_title, _content, _start_date, _end_date, flag, _userId, _category)
    RETURNING id INTO idOut;

EXCEPTION
    WHEN unique_violation THEN
        RAISE EXCEPTION 'A notice with the same title already exists.';
        idOut := NULL;
        
    WHEN OTHERS THEN
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
        idOut := NULL;
END;
$$;
