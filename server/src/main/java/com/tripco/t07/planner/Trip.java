package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t07.server.HTTP;
import java.lang.reflect.Array;
import spark.Request;

import java.util.ArrayList;
import java.io.*;

/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 */
public class Trip {

  // The variables in this class should reflect TFFI.
  public String type;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;
  private int totalDist;

  public void display() {
    System.out.println(this.type);
    System.out.println(this.title);
    System.out.println(this.options);
    for (int i = 0; i < this.places.size(); i++) {
      System.out.println("id: " + this.places.get(i).id + " name: " + this.places.get(i).name +
          " latitude: " + this.places.get(i).latitude + " longitude: " + this.places
          .get(i).longitude);
    }
    System.out.println(distances);
  }

  public void plan() {
    Parser parse = new Parser(this.places);
    parse.iterator();
    if (this.distances != null) {
      this.distances.clear();
    }
    opt();
    this.distances = legDistances();
    this.map = svg();
  }

  //calls the optimization methods
  public void opt() {
    String optType = this.options.getOptimization();
    System.out.println(optType);
    Place hold = this.places.get(0);
    if (this.places.get(0).name.equals(this.places.get(this.places.size() - 1).name)) {
      this.places.remove(this.places.size() - 1);
    }
    if (optType.equals("short")) {
      this.places = optShort();
    } else if (optType.equals("shorter")) {
      optShorter();
    } else if (optType.equals("shortest")) {
      optShortest();
    }
    restoreStart(hold);
  }

  //restores the original starting location after optimizations
  private void restoreStart(Place start) {
    if (start.name.equals(this.places.get(0))) {
      return;
    }
    int middle = -1;
    ArrayList<Place> retlist = new ArrayList<Place>();
    for (int i = 0; i < this.places.size() - 1; i++) {
      if (this.places.get(i).name.equals(start.name)) {
        middle = i;
      }
    }
    for (int i = middle; i < places.size() - 1; i++) {
      retlist.add(this.places.get(i));
    }
    for (int i = 0; i < middle; i++) {
      retlist.add(this.places.get(i));
    }

  }

  //optshort is the nearest neighbor algorithm
  private ArrayList<Place> optShort() {
    ArrayList<Place> templist = new ArrayList<>();
    for (Place p : this.places) {
      templist.add(p);
    }
    ArrayList<Place> testlist = new ArrayList<Place>();
    ArrayList<Place> retlist = new ArrayList<Place>();
    int minDist = 1000000;
    int dist = 0;
    for (int i = 0; i < templist.size() - 1; i++) {
      Place p = templist.get(i);
      testlist.clear();
      Place help = p;
      testlist.add(help);
      this.places.remove(help);
      while (this.places.size() > 0) {
        help = findnearestPlace(testlist.get(testlist.size() - 1), this.places);
        testlist.add(help);
        this.places.remove(help);
      }
      this.places = testlist;
      legDistances();
      if (this.totalDist < minDist) {
        retlist.clear();
        for (Place c : testlist) {
          retlist.add(c);
        }
        minDist = this.totalDist;
      }
    }
    return retlist;
  }

  //Given a starting location and a list of destinations,
  // this method picks the closest city and returns it.
  public Place findnearestPlace(Place start, ArrayList<Place> remaining) {
    Place ret = start;
    int help = 1000000;
    int dist = 0;
    for (int i = 0; i < remaining.size(); i++) {
      dist = getDistance(start, remaining.get(i));
      if (help > dist) {
        help = dist;
        ret = remaining.get(i);
      }
    }
    return ret;
  }

  private void optShorter() {
    System.out.println("shorter TEST TEST TEST");
  }

  private void optShortest() {
    System.out.println("shortest TEST TEST TEST");
  }

  //Returns an SVG containing the background and the legs of the trip.
  private String svg() {
    InputStream filePath = this.getClass().getResourceAsStream("/colorado.svg");
    String line = "<svg width=\"1066.6073\" height=\"783.0824\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> ";
    try {
      BufferedReader br = new BufferedReader(new InputStreamReader(filePath));
      String temp = br.readLine();
      while (temp != null) {
        line += temp + "\n";
        temp = br.readLine();
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    line += "<svg width=\"1066.6073\" height=\"783.0824\">";
    line += " <polyline points=\"";
    for (int i = 0; i < this.places.size(); i++) {
      int xVar = (int) Math
          .round(((109 + Double.parseDouble(this.places.get(i).longitude)) / 7) * 1006 + 30);
      int yVar = (int) Math
          .round(((41 - Double.parseDouble(this.places.get(i).latitude)) / 4) * 710 + 40);
      line += xVar + "," + yVar + " ";
    }
    line += "\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/>" +
        "</svg>\n" +
        "</svg>";
    return line;
  }

  //Computes distances between each place, calls colocheckall and roundtrip;
  private ArrayList<Integer> legDistances() {
    ArrayList<Integer> dist = new ArrayList<>();
    colocheckall();
    roundTrip();
    int temp = 0;
    if (this.places != null && !this.places.isEmpty()) {
      for (int i = 0; i < this.places.size(); ++i) {
        if (i == 0) {
          dist.add(0);
        } else {
          temp = getDistance(this.places.get(i - 1), this.places.get(i));
          dist.add(temp);
          this.totalDist = this.totalDist + temp;
        }
      }
    }
    return dist;
  }

  //Removes all places not in Colorado
  private void colocheckall() {
    if (this.places != null && !this.places.isEmpty()) {
      for (int i = 0; i < this.places.size(); i++) {
        if (!coloradoCheck(Double.parseDouble(this.places.get(i).latitude),
            Double.parseDouble(this.places.get(i).longitude))) {
          this.places.remove(i);
        }
      }
    }
  }

  //Adds first location to end if necessary.
  private void roundTrip() {
    if (this.places != null && !this.places.isEmpty()) {
      if (!this.places.get(0).id.equals(this.places.get(this.places.size() - 1).id)) {
        this.places.add(this.places.get(0));
      }
    }
  }

  //Returns the distance between two Places.
  private Integer getDistance(Place p1, Place p2) {
    String s = this.options.getDistance();
    double lat1 = Math.toRadians(Double.parseDouble(p1.latitude));
    double lat2 = Math.toRadians(Double.parseDouble(p2.latitude));
    double long1 = Math.toRadians(Double.parseDouble(p1.longitude));
    double long2 = Math.toRadians(Double.parseDouble(p2.longitude));
    switch (s.charAt(0)) {
      case 'm':
        return (int) Math.round(3958.7613 * Math.acos(
            Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math
                .cos(long2 - long1)));
      case 'k':
        return (int) Math.round(6371.0088 * Math.acos(
            Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math
                .cos(long2 - long1)));
      case 'n':
        return (int) Math.round(3440.0695 * Math.acos(
            Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math
                .cos(long2 - long1)));
      default:
        return 0;
    }
  }

  //Checks if a single place is in Colorado
  public boolean coloradoCheck(double latitude, double longitude) {
    return (latitude > 37 && latitude < 41 && longitude < -102.03 && longitude > -109.03);
  }
}
