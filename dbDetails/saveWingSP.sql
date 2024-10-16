CREATE OR REPLACE PROCEDURE savewing(
    _societyID INT,
    _name VARCHAR,
    _flatsPerFloor INT,
    OUT idout INT
)LANGUAGE plpgsql
AS $$
BEGIN
    BEGIN    
        INSERT INTO wingdetails(
                society_id, "name", flats_per_floor
            ) VALUES (
                _societyID, _name, _flatsPerFloor
            ) RETURNING id INTO idout;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'An error occurred: %', SQLERRM;
            idout := null;
        END;
END;
$$;