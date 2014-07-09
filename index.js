
var $ = require("jquery");
var Events = require("arale-events");

var DEFAULT_MAX = Number.MAX_VALUE;
var DEFAULT_MIN = 1;
//  DEFAULT_TEMPLATE = :first-child


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
//Events.mixTo(Echo);

Echo.prototype.echo = function(){
  var item = this.template.clone();
  this.trigger("echo", item);
  this.elements.last().after(item);
  this.elements.push(item[0]);
  this.trigger("echoed", item);
  return this;
};

Echo.prototype.remove = function(item){
  var index = this.elements.index(item);
  if (index === -1){return this;}
  return this.removeAt(index);
};
Echo.prototype.removeAt = function(index){
  if (index < 0 || index > this.elements.length){
    return this;
  }
  this.trigger("remove", item);
  var item = this.elements[index];
  item.remove();
  this.elements.splice(index, 1);
  this.trigger("removed", item);
  return this;
};

Echo.prototype.swap = function(index_a, index_b){
  var item_a = this.elements[index_a];
  var item_b = this.elements[index_b];

  item_a.insertBefore(item_b);
  item_b.insertAt(index_a);

  return this;
};

Echo.prototype.clear = function(){
  this.elements.remove();
  this.elements.length = 0;
  return this;
};

module.exports = Echo;
