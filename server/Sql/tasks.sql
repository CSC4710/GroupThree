DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
    Tasks_id INT(6) NOT NULL PRIMARY KEY,
    tasks_description VARCHAR(255) NOT NULL,
    tasks_priority TINYINT(4) DEFAULT NULL,
    tasks_status VARCHAR(25) DEFAULT NULL,
    category_id INT DEFAULT NULL,
    tasks_due_date DATE NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(categories_id) ON DELETE CASCADE ON UPDATE CASCADE

);