-----------------------SQL Vertiefung-----------------------------------
--Ich wollte eine 'Stored Procedures' für das updaten des Zeitstempels hinzufügen.
--Eine kurze Recherche hat ergeben das es das in SQLite nicht gibt ... stattdessen kann man Trigger einbauen die auf BEVOR und AFTER reagieren.
--Ab einem gewissen Volumen oder Komplexität ist es sinvoller diese Vorgänge über javascript zu steuern.
--Für die SQL Vertiefung und für die Größe meines/unseres...(Nassima & Domske) Projektes 'To-Do-Manager MasterWork 1.0' vollkommen ausreichend.

--Trigger für das updaten des Zeitstempels für das Attribut Lists.update_date
--Wenn ein Task sich ändert
CREATE TRIGGER update_timestamp
AFTER UPDATE ON Tasks
FOR EACH ROW
BEGIN
    UPDATE Lists
    SET update_date = CURRENT_TIMESTAMP
    WHERE list_id = NEW.list_id;
END;

--Wenn ein neuer Task dazu kommt
CREATE TRIGGER update_list_timestamp_on_insert
AFTER INSERT ON Tasks
FOR EACH ROW
BEGIN
    UPDATE Lists
    SET update_date = CURRENT_TIMESTAMP
    WHERE list_id = NEW.list_id;
END;

--Wenn ein Task gelöscht wird
CREATE TRIGGER update_list_timestamp_on_delete
AFTER DELETE ON Tasks
FOR EACH ROW
BEGIN
    UPDATE Lists
    SET update_date = CURRENT_TIMESTAMP
    WHERE list_id = OLD.list_id;
END;

--Notiz für OLD.[...] und NEW.[...]
    --NEW = neue Werte, nach einem INSERT oder UPDATE.
    --OLD = alte Werte, nach einem UPDATE oder DELETE.

--Continue with run_third-triggerTests.txt