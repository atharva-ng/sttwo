CREATE OR REPLACE FUNCTION deleteComplaint(socid INTEGER, compid INTEGER)
RETURNS VOID AS $$
BEGIN
    DELETE FROM complaintdetails
    WHERE society_id = socid AND id = compid;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No entry found with society_id = % and complaint_id = %', socid, compid;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'An error occurred while trying to delete entry with society_id = % and complaint_id = %', socid, compid;
END;
$$ LANGUAGE plpgsql;
