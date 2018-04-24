package com.tripco.t07.planner;

import java.lang.reflect.Array;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestQuery {
    Query q_local = new Query();
    Query invalid = new Query();
    Query q_travis = new Query();
    Trip trip = new Trip();

    @Before
    public void initialize() {
        q_local.query = "centennial";
        q_local.places = new ArrayList<Place>();

        invalid = new Query();
        invalid.query = "fasf";

        q_travis.query = "naval";
        q_travis.places = new ArrayList<Place>();

        Place place1 = new Place();
        place1.id = "312231";
        place1.name = "Newport Naval Air Facility";
        place1.latitude = "41.53";
        place1.longitude = "-71.345";
        trip.places = new ArrayList<>();
        trip.places.add(place1);
    }

    @Test
    public void testNoLimit() {
        if(q_local.travis) {
            q_travis.queryDatabase();
            assertEquals(2, q_travis.places.size());
        }else {
          //  q_local.query(q_local.query, "select count(*) from airports;");
          //  assertEquals(50, q_local.limit, 0);
        }
    }

    @Test
    public void testGivenLimit() {
        //"Naval" returns 2 elements with no limit, testing with only 1 here
        if(q_local.travis) {
            q_travis.limit = 1;
            q_travis.queryDatabase();
            assertEquals(trip.places.size(), q_travis.places.size());
        } else {
            //q_local.limit = 17;
            //q_local.queryDatabase();
            //assertEquals(17, q_local.places.size());
        }
    }

    @Test
    public void testZeroLimit() {
        if(q_local.travis) {
            q_travis.limit = 0;
            q_travis.query = "";
            q_travis.queryDatabase();
            assertEquals(35, q_travis.places.size());
        } else {
            //q_local.limit = 0;
            //q_local.queryDatabase();
            //assertEquals(500, q_local.places.size());
        }
    }

    @Test
    public void trueEqualTrue(){
        assertEquals(true,true);
    }

    @Test
    public void testValidQuery(){
        if(q_local.travis) {
            q_travis.queryDatabase();
            assertEquals("naval", q_travis.query);
        } else {
            //q_local.queryDatabase();
            //assertEquals("centennial", q_local.query);
        }
    }

    @Test
    public void testValidName(){
        if(q_local.travis){
            q_travis.queryDatabase();
            assertEquals(trip.places.get(0), q_travis.places.get(1).name);
        } else {
            //q_local.queryDatabase();
            //assertEquals("Valley Forge Bicentennial Heliport", q_local.places.get(0).name);
        }
    }

    @Test
    public void testValidId(){
        if(q_local.travis) {
            q_travis.queryDatabase();
            assertEquals(trip.places.get(0).id, q_travis.places.get(1).id);
        } else {
            //q_local.queryDatabase();
            //assertEquals("0P0", q_local.places.get(0).id);
        }
    }

    @Test
    public void testValidLatitude(){
        if(q_local.travis) {
            q_travis.queryDatabase();
            assertEquals("41.5038888889", q_travis.places.get(0).latitude);
        } else {
            //q_local.queryDatabase();
            //assertEquals("48.6255989074707", q_local.places.get(1).latitude);
        }
    }

    @Test
    public void testValidLongitude(){
        if(q_local.travis) {
            q_travis.queryDatabase();
            assertEquals("-71.345", q_travis.places.get(1).longitude);
        } else {
            //q_local.queryDatabase();
            //assertEquals("-75.40599822998047", q_local.places.get(0).latitude);
        }
    }
}
