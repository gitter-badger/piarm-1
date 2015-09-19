/*
 |--------------------------------------------------------------------------
 | Database schema
 |--------------------------------------------------------------------------
 **/

let schema = [

    // Rules table
    "CREATE TABLE rules" +
    "(" +
    "id INT NOT NULL AUTO_INCREMENT, " +
    "active BOOLEAN NOT NULL, " +
    "time_start TIME, " +
    "time_end TIME, " +
    "date_start DATE, " +
    "date_end DATE, " +
    "days INT UNSIGNED, " +
    "PRIMARY KEY (id)" +
    ");",

    // Statements table
    "CREATE TABLE statements" +
    "(" +
    "id INT NOT NULL AUTO_INCREMENT, " +
    "rule_id INT UNSIGNED NOT NULL, " +
    "position INT UNSIGNED NOT NULL, " +
    "type INT(1) UNSIGNED NOT NULL, " +
    "code INT UNSIGNED NOT NULL, " +
    "PRIMARY KEY (id)" +
    ");",

    // Timestamps table
    "CREATE TABLE timestamps" +
    "(" +
    "id INT NOT NULL AUTO_INCREMENT, " +
    "channels_state VARCHAR(19), " +
    "rules_state VARCHAR(19), " +
    "alarm_state VARCHAR(19), " +
    "PRIMARY KEY (id)" +
    ");"
];

export default schema;