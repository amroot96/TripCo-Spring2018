# Inspection - Team *T07* 
 
Inspection | Details
----- | -----
Subject | all of Trip.java
Meeting | *4/24/18, 3:30pm, Stadium*
Checklist | data faults, control faults, exception faults, I/O faults *

### Roles
Name | Role | Preparation Time
---- | ---- | ----
Angela | Moderator/ all | < 2 hours
Jordan | all | < 2 hours
Scott | all | < 2 hours
Courtney | all | < 2 hours

### Log
file:line | defect | h/m/l | who found | github# 
--- | --- |:---:|:---:| ---
 21-22 | uninitialized variables? | l | angela |
 39| we set the map to svg, but don't we only use kml? | l | angela |
 40 | should it always default to version 1? | m | angela | 
 60 / 67 | I don't think we need to restore the start if the opt was 0 | m | angela |
 61 | Should we change the ranges for the opt types to be in 3rds instead? | m | angela |
 47 / 73 | inconsistent size checking of arrays | m | angela |
 109 | is there a more efficient way to reverse an array in java | m | angela |
 148 | hard-coded best distance >:( | h | angela |
 163 | method never used | l | angela |
 185 | what if places is already cleared? | l | angela |
 244 | long method, maybe break it into two? | m | angela |
31-32 | feels like this could be one line |l | scott
55 | Could also check if optType is 0 here and return if so |l | scott
75 | using -1 as a default value isn't smart |l | scott
145| terrible naming convention for methods |l | scott
174 | copying array for every NN |l | scott
280 | we should probably just delete this whole method now | l | scott
89-127 | Optimization should be a completely seperate class | H  | Courtney
199-204| Placelist method just prints out the places. What is it need on the server| L | Courtney
206-212 | Calculate distance should be creating the table as it calculating total distance | M | Courtney
280-309 | Find a more efficent way to generate the SVG Map | m | Courtney
184 | Hardcoded value | l | Courtney
