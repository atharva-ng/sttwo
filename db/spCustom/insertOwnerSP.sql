 CREATE OR REPLACE PROCEDURE insertOwner(
    _firstName VARCHAR,
    _lastName VARCHAR,
    _email VARCHAR,
    _phonenumber VARCHAR,
    OUT new_id INT
)LANGUAGE plpgsql
AS $$
DECLARE 
    old_id int;
BEGIN
    BEGIN
        SELECT COUNT(1) 
        INTO old_id 
        FROM ownerdetails 
        WHERE email = _email; 
        
        IF old_id = 0 THEN 
        
            INSERT INTO ownerdetails(
                firstName, lastName, email, phonenumber
            ) VALUES (
                _firstName, _lastName, _email, _phonenumber
            ) RETURNING id INTO new_id;
            
        ELSE
            new_id := NULL;
            
        END IF;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'An error occurred: %', SQLERRM;
            new_id := NULL;
    END;
END;
$$;
