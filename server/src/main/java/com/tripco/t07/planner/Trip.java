package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t07.server.HTTP;
import java.lang.reflect.Array;
import java.util.Arrays;
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
  public Place[] placesArr;
  public ArrayList<Integer> distances;
  public int[] distArr;
  public String map;
  private int totalDist;


  public void plan() {
    Parser parse = new Parser(this.places);
    parse.iterator();
    if (this.places != null && !this.places.isEmpty()) {
      this.options.setDistance();
      removeRoundTrip(this.places);
      setPlaces();
      opt();
      legDistances(this.placesArr);
      this.map = svg();
      if (this.version != 2) {
        this.version = 1;
      }
    }
  }
  private void setPlaces() {
    this.placesArr = new Place[this.places.size()];
    this.distArr = new int[this.places.size() + 1];
    for (int i = 0; i < this.places.size(); i++) {
      this.placesArr[i] = this.places.get(i);
    }
  }
  //calls the optimization methods
  private void opt() {
    if (this.places.size() <= 1) {
      return;
    }
    double optType = this.options.getOptimization();
    System.out.println("optimization" + Double.toString(optType));
    String hold = this.places.get(0).name;
    if (optType != 0) {
      if (optType <= 0.33) {
        optShort();
      } else if (optType <= 0.66) {
        optShorter(this.placesArr);
      }
    }
    restoreStart(hold);
  }

  //restores the original starting location after optimizations
  private void restoreStart(String start) {
    int middle = -1;
    Place[] ret = new Place[this.placesArr.length];
    for (int i = 0; i < this.placesArr.length; i++) {
      if (this.placesArr[i].name.equals(start)) {
        middle = i;
        break;
      }
    }
    int ml = this.placesArr.length - middle;
    for (int i = middle; i < this.placesArr.length; i++) {
      ret[i - middle] = this.placesArr[i];
    }
    for (int i = 0; i < middle; i++) {
      ret[ml + i] = this.placesArr[i];
    }
    this.placesArr = copyPlaces(ret);
  }

  private Place[] optShorter(Place[] opt) {
    int bestDist = calctotalDist(opt);
    System.out.println("Original Distance : " + bestDist);
    Place[] retlist = copyPlaces(opt);
    System.out.println("retlist original");
    placeList(retlist);
    for (int i = 1; i < retlist.length; i++) {
      for (int k = i + 1; k < retlist.length; k++) {
        this.placesArr = twooptswap(this.placesArr, i, k);
        if (bestDist > calctotalDist(this.placesArr)) {
          bestDist = calctotalDist(this.placesArr);
          opt = copyPlaces(optShorter(this.placesArr));
        }
      }
    }
    this.placesArr = copyPlaces(opt);
    return opt;
  }

  private Place[] twooptswap(Place[] orig, int i, int k) {
    System.out.println("Orig list i = " + i + " k = " + k);
    placeList(orig);
    Place[] ret = new Place[orig.length];
    int help = 0;
    for (int j = 0; j < i - 1; j++) {
      ret[help] = orig[j];
      help++;
    }
    for (int j = k - 1; j > i - 2; j--) {
      ret[help] = orig[j];
      help++;
    }
    for (int j = k; j < orig.length; j++) {
      ret[help] = orig[j];
      help++;
    }
    System.out.println("Retlist");
    placeList(ret);
    return ret;
  }

  private void optShort() {
    placeList(this.placesArr);
    int bestdist = calctotalDist(this.placesArr);
    Place[] bestArr = copyPlaces(this.placesArr);
    for (int i = 0; i < this.placesArr.length; i++) {
      Place[] newarr = nearestNs(i);
      int newdist = calctotalDist(newarr);
      if (newdist < bestdist) {
        bestdist = newdist;
        bestArr = copyPlaces(newarr);
      }
    }
    System.out.println(bestdist);
    this.placesArr = copyPlaces(bestArr);
  }

  private Place[] nearestNs(int start) {
    Place[] ret = new Place[this.placesArr.length];
    Place[] build = copyPlaces(this.placesArr);
    build[start].name = "<Finished>";
    ret[0] = this.placesArr[start];
    for (int i = 1; i < this.placesArr.length; i++) {
      ret[i] = nearNeigh(build, ret[i - 1]);
    }
    return ret;
  }

  private Place nearNeigh(Place[] list, Place start) {
    int bestdist = 999999;
    int bestindex = 0;
    for (int i = 0; i < list.length; i++) {
      if (!list[i].name.equals("<Finished>")) {
        int temp = getDistance(start, list[i]);
        if (temp < bestdist) {
          bestdist = temp;
          bestindex = i;
        }
      }
    }
    list[bestindex].name = "<Finished>";
    return this.placesArr[bestindex];
  }

  private void placeList(Place[] list) {
    for (int i = 0; i < list.length; i++) {
      System.out.print(list[i].name + "  ");
    }
    System.out.println();
  }

  private int calctotalDist(Place[] list) {
    int total = getDistance(list[0], list[list.length - 1]);
    for (int i = 0; i < list.length - 1; i++) {
      total += getDistance(list[i], list[i + 1]);
    }
    return total;
  }

  //Correctly fills out distances arraylist;
  private void legDistances(Place[] list) {
    this.distances.clear();
    this.places.clear();
    this.distances.add(0);
    this.places.add(list[0]);
    for (int i = 1; i < list.length; ++i) {
      this.distances.add(getDistance(list[i - 1], list[i]));
      this.places.add(list[i]);
    }
    this.distances.add(getDistance(list[0], list[list.length - 1]));
    this.places.add(list[0]);
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

  private void removeRoundTrip(ArrayList<Place> placelist) {
    if (placelist.get(0).name.equals(placelist.get(placelist.size() - 1).name)) {
      placelist.remove(placelist.size() - 1);
    }
  }

  private Place[] copyPlaces(Place[] list) {
    Place[] ret = new Place[list.length];
    for (int i = 0; i < list.length; i++) {
      ret[i] = new Place();
      ret[i].name = list[i].name;
      ret[i].id = list[i].id;
      ret[i].latitude = list[i].latitude;
      ret[i].longitude = list[i].longitude;
    }
    return ret;
  }

  public void display() {
    System.out.println("version: " + this.version + " type: " + this.type
        + " title: " + this.title + " Optimization: " + this.options.getOptimization() + " Units: "
        + this.options.getDistance());
    for (int i = 0; i < this.places.size(); i++) {
      System.out.println("id: " + this.places.get(i).id + " name: " + this.places.get(i).name +
          " latitude: " + this.places.get(i).latitude + " longitude: " + this.places
          .get(i).longitude);
    }
    System.out.println(distances);
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
}
