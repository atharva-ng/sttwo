CREATE OR REPLACE PROCEDURE insertpassword(
    _id INT,
    _password VARCHAR,
    _choice INT,
    OUT success INT
) LANGUAGE plpgsql
AS $$
BEGIN
    success := 0;

    IF _choice = 1 THEN
        INSERT INTO societypasswords (
            id, password
        ) VALUES (
            _id, _password
        ) RETURNING id INTO success;

    ELSIF _choice = 2 THEN
        INSERT INTO ownerpasswords (
            id, password
        ) VALUES (
            _id, _password
        ) RETURNING id INTO success;

    END IF;

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
$$;
