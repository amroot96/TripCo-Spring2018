package com.tripco.t07.server;

import com.tripco.t07.planner.Setup;
import com.tripco.t07.planner.Database;
import com.tripco.t07.planner.Plan;

import com.tripco.t07.planner.Setup;
import spark.Request;
import spark.Response;
import spark.Spark;
import static spark.Spark.*;


/** A simple micro-server for the web.  Just what we need, nothing more.
 *
 */
public class MicroServer {

  private int    port;
  private String name;
  private String path = "/public";

  /** Creates a micro-server to load static files and provide REST APIs.
   *
   * @param port
   * @param name
   */
  MicroServer(int port, String name) {
    this.port = port;
    this.name = name;

    port(this.port);

    // serve the static files: index.html and bundle.js
    Spark.staticFileLocation(this.path);
    get("/", (req, res) -> {res.redirect("index.html"); return null;});

    // register all micro-services and the function that services them.
    // start with HTTP GET
    get("/about", this::about);
    get("/echo", this::echo);
    get("/hello/:name", this::hello);
    get("/team", this::team);
    get("/config", this::config);
    // client is sending data, so a HTTP POST is used instead of a GET
    post("/plan", this::plan);
    post("/query", this::query);
    System.out.println("\n\nServer running on port: " + this.port + "\n\n");
  }

  /** A REST API that describes the server.
   *
   * @param request
   * @param response
   * @return
   */
  private String about(Request request, Response response) {

    response.type("text/html");
    response.header("Access-Control-Allow-Origin","*");

    return "<html><head></head><body><h1>"+name+" Micro-server on port "+port+"</h1></body></html>";
  }

  /** A REST API that echos the client request.
   *
   * @param request
   * @param response
   * @return
   */
  private String echo(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin","*");

    return HTTP.echoRequest(request);
  }

  /** A REST API demonstrating the use of a parameter.
   *
   * @param request
   * @param response
   * @return
   */
  private String hello(Request request, Response response) {

    response.type("text/html");
    response.header("Access-Control-Allow-Origin","*");


    return Greeting.html(request.params(":name"));
  }


  /** A REST API to support trip planning.
   *
   * @param request
   * @param response
   * @return
   */
  private String plan(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin","*");


    return (new Plan(request)).getTrip();
  }

  /** A REST API to support database queries.
   *
   * @param request
   * @param response
   * @return
   */
  private String query(Request request, Response response) {

    response.type("application/json");
    response.header("Access-Control-Allow-Origin", "*");

    return (new Database(request)).getQuery();
  }

  /** A REST API that returns the configuration settings of the server.
   *
   * @param request
   * @param response
   * @return
   */
  private String config(Request request, Response response){
    response.type("application/json");
    response.header("Access-Control-Allow-Origin","*");


    return (new Setup()).getConfig();
  }
  /** A REST API that returns the team information associated with the server.
   *
   * @param request
   * @param response
   * @return
   */
  private String team(Request request, Response response) {

    response.type("text/plain");
    response.header("Access-Control-Allow-Origin","*");


    return name;
  }
}