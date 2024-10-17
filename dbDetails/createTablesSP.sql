CREATE OR REPLACE PROCEDURE create_tables_and_procedures()
LANGUAGE plpgsql
AS $$
BEGIN
    EXECUTE 'CREATE TABLE roomsize (id serial PRIMARY KEY, size varchar(10) NOT NULL);';

    EXECUTE 'CREATE TABLE maintenance_heads (id serial PRIMARY KEY, heads varchar(100) NOT NULL, CONSTRAINT unique_heads UNIQUE (heads));';

    EXECUTE 'CREATE TABLE societydetails (id serial PRIMARY KEY, name varchar(100) NOT NULL, email varchar(255) NOT NULL, address varchar(250) NOT NULL, city varchar(100) NOT NULL, state varchar(100) NOT NULL, postalcode varchar(10) NOT NULL, establishmentdate date NOT NULL, registrationnumber varchar(20) NOT NULL, phonenumber varchar(12) NOT NULL, CONSTRAINT uniqueemail UNIQUE (email));';

    EXECUTE 'CREATE TABLE societypasswords (id serial PRIMARY KEY, password varchar(255) NOT NULL, CONSTRAINT societypasswords_id_fkey FOREIGN KEY (id) REFERENCES public.societydetails(id) ON DELETE CASCADE);';

    EXECUTE 'CREATE TABLE wingdetails (id SERIAL PRIMARY KEY, society_id INT NOT NULL REFERENCES societydetails(id) ON DELETE CASCADE, name VARCHAR(255) NOT NULL, flats_per_floor INT NOT NULL);';

    EXECUTE 'CREATE TABLE roomlink (id SERIAL PRIMARY KEY, wing_details_id INT NOT NULL REFERENCES WingDetails(id) ON DELETE CASCADE, room_size_id INT NOT NULL REFERENCES RoomSize(id) ON DELETE CASCADE);';

    EXECUTE 'CREATE TABLE ownerdetails (Id SERIAL PRIMARY KEY, FirstName VARCHAR(255) NOT NULL, LastName VARCHAR(255) NOT NULL, Email VARCHAR(255) NOT NULL, PhoneNumber VARCHAR(20) NOT NULL);';

    EXECUTE 'CREATE TABLE ownerpassword (Id SERIAL PRIMARY KEY, OwnerId INT NOT NULL, Password VARCHAR(255) NOT NULL, FOREIGN KEY (OwnerId) REFERENCES ownerdetails(Id) ON DELETE CASCADE);';

    EXECUTE 'CREATE TABLE roomdetails (id SERIAL PRIMARY KEY,roomLink_id INT NOT NULL REFERENCES roomlink(id) ON DELETE CASCADE, room_no VARCHAR(50) NOT NULL, amount DECIMAL(10, 2) NOT NULL);';

    EXECUTE 'CREATE TABLE payment_type (id SERIAL PRIMARY KEY, payment_head VARCHAR(255) NOT NULL);';

    EXECUTE 'CREATE TABLE transaction_type (id SERIAL PRIMARY KEY, transaction_head VARCHAR(255) NOT NULL);';

    EXECUTE 'CREATE TABLE transaction (id SERIAL PRIMARY KEY, amount DECIMAL(10, 2) NOT NULL, transaction_timestamp TIMESTAMP NOT NULL, transaction_type_id INT NOT NULL REFERENCES transaction_type(id), payment_type_id INT NOT NULL REFERENCES payment_type(id), notes TEXT);';

    EXECUTE 'CREATE TABLE room_transaction (id SERIAL PRIMARY KEY, transaction_date TIMESTAMP NOT NULL, transaction_id INT NOT NULL REFERENCES transaction(id), roomdetails_id INT NOT NULL REFERENCES roomdetails(id));';

    EXECUTE "INSERT INTO payment_type (payment_head) VALUES ('UPI'), ('Cash'), ('Cheque'), ('Mandate'), ('Bank Transfer');";

    EXECUTE "INSERT INTO transaction_type (transaction_head) VALUES ('Maintenance'), ('Event Contribution'), ('Donation'), ('Custom');";

    EXECUTE "CREATE TABLE owner_transaction (id SERIAL PRIMARY KEY, owner_id INTEGER REFERENCES ownerdetails(id) ON DELETE CASCADE NOT NULL, room_id INTEGER REFERENCES roomdetails(id) ON DELETE CASCADE NOT NULL, date_of_purchase DATE NOT NULL, date_of_selling DATE)";

    EXECUTE "CREATE TABLE complaintDetails (complaint_id SERIAL PRIMARY KEY,society_id INT,room_id INT,title VARCHAR(100) NOT NULL,description TEXT NOT NULL,status VARCHAR(20) NOT NULL DEFAULT 'Open',created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (society_id) REFERENCES societydetails(id),FOREIGN KEY (room_id) REFERENCES roomdetails(id),CHECK (status IN ('Open', 'In Progress', 'Resolved', 'Closed')));"

    EXECUTE "CREATE TABLE notices (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, start_date TIMESTAMP NOT NULL, end_date TIMESTAMP NOT NULL, isActive BOOLEAN DEFAULT TRUE, society_id INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (society_id) REFERENCES societydetails(id));"

    EXECUTE "CREATE TABLE comments (id SERIAL PRIMARY KEY,complaint_id INT NOT NULL,society_id INT,room_transaction_id INT,content TEXT NOT NULL,created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (complaint_id) REFERENCES complaintdetails(id),FOREIGN KEY (society_id) REFERENCES societydetails(id),FOREIGN KEY (room_transaction_id) REFERENCES room_transaction(id),CHECK (society_id IS NOT NULL OR room_transaction_id IS NOT NULL));"
END;
$$;

