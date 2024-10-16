CREATE OR REPLACE PROCEDURE createlink(
    _wingID INT,
    _roomSizeID INT,
    out new_id int
)
LANGUAGE plpgsql AS $$    
BEGIN
    BEGIN
        INSERT INTO roomlink(
            wing_details_id, room_size_id
        )VALUES(
            _wingID, _roomSizeID
        ) RETURNING id INTO new_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'An error occurred: %', SQLERRM;
    END;
END;
$$;




