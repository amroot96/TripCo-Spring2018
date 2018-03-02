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
            lat = places.get(i).latitude.split(" ");
            longi = places.get(i).longitude.split(" ");
            places.get(i).latitude = parse(lat);
            places.get(i).longitude = parse(longi);
        }
    }

    public String parse(String [] latLong){
        switch (latLong.length){
            //40° N
            case 2:
                return String.valueOf(DD(latLong[1], Float.parseFloat(latLong[0].substring(0, latLong[0].length()-1))));
            //40° 35.098'  N
            case 3:
                return String.valueOf(DDM(latLong[2], Float.parseFloat(latLong[0].substring(0, latLong[0].length()-1)),
                                Float.parseFloat(latLong[1].substring(0, latLong[1].length()-1))));
            //40° 35' 6.9288" N
            case 4:
                return String.valueOf(DMS(latLong[3], Float.parseFloat(latLong[0].substring(0, latLong[0].length()-1)),
                                Float.parseFloat(latLong[1].substring(0, latLong[1].length()-1)),
                                Float.parseFloat(latLong[2].substring(0, latLong[2].length()-1))));
            default:
                break;
        }
        return latLong[0];
    }

    public float DMS(String direction, float degree, float minute, float second){
        if(direction.equals("N") || direction.equals("E")){
            return degree + minute/60 + second/3600;
        }
        else{
            return -(degree + minute/60 + second/3600);
        }
    }

    public float DDM(String direction, float degree, float minute) {
        if(direction.equals("N") || direction.equals("E")){
            return degree + minute/60;
        }
        else{
            return -(degree + minute/60);
        }
    }

    public float DD(String direction, float degree){
        if(direction.equals("N") || direction.equals("E")){
            return degree;
        }
        else{
            return -degree;
        }

    }

}
