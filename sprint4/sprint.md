# Sprint 4 - *t07* - *Jackalope*

## Goal

### Shorter trips and more places to go!
### Sprint Leader: *Jordan Peterson*

## Definition of Done

* Improving the existing responsive web application to handle world travel.
* Spring Review and Retrospectives completed.
* Product Increment release v4.0 created on GitHub with appropriate verson number and name, a description based on the Release Notes template, and the archived files.
* Version in pom.xml should be <version>4.0</version>
* Javadoc and unit tests for public methods. (java and js)
* Coverage at least 60%

## Policies

* Code adheres to Google style guides for Java and JavaScript.
* Tests and Javadoc are written before/with code.  
* All pull requests include tests for the added or modified code.
* Master is never broken.  If broken, it is fixed immediately.
* Always check for new changes in master to resolve merge conflicts locally before committing them.
* All changes are built and tested before they are committed.
* Continuous integration successfully builds and tests pull requests for master branch always.
* All commits with more than 1 line of change include a task/issue number.
* All Java dependencies in pom.xml.

## Plan

Epics planned for this release.

* *## User sets their own distance units*
* *## Optimize 2-opt so it runs faster*
* *## Plan trips outside of colorado*
* *## Add search filter functionality*
* *## Add map zoom and pan functionality*
* *## Fix branding*
* *## Improve user experience*
* *## Let the user choose a new starting location*

*Include a discussion of planning decisions made based on your velocity from previous sprints.*

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  31   | 31 
Story Points |  32  | 32 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
03/24/18 | Planning | Create database tests, Fix tiffi/json, Fix 2-opt | Jordan had minor car troubles
03/27/18 | Adding filter drop down, user defined units added, config tiffi setup  | Filtering UI, Database test cases, making 2-opt faster | None
03/29/18 | removed colorado bounding function, making 2-opt more effecient | Adding filter UI, Handling server side filtering, creating database test cases | Easter weekend (a group member may be out of town)
04/03/18 | Update Trip with starting location, Added button for starting location, Added distance filters UI | Update config to handle filters, Create database test cases, Serverside filter handling | Groupmate family in ER
04/05/18 | Filter Buttons and input UI, Added google map to client, Updated user defined input, Display filter result on search click | Server side filter implementation, Create JS tests, Create database tests, Improve user experience | NONE
04/07/18 | Improve user Experience, Oprimize 2-opt more, Finish filter ui functionality and communication with server | Server side filtering, Create JS tests, Create databse tests | NONE 
04/10/18 | Server side filtering on TYPE | create database tests | NONE
 

## Review

#### Completed epics in Sprint Backlog 
* New Starting Locaiton
* Improve The User Experience
* Branding
* System Testing
* Zoom And Pan The Map
* Filtered Searches
* Plan Trips Outside Of Colorado
* Distance Unit Configuration
* Distance Units

#### Incomplete epics in Sprint Backlog 
* None

#### What went well
* We planned pretty well, we didn't have to add many more issues
* We used zenhub as intended, our burndown chart was on track

#### Problems encountered and resolutions
* We didn't do the first deploy check
* We break travis at one point
* We took too long to fix the API Tests

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | N/A | Focus on critical topics first  | N/A
What we did well | We communicated well | We improved continuously | N/A
What we need to work on | N/A | Thinking about the user experience | Code Climate optimizaiton
What we will change next time | N/A | Planning a more detailed zenhub based on our velocity | N/A
