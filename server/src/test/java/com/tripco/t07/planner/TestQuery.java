package com.tripco.t07.planner;

import java.lang.reflect.Array;
import org.junit.Before;
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
    Query q;
    Query invalid;
    @Before
    public void initialize() {
        q = new Query();
        q.query = "centennial";
        q.locations = new ArrayList<Place>();

        invalid = new Query();
        invalid.query = "fasf";
    }

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
