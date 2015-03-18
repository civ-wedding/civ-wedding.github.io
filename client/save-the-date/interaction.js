function now () {
  if (window.performance) {
    return window.performance.now();
  }

  return Date.now();
}

function xyVelocity (origin, destination, timeZero, timeFinal) {
  var timeDelta = (timeFinal - timeZero);

  return {
    x: (destination.x - origin.x) / timeDelta,
    y: (destination.y - origin.y) / timeDelta
  };
}

function xy (event) {
  let coordinateObject;

  if (event && event.touches) {
    coordinateObject = event.touches[0];
  } else {
    coordinateObject = event;
  }

  if (!coordinateObject) {
    return {
      x: -1,
      y: -1
    }
  }

  return {
    x: coordinateObject.clientX,
    y: coordinateObject.clientY
  };
}

function xyDelta (alpha, beta) {
  return {
    x: beta.x - alpha.x,
    y: beta.y - alpha.y
  };
}

function bulkUnsubscriber (...subscriptions) {
  return function () {
    subscriptions.forEach(function (subscription) {
      subscription();
    });
  };
}

function subscribe (target, event, handler) {
  target.addEventListener(event, handler);
  return function () {
    target.removeEventListener(event, handler);
  };
}

function debounce (fn) {
  let calling = false;

  return function (event) {
    if (calling) {
      return;
    }

    calling = true;

    return window.requestAnimationFrame(function () {
      calling = false;
      fn(xy(event));
    });
  };
};

function onUp (target, callback) {
  let debouncedCallback = debounce(callback);

  return bulkUnsubscriber(
    subscribe(target, 'mouseup', debouncedCallback),
    subscribe(target, 'touchend', debouncedCallback)
  );
}

function onDown (target, callback) {
  let debouncedCallback = debounce(callback);

  return bulkUnsubscriber(
    subscribe(target, 'mousedown', debouncedCallback),
    subscribe(target, 'touchstart', debouncedCallback)
  );
}

function onMove (target, callback) {
  let debouncedCallback = debounce(callback);

  return bulkUnsubscriber(
    subscribe(target, 'mousemove', debouncedCallback),
    subscribe(target, 'touchmove', debouncedCallback)
  );
}

function onDrag (target, callback) {
  let start = null;
  let last = null;

  return bulkUnsubscriber(
    onDown(target, function(origin) {
      start = last = origin;
    }),
    onUp(document.body, function() {
      start = last = null;
    }),
    onMove(document.body, function(next) {
      if (start) {
        callback(start, next, xyDelta(last, next));
        last = next;
      }
    })
  );
}

function onSwipe (target, callback) {
  var timeZero = null;
  var lastFive = null;

  return bulkUnsubscriber(
    onDown(target, function(origin) {
      timeZero = now();
      lastFive = [];
    }),
    onUp(document.body, function(final) {
      let swipe;

      if (!timeZero) {
        return;
      }

      if (lastFive.length > 1) {
        swipe = xyVelocity(
          lastFive[0],
          lastFive[lastFive.length - 1],
          timeZero,
          now()
        );
      }

      if (swipe) {
        callback(swipe);
      }

      timeZero = lastFive = null;
    }),
    onDrag(document.body, function(start, current, delta) {
      if (!timeZero) {
        return;
      }

      lastFive.push(current);

      if (lastFive.length > 5) {
        lastFive.shift();
      }
    })
  );
}
