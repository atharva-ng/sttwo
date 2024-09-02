-- CREATE TYPE roomdetails_type AS (
--     wing_id INT,
--     room_size_id INT,
--     room_no int,
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
        INSERT INTO roomdetails(id, wing_id, room_size_id, room_no, amount)
        VALUES (default, data.wing_id, data.room_size_id, data.room_no, data.amount);
    END LOOP;
END;
$$;
