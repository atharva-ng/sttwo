-- CREATE TYPE roomdetails_type AS (
--     room_no int,
--     roomlink_id INT,
--     amount int
-- );

CREATE OR REPLACE PROCEDURE saverooms(json_data TEXT)
LANGUAGE plpgsql AS $$
DECLARE
     data roomdetails_type;
BEGIN
    FOR data IN 
        SELECT * FROM json_populate_recordset(NULL::roomdetails_type, json_data) 
    LOOP
        INSERT INTO roomdetails(id, roomlink_id, room_no, amount)
        VALUES (default, data.roomlink_id, data.room_no, data.amount);
    END LOOP;
END;
$$;
