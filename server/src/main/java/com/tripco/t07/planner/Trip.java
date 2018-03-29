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
  private int version;
  private String type;
  private String title;
  public Option options;
  public ArrayList<Place> places;
  private Place[] placesArr;
  public ArrayList<Integer> distances;
  public String map;


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
    System.arraycopy(this.placesArr, middle, ret, 0, ml);
    System.arraycopy(this.placesArr, 0, ret, ml, middle);
    this.placesArr = copyPlaces(ret);
  }

  private void optShorter(Place[] opt) {
    boolean improvement = true;
    while (improvement) {
      improvement = false;
      for (int i = 0; i <= this.placesArr.length - 3; i++) {
        for (int k = i + 2; k <= this.placesArr.length - 1; k++) {
          int kn = k + 1;
          if (k + 1 == this.placesArr.length) {
            kn = 0;
          }
          int delta = -getDistance(this.placesArr[i], this.placesArr[i + 1])
              - getDistance(this.placesArr[k], this.placesArr[kn])
              + getDistance(this.placesArr[i], this.placesArr[k])
              + getDistance(this.placesArr[i + 1], this.placesArr[kn]);
          if (delta < 0) {
            twooptReverse(i + 1, k);
            improvement = true;
          }
        }
      }
    }
    this.placesArr = copyPlaces(opt);
  }

  private void twooptReverse(int i, int k) {
    while (i < k) {
      Place temp = this.placesArr[i];
      this.placesArr[i] = this.placesArr[k];
      this.placesArr[k] = temp;
      i++;
      k--;
    }
  }

  private void optShort() {
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
    for (Place p : list) {
      System.out.print(p.name + "  ");
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
    double lat1 = p1.parseLat;
    double lat2 = p2.parseLat;
    double long1 = p1.parseLong;
    double long2 = p2.parseLong;
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
      ret[i].parseLong = list[i].parseLong;
      ret[i].parseLat = list[i].parseLat;
    }
    return ret;
  }

  public void display() {
    System.out.println("version: " + this.version + " type: " + this.type
        + " title: " + this.title + " Optimization: " + this.options.getOptimization() + " Units: "
        + this.options.getDistance());
    for (Place p : this.places) {
      System.out.println("id: " + p.id + " name: " + p.name
          + " latitude: " + p.latitude + " longitude: " + p.longitude);
    }
    System.out.println(distances);
  }


  //Returns an SVG containing the background and the legs of the trip.
  private String svg() {
    InputStream filePath = this.getClass().getResourceAsStream("/colorado.svg");
    StringBuilder lineBuilder = new StringBuilder();
    lineBuilder.append(
        "<svg width=\"1066.6073\" height=\"783.0824\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> ");
    try {
      BufferedReader br = new BufferedReader(new InputStreamReader(filePath));
      String temp;
      while ((temp = br.readLine()) != null) {
        lineBuilder.append(temp);
        lineBuilder.append("\n");
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    lineBuilder.append("<svg width=\"1066.6073\" height=\"783.0824\">");
    lineBuilder.append(" <polyline points=\"");
    for (Place p : this.places) {
      int xCoord = (int) Math
          .round(((109 + p.parseLong) / 7) * 1006 + 30);
      int yCoord = (int) Math
          .round(((41 - p.parseLat) / 4) * 710 + 40);
      String hold = xCoord + "," + yCoord + " ";
      lineBuilder.append(hold);
    }
    lineBuilder.append(
        "\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/>" + "</svg>\n"
            + "</svg>");
    return lineBuilder.toString();
  }
}
