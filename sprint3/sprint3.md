# Sprint 3 - 07 - Jackalope

## Goal
* To allow the user to save their trip. Clean our code and reduce code coverage to less than 50%. 
* Allow the user to select locations from a list and find an optimal trip. 
* Allow the user to display what they want when planning a trip.

### A mobile, responsive map and itinerary!
### Sprint Leader: Angela Root

## Definition of Done

* Web application ready for demo and potential customer release.
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v3.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the arhived files.
* Version in pom.xml should be `<version>3.0.0</version>`.
* Javadoc and unit tests for public methods.
* Coverage at least 50% overall for the class.

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

* Save the trip.
* Allow user to find optimal trip.
* Reverse the order of the trip.
* Clean code.
* Code Coverage
* Build a trip from existing information.

*Include a discussion of planning decisions made based on your velocity from previous sprints.*

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  28   | 28
Story Points |  32  | 32

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
2/23 | Planning! | Save button | Jordan was late :(
2/27 | Save button| Optimization, updating tffi| 
3/1  | Fix auto-updating for unit changes | Branding, updating tffi | Time for working on this with midterms next week
3/8  | traveling salesman, 2 opt | implement a database, branding | Spring break, Scott & Jordan missing from scrum
3/20 | reverse, branding, version 2, queries | display queries, config |
 

## Review

#### Completed epics in Sprint Backlog 
* Code Coverage
* Save Button
* Reverse Button
* Build a trip from existing information
* Clean code
* Option to view a shorter trip
* 2-op

#### Incomplete epics in Sprint Backlog 
* Let user display what information is displayed in itinerary

#### What went well
* Meeting frequently
* Using zenhub for planning

#### Problems encountered and resolutions
* Half finished a lot of things throughout
* Not done Tuesday instead of wednesday
* TESTING 

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time | | Did not make enought tests throughout | Using intellij
What we did well | meeting more often. Slack communication | planning was good | Making more commits, travis and code climate.
What we need to work on |  | More testing | Travis with the database
What we will change next time | don't take a week off! | taking off the top of the backlog first. finishing tasks completely before starting another. | Increase maintainability
