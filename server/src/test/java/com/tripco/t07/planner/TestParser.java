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
        float f = par.DMS("N", 40,35, (float) 6.9288);
        assertTrue((Math.abs(f-40.58526) < 0.00001));
    }

    @Test
    public void testDMSParseW () {
        float f = par.DMS("W", 40,35, (float) 6.9288);
        assertTrue((Math.abs(f-(-40.58526)) < 0.00001));
    }

    @Test
    public void testDMSParseE() {
        float f = par.DMS("E", 49,14, (float) 46.6512);
        assertTrue((Math.abs(f-49.24629) < 0.00001));
    }

    @Test
    public void testDMSParseS() {
        float f = par.DMS("S", 49,14, (float) 46.6512);
        assertTrue((Math.abs(f-(-49.24629)) < 0.00001));
    }

//    //DDM
    @Test
    public void testDDMParseN() {
        float f = par.DDM("N" , 40, (float)26.767);
        assertTrue((Math.abs(f-40.44612) < 0.00001));
    }

    @Test
    public void testDDMParseW () {
        float f = par.DDM("W" , 40, (float)26.767);
        assertTrue((Math.abs(f-(-40.44612)) < 0.00001));
    }

    @Test
    public void testDDMParseE() {
        float f = par.DDM("E", 79, (float) 58.933);
        assertTrue((Math.abs(f-79.98222) < 0.00001));
    }

    @Test
    public void testDDMParseS() {
        float f = par.DDM("S", 79, (float) 58.933);
        assertTrue((Math.abs(f-(-79.98222)) < 0.00001));
    }

    //DD
    @Test
    public void testDDParseN() {
        float f = par.DD("N", (float)40.446);
        assertTrue((Math.abs(f-40.446) < 0.00001));
    }

    @Test
    public void testDDParseW () {
        float f = par.DD("W", (float)40.446);
        assertTrue((Math.abs(f-(-40.446)) < 0.00001));
    }

    @Test
    public void testDDParseE() {
        float f = par.DD("E", (float) 79.982);
        assertTrue((Math.abs(f-79.982) < 0.00001));
    }

    @Test
    public void testDMParseS() {
        float f = par.DD("S", (float) 79.982);
        assertTrue((Math.abs(f-(-79.982)) < 0.00001));
    }
}
