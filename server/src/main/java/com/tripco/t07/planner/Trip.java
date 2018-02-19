package com.tripco.t07.planner;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.tripco.t07.server.HTTP;
import spark.Request;
import java.util.ArrayList;
import java.io.*;

/**
 * The Trip class supports TFFI so it can easily be converted to/from Json by Gson.
 *
 */
public class Trip {
  // The variables in this class should reflect TFFI.
  public String type;
  public String title;
  public Option options;
  public ArrayList<Place> places;
  public ArrayList<Integer> distances;
  public String map;
  /** The top level method that does planning.
   * At this point it just adds the map and distances for the places in order.
   * It might need to reorder the places in the future.
   */
  public void display() {
      System.out.println(this.type);
      System.out.println(this.title);
      System.out.println(this.options);
      for (int i = 0; i<this.places.size(); i++) {
          System.out.println("id: " + this.places.get(i).id + " name: " + this.places.get(i).name +
          " latitude: " + this.places.get(i).latitude + " longitude: " + this.places.get(i).longitude);
      }
      System.out.println(distances);
  }
  public void plan() {

    this.map = svg();
    Parser parse = new Parser(this.places);
    parse.iterator();
    this.distances = legDistances();

  }

  /**
   * @return
   * Returns an SVG containing the background and the legs of the trip.
   */
  private String svg() {
    InputStream filePath = this.getClass().getResourceAsStream("/colorado.svg");
    String line = "";
    try {
      BufferedReader br = new BufferedReader(new InputStreamReader(filePath));
      String temp = br.readLine();
      while(temp != null){
        line += temp +"\n";
        temp = br.readLine();
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return line;
    // return "<svg width=\"1920\" height=\"960\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><!-- Created with SVG-edit - http://svg-edit.googlecode.com/ --> <g> <g id=\"svg_4\"> <svg id=\"svg_1\" height=\"960\" width=\"1920\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_2\"> <title>Layer 1</title> <rect fill=\"rgb(119, 204, 119)\" stroke=\"black\" x=\"0\" y=\"0\" width=\"1920\" height=\"960\" id=\"svg_3\"/> </g> </svg> </g> <g id=\"svg_9\"> <svg id=\"svg_5\" height=\"480\" width=\"960\" y=\"240\" x=\"480\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> <g id=\"svg_6\"> <title>Layer 2</title> <polygon points=\"0,0 960,0 960,480 0,480\" stroke-width=\"12\" stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> <polyline points=\"0,0 960,480 480,0 0,480 960,0 480,480 0,0\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/> </g> </svg> </g> </g> </svg>";
  }

  /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   * returns distance vector between each place in colorado
   */
  private ArrayList<Integer> legDistances() {

    ArrayList<Integer> dist = new ArrayList<>();

      if(this.places != null && !this.places.isEmpty()) {
          for (int i =0; i < this.places.size(); i++) {
              if(!coloradoCheck(Double.parseDouble(this.places.get(i).latitude),Double.parseDouble(this.places.get(i).longitude))) {
                  this.places.remove(i);
              }
          }
          if(this.places.get(0) != this.places.get(this.places.size()-1)) {
            this.places.add(this.places.get(0));
          }

          for (int i = 0; i < this.places.size(); ++i) {
            if(i == 0) {
              dist.add(0);
            }
            else {
              dist.add(getDistance(this.places.get(i-1), this.places.get(i)));
            }
          }
      }

      return dist;
  }

  /*
  * Returns the distance between two Places.
  * @return
  *       //return different values for either miles or km options selected.
  * */
  private Integer getDistance(Place p1, Place p2){
      String s = this.options.getDistance();
      double lat1 = toRadians(Double.parseDouble(p1.latitude));
      double lat2 = toRadians(Double.parseDouble(p2.latitude));
      double long1 = toRadians(Double.parseDouble(p1.latitude));
      double long2 = toRadians(Double.parseDouble(p2.latitude));
      switch(s.charAt(0)){
          case 'm':
              return (int) Math.round(3958.7613*Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(long2-long1)));
          case 'k':
              return (int) Math.round(6371.0088*Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(long2-long1)));
          default: return 0;
      }
  }
  public Double toRadians(double angle) {
      return angle * (Math.PI / 180);
  }
  public boolean coloradoCheck(double latitude,double longitude) {
      return (latitude>37 && latitude<41 && longitude<-102.03 && longitude>-109.03);
  }
}
