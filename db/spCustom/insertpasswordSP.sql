 CREATE OR REPLACE PROCEDURE insertpassword(
    _id INT,
    _password VARCHAR,
    OUT success INT
)LANGUAGE plpgsql
AS $$
BEGIN
    BEGIN       
        success := 0;
        INSERT INTO societypasswords(
            id, password
            )VALUES (
            _id, _password
        ) RETURNING id INTO success;
        
        IF success IS NOT NULL THEN
            success := 1;
        END IF;
    EXCEPTION
        WHEN unique_violation THEN
        RAISE NOTICE 'A duplicate entry was attempted for id %', _id;
        success := -1;
    WHEN OTHERS THEN
        RAISE EXCEPTION 'An error occurred: %', SQLERRM;
        success := -2;
    END;
END;
$$;
