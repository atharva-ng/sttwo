CREATE OR REPLACE FUNCTION getownersdata(soc_id INT) RETURNS TABLE(id INT, "wingName" VARCHAR, roomSize VARCHAR, roomNo VARCHAR, firstName VARCHAR, lastname VARCHAR)
AS $$
BEGIN
    RETURN QUERY Select a.id as wingid, a.name, c.size, d.room_no, f.firstname, f.lastname 
    from wingdetails as a 
    inner join roomlink as b on b.wing_details_id = a.id
    inner join roomsize as c on b.room_size_id = c.id
    inner join roomdetails as d on d.roomlink_id = b.id
    inner join room_transaction as e on e.roomdetails_id = d.id
    inner join ownerdetails as f on e.owner_id = f.id
    where a.society_id=soc_id;
EXCEPTION
    WHEN OTHERS THEN
        RAISE exception 'Error occurred: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;

-- drop function getownersdata;