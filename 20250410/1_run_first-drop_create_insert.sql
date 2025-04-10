--Default-Tabellen Löschen
DROP TABLE IF EXISTS Shippings;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Customers;

--------------------------------------------------
--Aufgabe 2 - Mini-Datenbank selbst erstellen
    --Erstellt ein eigenes kleines Datenbankmodell mit mindestens drei Tabellen, die sinnvoll miteinander verbunden sind.
    --Ihr könnt ein eigenes Thema wählen oder – wenn euch nichts einfällt – euer bisheriges Miniprojekt als Basis nehmen.
    
    --Idee: Stellt euch vor, die Daten eures Miniprojekts wären nicht mehr in einer JSON-Datei gespeichert,
    --sondern in einer echten relationalen Datenbank. Welche Tabellen wären nötig? Welche Beziehungen gäbe es?

--Miniprojekt
--Bislang lief das Projekt mit einer einzigen JSON-Datei.
--In einer Relationalen Datenbank wäre dies mit Zwei Tabellen lösbar.

DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS Lists;

--Eine Tabelle für die Listen
--Unterschied zur JSON-Datei:
    --Eine ID für den PRIMARY KEY da ein VARCHAR als PK mehr Rechenleistung benötigt wird als für einen einfachen INTEGER.
    --Das Attribut list_name bleibt jedoch UNIQUE, weil es die Funktionaliät der Webseite wiederspiegelt.
    --Keine doppelten Listennamen

CREATE TABLE Lists (
    list_id INTEGER PRIMARY KEY AUTOINCREMENT,
    list_name VARCHAR(50) UNIQUE NOT NULL,
    create_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

--Eine Tabelle für die Aufgaben
--Umsetzung mit einem zusätzlichen task_id als PRIMARY KEY.
--checked bekommt einen Default-Wert (0 == 'false').

CREATE TABLE Tasks (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_name VARCHAR(50) UNIQUE NOT NULL,
    checked BOOLEAN DEFAULT 0,
    list_id INTEGER NOT NULL,
    FOREIGN KEY (list_id) REFERENCES Lists(list_id)
);

--Ein paar INSERT's zum Testen

INSERT INTO Lists (list_name) VALUES
    ('Einkaufsliste'),
    ('Gym'),
    ('Hausaufgaben'),
    ('Baumarkt');

INSERT INTO Tasks (task_name, list_id) VALUES
    ('Gurken', 1),
    ('Milch', 1),
    ('Gönrgy - TROPICAL EXOTIC', 1),
    ('Laufband - 15min', 2),
    ('Bankdrücken - 10reps', 2),
    ('Rudern - 10reps', 2),
    ('SQL Vertiefung', 3),
    ('Aufgabe 1 - SQL Island - siehe Abgabe 09.04.', 3),
    ('Aufgabe 2 - Mini-Datenbank selbst erstellen', 3),
    ('Aufgabe 3 - Datenbank technisch umsetzen', 3),
    ('Holz', 4),
    ('Nägel', 4),
    ('Silikonkartusche', 4);

--Aufgabe 1 und 2 abhacken
UPDATE Tasks
SET checked = 1
WHERE task_name LIKE 'Aufgabe 1%' OR task_name LIKE 'Aufgabe 2%';

--Änderungen anzeigen
--Abfrage mit JOIN
SELECT *
FROM Lists l
JOIN Tasks t ON t.list_id = l.list_id
WHERE list_name = 'Hausaufgaben';

---------------------------------------------------------------------------------------------

--Abschluss Aufgabe 3
--Schreibt mindestens drei Abfragen:
    --eine mit JOIN (wird in allen Dateien mehrmals verwendet)
    --eine mit WHERE (wird in allen Dateien mehrmals verwendet)
    
    --eine mit GROUP BY oder COUNT
SELECT l.*, COUNT(t.task_name) AS task_count
FROM Lists l
LEFT JOIN Tasks t ON l.list_id = t.list_id
WHERE l.list_name = 'Hausaufgaben'
GROUP BY l.list_id;

--Aufgabe 3 in der Liste 'Hausaufgaben' abhacken
UPDATE Tasks
SET checked = 1
WHERE Tasks.list_id IN (
    SELECT list_id
    FROM Lists
    WHERE list_name = 'Hausaufgaben');

--Änderungen anzeigen
--Abfrage mit JOIN
SELECT *
FROM Lists l
JOIN Tasks t ON t.list_id = l.list_id
WHERE list_name = 'Hausaufgaben';

--Continue with run_second-trigger.txt