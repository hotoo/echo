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
    min: 2,
    max: 5
  }).on("echoed", function(item){
    $(".echo-remover").show();
  }).on("removed", function(item){
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

## ON THE TABLE


````html
<table id="table-echo-0" class="echo" border=1>
  <thead>
    <tr>
      <th>INPUT</th>
      <th>OPERATOR</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input type="text" name="txt" />
      </td>
      <td>
        <a href="#add" class="echo-adder">Add</a>
        <a href="#remove" class="echo-remover">Remove</a>
      </td>
    </tr>
  </tbody>
</table>
````

````javascript
seajs.use(['jquery', 'index'], function($, Echo) {

  var echo = new Echo("#table-echo-0 > tbody > tr", {
    min: 2,
    max: 5
  }).on("echoed", function(item){
    $(".echo-remover, .echo-adder").show();
  }).on("removed", function(item){
    $("#table-echo-0 a.echo-adder").show();
  }).on("min", function(item){
    $(".echo-remover").hide();
  }).on("max", function(){
    $("#table-echo-0 a.echo-adder").hide();
  });

  $(document).delegate("#table-echo-0 a.echo-adder", "click", function(){
    echo.echo();
  });
  $(document).delegate("#table-echo-0 a.echo-remover", "click", function(){
    echo.remove($(this).parent().parent());
  });

});
````
