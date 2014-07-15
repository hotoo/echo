
var $ = require("jquery");
var Events = require("arale-events");

var DEFAULT_MAX = Number.MAX_VALUE;
var DEFAULT_MIN = 0;
//  DEFAULT_TEMPLATE = :first-child

function typeOf(type){
  return function(object){
    return Object.prototype.toString.call(object) === "[object " + type + "]";
  };
}
var isNumber = typeOf("Number");
var isFunction = typeOf("Function");
var isString = typeOf("String");


// @param {String,HTMLElement}, elements, required.
// @param {Object} options, optional.
var Echo = function(elements, options){
  if(!elements){throw new Error("require argument: elements.");}
  Events.call(this);

  if(!options){ options = {}; }

  this.elements = $(elements);
  var template = options.template;

  if (isFunction(template)){
    this.template = {
      clone: function(){
        var tmp = template();
        if (!tmp){
          throw new Error("Echo: invalid template.")
        }
        if (isString(tmp)){
          return $(tmp);
        }
        // jQuery object.
        if (isFunction(tmp.clone)){
          return tmp.clone();
        }
        throw new Error("Echo: invalid template.")
      }
    };
  } else if (isString(template)){
    this.template = $(template);
  } else if (template instanceof $){
    this.template = template.first().clone();
  } else {
    this.template = this.elements.first().clone();
  }

  this.min = options.min || DEFAULT_MIN;
  this.max = options.max || DEFAULT_MAX;

  while(this.elements.length < this.min){
    this.echo();
  }

};
Echo.prototype = new Events();


// Add echo element item at index.
// @param {Number} index.
// @return {Echo} this.
Echo.prototype.echoAt = function(index){
  var max_length = this.elements.length;

  if (max_length >= this.max){return;}

  var item = this.template.clone();
  var last = this.elements.last();

  if (index === -1){
    this.elements.last().after(item);
    this.elements.push(item[0]);
  } else if (index >= 0 && index <= max_length){
    this.elements.eq(index).before(item);
    this.elements.splice(index, 0, item[0]);
  } else {
    return this;
  }

  this.trigger("echo", item);

  if (max_length === this.max - 1){
    this.trigger("max", this.max);
  }
  if (max_length === this.min){
    this.trigger("unmin", this.min);
  }

  if (index === 0){
    this.trigger("top", this.elements.first());
    this.trigger("untop", this.elements.eq(1));
  }
  if (index === -1){
    this.trigger("bottom", item);
    this.trigger("unbottom", last);
  }

  return this;
};


// Append echo element at the end.
// @return {Echo} this.
Echo.prototype.echo = function(){
  return this.echoAt(-1);
};


// Add echo element before echo item.
// @param {HTMLElement} item.
// @return {Echo} this.
Echo.prototype.echoBefore = function(item){
  var index = this.elements.index(item);
  if (index === -1){ throw new Error("Not found echo item: " + item);}
  return this.echoAt(index);
};


// Add echo element after echo item.
// @param {HTMLElement} item.
// @return {Echo} this.
Echo.prototype.echoAfter = function(item){
  var index = this.elements.index(item);
  if (index === -1) {
    throw new Error("Not found echo item: " + item);
  } else if (index === this.elements.length) {
    index = -1; // append.
  } else { // 0 < index < this.elements.length
    index++;
  }
  return this.echoAt(index);
};


// Remove element item.
// @param {HTMLElement} item.
// @return {Echo} this.
Echo.prototype.remove = function(item){
  var index = this.elements.index(item);
  return this.removeAt(index);
};


// Remove element item at index.
// @param {Number} index.
// @return {Echo} this.
Echo.prototype.removeAt = function(index){
  var max_length = this.elements.length;

  if (max_length <= this.min){return;}
  if (index < 0 || index > max_length){
    return this;
  }

  var item = this.elements[index];

  item.remove();
  this.elements.splice(index, 1);

  this.trigger("remove", item);

  if (max_length - 1 === this.min){
    this.trigger("min", this.min);
  }

  if (max_length === this.max){
    this.trigger("unmax", this.min);
  }

  if (index === max_length - 1){
    this.trigger("bottom", this.elements.last());
  }

  return this;
};


// Move echo item by relative position.
//
// @param {Number,HTMLElement,jQuery} from.
// @param {Number} to, relative position.
// @return {Echo} this.
Echo.prototype.move = function(from, to){
  var from_index;
  var max_length = this.elements.length;

  if (isNumber(from)){
    from_index = from;
  } else {
    from_index = this.elements.index(from);

    // Invalid from echo item.
    if(from_index === -1){
      return this;
    }
  }

  // Invalid from echo item index.
  if (from_index < -1 || max_length <= from_index){return this;}
  var to_index = from_index + to;
  if(to_index < 0 || to_index >= max_length){return this;}

  return this.moveTo(from_index, to_index);
};


// Move echo item by absolute position.
//
// @param {Number,HTMLElement,jQuery} from.
// @param {Number} to.
// @return {Echo} this.
Echo.prototype.moveTo = function(from, to){
  var from_index, from_item;
  var to_index, to_item;
  var max_length = this.elements.length;

  if (isNumber(from)){
    from_index = from;

    if (from_index === -1){
      from_item = this.elements.last();
    } else if(0 <= from_index && from_index < max_length){
      from_item = this.elements.eq(from_index);
    }
  } else {
    from_index = this.elements.index(from);

    // Invalid `from` echo element.
    if (from_index === -1){
      return this;
    } else {
      from_item = from;
    }
  }

  to_index = to;

  if (to_index === -1){
    to_item = this.elements.last();
  } else if (0 <= to_index && to_index < max_length){

    to_item = this.elements.eq(to_index);
  }

  if (from_index === to_index){return this;}

  if (to === -1) {
    from_item.insertAfter(to_item); // move DOM.
    this.elements.push(
      this.elements.splice(from_index, 1)[0]
    ); //move selector elements.
  } else if (0 <= to || to < max_length){
    if (from_index < to_index){
      from_item.insertAfter(to_item); // move DOM.
    } else {
      from_item.insertBefore(to_item); // move DOM.
    }

    this.elements.splice(to_index, 0,
      this.elements.splice(from_index, 1)[0]
    ); // move selector elements.

  }

  this.trigger("move", from_item, from_index, to_index);

  if (to_index === 0){
    this.trigger("top", from_item);
    this.trigger("untop", to_item);
  }
  if (from_index === 0){
    this.trigger("top", to_item);
    this.trigger("untop", from_item);
  }
  if (to_index === -1 || to_index===max_length-1){
    this.trigger("bottom", from_item);
    this.trigger("unbottom", to_item);
  }
  if (from_index === -1 || from_index===max_length-1){
    this.trigger("bottom", to_item);
    this.trigger("unbottom", from_item);
  }

  return this;
}


// Clear all elements.
// @return {Echo} this.
Echo.prototype.clear = function(){
  this.elements.remove();
  this.elements.length = 0;
  return this;
};


Echo.prototype.render = function(){
  if (this.elements.length === this.min){
    this.trigger("min", this.min);
  }
  if (this.elements.length === this.max){
    this.trigger("max", this.max);
  }
  this.trigger("top", this.elements.first());
  this.trigger("bottom", this.elements.last());

  return this;
};

module.exports = Echo;
