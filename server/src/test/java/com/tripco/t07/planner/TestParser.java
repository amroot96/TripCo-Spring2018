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
        String lat = "49° 14' 46.6512\" E";
        float f = par.DMS(lat);
        assertTrue((Math.abs(f-49.24629) < 0.00001));
    }

    @Test
    public void testDMSParseS() {
        String lat = "49° 14' 46.6512\" S ";
        float f = par.DMS(lat);
        assertTrue((Math.abs(f-(-49.24629)) < 0.00001));
    }

    //DDM
    @Test
    public void testDDMParseN() {
        String lat = "40° 26.767\' N";
        float f = par.DDM(lat);
        assertTrue((Math.abs(f-40.44612) < 0.00001));
    }

    @Test
    public void testDDMParseW () {
        String lat = "40° 26.767\' W";
        float f = par.DDM(lat);
        assertTrue((Math.abs(f-(-40.44612)) < 0.00001));
    }

    @Test
    public void testDDMParseE() {
        String lat = "79° 58.933\' E";
        float f = par.DDM(lat);
        assertTrue((Math.abs(f-79.98222) < 0.00001));
    }

    @Test
    public void testDDMParseS() {
        String lat = "79° 58.933\' S";
        float f = par.DDM(lat);
        assertTrue((Math.abs(f-(-79.98222)) < 0.00001));
    }

    //DD
    @Test
    public void testDDParseN() {
        String lat = "40.446° N";
        float f = par.DD(lat);
        assertTrue((Math.abs(f-40.446) < 0.00001));
    }

    @Test
    public void testDDParseW () {
        String lat = "40.446° W";
        float f = par.DD(lat);
        assertTrue((Math.abs(f-(-40.446)) < 0.00001));
    }

    @Test
    public void testDDParseE() {
        String lat = "79.982° E";
        float f = par.DD(lat);
        assertTrue((Math.abs(f-79.982) < 0.00001));
    }

    @Test
    public void testDMParseS() {
        String lat = "79.982° S";
        float f = par.DD(lat);
        assertTrue((Math.abs(f-(-79.982)) < 0.00001));
    }
}
