package com.tripco.t07.planner;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Query {
    //dbconfigurationinformation
    private static final String myDriver="com.mysql.jdbc.Driver";
    private static final String myUrl="jdbc:mysql://faure.cs.colostate.edu/cs314";
        //SQLqueriestocountthenumberofrecordsandtoretrievethedata

    public String query = "";

    public String[] locations = new String[20];

   public String count="select count(*) from airports;";
   public String search;

    /** Handles the queries from and to the database.
     */
    public void queryDatabase(){
        search = "select id,name,municipality,type from airports where name like'%"
                + query +"%'or municipality like'%"+ query +"%'order by name;";
        try {
            Class.forName(myDriver);
// connect to the database and query
            try (Connection conn = DriverManager.getConnection(myUrl, "amroot", "830291232");
                 Statement stCount = conn.createStatement();
                 Statement stQuery = conn.createStatement();
                 ResultSet rsCount = stCount.executeQuery(count);
                 ResultSet rsQuery = stQuery.executeQuery(search);
            ) {
                for(int i = 0; i < locations.length-1; i++){
                    locations[i] = "id: " + rsQuery.getString("id")
                            + "name: " +rsQuery.getString("name");
                }
            }
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
        }
    }


    private void add(ResultSet count, ResultSet q) throws SQLException {
//        System.out.printf("\n{\n");
//        System.out.printf("\"type\": \"find\",\n");
//        System.out.printf("\"title\": \"%s\",\n", search);
//        System.out.printf("\"places\": [\n");
//// determine the number of results that match the query
//        count.next();
//        int results = count.getInt(1);
//        int temp = 1;
//// iterate through query results and print out the airport codes
//        while (q.next()) {
//            System.out.printf("%d id: %s Name:%s", temp++, q.getString("id"), q.getString("name"));
//            if (--results == 0){
//                System.out.printf("\n");
//            }
//
//            else{
//                System.out.printf(",\n");
//            }
//
//        }
//        System.out.printf(" ]\n}\n");
    }
}
