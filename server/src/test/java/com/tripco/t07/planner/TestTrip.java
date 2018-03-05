package com.tripco.t07.planner;

import java.lang.reflect.Array;
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
  Place p1;
  Place p2;
  Place p3;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    trip = new Trip();
    trip.options = new Option();
    trip.options.distance = "kilometers";
    trip.options.optimization = "none";
    Place p1 = new Place();
    p1.latitude = "39.7392";
    p1.longitude = "-104.9903";
    p1.id = "denver";
    p1.name = "denver";

    Place p2 = new Place();
    p2.latitude = "40.0149900";
    p2.longitude = "-105.2705500";
    p2.id = "boulder";
    p2.name = "boulder";

    Place p3 = new Place();
    p3.latitude = "40.58526";
    p3.longitude = "-105.08442";
    p3.id = "foco";
    p3.name = "fort collins";
    trip.places = new ArrayList<Place>();
    trip.places.add(p1);
    trip.places.add(p2);
    trip.places.add(p3);
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue(true == true);
  }

  @Test
  public void testDistances() {
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 39, 65, 94);
    trip.plan();
    assertEquals(expectedDistances, trip.distances);
    trip.options.distance = "miles";
    trip.plan();
    expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 24, 41, 59);
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  public void nearestNeighbor() {
    ArrayList<Place> list = new ArrayList<Place>();
    p1 = trip.places.get(0);
    p2 = trip.places.get(1);
    p3 = trip.places.get(2);
    list.add(p3);
    list.add(p2);
    assertEquals("boulder", trip.findnearestPlace(p1, list).name);
  }

  @Test
  public void testBackground() {
    assertNotEquals(trip.map, "");
  }

  @Test
  public void coloradoBorders() {
    assertTrue(trip.coloradoCheck(40, -104));
  }
}
