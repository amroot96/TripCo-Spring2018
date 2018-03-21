package com.tripco.t07.planner;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.ArrayList;

public class Query {
    //dbconfigurationinformation
    private static final String myDriver="com.mysql.jdbc.Driver";
    private static final String myUrl="jdbc:mysql://faure.cs.colostate.edu/cs314";

    //SQL queries to count the number of records and to retrieve the data
    public String query = "";
    public ArrayList<Place> locations;

    /** Handles the queries from and to the database.
     */
    public void queryDatabase(){
        String count= "select count(*) from airports;";
        String search = "select id,name,municipality,latitude,longitude,type from airports where name like'%"
                + query +"%'or municipality like'%"+ query +"%'order by name;";
        System.out.println(search);
        System.out.println(count);

        try {
            Class.forName(myDriver);
// connect to the database and query
            try (Connection conn = DriverManager.getConnection(myUrl, "cntorres", "830429517");
                 Statement stCount = conn.createStatement();
                 Statement stQuery = conn.createStatement();
                 ResultSet rsCount = stCount.executeQuery(count);
                 ResultSet rsQuery = stQuery.executeQuery(search);
            ) {
                printJson(rsCount, rsQuery);
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
    }
    private void printJson(ResultSet count, ResultSet q) throws SQLException {
        System.out.printf("\n{\n");
        System.out.printf("\"type\": \"find\",\n");
        System.out.printf("\"title\": \"%s\",\n", query);
        System.out.printf("\"places\": [\n");
// determine the number of results that match the query
        count.next();
        int results = count.getInt(1);
        int temp = 1;
        int number = 1;
// iterate through query results and print out the airport codes
        while (q.next() && number <= 15) {
            System.out.printf("%d id: %s Name:%s", temp++, q.getString("id"), q.getString("name"));
            Place place = new Place();
            place.id = q.getString("id");
            place.name = q.getString("name");
            place.latitude = q.getString("latitude");
            place.longitude = q.getString("longitude");
            locations.add(place);
            if (--results == 0){
                System.out.printf("\n");
            }

            else{
                System.out.printf(",\n");
            }
            number++;
        }
        System.out.printf(" ]\n}\n");
    }


}
