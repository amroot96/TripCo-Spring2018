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
  public int version;
  public String type;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;
  private int totalDist;

  public void display() {
    System.out.println("version: " + this.version);
    System.out.println("type: " + this.type);
    System.out.println("title: " + this.title);
    System.out.println("Optimization: " + this.options.getOptimization());
    System.out.println("Units: " + this.options.getDistance());
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
    this.options.setDistance();
    opt();
    this.distances = legDistances();
    this.map = svg();
    if(this.version != 2){
      this.version = 1;
    }

  }

  //calls the optimization methods
  private void opt() {
    if(this.places.size() == 1) {
      return;
    }
    double optType = this.options.getOptimization();
    System.out.println(optType);
    Place hold = this.places.get(0);
    removeLast();
    if(optType != 0) {
      if (optType <= 0.33) {
        optShort();
      } else if (optType <= 0.66) {
        optShorter(this.places);
      } else if (optType <= 1) {
        optShortest();
      }
    }
    restoreStart(hold);
  }

  private void removeLast(){
    Place hold = this.places.get(0);
    int last = this.places.size()-1;
    if (hold.name.equals(this.places.get(last).name)) {
      this.places.remove(last);
    }
  }

  //restores the original starting location after optimizations
  private void restoreStart(Place start) {
    int middle = -1;
    ArrayList<Place> retlist = new ArrayList<Place>();
    for (int i = 0; i < this.places.size(); i++) {
      if (this.places.get(i).name.equals(start.name)) {
        middle = i;
      }
    }
    for (int i = middle; i < places.size(); i++) {
      retlist.add(this.places.get(i));
    }
    for (int i = 0; i < middle; i++) {
      retlist.add(this.places.get(i));
    }
    this.places = copy(retlist);
  }

  private ArrayList<Place> copy(ArrayList<Place> copythis) {
    ArrayList<Place> retlist = new ArrayList<>();
    for (Place p : copythis) {
      retlist.add(p);
    }
    return retlist;
  }

  //optshort returns the shortest nearest neighbor
  private void optShort() {
    ArrayList<Place> templist = copy(this.places);
    ArrayList<Place> retlist = new ArrayList<>();
    int minDist = 1000000;
    for (int i = 0; i < templist.size(); i++) {
      Place help = templist.get(i);
      nearNeigh(help);
      placeList(this.places);
      System.out.println(this.totalDist);
      if (this.totalDist < minDist) {
        retlist.clear();
        minDist = this.totalDist;
        retlist = copy(this.places);
      }
    }
    this.places = copy(retlist);
  }

  //Nearest neighbor given a starting node
  private void nearNeigh(Place help) {
    ArrayList<Place> retlist = new ArrayList<Place>();
    retlist.add(help);
    this.places.remove(help);
    while (this.places.size() > 0) {
      help = findnearestPlace(help, this.places);
      retlist.add(help);
      this.places.remove(help);
    }
    this.places = copy(retlist);
    legDistances();
    removeRoundTrip();
  }

  //Given a starting location and a list of destinations,
  // this method picks the closest city and returns it.
  private Place findnearestPlace(Place start, ArrayList<Place> remaining) {
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

  private ArrayList<Place> optShorter(ArrayList<Place> opt) {
    this.distances = legDistances();
    removeRoundTrip();
    int bestDist = this.totalDist;
    ArrayList<Place> retlist = copy(this.places);
    for (int i = 1; i < retlist.size(); i++) {
      for (int k = i + 1; k < retlist.size(); k++) {
        this.places = twooptswap(this.places, i, k);
        this.distances = legDistances();
        removeRoundTrip();
        if (this.totalDist < bestDist) {
          opt = copy(optShorter(this.places));
        }
      }
    }
    this.places = copy(opt);
    return opt;
  }

  private ArrayList<Place> twooptswap(ArrayList<Place> orig, int i, int k) {
    ArrayList<Place> retlist = new ArrayList<Place>();
    for (int j = 0; j < i-1; j++) {
      retlist.add(orig.get(j));
    }
    for (int j = k-1; j > i-2; j--) {
      retlist.add(orig.get(j));
    }
    for (int j = k; j < orig.size(); j++) {
      retlist.add(orig.get(j));
    }
    return retlist;
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
      int xCoord = (int) Math
          .round(((109 + Double.parseDouble(this.places.get(i).longitude)) / 7) * 1006 + 30);
      int yCoord = (int) Math
          .round(((41 - Double.parseDouble(this.places.get(i).latitude)) / 4) * 710 + 40);
      line += xCoord + "," + yCoord + " ";
    }
    line += "\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/>" +
        "</svg>\n" +
        "</svg>";
    return line;
  }

  //Computes distances between each place, calls colocheckall and roundtrip;
  private ArrayList<Integer> legDistances() {
    ArrayList<Integer> dist = new ArrayList<>();
    this.totalDist = 0;
    if (this.places != null && !this.places.isEmpty()) {
    colocheckall();
    roundTrip();
    int temp = 0;
      dist.add(0);
      for (int i = 1; i < this.places.size(); ++i) {
          temp = getDistance(this.places.get(i -1), this.places.get(i));
          dist.add(temp);
          this.totalDist = this.totalDist + temp;
      }
    }
    return dist;
  }

  //Removes all places not in Colorado
  private void colocheckall() {
      for (int i = 0; i < this.places.size(); i++) {
        if (!coloradoCheck(Double.parseDouble(this.places.get(i).latitude),
            Double.parseDouble(this.places.get(i).longitude))) {
          this.places.remove(i);
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

  private void removeRoundTrip() {
    if (this.places.get(0).name.equals(this.places.get(this.places.size() - 1).name)) {
      this.places.remove(this.places.size() - 1);
    }
  }

  //Returns the distance between two Places.
  private Integer getDistance(Place p1, Place p2) {
    String s = this.options.getDistance();
    double lat1 = Math.toRadians(Double.parseDouble(p1.latitude));
    double lat2 = Math.toRadians(Double.parseDouble(p2.latitude));
    double long1 = Math.toRadians(Double.parseDouble(p1.longitude));
    double long2 = Math.toRadians(Double.parseDouble(p2.longitude));
        return (int) Math.round(this.options.getRadius() * Math.acos(
            Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math
                .cos(long2 - long1)));
  }

  private void placeList(ArrayList<Place> list) {
    for (int i = 0; i < list.size(); i++) {
      System.out.print(list.get(i).name + "  ");
    }
    System.out.println();
  }

  //Checks if a single place is in Colorado
  public boolean coloradoCheck(double latitude, double longitude) {
    return (latitude > 37 && latitude < 41 && longitude < -102.03 && longitude > -109.03);
  }
}
