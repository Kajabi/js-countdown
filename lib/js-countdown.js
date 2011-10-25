/*
 * Copyright (c) 2011 Kajabi LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function() {
  var CountDown = function(time, options) {
    this.options = {};
    this.options.zero = options.zero || function() {};
    this.options.tick = options.tick || function() {};
    this.options.interval = options.interval || 200;

    this.target = time.getTime();
    this.start();
  };

  CountDown.prototype = {
    clock: function() {
      var remaining = this.remaining();

      if (remaining > 0) {
        var timer = new Timer(this.remaining());
        this.options.tick(timer);
      } else {
        this.stop();
        this.zero();
      }
    },

    remaining: function() {
      var current = new Date();
      return this.target - current.getTime();
    },

    start: function() {
      var self = this;

      this.timer = setInterval(function() {
        self.clock();
      }, this.options.interval);
    },

    stop: function() {
      clearInterval(this.timer);
    }
  };

  var Timer = function(remaining) {
    this.remaining = remaining;
  };

  var K = function(value) { return function() { return value; }}; // constant function

  Timer.prototype = {
    totalSeconds: function() { var r = Math.floor(this.remaining / 1000); return (this.totalSeconds = K(r))(); },
    totalMinutes: function() { var r = Math.floor(this.totalSeconds() / 60); return (this.totalMinutes = K(r))(); },
    totalHours:   function() { var r = Math.floor(this.totalMinutes() / 60); return (this.totalHours = K(r))(); },
    totalDays:    function() { var r = Math.floor(this.totalHours() / 24); return (this.totalDays = K(r))(); },
    totalWeeks:   function() { var r = Math.floor(this.totalDays() / 7); return (this.totalWeeks = K(r))(); },

    seconds: function() { return this.totalSeconds() % 60; return (this.seconds = K(r))(); },
    minutes: function() { return this.totalMinutes() % 60; return (this.minutes = K(r))(); },
    hours:   function() { return this.totalHours() % 24; return (this.hours = K(r))(); }
  };

  window.CountDown = CountDown;
}).call(this);
