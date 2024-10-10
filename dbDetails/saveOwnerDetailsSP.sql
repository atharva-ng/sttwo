CREATE OR REPLACE FUNCTION saveOwnerDetails(data1 JSONB)
RETURNS VOID AS $$
DECLARE
    record JSONB; 
    ownerId INT;
BEGIN
    FOR record IN SELECT * FROM jsonb_array_elements(data1)
    LOOP
        BEGIN
            -- Insert owner details
            INSERT INTO ownerdetails(id, firstname, lastname, email, phonenumber) 
            VALUES (default, 
                    record->>'firstName', 
                    record->>'lastName', 
                    record->>'email', 
                    record->>'phoneNumber') 
            RETURNING id INTO ownerId;
            
            -- Insert room transaction details
            INSERT INTO room_transaction(id, owner_id, roomdetails_id, date_of_purchase, date_of_selling) 
            VALUES (default, 
                    ownerId, 
                    (record->>'roomId')::INT, 
                    (record->>'dateOfPurchase')::timestamp without time zone, 
                    (record->>'dateOfSelling')::timestamp without time zone);
            
            -- Clear ownerId for next iteration
            ownerId := NULL;
        
        EXCEPTION
            WHEN unique_violation THEN
                RAISE NOTICE 'Unique violation error occurred for owner with email or phonenumber: % , %', record->>'email', record->>'phoneNumber';
            WHEN foreign_key_violation THEN
                RAISE NOTICE 'Foreign key violation error occurred. Room ID: %, Owner ID: %', 
                    (record->>'roomId')::INT, ownerId;
            WHEN OTHERS THEN
                RAISE EXCEPTION 'An error occurred: %', SQLERRM;
        END;
    END LOOP;
END;
$$ LANGUAGE plpgsql;


