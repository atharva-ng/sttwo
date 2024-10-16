 CREATE OR REPLACE PROCEDURE insertmaintainancehead(
    _roomLinkID INT,
    _maintainanceHeadID INT,
    _amount INT,
    OUT new_id INT
)LANGUAGE plpgsql
AS $$
BEGIN
    BEGIN
        INSERT INTO maintenance_transaction (
            id, roomlink_id, maintenance_heads_id, amount
        )
        VALUES(
            default, _roomLinkID, _maintainanceHeadID, _amount
        ) RETURNING id INTO new_id;
    EXCEPTION
        WHEN OTHERS THEN
            RAISE EXCEPTION 'An error occurred: %', SQLERRM;
            new_id := NULL;
    END;
END;
$$;
