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
      Parser parse = new Parser(this.places);
      parse.iterator();
      if(this.distances != null) {
          this.distances.clear();
      }
      this.distances = legDistances();
    this.map = svg();



  }

  /**
   * @return
   * Returns an SVG containing the background and the legs of the trip.
   */
  private String svg() {
      InputStream filePath = this.getClass().getResourceAsStream("/colorado.svg");
      String line = "<svg width=\"1066.6073\" height=\"783.0824\" xmlns:svg=\"http://www.w3.org/2000/svg\" xmlns=\"http://www.w3.org/2000/svg\"> ";
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
      line += "<svg width=\"1066.6073\" height=\"783.0824\">";
      //line += "<polygon points=\"30,40 1036,40 1036,750 30,750
      // \" stroke-width=\"12\"
      // stroke=\"brown\" fill=\"none\" id=\"svg_8\"/> \n" +
      line+= " <polyline points=\"";
      for(int i = 0; i < this.places.size(); i++){
            int x = (int) Math.round(((109+Double.parseDouble(this.places.get(i).longitude))/7)*1006+30);
            int y = (int) Math.round(((41-Double.parseDouble(this.places.get(i).latitude))/4)*710+40);
            line += x + "," + y +" ";
            System.out.println(x + "," + y +" ");
      }


      line += "\" fill=\"none\" stroke-width=\"4\" stroke=\"blue\" id=\"svg_7\"/>" +
              "</svg>\n" +
              "</svg>";
     // System.out.println(line);
      return line;
  }

  /**
   * Returns the distances between consecutive places,
   * including the return to the starting point to make a round trip.
   * @return
   * returns distance vector between each place in colorado
   */
  private ArrayList<Integer> legDistances() {

    ArrayList<Integer> dist = new ArrayList<>();
        if (this.places != null && !this.places.isEmpty()) {
            for (int i = 0; i < this.places.size(); i++) {
                if (!coloradoCheck(Double.parseDouble(this.places.get(i).latitude), Double.parseDouble(this.places.get(i).longitude))) {
                    this.places.remove(i);

                }
            }
            if (!this.places.get(0).id.equals(this.places.get(this.places.size() - 1).id)) {
                this.places.add(this.places.get(0));
            }
            for (int i = 0; i < this.places.size(); ++i) {
                if (i == 0) {
                    dist.add(0);
                } else {
                    dist.add(getDistance(this.places.get(i - 1), this.places.get(i)));
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
      double lat1 = Math.toRadians(Double.parseDouble(p1.latitude));
      double lat2 = Math.toRadians(Double.parseDouble(p2.latitude));
      double long1 = Math.toRadians(Double.parseDouble(p1.longitude));
      double long2 = Math.toRadians(Double.parseDouble(p2.longitude));
      switch(s.charAt(0)){
          case 'm':
              return (int) Math.round(3958.7613*Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(long2-long1)));
          case 'k':
              return (int) Math.round(6371.0088*Math.acos(Math.sin(lat1)*Math.sin(lat2)+Math.cos(lat1)*Math.cos(lat2)*Math.cos(long2-long1)));
          default: return 0;
      }
  }
  public boolean coloradoCheck(double latitude,double longitude) {
      return (latitude>37 && latitude<41 && longitude<-102.03 && longitude>-109.03);
  }
}
