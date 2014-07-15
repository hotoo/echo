# LIST DEMO

---

````html
<button id="btn-add">Add</button>
<ul id="list-echo-0" class="echo">
  <li>
    <input type="text" name="txt" />
    <a href="#remove" class="echo-remover echo-disabled">Remove</a>
  </li>
</ul>
````

````javascript
seajs.use(['jquery', 'index'], function($, Echo) {

  var echo = new Echo("#list-echo-0 > li", {
    min: 2,
    max: 5
  }).on("unmin", function(item){
    $(".echo-remover").show();
  }).on("unmax", function(item){
    $("#btn-add").prop("disabled", false);
  }).on("min", function(item){
    $(".echo-remover").hide();
  }).on("max", function(){
    $("#btn-add").prop("disabled", true);
  }).on("echo", function(item){
    item.find(".echo-remover").show();
  });

  $("#btn-add").click(function(){
    echo.echo();
    evt.stopPropagation();
    return false;
  });
  $(".echo").delegate("#list-echo-0 a.echo-remover", "click", function(){
    echo.remove($(this).parent());
    evt.stopPropagation();
    return false;
  });

});
````
