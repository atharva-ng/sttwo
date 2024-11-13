CREATE OR REPLACE FUNCTION saveOwnerDetails(data1 JSONB)
RETURNS TEXT[] AS $$
DECLARE
    record JSONB; 
    ownerId INT;
    notices TEXT[] := ARRAY[]::TEXT[];  -- Initialize an empty array to store notices
BEGIN
    FOR record IN SELECT * FROM jsonb_array_elements(data1)
    LOOP
        -- Check if any required field is NULL or missing
        IF record->>'firstName' IS NULL OR record->>'lastName' IS NULL 
           OR record->>'email' IS NULL OR record->>'phoneNumber' IS NULL 
           OR record->>'roomId' IS NULL OR record->>'dateOfPurchase' IS NULL 
           OR record->>'dateOfSelling' IS NULL THEN
            notices := array_append(notices, 
                        format('A required field is missing or NULL for owner with email: %', record->>'email'));
            CONTINUE;
        END IF;

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
                notices := array_append(notices, 
                            format('Unique violation error occurred for owner with email or phonenumber: % , %', record->>'email', record->>'phoneNumber'));
            WHEN foreign_key_violation THEN
                notices := array_append(notices, 
                            format('Foreign key violation error occurred. Room ID: %, Owner ID: %', 
                                   (record->>'roomId')::INT, ownerId));
            WHEN OTHERS THEN
                notices := array_append(notices, 
                            format('An error occurred: %', SQLERRM));
        END;
    END LOOP;

    RETURN notices;  -- Return the collected notices array
END;
$$ LANGUAGE plpgsql;
