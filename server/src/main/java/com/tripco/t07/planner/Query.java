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
    public ArrayList<Place> locations = new ArrayList<>();
    public ArrayList<Filter> filters = new ArrayList<>();

    public Query() {}

    /** Handles the queries from and to the database.
     */
    public void queryDatabase() {
        if(filters.get(0).values.size() == 0 || filters.get(0).values.get(0).equals("none")) {
            String count = "select count(*) from airports;";
            String search = "select id,name,municipality,latitude,longitude,type from airports where name like'%"
                    + query + "%'or municipality like'%" + query
                    + "%' or  id like '%" + query
                    + "%' order by name limit 15;";
            System.out.println(search);
            System.out.println(count);
            query(search, count);
        } else {
            typeLookup();
        }
    }

    private void typeLookup() {
        String count = "select count(*) from airports;";
        String searching =
                "SELECT id, name, municipality, type, latitude, longitude"
                        + " FROM airports WHERE (name LIKE '%" + query
                        + "%' OR municipality like '%" + query
                        + "%' OR id like '%" + query
                        + "%') AND type = '" + filters.get(0).values.get(0)
                        + "' ORDER BY "
                        + "name ASC LIMIT 15;";
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
