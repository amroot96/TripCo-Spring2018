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

    @Before
    public void initialize() {
        q_local.query = "centennial";
        q_local.places = new ArrayList<Place>();

        invalid = new Query();
        invalid.query = "fasf";

        q_travis.query = "naval";
        q_travis.places = new ArrayList<Place>();
    }

    @Test
    public void testNoLimit() {
        if(!q_local.travis) {
            q_local.queryDatabase();
            assertEquals(50, q_local.limit, 0);
        }
    }
/*
    @Test
    public void testGivenLimit() {
        q.limit = 17;
        q.queryDatabase();
        assertEquals(17, q.limit, 0);
    }

    @Test
    public void testZeroLimit() {
        q.limit = 0;
        q.queryDatabase();
        assertEquals(50, q.limit, 0);
    }*/

    @Test
    public void trueEqualTrue(){
        assertEquals(true,true);
    }

//    @Test
//    public void testValidQuery(){
//        if((System.getenv("TRAVIS") != null)) {
//            q.queryDatabase();
//            assertEquals("centennial", q.query);
//        }
//    }
//
//    @Test
//    public void testValidName(){
//        if((System.getenv("TRAVIS") != null)){
//            q.queryDatabase();
//            assertEquals("Centennial Airport", q.locations.get(0).name);
//        }
//    }
//
//    @Test
//    public void testValidId(){
//        if((System.getenv("TRAVIS") != null)) {
//            q.queryDatabase();
//            assertEquals("CD06", q.locations.get(1).id);
//        }
//    }
//
//    @Test
//    public void testValidLatitude(){
//        if((System.getenv("TRAVIS") != null)) {
//            q.queryDatabase();
//            assertEquals("39.57009888", q.locations.get(0).latitude);
//        }
//    }
//
//    @Test
//    public void testValidLongitude(){
//        if((System.getenv("TRAVIS") != null)) {
//            q.queryDatabase();
//            assertEquals("-104.822998046875", q.locations.get(1).longitude);
//        }
//    }


}
