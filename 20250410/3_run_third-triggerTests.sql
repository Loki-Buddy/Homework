--Die Tasks in der Liste 'Einkaufsliste' abhacken.
--Mittels Sub-Select wenn alle von einer bestimmten Liste sein sollen dessen ID ich nicht kenne sondern nur den Namen.

--Uhrzustand anzeigen
--Abfrage mit JOIN
SELECT l.list_name, l.update_date
FROM Lists l
JOIN Tasks t ON t.list_id = l.list_id
WHERE list_name = 'Einkaufsliste'
LIMIT 1;

--TRIGGER auslösen 'update_timestamp'
UPDATE Tasks
SET checked = 1
WHERE Tasks.list_id IN ( 
    SELECT list_id
    FROM Lists
    WHERE list_name = 'Einkaufsliste');

--Änderungen anzeigen
--Abfrage mit WHERE 
SELECT list_name, update_date 
FROM Lists l,Tasks t
WHERE t.list_id = l.list_id
    AND list_name = 'Einkaufsliste'
LIMIT 1;
--------------------------------------------------------------------------------------------------------

--Der Liste Baumarkt einen Task hinzugügen

--Uhrzustand anzeigen
--Abfrage mit JOIN
SELECT list_name, update_date
FROM Lists l
JOIN Tasks t ON t.list_id = l.list_id
WHERE list_name = 'Baumarkt'
LIMIT 1;

--TRIGGER auslösen 'update_list_timestamp_on_insert'
INSERT INTO Tasks (task_name, list_id)
VALUES ('Kabelkanal 20mm - 6m', 4);

--Änderungen anzeigen
--Abfrage mit WHERE
SELECT list_name, update_date
FROM Lists l, Tasks t
WHERE t.list_id = l.list_id
    AND list_name = 'Baumarkt'
LIMIT 1;

--------------------------------------------------------------------------------------------------------

--Einen Task aus der Liste 'Gym' Löschen

--Uhrzustand anzeigen
--Abfrage mit JOIN
SELECT list_name, update_date
FROM Lists l
JOIN Tasks t ON t.list_id = l.list_id
WHERE list_name = 'Gym'
LIMIT 1;

--TRIGGER auslösen 'update_list_timestamp_on_delete'
DELETE FROM Tasks
WHERE task_name LIKE 'Laufband%';

--Änderungen anzeigen
--Abfrage mit WHERE
SELECT list_name, update_date
FROM Lists l, Tasks t
WHERE t.list_id = l.list_id
    AND list_name = 'Gym'
LIMIT 1;

----------------------------------------------------------------------------------------------------------

--'SQL_Vertiefung' abhacken.
UPDATE Tasks
SET checked = 1
WHERE task_name LIKE 'SQL%';

--Änderungen anzeigen
--Abfrage mit JOIN
SELECT *
FROM Lists l
JOIN Tasks t ON t.list_id = l.list_id
WHERE list_name = 'Hausaufgaben';