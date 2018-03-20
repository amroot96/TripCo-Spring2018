package com.tripco.t07.planner;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;



public class Database  {
    // db configuration information
    private static final String myDriver = "com.mysql.jdbc.Driver";
    private static final String myUrl = "jdbc:mysql://faure.cs.colostate.edu/cs314";
    // SQL queries to count the number of records and to retrieve the data
    private static final String count = "select count(*) from airports;";
    private static final String search = "select id,name,municipality,type from airports limit 20;";
    // Arguments contain the username and password for the database

    /** Handles the queries from and to the database.
     */
    public static void main(String[] args) {
        try {
            Class.forName(myDriver);
// connect to the database and query
            try (Connection conn = DriverManager.getConnection(myUrl, "amroot", "830291232");
                 Statement stCount = conn.createStatement();
                 Statement stQuery = conn.createStatement();
                 ResultSet rsCount = stCount.executeQuery(count);
                 ResultSet rsQuery = stQuery.executeQuery(search)
            ) {
                printJson(rsCount, rsQuery);
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
    }

    private static void printJson(ResultSet count, ResultSet query) throws SQLException {
        System.out.printf("\n{\n");
        System.out.printf("\"type\": \"find\",\n");
        System.out.printf("\"title\": \"%s\",\n", search);
        System.out.printf("\"places\": [\n");
// determine the number of results that match the query
        count.next();
        int results = count.getInt(1);
        int temp = 1;
// iterate through query results and print out the airport codes
        while (query.next()) {
            System.out.printf("%d id: %s Name:%s", temp++, query.getString("id"));
            if (--results == 0){
                System.out.printf("\n");
            }

            else{
                System.out.printf(",\n");
            }

        }
        System.out.printf(" ]\n}\n");
    }


}
