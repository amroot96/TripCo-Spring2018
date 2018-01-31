var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calculator = function (_React$Component) {
  _inherits(Calculator, _React$Component);

  function Calculator(props) {
    _classCallCheck(this, Calculator);

    /* state variables */
    var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this, props));

    _this.state = {
      radius: 3958.7613,
      units: 0,
      format: 3,
      operand1: "",
      operand2: "",
      dist: "",
      lat1: "",
      long1: "",
      lat2: "",
      long2: ""
    };
    /* core methods */
    _this.updateOperand1 = _this.updateOperand1.bind(_this);
    _this.updateOperand2 = _this.updateOperand2.bind(_this);
    _this.calc = _this.calc.bind(_this);
    /* helper methods */
    _this.setUnits = _this.setUnits.bind(_this);
    _this.setFormat = _this.setFormat.bind(_this);
    _this.splitDMS = _this.splitDMS.bind(_this);
    _this.splitDDM = _this.splitDDM.bind(_this);
    _this.splitDD = _this.splitDD.bind(_this);
    _this.toRadians = _this.toRadians.bind(_this);
    return _this;
  }

  _createClass(Calculator, [{
    key: "updateOperand1",
    value: function updateOperand1(event) {
      /* update the value of operand 1.  needs validation */
      this.setState({ operand1: event.target.value });
      if (this.state.format == 0) {
        this.splitDMS(event.target.value, 1);
      }
      if (this.state.format == 1) {
        this.splitDDM(event.target.value, 1);
      }
      if (this.state.format == 2) {
        this.splitDD(event.target.value, 1);
      }
      if (this.state.format == 3) {
        var _event$target$value$s = event.target.value.split(' '),
            _event$target$value$s2 = _slicedToArray(_event$target$value$s, 2),
            lat = _event$target$value$s2[0],
            long = _event$target$value$s2[1];

        this.setState({ lat1: this.toRadians(lat) });
        this.setState({ long1: this.toRadians(long) });
      }
    }
  }, {
    key: "updateOperand2",
    value: function updateOperand2(event) {
      /* update the value of operand 2.  needs validation */
      this.setState({ operand2: event.target.value });
      if (this.state.format == 0) {
        this.splitDMS(event.target.value, 2);
      }
      if (this.state.format == 1) {
        this.splitDDM(event.target.value, 2);
      }
      if (this.state.format == 2) {
        this.splitDD(event.target.value, 2);
      }
      if (this.state.format == 3) {
        var _event$target$value$s3 = event.target.value.split(' '),
            _event$target$value$s4 = _slicedToArray(_event$target$value$s3, 2),
            lat = _event$target$value$s4[0],
            long = _event$target$value$s4[1];

        this.setState({ lat2: this.toRadians(lat) });
        this.setState({ long2: this.toRadians(long) });
      }
    }
  }, {
    key: "calc",
    value: function calc(event) {
      this.setState({ dist: Math.round(this.state.radius * Math.acos(Math.sin(this.state.lat1) * Math.sin(this.state.lat2) + Math.cos(this.state.lat1) * Math.cos(this.state.lat2) * Math.cos(this.state.long2 - this.state.long1))) });
      event.preventDefault();
    }
  }, {
    key: "setFormat",
    value: function setFormat(event) {
      this.setState({ format: event.target.value });
    }
  }, {
    key: "setUnits",
    value: function setUnits(event) {
      this.setState({ units: event.target.value });
      if (event.target.value == 0) {
        this.setState({ radius: Number(3958.7613) });
      } else {
        this.setState({ radius: Number(6371.0088) });
      }
    }
  }, {
    key: "splitDMS",
    value: function splitDMS(DMS, operand) {
      var _DMS$split = DMS.split('°'),
          _DMS$split2 = _slicedToArray(_DMS$split, 3),
          deg1 = _DMS$split2[0],
          helper = _DMS$split2[1],
          rest = _DMS$split2[2]; /* get degrees */


      rest = helper + '°' + rest;

      var _rest$split = rest.split('′'),
          _rest$split2 = _slicedToArray(_rest$split, 3),
          min1 = _rest$split2[0],
          helper = _rest$split2[1],
          rest = _rest$split2[2]; /* get minutes   */


      rest = helper + '′' + rest;

      var _rest$split3 = rest.split('″'),
          _rest$split4 = _slicedToArray(_rest$split3, 3),
          sec1 = _rest$split4[0],
          helper = _rest$split4[1],
          rest = _rest$split4[2]; /* get seconds */


      rest = helper + '″' + rest;
      var dir1 = rest.substring(1, 2);
      rest = rest.substring(2);

      var _rest$split5 = rest.split('°'),
          _rest$split6 = _slicedToArray(_rest$split5, 2),
          deg2 = _rest$split6[0],
          rest = _rest$split6[1]; /* get degrees */


      var _rest$split7 = rest.split('′'),
          _rest$split8 = _slicedToArray(_rest$split7, 2),
          min2 = _rest$split8[0],
          rest = _rest$split8[1]; /* get minutes */


      var _rest$split9 = rest.split('″'),
          _rest$split10 = _slicedToArray(_rest$split9, 2),
          sec2 = _rest$split10[0],
          dir2 = _rest$split10[1]; /* get seconds */


      if (operand == 2) {
        if (dir1 == "S") {
          this.setState({ lat2: Number(-1 * this.toRadians(Number(deg1) + min1 / 60 + sec1 / 3600)) });
        } else {
          this.setState({ lat2: Number(this.toRadians(Number(deg1) + min1 / 60 + sec1 / 3600)) });
        }
        if (dir2 == "W") {
          this.setState({ long2: Number(-1 * this.toRadians(Number(deg2) + min2 / 60 + sec2 / 3600)) });
        } else {
          this.setState({ long2: Number(this.toRadians(Number(deg2) + min2 / 60 + sec2 / 3600)) });
        }
      } else {
        if (dir1 == "S") {
          this.setState({ lat1: Number(-1 * this.toRadians(Number(deg1) + min1 / 60 + sec1 / 3600)) });
        } else {
          this.setState({ lat1: Number(this.toRadians(Number(deg1) + min1 / 60 + sec1 / 3600)) });
        }
        if (dir2 == "W") {
          this.setState({ long1: Number(-1 * this.toRadians(Number(deg2) + min2 / 60 + sec2 / 3600)) });
        } else {
          this.setState({ long1: Number(this.toRadians(Number(deg2) + min2 / 60 + sec2 / 3600)) });
        }
      }
    }
  }, {
    key: "splitDDM",
    value: function splitDDM(DDM, operand) {
      var _DDM$split = DDM.split('°'),
          _DDM$split2 = _slicedToArray(_DDM$split, 3),
          deg1 = _DDM$split2[0],
          helper = _DDM$split2[1],
          rest = _DDM$split2[2]; /* get degrees */


      rest = helper + '°' + rest;

      var _rest$split11 = rest.split('′'),
          _rest$split12 = _slicedToArray(_rest$split11, 3),
          min1 = _rest$split12[0],
          helper = _rest$split12[1],
          rest = _rest$split12[2]; /* get minutes   */


      rest = helper + '′' + rest;
      var dir1 = rest.substring(1, 2);
      rest = rest.substring(2);

      var _rest$split13 = rest.split('°'),
          _rest$split14 = _slicedToArray(_rest$split13, 2),
          deg2 = _rest$split14[0],
          rest = _rest$split14[1]; /* get degrees */


      var _rest$split15 = rest.split('′'),
          _rest$split16 = _slicedToArray(_rest$split15, 2),
          min2 = _rest$split16[0],
          rest = _rest$split16[1]; /* get minutes */


      if (operand == 2) {
        if (dir1 == "S") {
          this.setState({ lat2: Number(-1 * this.toRadians(Number(deg1) + min1 / 60)) });
        } else {
          this.setState({ lat2: Number(this.toRadians(Number(deg1) + min1 / 60)) });
        }
        if (dir2 == "W") {
          this.setState({ long2: Number(-1 * this.toRadians(Number(deg2) + min2 / 60)) });
        } else {
          this.setState({ long2: Number(this.toRadians(Number(deg2) + min2 / 60)) });
        }
      } else {
        if (dir1 == "S") {
          this.setState({ lat1: Number(-1 * this.toRadians(Number(deg1) + min1 / 60)) });
        } else {
          this.setState({ lat1: Number(this.toRadians(Number(deg1) + min1 / 60)) });
        }
        if (dir2 == "W") {
          this.setState({ long1: Number(-1 * this.toRadians(Number(deg2) + min2 / 60)) });
        } else {
          this.setState({ long1: Number(this.toRadians(Number(deg2) + min2 / 60)) });
        }
      }
    }
  }, {
    key: "splitDD",
    value: function splitDD(DD, operand) {
      var _DD$split = DD.split('°'),
          _DD$split2 = _slicedToArray(_DD$split, 3),
          deg1 = _DD$split2[0],
          helper = _DD$split2[1],
          rest = _DD$split2[2]; /* get degrees */


      rest = helper + '°' + rest;
      var dir1 = rest.substring(1, 2);
      rest = rest.substring(2);

      var _rest$split17 = rest.split('°'),
          _rest$split18 = _slicedToArray(_rest$split17, 2),
          deg2 = _rest$split18[0],
          rest = _rest$split18[1]; /* get degrees */

      if (operand == 2) {
        if (dir1 == "S") {
          this.setState({ lat2: Number(-1 * this.toRadians(Number(deg1))) });
        } else {
          this.setState({ lat2: Number(this.toRadians(Number(deg1))) });
        }
        if (dir2 == "W") {
          this.setState({ long2: Number(-1 * this.toRadians(Number(deg2))) });
        } else {
          this.setState({ long2: Number(this.toRadians(Number(deg2))) });
        }
      } else {
        if (dir1 == "S") {
          this.setState({ lat1: Number(-1 * this.toRadians(Number(deg1))) });
        } else {
          this.setState({ lat1: Number(this.toRadians(Number(deg1))) });
        }
        if (dir2 == "W") {
          this.setState({ long1: Number(-1 * this.toRadians(Number(deg2))) });
        } else {
          this.setState({ long1: Number(this.toRadians(Number(deg2))) });
        }
      }
    }
  }, {
    key: "toRadians",
    value: function toRadians(angle) {
      return angle * (Math.PI / 180);
    }
  }, {
    key: "render",
    value: function render() {
      /* a simple form with text input and a submit button  */
      return React.createElement(
        "form",
        { className: "form-inline", onSubmit: this.calc },
        React.createElement(
          "p",
          null,
          React.createElement(
            "div",
            null,
            React.createElement(
              "p",
              null,
              " Select Input Format "
            ),
            " ",
            React.createElement(
              "p",
              null,
              React.createElement(
                "select",
                { value: this.state.format, onChange: this.setFormat },
                React.createElement(
                  "option",
                  { disbled: true },
                  "Choose One..."
                ),
                React.createElement(
                  "option",
                  { value: "0" },
                  "DMS [ 40\xB0 26\u2032 46\u2033 N 79\xB0 58\u2032 56\u2033 W ]"
                ),
                React.createElement(
                  "option",
                  { value: "1" },
                  "DDM [ 40\xB0 26.767\u2032 N 79\xB0 58.933\u2032 W ]"
                ),
                React.createElement(
                  "option",
                  { value: "2" },
                  "DD [ 40.446\xB0 N 79.982\xB0 W ]"
                ),
                React.createElement(
                  "option",
                  { value: "3" },
                  "FP [ 40.445 -79.982 ]"
                )
              ),
              " "
            ),
            React.createElement(
              "p",
              null,
              " Select Distance Units "
            ),
            " ",
            React.createElement(
              "p",
              null,
              React.createElement(
                "select",
                { value: this.state.units, onChange: this.setUnits },
                React.createElement(
                  "option",
                  { disbled: true },
                  "Choose One..."
                ),
                React.createElement(
                  "option",
                  { value: "0" },
                  "Miles"
                ),
                React.createElement(
                  "option",
                  { value: "1" },
                  "Kilometers"
                )
              ),
              " "
            )
          )
        ),
        "Start:",
        React.createElement("input", { type: "text", className: "text-right form-control mr-sm-2",
          value: this.state.operand1, onChange: this.updateOperand1 }),
        "End:",
        React.createElement("input", { type: "text", className: "text-right form-control mr-sm-2",
          value: this.state.operand2, onChange: this.updateOperand2 }),
        React.createElement(
          "button",
          { className: "btn btn-primary mr-sm-2", enabled: true },
          "Calculate"
        ),
        React.createElement("input", { type: "text", className: "text-right form-control mr-sm-2",
          value: this.state.dist, disabled: true })
      );
    }
  }]);

  return Calculator;
}(React.Component);

var Application = function (_React$Component2) {
  _inherits(Application, _React$Component2);

  function Application() {
    _classCallCheck(this, Application);

    return _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).apply(this, arguments));
  }

  _createClass(Application, [{
    key: "render",
    value: function render() {
      /* separate the page layout from the calculator function */
      return React.createElement(
        "div",
        { className: "jumbotron" },
        React.createElement(
          "h3",
          null,
          "CS 314 - Distance Calculator t07 - Jackalope"
        ),
        React.createElement("hr", null),
        React.createElement(Calculator, null)
      );
    }
  }]);

  return Application;
}(React.Component);

ReactDOM.render(React.createElement(Application, null), document.getElementById("application"));
