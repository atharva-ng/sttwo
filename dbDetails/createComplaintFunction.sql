CREATE OR REPLACE FUNCTION insert_complaint(
    _society_id INTEGER,
    _room_transaction_id INTEGER,
    _title VARCHAR(100),
    _description TEXT
)
RETURNS INTEGER AS $$
DECLARE
    new_complaint_id INTEGER;
BEGIN
    BEGIN
        INSERT INTO complaintdetails (
            society_id, 
            room_transaction_id, 
            title, 
            description,  
            created_at, 
            updated_at
        ) VALUES (
            _society_id, 
            _room_transaction_id, 
            _title, 
            _description, 
            CURRENT_TIMESTAMP, 
            CURRENT_TIMESTAMP
        )RETURNING id INTO new_complaint_id;
        
        RETURN new_complaint_id;
        
    EXCEPTION
        WHEN foreign_key_violation THEN
            RAISE NOTICE 'The society or room transaction ID is invalid.';
        WHEN OTHERS THEN
            RAISE NOTICE 'An unexpected error occurred: %', SQLERRM;
    END;
END;
$$ LANGUAGE plpgsql;



-- drop function insert_complaint;