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
    option.optimization = "0";
  }

  @Test
  public void testGetDistance(){
    assertEquals("miles",option.getDistance());
    assertNotEquals(0,option.getDistance());
  }

  @Test
  public void testGetOptimization(){
    assertEquals(0,(int)option.getOptimization());
    assertNotEquals("0",(int)option.getOptimization());
  }


}
