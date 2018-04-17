package com.tripco.t07.planner;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import static org.junit.Assert.*;
import java.util.ArrayList;

@RunWith(JUnit4.class)
public class TestFilter {
    Filter F;
    @Before
    public void initialize() {
        ArrayList<String> vals = new ArrayList<>();
        vals.add("heliport");
        F = new Filter("type", vals);
    }

    @Test
    public void TestAttr() { assertEquals("type", F.getAttr()); }

    @Test
    public void TestVals() { assertEquals("heliport", F.getValues().get(0)); }

}
