package com.tripco.t07.planner;

/**
 * Describes the places to visit in a trip in TFFI format.
 * There may be other attributes of a place, but these are required to plan a trip.
 */
public class Place {
  public String id;
  public String name;
  public String latitude;
  public transient double parseLat;
  public String longitude;
  public transient double parseLong;


}
