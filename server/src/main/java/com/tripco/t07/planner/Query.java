package com.tripco.t07.planner;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.ArrayList;

public class Query {
    //dbconfigurationinformation
    private  String myDriver="com.mysql.jdbc.Driver";
    private  String myUrl="jdbc:mysql://faure.cs.colostate.edu/cs314";

    //SQL queries to count the number of records and to retrieve the data
    public String query = "";
    public ArrayList<Place> locations = new ArrayList<Place>();
    public ArrayList<Filter> filters;

    /** Handles the queries from and to the database.
     */
    public void queryDatabase() {
        if(filters.size() == 0) {
            String count = "select count(*) from airports;";
            String search = "select id,name,municipality,latitude,longitude,type from airports where name like'%"
                    + query + "%'or municipality like'%" + query + "%'order by name limit 15;";
            System.out.println(search);
            System.out.println(count);
            query(search, count);
        } else {
            idLookup();
        }
    }

    private void idLookup() {
        String count = "select count(*) from airports;";
        String searching =
                "SELECT  airports.id, airports.name, airports.municipality, airports.type, " +
                        "airports.latitude, airports.longitude, region.name, country.name, continents.name " +
                        "FROM continents " +
                        "INNER JOIN country ON continents.id = country.continent " +
                        "INNER JOIN region ON country.id = region.iso_country " +
                        "INNER JOIN airports ON region.id = airports.iso_region " +
                        "WHERE country.name LIKE '%" +query +
                        "%' OR region.name LIKE '%" + query +
                        "%' OR airports.name LIKE '%" + query +
                        "%' OR airports.municipality LIKE '%" + query +
                        "%' ORDER BY continents.name, country.name, region.name, airports.municipality, " +
                        "airports.name ASC LIMIT 15;";
        query(searching,count);
    }

    public void query(String search, String count) {
        try {
            Class.forName(myDriver);
// connect to the database and query
            String user = "amroot";
            String password = "830291232";
            if (System.getenv("TRAVIS") != null){
                user = "travis";
                password = null;
            }
            try (Connection conn = DriverManager.getConnection(myUrl, user, password);
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
