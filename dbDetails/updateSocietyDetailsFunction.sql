CREATE OR REPLACE FUNCTION update_societydetails(
    p_id INTEGER,
    p_isadmin BOOLEAN DEFAULT NULL
)
RETURNS void AS $$
BEGIN
    UPDATE societydetails
    SET
        isadmin = COALESCE(p_isadmin, false)
    WHERE id = p_id;
END;
$$ LANGUAGE plpgsql;
