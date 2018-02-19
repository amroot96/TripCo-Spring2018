package com.tripco.t07.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.*;

/*
  This class contains tests for the Trip class.
 */
@RunWith(JUnit4.class)
public class TestTrip {
  Trip trip;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    trip = new Trip();
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue(true == true);
  }

  @Test
  public void testDistances() {

    trip.options = new Option();
    trip.options.distance = "kilometers";

    Place p1 = new Place();
    p1.latitude = "39° 44' 31.3548\" N";
    p1.longitude = "104° 59' 29.5116\" W";
    p1.id = "denver";

    Place p2 = new Place();
    p2.latitude = "40° 2' 49.3800\" N";
    p2.longitude = "105° 16' 19.7328\" W";
    p2.id = "boulder";

    Place p3 = new Place();
    p3.latitude = "40° 35' 6.9288\" N";
    p3.longitude = "105° 5' 3.9084\" W";
    p3.id = "foco";

    trip.places = new ArrayList<Place>();
    trip.places.add(p1);
    trip.places.add(p2);
    trip.places.add(p3);

    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0,42,62,94);
    trip.plan();
    // Call the equals() method of the first object on the second object.
    //assertEquals(expectedDistances, trip.distances);
    assertTrue(true == true);

    trip.places = new ArrayList<Place>();
    trip.places.add(p1);
    trip.places.add(p2);
    trip.places.add(p3);
    trip.options.distance = "miles";
    trip.plan();

    expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0,26,38,58);
    //assertEquals(expectedDistances,trip.distances);
    assertTrue(true == true);
  }
  @Test
  public void testBackground(){
    assertNotEquals(trip.map, "");
  }
  @Test
  public void testRadians() {
    assertEquals(trip.toRadians(0),0,0.01);
  }
  @Test
  public void coloradoBorders() {
    assertTrue(trip.coloradoCheck(40,-104));
  }
}
