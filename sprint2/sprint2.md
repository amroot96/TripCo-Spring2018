# Sprint 2 - 7 - Jackalope

## Goal

Work together on each issue in zenhub until we're all satasfied with our product. We're planning on working on and completing 7 epics each with many tasks. We'll work together and always have a working version.

### A mobile, responsive map and itinerary!
### Sprint Leader: Scott Magisano

## Definition of Done

* Web application ready for demo and potential customer release.
* Sprint Review and Restrospectives completed (sprint.md).
* Product Increment release `v2.0` created on GitHub with appropriate version number and name, a description based on the Release Notes template, and the arhived files.
* Version in pom.xml should be `<version>2.0.0</version>`.
* Javadoc and unit tests for public methods.

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

* *Build a responsive, mobile first web application*
* *Let the user load a file with a destination*
* *Plan trips in the state of Colorado*
* *Show an itinerary of the round trip*
* *Plan the trip in the destination order the user provided*
* *Let the user load a file with a destinations*
* *Show a map of the round trip*

*Include a discussion of planning decisions made based on your velocity from previous sprints.*

We think the input will be the most troublesome from our experience last split. After input is finished we'll be going string and will completely many tasks.

## Metrics

Statistic | Planned | Completed
--- | ---: | ---:
Tasks |  8   | 0 
Story Points |  14  | 0 

## Daily Scrums

Date | Tasks done  | Tasks in progress | Impediments 
:--- | :--- | :--- | :--- 
2/4 | planning | none | 
2/11 | orientation | parse json inputs | unsure if json.parse works or not.
2/13 | Parse file component, render current destinations, load button |get cumulative distance, miles/kilometers | 
2/15|  |SVG, options button, Itineray | 1 warning on file upload, SVG tests, button problems 
 2/18 |Colorado bounds, cumulative distance, leg distance, parser, box, button |Draw lines of locations | lines
 2/20|Draw map and itinerary lines |bug fixes and style changes | none
 | | |
## Review

#### Completed epics in Sprint Backlog 
* *Build a responsive, mobile first web application*
* *Let the user load a file with a destination*
* *Plan trips in the state of Colorado*
* *Show an itinerary of the round trip*
* *Plan the trip in the destination order the user provided*
* *Let the user load a file with a destinations*
* *Show a map of the round trip*

#### Incomplete epics in Sprint Backlog 
* save trip
#### What went well
* communication and github

#### Problems encountered and resolutions
* issues getting started on time
* Didn't know which epic was optional/required

## Retrospective

Topic | Teamwork | Process | Tools
:--- | :--- | :--- | :---
What we will change this time |  | Make test throughout process | Use other things besides Codepen
What we did well |good communication  |   | used most of the tools we were given 
What we need to work on | distribution of tasks | coding smaller blocks at a time| use zenhub better
What we will change next time | start on time | work on one epic together |  
