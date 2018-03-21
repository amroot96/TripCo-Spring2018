package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import spark.Request;



public class Setup  {
  public Config config = new Config();

  public Setup(){

  }


  public String getConfig() {
    Gson gson = new Gson();
    System.out.println(gson.toJson(config));
    return gson.toJson(config);
  }

}
