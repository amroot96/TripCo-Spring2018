package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t07.server.HTTP;
import spark.Request;

import java.util.ArrayList;

/**
 * This class handles to the conversions of the trip request/resopnse,
 * converting from the Json string in the request body to a Trip object,
 * planning the Trip, and
 * converting the resulting Trip object back to a Json string
 * so it may returned as the response.
 */
public class Plan {

  private Trip trip;

  /** Handles trip planning request, creating a new trip object from the trip request.
   * Does the conversion from Json to a Java class before planning the trip.
   * @param request
   */
  public Plan (Request request) {
    System.out.println(request.body());
    // extract the information from the body of the request.

    JsonParser jsonParser = new JsonParser();
    JsonElement requestBody = jsonParser.parse(request.body());
    System.out.println(requestBody);

    // convert the body of the request to a Java class.
    Gson gson = new Gson();
    trip = gson.fromJson(requestBody, Trip.class);

    // plan the trip.
    if(trip.options == null) {
      trip.options = new Option();
      trip.options.distance = "miles";
      trip.options.optimization = "0.0";
    }
    trip.plan();
    // log something.
    trip.display();
  }

  /** Handles the response for a Trip object.
   * Does the conversion from a Java class to a Json string.*
   */
  public String getTrip () {
    Gson gson = new Gson();
    return gson.toJson(trip);
  }
}
