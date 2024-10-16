CREATE OR REPLACE FUNCTION getWingData(soc_id INT) RETURNS TABLE(id INT, "name" VARCHAR, flats_per_floor INT)
AS $$
BEGIN
    RETURN QUERY Select a.id, a."name", a.flats_per_floor 
    from wingdetails as a
    where  society_id=soc_id;
    
END;
$$ LANGUAGE plpgsql;

-- drop function getWingData;

