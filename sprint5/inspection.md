# Inspection - Team *T07* 
 
Inspection | Details
----- | -----
Subject | all of Trip.java
Meeting | *4/24/18, 3:30pm, Stadium*
Checklist | data faults, control faults, exception faults, I/O faults, comments *

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
 21-22 | uninitialized variables? | l | angela | x
 39| we set the map to svg, but don't we only use kml? | l | angela | #387
 40 | should it always default to version 1? | m | angela | #388
 60 / 67 | I don't think we need to restore the start if the opt was 0 | m | angela | x
 61 | Should we change the ranges for the opt types to be in 3rds instead? | m | angela | #389
 47 / 76 | inconsistent size checking of arrays | l | angela | x
 134 | is there a more efficient way to reverse an array in java | m | angela | x
 184 | hard-coded best distance >:( | h | angela | #390
 199 | method never used | l | angela | x
 221 | what if places is already cleared? | l | angela | x
 222 | extra distance in distance array? | h | angela | x
 280 | long method, maybe break it into two? | m | angela | #387
31-32 | feels like this could be one line |l | scott | x
55 | Could also check if optType is 0 here and return if so |l | scott | #391
75 | using -1 as a default value isn't smart |l | scott | x
145| terrible naming convention for methods |l | scott | x
174 | copying array for every NN |l | scott | x
280 | we should probably just delete this whole method now | l | scott | x
32 | parse.iterator() is returning an iterator to nothing | l | jordan | x
60-69 | we could clean up the opt conditionals | m | jordan | #389
95 | I'm not sure what "kn" represents | l | jordan | x
147-148 | Do we need to call getDistance 3 times? | m | jordan | x
184 | Do we want to use Integer.max_value due to wold trips? | l | jordan | #390
262-276 | Do we need to have his function anymore? | l | jordan | x
280-309 | That is a thick method, can we slim it down? | l | jordan | x
all | We need more comments to know what is going on in the optimizations | h | jordan | x
89-127 | Optimization should be a completely seperate class | H  | Courtney | #376
199-204| Placelist method just prints out the places. What is it need on the server| L | Courtney | x
206-212 | Calculate distance should be creating the table as it calculating total distance | M | Courtney | x
280-309 | Find a more efficent way to generate the SVG Map | m | Courtney | x
184 | Hardcoded value | l | Courtney | x

