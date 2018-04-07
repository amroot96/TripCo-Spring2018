package com.tripco.t07.planner;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

public class Filter {

    public String attribute = "";
    public ArrayList<String> values;

    public Filter(String att, ArrayList<String> val){
        this.attribute = att;
        this.values = val;
    }

    public void filterDatabase() {

    }
}
