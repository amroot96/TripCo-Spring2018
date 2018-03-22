package com.tripco.t07.planner;

import com.google.gson.Gson;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import static org.junit.Assert.*;

@RunWith(JUnit4.class)
public class TestSetup {
  Setup setup;
  Config conf;
  Gson gson;

  @Before
  public void initialize() {
    setup = new Setup();
    conf = new Config();
    gson = new Gson();
  }

  @Test
  public void testGetConfig(){
    assertEquals(gson.toJson(conf),setup.getConfig());
  }

}
