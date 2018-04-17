package com.tripco.t07.planner;

import java.util.ArrayList;

public class Filter {

    public String attribute = "";
    public ArrayList<String> values;

    public String getAttr() {return this.attribute;}

    public ArrayList<String> getValues() {return this.values;}

    public Filter(String att, ArrayList<String> val){
        this.attribute = att;
        this.values = val;
    }

}
