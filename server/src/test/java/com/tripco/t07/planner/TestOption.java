package com.tripco.t07.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import static org.junit.Assert.*;

@RunWith(JUnit4.class)
public class TestOption {
  Option option;

  @Before
  public void initialize() {
    option = new Option();
    option.distance = "miles";
    option.userUnit = "furlong";
    option.userRadius = "31705.3408";
    option.optimization = "0";
  }

  @Test
  public void testGetDistance(){
    assertEquals("miles",option.getDistance());
    assertNotEquals(0,option.getDistance());
  }

  @Test
  public void testGetUnit(){
    assertEquals("furlong", option.getUnit());
    assertNotEquals("miles", option.getUnit());
  }

  @Test
  public void testRadius(){
    assertEquals(31705.3408, option.getRadius(),0.0001);
    assertNotEquals("31705.3408", option.getRadius());
  }

  @Test
  public void testGetOptimization(){
    assertEquals(0.0,option.getOptimization(),0);
    assertNotEquals("0",option.getOptimization());
  }



}
