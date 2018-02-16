package com.tripco.t07.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import static org.junit.Assert.*;
import java.util.ArrayList;


@RunWith(JUnit4.class)
public class TestParser {
    Parser par;
    ArrayList<Place> list = new ArrayList<Place>();

    // Setup to be done before every test in TestPlan
    @Before
    public void initialize() {
        par = new Parser(list);
    }

    //DMS
    @Test
    public void testDMSParseN() {
        String lat = "40° 35' 6.9288\" N";
        float f = par.DMS(lat);
        assertTrue((Math.abs(f-40.58526) < 0.00001));
    }

    @Test
    public void testDMSParseW () {
        String lat = "40° 35' 6.9288\" W";
        float f = par.DMS(lat);
        assertTrue((Math.abs(f-(-40.58526)) < 0.00001));
    }

    @Test
    public void testDMSParseE() {
        String lat = "40° 35' 6.9288\" E";
        float f = par.DMS(lat);
        assertTrue((Math.abs(f-40.58526) < 0.00001));
    }


}
