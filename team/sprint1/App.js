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
      sum: "",
      operand1: "",
      operand2: "",
      degreesInput1: "",
      minutesInput1: "",
      secondsInput1: "",
      directionInput1: "",
      degreesInput2: "",
      minutesInput2: "",
      secondsInput2: "",
      directionInput2: ""
    };
    /* must bind all functions in constructor */
    _this.updateOperand1 = _this.updateOperand1.bind(_this);
    _this.updateOperand2 = _this.updateOperand2.bind(_this);
    return _this;
  }

  _createClass(Calculator, [{
    key: "updateOperand1",
    value: function updateOperand1(event) {
      /* update the value of operand 1.  needs validation */
      this.setState({ operand1: event.target.value });

      /* splits the string at the degree symbol and rest is the rest of the line */

      var _event$target$value$s = event.target.value.split('°'),
          _event$target$value$s2 = _slicedToArray(_event$target$value$s, 2),
          deg = _event$target$value$s2[0],
          rest = _event$target$value$s2[1];
      /* Changes the state of degrees*/


      this.setState({ degreesInput1: deg });
      /* splits the string at the single qoute symbol and rest is the rest of the line */

      var _rest$split = rest.split('\''),
          _rest$split2 = _slicedToArray(_rest$split, 2),
          min = _rest$split2[0],
          rest = _rest$split2[1];
      /* Changes the state of minutes */


      this.setState({ minutesInput1: min });
      /* splits the string at the double qoute symbol and rest is the rest of the line */

      var _rest$split3 = rest.split('"'),
          _rest$split4 = _slicedToArray(_rest$split3, 2),
          sec = _rest$split4[0],
          dir = _rest$split4[1];
      /* Changes the state of seconds */


      this.setState({ secondsInput1: sec });
      /* Changes the state of direction */
      this.setState({ directionInput1: dir });
    }
  }, {
    key: "updateOperand2",
    value: function updateOperand2(event) {
      /* update the value of operand 2.  needs validation */
      this.setState({ operand2: event.target.value });
      /* splits the string at the degree symbol and rest is the rest of the line */

      var _event$target$value$s3 = event.target.value.split('°'),
          _event$target$value$s4 = _slicedToArray(_event$target$value$s3, 2),
          deg = _event$target$value$s4[0],
          rest = _event$target$value$s4[1];
      /* Changes the state of degrees*/


      this.setState({ degreesInput2: deg });
      /* splits the string at the single qoute symbol and rest is the rest of the line */

      var _rest$split5 = rest.split('\''),
          _rest$split6 = _slicedToArray(_rest$split5, 2),
          min = _rest$split6[0],
          rest = _rest$split6[1];
      /* Changes the state of minutes */


      this.setState({ minutesInput2: min });
      /* splits the string at the double qoute symbol and rest is the rest of the line */

      var _rest$split7 = rest.split('"'),
          _rest$split8 = _slicedToArray(_rest$split7, 2),
          sec = _rest$split8[0],
          dir = _rest$split8[1];
      /* Changes the state of seconds */


      this.setState({ secondsInput2: sec });
      /* Changes the state of direction */
      this.setState({ directionInput2: dir });
    }
  }, {
    key: "render",
    value: function render() {
      /* a simple form with text input and a submit button  */
      return React.createElement(
        "form",
        { className: "form-inline", onSubmit: this.calc },
        "Start",
        React.createElement("input", { type: "text", className: "text-right form-control mr-sm-2",
          value: this.state.operand1, onChange: this.updateOperand1 }),
        React.createElement(
          "button",
          { className: "btn btn-secondary mr-sm-2", disabled: true },
          "to"
        ),
        "End",
        React.createElement("input", { type: "text", className: "text-right form-control mr-sm-2",
          value: this.state.operand2, onChange: this.updateOperand2 }),
        React.createElement(
          "button",
          { className: "btn btn-primary mr-sm-2", type: "submit", value: "submit",
            disabled: true },
          "="
        ),
        React.createElement("input", { type: "text", className: "text-right form-control mr-sm-2",
          value: this.state.sum, disabled: true })
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
          "CS 314 - Distance Calculator t07"
        ),
        React.createElement("hr", null),
        React.createElement(Calculator, null)
      );
    }
  }]);

  return Application;
}(React.Component);

ReactDOM.render(React.createElement(Application, null), document.getElementById("application"));
