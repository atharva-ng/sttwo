CREATE OR REPLACE FUNCTION getsocietydetailsid(id_param INTEGER, choice INT)
RETURNS INTEGER[] AS $$
DECLARE
    societydetails_id INTEGER[];
BEGIN
    IF choice = 1 THEN 
        SELECT ARRAY(
            SELECT f.id
            FROM room_transaction AS a
            JOIN roomdetails AS c ON c.id = a.roomdetails_id
            JOIN roomlink AS d ON d.id = c.roomlink_id
            JOIN wingdetails AS e ON e.id = d.wing_details_id
            JOIN societydetails AS f ON f.id = e.society_id
            WHERE a.owner_id = id_param
        ) INTO societydetails_id;
        
    ELSIF choice = 2 THEN
        SELECT ARRAY(
            SELECT d.id
            FROM roomdetails AS a
            JOIN roomlink AS b ON b.id = a.roomlink_id
            JOIN wingdetails AS c ON c.id = b.wing_details_id
            JOIN societydetails AS d ON d.id = c.society_id
            WHERE a.id = id_param
        ) INTO societydetails_id;
        
    ELSIF choice = 3 THEN
        SELECT ARRAY(
            SELECT e.id 
            FROM room_transaction AS a
            JOIN roomdetails AS b ON b.id = a.roomdetails_id
            JOIN roomlink AS c ON c.id = b.roomlink_id
            JOIN wingdetails AS d ON d.id = c.wing_details_id
            JOIN societydetails AS e ON e.id = d.society_id
            WHERE a.id = id_param
        ) INTO societydetails_id;
        
    ELSE
        RAISE EXCEPTION 'Invalid value for choice: %', choice;
    END IF;
    
    IF societydetails_id IS NULL OR array_length(societydetails_id, 1) IS NULL THEN
        societydetails_id := ARRAY[-1];
    END IF;
    
    RETURN societydetails_id;

EXCEPTION
    WHEN others THEN
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
