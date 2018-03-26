package com.tripco.t07.planner;

/**
 * Describes the options to apply when planning a trip in TFFI format. At this point we are only
 * using the values provided.
 */
public class Option {

  public String distance;
  public String userUnit;
  public Double radius;
  public String optimization;


  /**
   * Get distance string
   */
  public String getDistance() {
    return this.distance;
  }

  public String getUnit() {
    return this.userUnit;
  }

  public double getRadius() {
    return this.radius;
  }

  public double getOptimization() {
    return Double.parseDouble(this.optimization);
  }

  /**
   * Sets options.distance and options.radius
   */
  public void setDistance() {
    System.out.println(this.distance.toLowerCase());
    if (this.distance.toLowerCase().equals("miles")) {
      this.radius = 3958.7613;
    } else if (this.distance.toLowerCase().equals("kilometers")) {
      this.radius = 6371.0088;
    } else if (this.distance.toLowerCase().equals("nautical")) {
      this.radius = 3440.0695;
    } else {
      String[] split = this.distance.split(" ");
      this.radius = Double.parseDouble(split[1]);
    }
  }
}
