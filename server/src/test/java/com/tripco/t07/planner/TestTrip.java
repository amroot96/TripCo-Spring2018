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
  Place p4;
  Place p5;

  // Setup to be done before every test in TestPlan
  @Before
  public void initialize() {
    trip = new Trip();
    trip.options = new Option();
    trip.options.distance = "kilometers";
    trip.options.optimization = "0";
    trip.distances = new ArrayList<Integer>();

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

    Place p4 = new Place();
    p4.latitude = "37.1695° N";
    p4.longitude = "104.5005° W";
    p4.id = "trin";
    p4.name = "Trinidad";

    Place p5 = new Place();
    p5.latitude = "37.1695° N";
    p5.longitude = "105.5005° W";
    p5.id = "near trin";
    p5.name = "near trin";

    trip.places = new ArrayList<Place>();
    trip.places.add(p1);
    trip.places.add(p2);
    trip.places.add(p3);
    trip.places.add(p4);
    trip.places.add(p5);
  }

  @Test
  public void testTrue() {
    // assertTrue checks if a statement is true
    assertTrue(true == true);
  }

  @Test
  public void testDistances() {
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 39, 65, 383, 89, 289);
    trip.plan();
    assertEquals(expectedDistances, trip.distances);
    trip.options.distance = "miles";
    trip.plan();
    expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 24, 41, 238, 55, 180);
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  public void nearestNeighbor() {
    trip.options.optimization = "0.2";

    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 39, 65, 382, 89, 289);
    trip.plan();
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  public void nearestNeighbor2() {
    trip.options.optimization = "0.5";

    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 39, 65, 382, 89, 289);
    trip.plan();
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  public void twoOpt() {
    trip.options.optimization = "0.6";
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 94, 65, 317, 89, 289);
    trip.plan();
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  public void twoOpt2() {
    trip.options.optimization = "1.0";
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 94, 65, 317, 89, 289);
    trip.plan();
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  public void noOpt() {
    trip.options.optimization = "0";
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 39, 65, 383, 89, 289);
    trip.plan();
    assertEquals(expectedDistances, trip.distances);
  }

  @Test
  public void threeOpt1() {
    trip.options.optimization = "1.5";
    ArrayList<Integer> expectedDistances = new ArrayList<Integer>();
    Collections.addAll(expectedDistances, 0, 94, 65, 317, 89, 289);
    trip.plan();
    assertEquals(expectedDistances, trip.distances);
  }
  @Test
  public void testBackground() {
    assertNotEquals(trip.map, "");
  }

  @Test
  public void TestDisplay(){
    trip.display();
    assertTrue(1==1);
  }

  
}
