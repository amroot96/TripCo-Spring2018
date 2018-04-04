package com.tripco.t07.planner;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Filter {
    //dbconfigurationinformation
    private static final String myDriver="com.mysql.jdbc.Driver";
    private static final String myUrl="jdbc:mysql://faure.cs.colostate.edu/cs314";

    public String filter = "";
    public ArrayList<Place> locations;

    public void filterDatabase() {

    }
}
