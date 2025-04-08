--Aufgabe 1 - Tabellen löschen (10P)
--Lösche alle Tabellen auf der programiz.com website

DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Shippings;
--/

------------EXTRA------------------------------------------------------
			DROP TABLE IF EXISTS Belegungen;
			DROP TABLE IF EXISTS Kurse;
			DROP TABLE IF EXISTS Studenten;
			DROP TABLE IF EXISTS Dozenten;
			
			CREATE TABLE Dozenten (
  				dozent_id INTEGER PRIMARY KEY AUTOINCREMENT,
  				name VARCHAR(50) NOT NULL,
  				fach1 VARCHAR(100) NOT NULL, --must-have
  				fach2 VARCHAR(100) NOT NULL, --must-have
  				fach3 VARCHAR(100) -- optional
			);

			INSERT INTO Dozenten (name,fach1,fach2,fach3)
			VALUES
				("Lukas", "Web-Design", "Fullstack", "3D-Design"),
				("Tom", "Web-Design","Fullstack", "Smart-Home Dev"),
				("Suheib", "Web-Design", "Fullstack" ,"Game-Design"),
				("Kevin", "Web-Design","Frontend", NULL);
------------/-----------------------------------------------------------

--Aufgabe 2 - Neue Tabellen anlegen
--Erstelle 2 neue Tabellen: 
--		studenten (student_id, name, hauptfach)
--		kurse (kurs_id, titel, dozent)
--Hierbei sind die entsprechenden Spaltennamen in den Klammern zu sehen. Fett gedruckt bedeutet diese Spalte ist ein Primärschlüssel.

CREATE TABLE Studenten (
  student_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL,
  hauptfach VARCHAR(100)
);

CREATE TABLE Kurse (
  kurs_id INTEGER PRIMARY KEY AUTOINCREMENT,
  titel VARCHAR(100) NOT NULL,
  dozent_id INTEGER NOT NULL,
  FOREIGN KEY (dozent_id) REFERENCES Dozenten(dozent_id) ON DELETE CASCADE
);
--/

--Aufgabe 3 - Tabellen befüllen
--Legt sechs Studenten und mind. drei Kurse an.

INSERT INTO Studenten(name, hauptfach)
VALUES
("Domske", "Backend"),
("Nassima", "Frontend"),
("Loki", "Web-Design"),
("Marcus", "Web-Design"),
("Sebastian", "3D-Design"),
("Mete", "Game-Design"),
("Alexander", "Smart-Home Dev");

INSERT INTO Kurse (titel, dozent_id)
VALUES
("How to be a Pro", 4),
("How to be a better Pro", 2),
("How to be a God", 1),
("How to be the Master of the Universe", 3);
--/

--Aufgabe 4 - Foreign Keys
--Erstellt nun eine letzte Tabelle: 
--	belegungen (belegung_id, student_id, kurs_id, datum)
--Diese Tabelle soll nun, wie ihr euch wahrscheinlich denken könnt, eine Relation zwischen den Studenten und ihren belegten Kursen erstellen.
--Die fett gedruckte Eigenschaft ist wieder der Primary Key, die unterstrichenen Eigenschaften sind foreign keys. 

--Schreibt ein paar Einträge in die Tabelle Belegungen.

CREATE TABLE Belegungen (
  belegung_id INTEGER PRIMARY KEY AUTOINCREMENT,
  dozent_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  kurs_id INTEGER NOT NULL,
  datum DATETIME NOT NULL,
  FOREIGN KEY (dozent_id) REFERENCES Dozenten(dozent_id),
  FOREIGN KEY (student_id) REFERENCES Studenten(student_id),
  FOREIGN KEY (kurs_id) REFERENCES Kurse(kurs_id)
);

INSERT INTO Belegungen (dozent_id, student_id, kurs_id, datum)
VALUES
  (3, 6, 4, DATETIME('now')),
  (4, 7, 1, DATETIME('now')),
  (1, 3, 3, DATETIME('now')),
  (2, 5, 2, DATETIME('now')),
  (3, 1, 4, DATETIME('now')),
  (4, 2, 1, DATETIME('now')),
  (2, 2, 2, DATETIME('now')),
  (1, 4, 3, DATETIME('now'));
--/

--Aufgabe 5 - JOIN (Optional, aber sehr empfohlen)
--Jetzt wirds erst richtig spannend. Der JOIN operator verbindet zwei Tabellen, um sie wie eine lange zeile betrachten zu können. 
--Informiere dich noch mehr zu JOINS: https://www.w3schools.com/sql/sql_join_inner.asp
--(In SQLite ist JOIN gleichzusetzen mit INNER JOIN)

--Schreibt dann Querys für folgende Fragestellungen: 
--	1. Wie heißen die Kurse die "Loki" belegt hat?
--	2. Wie heißen die Studenten, die in "How to be the Master of the Universe" belegt haben?
--	Extra 3. Wie heißen die Dozenten die "Nassima" und "Domske" in ihren Kursen hatten.

--	Ihr müsst natürlich die von euch gewählten Namen benutzen :) 

--1.
SELECT k.titel
FROM Belegungen b
JOIN Studenten s ON b.student_id = s.student_id
JOIN Kurse k ON b.kurs_id = k.kurs_id
WHERE s.name = "Loki";

--2.
SELECT s.name
FROM Belegungen b
JOIN Studenten s ON b.student_id = s.student_id
JOIN Kurse k ON b.kurs_id = k.kurs_id
WHERE k.titel = "How to be the Master of the Universe";

--Extra 3.
SELECT DISTINCT d.name 
FROM Belegungen b
JOIN Studenten s ON b.student_id = s.student_id
JOIN Dozenten d ON b.dozent_id = d.dozent_id
WHERE s.name IN ('Nassima', 'Domske');