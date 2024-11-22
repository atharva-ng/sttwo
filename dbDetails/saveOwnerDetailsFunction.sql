CREATE OR REPLACE FUNCTION saveOwnerDetails(data1 JSONB)
    RETURNS JSONB AS $$
DECLARE
    record JSONB; 
    ownerId INT;
    notice_list TEXT[]; 
    id_list INT[];
BEGIN
    -- Initialize arrays
    notice_list := ARRAY[]::TEXT[];
    id_list := ARRAY[]::INT[];

    FOR record IN SELECT * FROM jsonb_array_elements(data1)
    LOOP
        -- Check if any required field is NULL or missing
        IF record->>'firstName' IS NULL OR record->>'lastName' IS NULL 
           OR record->>'email' IS NULL OR record->>'phoneNumber' IS NULL 
           OR record->>'roomId' IS NULL OR record->>'dateOfPurchase' IS NULL 
           THEN
            notice_list := array_append(notice_list, 
                        format('A required field is missing or NULL for owner with email: %s', record->>'email'));
            CONTINUE;
        END IF;

        BEGIN
            SELECT id 
            INTO ownerId
            FROM ownerdetails 
            WHERE phonenumber = record->>'phoneNumber';
            
            IF ownerId IS NULL THEN
                -- Insert owner details
                INSERT INTO ownerdetails(id, firstname, lastname, email, phonenumber) 
                VALUES (default, 
                        record->>'firstName', 
                        record->>'lastName', 
                        record->>'email', 
                        record->>'phoneNumber') 
                RETURNING id INTO ownerId;
            END IF;
            
            
            
            -- Insert room transaction details
            INSERT INTO room_transaction(owner_id, roomdetails_id, date_of_purchase, date_of_selling)
            VALUES (
                ownerId,
                (record->>'roomId')::INT,
                (record->>'dateOfPurchase')::timestamp without time zone,
                CASE 
                    WHEN record->>'dateOfSelling' IS NOT NULL 
                    THEN (record->>'dateOfSelling')::timestamp without time zone 
                    ELSE NULL 
                END
            );
            
            -- Store successful ID
            id_list := array_append(id_list, ownerId);
            
            -- Clear ownerId for next iteration
            ownerId := NULL;
        
        EXCEPTION
            WHEN unique_violation THEN
                notice_list := array_append(notice_list, 
                            format('Unique violation error occurred for owner with email: %s or phone number: %s', 
                                   record->>'email', record->>'phoneNumber'));
            WHEN foreign_key_violation THEN
                notice_list := array_append(notice_list, 
                            format('Foreign key violation error occurred. Room ID: %s, Owner ID: %s', 
                                   (record->>'roomId')::INT, ownerId));
            WHEN OTHERS THEN
                notice_list := array_append(notice_list, 
                            format('An error occurred: %s', SQLERRM));
        END;
    END LOOP;

    -- Return the results as a JSONB object
    RETURN jsonb_build_object(
        'notices', notice_list,
        'ids', id_list
    );
END;
$$ LANGUAGE plpgsql;
