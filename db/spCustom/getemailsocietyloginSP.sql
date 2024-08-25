 CREATE OR REPLACE PROCEDURE getemailsocietylogin(
    _email VARCHAR,
    OUT idout INT
)LANGUAGE plpgsql
AS $$
BEGIN
    BEGIN       
        SELECT id 
        INTO idout
        FROM societydetails WHERE email = _email;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'An error occurred: %', SQLERRM;
            idout := null;
        END;
END;
$$;
