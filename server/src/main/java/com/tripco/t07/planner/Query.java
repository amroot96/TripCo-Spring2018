package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import spark.Request;

/**
 * This class handles to the conversions of the query request/resopnse,
 * converting from the Json string in the request body to a Query object,
 * querying the database, and
 * converting the resulting Query object back to a Json string
 * so it may returned as the response.
 */
public class Query {

  private Query query;

  /** Handles database query request, creating a new Query object from the query request.
   * Does the conversion from Json to a Java class before querying the database.
   * @param request a query
   */
  public Query(Request request){
    // extract the information from the body of the request.
    JsonParser jsonParser = new JsonParser();
    JsonElement requestBody = jsonParser.parse(request.body());

    // convert the body of the request to a Java class.
    Gson gson = new Gson();
    query = gson.fromJson(requestBody, Query.class);
  }

  public String getQuery(){
    Gson gson = new Gson();
    return gson.toJson(query);
  }

}
