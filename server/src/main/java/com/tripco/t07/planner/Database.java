package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import spark.Request;



public class Database  {
    public Query query;

    /** Parses the json file.
     */
    public Database(Request request) {
        // first print the request
        //System.out.println(HTTP.echoRequest(request));

        // extract the information from the body of the request.
        JsonParser jsonParser = new JsonParser();
        JsonElement requestBody = jsonParser.parse(request.body());
        // convert the body of the request to a Java class.
        Gson gson = new Gson();
        query =  gson.fromJson(requestBody, Query.class);
        query.queryDatabase();

    }



    public String getQuery() {
        Gson gson = new Gson();
        return gson.toJson(query);
    }

}
