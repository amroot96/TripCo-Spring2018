package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t07.server.HTTP;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashMap;
import spark.Request;

import javax.swing.plaf.synth.SynthEditorPaneUI;
import java.util.ArrayList;
import java.io.*;

/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 */
public class Trip {

  private int version;
  private String type;
  private String title;
  public Option options;
  public ArrayList<Place> places;
  private Place[] placesArr;
  public ArrayList<Integer> distances;
  public transient String map;


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
      if (this.version != 3 && this.version != 2 && this.version != 1) {
        this.version = 4;
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
    if (this.places.size() <= 1 || this.options.getOptimization() == 0) {
      return;
    }
    double optType = this.options.getOptimization();
    String hold = this.places.get(0).name;
    if (optType <= 0.33) {
      optShort(1);
    } else if (optType <= 0.66) {
      optShort(2);
    } else if (optType <= 1.0){
        optShort(3);
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

  private void optShorter(Place[] input) {
    boolean improvement = true;
    while (improvement) {
      improvement = false;
      for (int i = 0; i <= input.length - 3; i++) {
        for (int k = i + 2; k <= input.length - 1; k++) {
          int kn = k + 1;
          if (k + 1 == input.length) {
            kn = 0;
          }
          int delta = -getDistance(input[i], input[i + 1])
              - getDistance(input[k], input[kn])
              + getDistance(input[i], input[k])
              + getDistance(input[i + 1], input[kn]);
          if (delta < 0) {
            twooptReverse(input,i + 1, k);
            improvement = true;
          }
        }
      }
    }
  }

  private void optShortest(Place[] input) {
    boolean improvement = true;
    while (improvement) {
      improvement = false;
      for (int i = 0; i < input.length - 2; i++) {
        for (int j = i + 1; j < input.length - 1; j++) {
          for (int k = j + 1; k < input.length - 0; k++) {
            int kn = k + 1;
            if (k + 1 == input.length) {
              kn = 0;
            }
            int currentDistance = getDistance(input[i],input[i+1])
                    + getDistance(input[j],input[j+1]) + getDistance(input[k],input[kn]); // current trip

              if (distance7(input, i, j, k, kn) < currentDistance) { // case 7
                twooptReverse(input, i+1, j);
                twooptReverse(input, j+1, k);
                twooptReverse(input, i+1, k);
                improvement = true;
                  continue;
              }
              if (distance6(input, i, j, k, kn) < currentDistance) { // case 6
                  twooptReverse(input, j+1,k);
                  twooptReverse(input, i+1,k);
                  improvement = true;
                  continue;
              }
              if (distance5(input, i, j, k, kn) < currentDistance) { // case 5
                twooptReverse(input, i+1, j);
                twooptReverse(input, i+1, k);
                improvement = true;
                continue;
              }
              if (distance4(input, i, j, k, kn) < currentDistance) { // case 4
                    twooptReverse(input, i+1, j);
                    twooptReverse(input, j+1, k);
                    improvement = true;
                    continue;
              }
              if (distance1(input, i, j, k, kn) < currentDistance) { // case 1
                  twooptReverse(input, i+1, k);
                  improvement = true;
                  continue;
              }
              if (distance3(input, i, j, k, kn) < currentDistance) { // case 3
                twooptReverse(input, j+1, k);
                improvement = true;
                continue;
              }
              if (distance2(input, i, j, k, kn) < currentDistance) { // case 2
                  twooptReverse(input, i+1, j);
                  improvement = true;
                  continue;
              }

          }
        }
      }
    }
  }

  private void twooptReverse(Place[] input, int i, int k) {
    while (i < k) {
      Place temp = input[i];
      input[i] = input[k];
      input[k] = temp;
      i++;
      k--;
    }
  }
  public void swap(Place[] input, int i, int j, int k){
      int jToK = (k-(j+1))+1;
      Place []temp = new Place[jToK];
      Place []copy = new Place[input.length];
      for(int c = 0; c<input.length; c++){
        copy[c]=input[c];
      }
      int pointer = j+1;
      for(int x = 0; pointer < k+1; x++ ){
          temp[x] = input[pointer];
          pointer++;
      }
      pointer = i+1;
      int tempCounter = 0;
      for(int x = i+1; x  < k+1 ; x++){
        if(tempCounter< jToK){
          input[x] = temp[tempCounter];
        }
        else{
          input[x] = copy[pointer];
          pointer++;
        }
        tempCounter++;
      }






  }

  private int distance1(Place[] input, int i, int j, int k, int kn){
    return getDistance(input[i],input[k])
            + getDistance(input[j+1],input[j]) + getDistance(input[i+1],input[kn]);
  }
  private int distance2(Place[] input, int i, int j, int k, int kn){
        return getDistance(input[i],input[j])
                + getDistance(input[i+1],input[j+1]) + getDistance(input[k],input[kn]);
  }
  private int distance3(Place[] input, int i, int j, int k, int kn){
    return getDistance(input[i],input[i+1])
            + getDistance(input[j],input[k]) + getDistance(input[j+1],input[kn]);
  }
  private int distance4(Place[] input, int i, int j, int k, int kn){
      // j << i+1 k << j+1 k+1
      return getDistance(input[i],input[j])
              + getDistance(input[i+1],input[k]) + getDistance(input[j+1],input[kn]);
  }
  private int distance5(Place[] input, int i, int j, int k, int kn){
      //k << j+1 i+1 >> j k+1
        return getDistance(input[i],input[k])
                + getDistance(input[j+1],input[i+1]) + getDistance(input[j],input[kn]);
  }
  private int distance6(Place[] input, int i, int j, int k, int kn){
      //j+1 >> k j << i+1
        return getDistance(input[i],input[j+1])
                + getDistance(input[k],input[j]) + getDistance(input[i+1],input[kn]);
    }
  private int distance7(Place[] input, int i, int j, int k, int kn){
      // j+1 >> k i+1 >> j k+1
        return getDistance(input[i],input[j+1])
                + getDistance(input[k],input[i+1]) + getDistance(input[j],input[kn]);
    }


  private void optShort(int type) {
    int bestdist = calctotalDist(this.placesArr);
    Place[] bestArr = copyPlaces(this.placesArr);
    for (int i = 0; i < this.placesArr.length; i++) {
      Place[] newarr = nearestNs(i);
      if(type == 2) {
        optShorter(newarr);
      }
      if(type == 3) {
        optShortest(newarr);
      }
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
    int bestdist = Integer.MAX_VALUE;
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

  private int calctotalDist(Place[] list) {
    int total = getDistance(list[0], list[list.length - 1]);
    for (int i = 0; i < list.length - 1; i++) {
      total += getDistance(list[i], list[i + 1]);
    }
    return total;
  }

  //Correctly fills out distances arraylist;
  private void legDistances(Place[] list) {
    if(this.distances!=null) {
      this.distances.clear();
    }else {
      this.distances = new ArrayList<Integer>();
    }
    this.places.clear();
    this.distances.add(0);
    this.places.add(list[0]);
    for (int i = 1; i < list.length; ++i) {
      this.distances.add(getDistance(list[i - 1], list[i]));
      this.places.add(list[i]);
    }
    if(list.length>1) {
      this.distances.add(getDistance(list[0], list[list.length - 1]));
      this.places.add(list[0]);
    }
  }

  //Returns the distance between two Places.
  private Integer getDistance(Place p1, Place p2) {
    return (int) Math.round(this.options.getRadius() * Math.acos(
        Math.sin(p1.parseLat) * Math.sin(p2.parseLat)
            + Math.cos(p1.parseLat) * Math.cos(p2.parseLat) * Math
            .cos(p2.parseLong - p1.parseLong)));
  }

  private void removeRoundTrip(ArrayList<Place> placelist) {
    if (placelist.get(0).name.equals(placelist.get(placelist.size() - 1).name) && placelist.size() >1) {
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
    int sum = 0;
    for(Integer i: this.distances) {
      sum+=i;
    }
    System.out.println("total distance: " + sum);
  }


    private void placeList(Place[] list) {
        for (Place p : list) {
            System.out.print(p.name + "  ");
        }
        System.out.println();
    }
  //Returns an SVG containing the background and the legs of the trip.
  private String svg() {
    InputStream filePath = this.getClass().getResourceAsStream("/World2.svg");
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
          .round(((109 + Math.toDegrees(p.parseLong)) / 7) * 1006 + 30);
      int yCoord = (int) Math
              .round(((41 - Math.toDegrees(p.parseLat)) / 4) * 710 + 40);
      String hold = xCoord + "," + yCoord + " ";
      lineBuilder.append(hold);
    }
    lineBuilder.append(
        "\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/>" + "</svg>\n"
            + "</svg>");
    return lineBuilder.toString();
  }
}
