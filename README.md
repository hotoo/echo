# echo

---

[![spm version](http://spmjs.io/badge/echo)](http://spmjs.io/package/echo)
[![Build Status](https://travis-ci.org/hotoo/echo.svg?branch=master)](https://travis-ci.org/hotoo/echo)

Echo for web ui.

---

## INSTALL

```
$ spm install echo
```

## USAGE

```js
var Echo = require('echo');

var echo = new Echo("#echo-container > .echo-item", {
  min: 1,
  max: 5
});

$("#btn-echo").click(function(){
  echo.echo();
});
```

## API

### new Echo(elements, options)

constructor.

params:

* elements, [required], support following types.
  * {String} selector.
  * {HTMLElement} element.
  * {jQuery} jQuery element.
* options, [optional]
  * `min`: {Number}, default: `0`.
  * `max`: {Number}, default: `Number.MAX_VALUE`.
  * `template`: support following types.
    * {String}: template string, or selector.
    * {Function} return template string or selector.

### .echo()

Append an echo element item at the end.

### .echoAt(index)

Add or insert an echo element item at index.

### .echoBefore(item)

Insert an echo element item before item.

### .echoAfter(item)

Append an echo element item after item.

### .remove(item)

Remove an echo element item.

### .removeAt(index)

Remove an echo element at index.

### .swap(item_a, item_b)

Swap two echo elements item.

### .swapAt(index_a, index_b)

Swap to echo elements item at index.

### .clear()

Clear all of echo elements.

### .on(eventName, handler)

Add event listener.

### .off(eventName, handler)

Remove event listener.


## EVENTS

### min

When echo elements length less than or equal the min length, fire `min` event.

### max

When echo elements length great than or equal the min length, fire `max` event.

### echo

When echo a copy element, fire `echo` event.

### remove

When remove an echo element, fire `remove` event.

### swap

When swap echo items, fire `swap` event.
