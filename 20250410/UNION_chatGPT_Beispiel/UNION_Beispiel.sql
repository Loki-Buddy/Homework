--Wieder verwendbarkeit des gesamten Scripts
DROP TABLE IF EXISTS OrderDetails;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Customers;

-- Tabelle für Kunden
CREATE TABLE Customers (
    customer_id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL
);

-- Tabelle für Bestellungen
CREATE TABLE Orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- Tabelle für Produkte
CREATE TABLE Products (
    product_id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL
);

-- Tabelle für Bestellungsdetails (Verbindung zwischen Bestellungen und Produkten)
CREATE TABLE OrderDetails (
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Kunden
INSERT INTO Customers (customer_name) VALUES
    ('Max Mustermann'),
    ('Erika Musterfrau'),
    ('John Doe');

-- Bestellungen
INSERT INTO Orders (customer_id) VALUES
    (1),  -- Max Mustermann
    (2),  -- Erika Musterfrau
    (1);  -- Max Mustermann

-- Produkte
INSERT INTO Products (product_name) VALUES
    ('Laptop'),
    ('Smartphone'),
    ('Tablet');

-- Bestellungsdetails (welche Produkte in welcher Bestellung)
INSERT INTO OrderDetails (order_id, product_id, quantity) VALUES
    (1, 1, 2),  -- Max Mustermann bestellt 2 Laptops
    (1, 2, 1),  -- Max Mustermann bestellt 1 Smartphone
    (2, 3, 1);  -- Erika Musterfrau bestellt 1 Tablet

-- Linker JOIN
SELECT c.customer_id, c.customer_name, o.order_id, p.product_name
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
LEFT JOIN OrderDetails od ON o.order_id = od.order_id
LEFT JOIN Products p ON od.product_id = p.product_id;

-- Rechter JOIN (simuliert durch LEFT JOIN mit vertauschten Tabellen)
SELECT c.customer_id, c.customer_name, o.order_id, p.product_name
FROM OrderDetails od
LEFT JOIN Orders o ON od.order_id = o.order_id
LEFT JOIN Customers c ON o.customer_id = c.customer_id
LEFT JOIN Products p ON od.product_id = p.product_id;
 
--------------------------------------------------------------------------------------  
-- Linker JOIN und Rechter JOIN simuliert mit UNION
SELECT c.customer_id, c.customer_name, o.order_id, p.product_name
FROM Customers c
LEFT JOIN Orders o ON c.customer_id = o.customer_id
LEFT JOIN OrderDetails od ON o.order_id = od.order_id
LEFT JOIN Products p ON od.product_id = p.product_id

UNION

SELECT c.customer_id, c.customer_name, o.order_id, p.product_name
FROM OrderDetails od
LEFT JOIN Orders o ON od.order_id = o.order_id
LEFT JOIN Customers c ON o.customer_id = c.customer_id
LEFT JOIN Products p ON od.product_id = p.product_id;
---------------------------------------------------------------------------------------