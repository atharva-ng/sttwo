CREATE OR REPLACE FUNCTION getsocietydetailsid(id_param INTEGER, choice INT)
RETURNS INTEGER AS $$
DECLARE
    societydetails_id integer;
BEGIN
    IF choice = 1 THEN 
        SELECT f.id
        INTO societydetails_id
        FROM room_transaction AS a
        JOIN roomdetails AS c ON c.id = a.roomdetails_id
        JOIN roomlink AS d ON d.id = c.roomlink_id
        JOIN wingdetails AS e ON e.id = d.wing_details_id
        JOIN societydetails AS f ON f.id = e.society_id
        WHERE a.owner_id = id_param;
    ELSIF choice = 2 THEN
        SELECT d.id
        INTO societydetails_id
        FROM roomdetails AS a
        JOIN roomlink AS b ON b.id = a.roomlink_id
        JOIN wingdetails AS c ON c.id = b.wing_details_id
        JOIN societydetails AS d ON d.id = c.society_id
        where a.id = id_param;
    ELSE
        RAISE EXCEPTION 'Invalid value for Choice.';
    END IF;
    
    RETURN societydetails_id;
END;
$$ LANGUAGE plpgsql;