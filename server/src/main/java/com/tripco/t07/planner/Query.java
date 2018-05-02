package com.tripco.t07.planner;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.util.ArrayList;

public class Query {
    //dbconfigurationinformation
    private transient String myDriver="com.mysql.jdbc.Driver";
    private transient String localCred="jdbc:mysql://faure.cs.colostate.edu/cs314";
    private transient String travisCred="jdbc:mysql://localhost/cs314";

    //SQL queries to count the number of records and to retrieve the data
    public Integer version;
    public String type = "";
    public String query = "";
    public ArrayList<Filter> filters;
    public ArrayList<Place> places = new ArrayList<>();
    public Integer limit;
    public Query() {}


    public final boolean travis = System.getenv("TRAVIS") != null;

    private void limitCheck() {
        if(limit == -1 || limit == null) {
            limit = 50;
        }else if((limit == 0 && query.equals("")) || (limit == 0)){
            limit = 500;
        }
    }

    /** Handles the queries from and to the database.
     */
    public void queryDatabase() {
        limitCheck();
        if (version == null) {
            version = 3;
        }
        if (type == null) {
            type = "query";
        }
        if(filters != null) {
            if(filters.get(0).values.size() == 0 || filters.get(0).values == null) {
                noneLookup();
                return;
            }
            if(filters.size()==0 || filters.get(0).values.get(0).equals("none")) {
                noneLookup();
                return;
            } else {
                typeLookup();
            }
        } else {
            noneLookup();
        }
    }
    private void noneLookup() {
        String count = "select count(*) from airports;";
        String search = "select id,name,municipality,latitude,longitude,type from airports where name like'%"
            + query + "%'or municipality like'%" + query
            + "%' or  id like '%" + query
            + "%' order by name ASC";
        limitOrNot(search, count);
    }

    private void limitOrNot(String search, String count) {
        if(limit == 0){
            search += ";";
            query(search, count);
        }else {
            search += " limit " + limit + ";";
            query(search, count);
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
                        + "name ASC";
        limitOrNot(searching, count);
    }

    public void query(String search, String count) {
        String cred = localCred;
        try {
            Class.forName(myDriver);
// connect to the database and query
            String user = "amroot";
            String password = "830291232";
            if (System.getenv("TRAVIS") != null){
                user = "travis";
                password = null;
                cred = travisCred;
            }
            try (Connection conn = DriverManager.getConnection(cred, user, password);
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
        System.out.printf("\"type\": \"query\",\n");
        System.out.printf("\"title\": \"%s\",\n", query);
        System.out.printf("\"places\": [\n");
// determine the number of results that match the query
        count.next();
        int results = count.getInt(1);
        int temp = 1;
        int number = 1;
// iterate through query results and print out the airport codes
        while (q.next()) {
            System.out.printf("%d id: %s Name:%s", temp++, q.getString("id"), q.getString("name"));
            Place place = new Place();
            place.id = q.getString("id");
            place.name = q.getString("name");
            place.latitude = q.getString("latitude");
            place.longitude = q.getString("longitude");
            places.add(place);
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
