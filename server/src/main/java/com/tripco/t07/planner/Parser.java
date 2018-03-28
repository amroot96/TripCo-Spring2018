package com.tripco.t07.planner;

import java.util.ArrayList;

public class Parser {
    public ArrayList<Place> places;

    public Parser(ArrayList<Place> list){
        this.places = list;
    }

    public void iterator(){
        String[] lat;
        String[] longi;
        for(int i = 0; i < places.size(); i++){
            lat = places.get(i).latitude.split("[°\'\"\\s]");
            longi = places.get(i).longitude.split("[°\'\"\\s]");
            places.get(i).latitude = parse(lat);
            System.out.println(places.get(i).latitude);
            places.get(i).longitude = parse(longi);
        }
    }

    public String parse(String [] latLong){
        switch (latLong.length){
            //40° N
            case 2:
                return String.valueOf(DD(latLong[1], Float.parseFloat(latLong[0])));
            //40° 35.098'  N
            case 3:
                if(latLong[2].matches("[0-9]+[NWES]")){
                    String direction = latLong[2].substring(latLong.length-1);
                    String second = latLong[2].substring(0, latLong.length-1);
                   return String.valueOf(DMS(direction, Float.parseFloat(latLong[0]),
                            Float.parseFloat(latLong[1]),
                            Float.parseFloat(second)));

                }
                return String.valueOf(DDM(latLong[2], Float.parseFloat(latLong[0]),
                                Float.parseFloat(latLong[1])));

            //40° 35' 6.9288" N
            case 4:
                return String.valueOf(DMS(latLong[3], Float.parseFloat(latLong[0]),
                                Float.parseFloat(latLong[1]),
                                Float.parseFloat(latLong[2])));
            default:
                break;
        }
        return latLong[0];
    }

    public float DMS(String direction, float degree, float minute, float second){
        System.out.println("Degree: " + degree + " minute: " + minute + " seconds: " + second + " direction: " + direction);
        if(direction.equals("N") || direction.equals("E")){
            return degree + minute/60 + second/3600;
        }
        else{
            return -(degree + minute/60 + second/3600);
        }
    }

    public float DDM(String direction, float degree, float minute) {
        System.out.println("Degree: " + degree + " minute: " + minute +" direction: " + direction);

        if(direction.equals("N") || direction.equals("E")){
            return degree + minute/60;
        }
        else{
            return -(degree + minute/60);
        }
    }

    public float DD(String direction, float degree){
        System.out.println("Degree: " + degree + " direction: " + direction);

        if(direction.equals("N") || direction.equals("E")){
            return degree;
        }
        else{
            return -degree;
        }

    }

}
