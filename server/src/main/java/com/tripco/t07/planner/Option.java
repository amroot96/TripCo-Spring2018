package com.tripco.t07.planner;

/**
 * Describes the options to apply when planning a trip in TFFI format. At this point we are only
 * using the values provided.
 */
public class Option {

  public String distance;
  public String userUnit;
  public String userRadius;
  public String optimization;


  /**
   * Get distance string
   */
  public String getDistance() {
    return this.distance;
  }

  public String getUnit(){
    return this.userUnit;
  }

  public double getRadius(){
    return Double.parseDouble(this.userRadius);
  }

  public double getOptimization() {
    return Double.parseDouble(this.optimization);
  }
}
