package com.tripco.t07.planner;

import java.util.ArrayList;

public class Parser {
    public ArrayList<Place> places;
    public float degree;
    public float minute;
    public float second;
    String direction;
    float lat;
    float longitude;

    public Parser(ArrayList<Place> list){
        this.places = list;
    }

    public void iterator(){
        for(int i = 0; i < places.size(); i++){
            //Parse Latitude
            if(places.get(i).latitude.contains("\"")){
                places.get(i).latitude = String.valueOf(DMS(places.get(i).latitude));
            }
            else if(places.get(i).latitude.contains("\'")){
                places.get(i).latitude = String.valueOf(DDM(places.get(i).latitude));
            }
            else if(places.get(i).latitude.contains("°")){
                places.get(i).latitude = String.valueOf(DD(places.get(i).latitude));
            }
            else{
                places.get(i).latitude = String.valueOf(Float.parseFloat(places.get(i).latitude));
            }
            //Parse Longtitude
            if(places.get(i).longitude.contains("\"")){
                places.get(i).longitude = String.valueOf(DMS(places.get(i).longitude));
            }
            else if(places.get(i).longitude.contains("\'")){
                places.get(i).longitude = String.valueOf(DDM(places.get(i).longitude));
            }
            else if(places.get(i).longitude.contains("°")){
                places.get(i).longitude = String.valueOf(DD(places.get(i).longitude));
            }
            else {
                places.get(i).longitude = String.valueOf(Float.parseFloat(places.get(i).longitude));
            }
        }
    }

    public float DMS(String dms){
        int sub = 0;
        //40° 35' 6.9288" N
        for(int i = 0; i < dms.length(); i++){
            if(dms.charAt(i) == '°'){
                degree = Float.parseFloat(dms.substring(sub, i));
                sub = i+2;
            }
            if(dms.charAt(i) == '\''){
                minute = Float.parseFloat(dms.substring(sub, i));
                sub = i+2;
            }
            if(dms.charAt(i) == '\"'){
                second = Float.parseFloat(dms.substring(sub, i));
                sub = i+2;
            }
            if(i == dms.length()-1){
                direction = dms.substring(i);
            }
        }
        if(direction.equals("N") || direction.equals("E")){
            return degree + minute/60 + second/3600;
        }
        else{
            return -(degree + minute/60 + second/3600);
        }
    }

    public float DDM(String ddm){

        int sub = 0;
        //40° 35.098'  N
        for(int i = 0; i < ddm.length(); i++){
            if(ddm.charAt(i) == '°'){
                degree = Float.parseFloat(ddm.substring(sub, i));
                sub = i+2;
            }
            if(ddm.charAt(i) == '\''){
                minute = Float.parseFloat(ddm.substring(sub, i));
                sub = i+2;
            }
            if(i == ddm.length()-1){
                direction = ddm.substring(i);
            }
        }

        if(direction.equals("N") || direction.equals("E")){
            return degree + minute/60;
        }
        else{
            return -(degree + minute/60);
        }
    }

    public float DD(String dd){
        int sub = 0;
        //40° N
        for(int i = 0; i < dd.length(); i++){
            if(dd.charAt(i) == '°'){
                degree = Float.parseFloat(dd.substring(sub, i));
                sub = i+2;
            }
            if(i == dd.length()-1){
                direction = dd.substring(i);
            }
        }
        if(direction.equals("N") || direction.equals("E")){
            return degree;
        }
        else{
            return -degree;
        }

    }

}
