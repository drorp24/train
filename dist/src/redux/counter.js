"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrement = exports.increment = exports.default = void 0;

var _toolkit = require("@reduxjs/toolkit");

var counterSlice = (0, _toolkit.createSlice)({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    // returning the state (as usual)
    increment: function increment(_ref) {
      var value = _ref.value;
      return {
        value: value + 1
      };
    },
    // mutating the state (Immer)
    // For Immer to work, all these conditions must be met:
    // 1. state must be an object, not a scalar, otherwise an error is thrown
    // 2. state mutation should include the 'state' variables (= no destructuring) otherwise state won't update
    // 3. when state is mutated it should *not* be returned (hence the curly braces)
    decrement: function decrement(state) {
      state.value -= 1;
    }
  }
});
var actions = counterSlice.actions,
    reducer = counterSlice.reducer; // by convention, the 'reducer' is the default export and the actions are exported by name

var _default = reducer;
exports.default = _default;
var increment = actions.increment,
    decrement = actions.decrement; // TODO: add a thunky slice using createAsyncThunk
// https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk

exports.decrement = decrement;
exports.increment = increment;

//# sourceMappingURL=counter.js.map