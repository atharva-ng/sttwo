CREATE OR REPLACE PROCEDURE getemaillogin(
    _email VARCHAR,
    _choice int,
    OUT idout INT
)LANGUAGE plpgsql
AS $$
BEGIN
    BEGIN    
        IF _choice = 1 THEN
            SELECT id 
            INTO idout
            FROM societydetails WHERE email = _email;
        ELSEIF _choice =2 THEN
            SELECT id
            INTO idout
            FROM ownerdetails WHERE email = _email;
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'An error occurred: %', SQLERRM;
            idout := null;
        END;
END;
$$;