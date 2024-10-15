CREATE OR REPLACE FUNCTION getWingRoomsData(soc_id INT) RETURNS TABLE(id INT, "name" VARCHAR, room_id INT, room_no VARCHAR)
AS $$
BEGIN
    RETURN QUERY Select a.id, a.name, d.id, d.room_no
    from wingdetails as a 
    inner join roomlink as b on a.id=b.wing_details_id
    inner join roomsize as c on b.room_size_id = c.id
    inner join roomdetails as d on d.roomlink_id = b.id
    where a.society_id= soc_id;
END;
$$ LANGUAGE plpgsql;

-- drop function getWingRoomsData(int);