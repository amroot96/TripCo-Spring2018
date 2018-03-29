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
        Double f = par.DMS("N", 40.0,35.0, (Double) 6.9288);
        assertTrue((Math.abs(f-40.58526) < 0.00001));
    }

    @Test
    public void testDMSParseW () {
        Double f = par.DMS("W", 40.0,35.0, (Double) 6.9288);
        assertTrue((Math.abs(f-(-40.58526)) < 0.00001));
    }

    @Test
    public void testDMSParseE() {
        Double f = par.DMS("E", 49.0,14.0, (Double) 46.6512);
        assertTrue((Math.abs(f-49.24629) < 0.00001));
    }

    @Test
    public void testDMSParseS() {
        Double f = par.DMS("S", 49.0,14.0, (Double) 46.6512);
        assertTrue((Math.abs(f-(-49.24629)) < 0.00001));
    }

//    //DDM
    @Test
    public void testDDMParseN() {
        Double f = par.DDM("N" , 40.0, (Double)26.767);
        assertTrue((Math.abs(f-40.44612) < 0.00001));
    }

    @Test
    public void testDDMParseW () {
        Double f = par.DDM("W" , 40.0, (Double)26.767);
        assertTrue((Math.abs(f-(-40.44612)) < 0.00001));
    }

    @Test
    public void testDDMParseE() {
        Double f = par.DDM("E", 79.0, (Double) 58.933);
        assertTrue((Math.abs(f-79.98222) < 0.00001));
    }

    @Test
    public void testDDMParseS() {
        Double f = par.DDM("S", 79.0, (Double) 58.933);
        assertTrue((Math.abs(f-(-79.98222)) < 0.00001));
    }

    //DD
    @Test
    public void testDDParseN() {
        Double f = par.DD("N", (Double)40.446);
        assertTrue((Math.abs(f-40.446) < 0.00001));
    }

    @Test
    public void testDDParseW () {
        Double f = par.DD("W", (Double)40.446);
        assertTrue((Math.abs(f-(-40.446)) < 0.00001));
    }

    @Test
    public void testDDParseE() {
        Double f = par.DD("E", (Double) 79.982);
        assertTrue((Math.abs(f-79.982) < 0.00001));
    }

    @Test
    public void testDMParseS() {
        Double f = par.DD("S", (Double) 79.982);
        assertTrue((Math.abs(f-(-79.982)) < 0.00001));
    }
    @Test
    public void testNonSpaces() {
        Place p = new Place();
        p.longitude = "38.74°N";
        p.latitude = "106°47'35W";
        list.add(p);
        par.iterator();
        assertTrue(Math.abs(p.parseLong-0.6761405522226033)< 0.00001);
    }

}
