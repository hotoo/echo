# LIST DEMO

---

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
    min: 2,
    max: 5
  }).on("echo", function(item){
    $(".echo-remover").show();
  }).on("remove", function(item){
    $("#btn-add").prop("disabled", false);
  }).on("min", function(item){
    $(".echo-remover").hide();
  }).on("max", function(){
    $("#btn-add").prop("disabled", true);
  });

  $("#btn-add").click(function(){
    echo.echo();
  });
  $(document).delegate("#list-echo-0 a.echo-remover", "click", function(){
    echo.remove($(this).parent());
  });

});
````
