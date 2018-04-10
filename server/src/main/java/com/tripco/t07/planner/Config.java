package com.tripco.t07.planner;

import java.util.ArrayList;

public class Config  {

  private final String type = "config";
  private final int version = 3;
  private final Filter[] filters = {new Filter("type",new ArrayList<String>())};/*,
                                    new Filter("region",new ArrayList<String>()),
                                    new Filter("country",new ArrayList<String>()),
                                    new Filter("continent",new ArrayList<String>())};*/
  private final String[] maps = {"kml"};
  private final int optimizaiton = 2;
  private final Optimizations[] optimizations = {new Optimizations("0opt","As planned"),
                                              new Optimizations("1opt","Nearest Neighbor"),
                                              new Optimizations("2opt","2-opt algorithm")};
  private final String[] distances = {"miles", "kilometers", "nautical miles", "user defined"};

}
