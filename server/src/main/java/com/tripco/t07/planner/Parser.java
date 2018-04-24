package com.tripco.t07.planner;

import java.util.ArrayList;

public class Parser {

  public ArrayList<Place> places;

  public Parser(ArrayList<Place> list) {
    this.places = list;
  }

  public void iterator() {
    String[] lat;
    String[] longi;
    for (int i = 0; i < places.size(); i++) {
      lat = places.get(i).latitude.split("[°\'\"][\\s]*");
      longi = places.get(i).longitude.split("[°\'\"][\\s]*");
      Double holdLat = parse(lat);
      Double holdLong = parse(longi);
      places.get(i).latitude = holdLat.toString();
      places.get(i).longitude = holdLong.toString();
      places.get(i).parseLat = Math.toRadians(parse(lat));
      places.get(i).parseLong = Math.toRadians(parse(longi));
    }
  }

  public double parse(String[] latLong) {
    switch (latLong.length) {
      //40° N
      case 2:
        return DD(latLong[1], Double.parseDouble(latLong[0]));
      //40° 35.098'  N
      case 3:
        if (latLong[2].matches("[0-9]+[NWES]")) {
          String direction = latLong[2].substring(latLong.length - 1);
          String second = latLong[2].substring(0, latLong.length - 1);
          return DMS(direction, Double.parseDouble(latLong[0]),
              Double.parseDouble(latLong[1]),
              Double.parseDouble(second));

        }
        return DDM(latLong[2], Double.parseDouble(latLong[0]),
            Double.parseDouble(latLong[1]));

      //40° 35' 6.9288" N
      case 4:
        return DMS(latLong[3], Double.parseDouble(latLong[0]),
            Double.parseDouble(latLong[1]),
            Double.parseDouble(latLong[2]));
      default:
        break;
    }
    return Double.parseDouble(latLong[0]);
  }

  public Double DMS(String direction, Double degree, Double minute, Double second) {
    if (direction.equals("N") || direction.equals("E")) {
      return degree + minute / 60 + second / 3600;
    } else {
      return -(degree + minute / 60 + second / 3600);
    }
  }

  public Double DDM(String direction, Double degree, Double minute) {
    if (direction.equals("N") || direction.equals("E")) {
      return degree + minute / 60;
    } else {
      return -(degree + minute / 60);
    }
  }

  public Double DD(String direction, Double degree) {
    if (direction.equals("N") || direction.equals("E")) {
      return degree;
    } else {
      return -degree;
    }

  }

}
