# echo

---

[![spm version](http://spmjs.io/badge/echo)](http://spmjs.io/package/echo)

Echo for web ui.

---

## INSTALL

```
$ spm install echo
```

## USAGE

```js
var Echo = require('echo');

var echo = new Echo({
  element: "#echo-container",
  template: $("#echo-container:first-child").clone(),
  min: 1,
  max: 5
});

$("#btn-echo").click(function(){
  echo.echo();
});
```

## API

### echo()


### echoff()


### on(eventName, handler)


### off(eventName, handler)


## EVENTS

### min


### max


### echo


### echoff
