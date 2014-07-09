# Demo

---

## Normal usage

````html
<style>
.echo .echo-remover {
  display:none;
}
</style>
<button id="btn-add">Add</button>
<ul id="list-echo-0" class="echo">
  <li>
    <input type="text" name="txt" />
    <a href="#remove" class="echo-remover">Remove</a>
  </li>
</ul>
````

````javascript
seajs.use(['jquery', 'index'], function($, Echo) {

  var echo = new Echo("#list-echo-0 > li", {
    min: 1,
    max: 5
  }).on("echoed", function(item){
    if(this.elements.length > this.min){
      $(".echo-remover").show();
    }
    if(this.elements.length >= this.max){
      $("#btn-add").prop("disabled", true);
    }
  }).on("removed", function(item){
    if(this.elements.length <= this.min){
      $(".echo-remover").hide();
    }
  });

  $("#btn-add").click(function(){
    echo.echo();
  });
  $(document).delegate("#list-echo-0 a.echo-remover", "click", function(){
    echo.remove($(this).parent());
  });

});
````
