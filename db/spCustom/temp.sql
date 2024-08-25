-- call insertuser('athardghadiva', 'abcddd@guw.com','jdbkqjnd', 'jbcqwn', 'ncjwnc', '400012', '2024-08-11', 'nwefncfn', '8879806920',new_id);

DO $$
DECLARE
    new_id INT;
BEGIN
    
    CALL insertsociety('athardghadiva', 'abcdddd@guw.com','jdbkqjnd', 'jbcqwn', 'ncjwnc', '400012', '2024-08-11', 'nwefncfn', '8879806920',new_id);
    RAISE NOTICE 'Inserted user with ID: %', new_id;
END $$;
