CREATE OR REPLACE PROCEDURE insertsociety(
    _name VARCHAR,
    _email VARCHAR,
    _address VARCHAR,
    _city VARCHAR,
    _state VARCHAR,
    _postalcode VARCHAR,
    _establishmentdate DATE,
    _registrationnumber VARCHAR,
    _phonenumber VARCHAR,
    OUT new_id INT
)LANGUAGE plpgsql
AS $$
DECLARE 
    new_id int;
    old_id int;
BEGIN
    SELECT COUNT(1) 
    INTO old_id 
    FROM societydetails 
    WHERE email = _email; 
    
    IF old_id > 0 THEN 
    
        INSERT INTO societydetails(
            id, "name", email, address, city, state, postalcode, establishmentdate, registrationnumber, phonenumber
        ) VALUES (
            default, _name, _email, _address, _city, _state, _postalcode, _establishmentdate, _registrationnumber, _phonenumber
        ) RETURNING id INTO new_id;
    ELSE
        RAISE NOTICE 'Email already exists';
        new_id := NULL;
    END IF;
END;
$$;
