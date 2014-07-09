
var $ = require("jquery");
var Events = require("arale-events");

var DEFAULT_MAX = Number.MAX_VALUE;
var DEFAULT_MIN = 1;
//  DEFAULT_TEMPLATE = :first-child

function isNumber(object){
  return Object.prototype.toString.call(object) === "[object Number]";
}


// @param {String,HTMLElement}, elements, required.
// @param {Object} options, optional.
var Echo = function(elements, options){
  if(!elements){throw new Error("require argument: elements.");}
  Events.call(this);
  this.elements = $(elements);
  this.template = $(options.template || this.elements[0]).clone();
  this.min = options.min || DEFAULT_MIN;
  this.max = options.max || DEFAULT_MAX;
};
Echo.prototype = new Events();


// Add element item.
// @param {Number} index, optional.
// @return {Echo} this.
Echo.prototype.echo = function(index){
  var type = "append";
  if (typeof index !== "undefined" && isNumber(index) &&
      index >= 0 && index <= this.elements.length){

    type = "insert";
  }

  var item = this.template.clone();
  this.trigger("echo", item);

  if (type === "insert"){
    this.elements.eq(index).before(item);
    this.elements.splice(index, 0, item[0]);
  } else {
    this.elements.last().after(item);
    this.elements.push(item[0]);
  }

  this.trigger("echoed", item);

  if (this.elements.length >= this.max){
    this.trigger("max", this.max);
  }

  return this;
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
  if (index < 0 || index > this.elements.length){
    return this;
  }

  this.trigger("remove", item);
  var item = this.elements[index];

  item.remove();
  this.elements.splice(index, 1);

  this.trigger("removed", item);

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
