
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
  if (this.elements.length >= this.max){return;}

  var item = this.template.clone();

  if (index === -1){
    this.elements.last().after(item);
    this.elements.push(item[0]);
  } else if (index >= 0 && index <= this.elements.length){
    this.elements.eq(index).before(item);
    this.elements.splice(index, 0, item[0]);
  } else {
    return this;
  }

  this.trigger("echo", item);

  if (this.elements.length >= this.max){
    this.trigger("max", this.max);
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
  return this.echo(index);
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
  if (this.elements.length <= this.min){return;}
  if (index < 0 || index > this.elements.length){
    return this;
  }

  var item = this.elements[index];

  item.remove();
  this.elements.splice(index, 1);

  this.trigger("remove", item);

  if (this.elements.length <= this.min){
    this.trigger("min", this.min);
  }

  return this;
};


// Swap two element item.
// @param {HTMLElement} item_a.
// @param {HTMLElement} item_b.
// @return {Echo} this.
Echo.prototype.swap = function(item_a, item_b){
  var index_a = this.elements.index(item_a);
  var index_b = this.elements.index(item_b);
  return this.swapAt(index_a, index_b);
};


// Swap two element item at index.
// @param {Number} index_a.
// @param {Number} index_b.
// @return {Echo} this.
Echo.prototype.swapAt = function(index_a, index_b){
  var max_length = this.elements.length;

  if (index_a < 0 || index_a > max_length ||
      index_b < 0 || index_b > max_length){
    return this;
  }

  var item_a = this.elements[index_a];
  var item_b = this.elements[index_b];

  item_a.insertBefore(item_b);
  item_b.insertAt(index_a);

  return this;
};


// Clear all elements.
// @return {Echo} this.
Echo.prototype.clear = function(){
  this.elements.remove();
  this.elements.length = 0;
  return this;
};

module.exports = Echo;
