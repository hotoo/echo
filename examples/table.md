# TABLE DEMO

---

<style>
table,
table th,
table td{
  border: 1px solid #ccc;
  padding: 5px 10px;
}
table thead th{
  background-color:#eee;
}
table tfoot td{
  background-color:#f9f9f9;
}
table a {
  margin: 2px 5px
}
</style>

````html
<style>
.echo-disabled {
  color:#ccc!important;
  cursor: not-allowed!important;
}
</style>

<table id="table-echo-0" class="echo">
  <thead>
    <tr>
      <th>INPUT</th>
      <th>OPERATOR</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <input type="text" name="txt" value="0" />
      </td>
      <td>
        <a href="#add" class="echo-insert">[+]</a>
        <a href="#remove" class="echo-remover">[-]</a>
        <a href="#moveup" class="echo-moveup">[↑]</a>
        <a href="#movedown" class="echo-movedown">[↓]</a>
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td>
        <a href="#append" class="echo-adder">Add</a>
      </td>
    </tr>
  </tfoot>
</table>
````

````javascript
seajs.use(['jquery', 'index'], function($, Echo) {

  var _index = 0;

  var echo = new Echo("#table-echo-0 > tbody > tr", {
    min: 2,
    max: 5,
    template: function(){
      return '<tr>' +
          '<td>' +
            '<input type="text" value="' + (++_index) + '" name="txt" />' +
          '</td>' +
          '<td>' +
            '<a href="#add" class="echo-insert">[+]</a> ' +
            '<a href="#remove" class="echo-remover">[-]</a> ' +
            '<a href="#moveup" class="echo-moveup">[↑]</a> ' +
            '<a href="#movedown" class="echo-movedown">[↓]</a>' +
          '</td>' +
        '</tr>';
    }
  }).on("unmin", function(item){
    $("#table-echo-0 .echo-remover, #table-echo-0 .echo-insert").removeClass("echo-disabled");
  }).on("unmax", function(item){
    $("#table-echo-0 a.echo-adder, #table-echo-0 a.echo-insert").removeClass("echo-disabled");
  }).on("min", function(item){
    $("#table-echo-0 .echo-remover").addClass("echo-disabled");
  }).on("max", function(){
    $("#table-echo-0 a.echo-adder, #table-echo-0 a.echo-insert").addClass("echo-disabled");
  }).on("top", function(top_item){
    top_item.find(".echo-moveup").addClass("echo-disabled");
  }).on("untop", function(top_item){
    top_item.find(".echo-moveup").removeClass("echo-disabled");
  }).on("bottom", function(item){
    item.find(".echo-movedown").addClass("echo-disabled");
  }).on("unbottom", function(item){
    item.find(".echo-movedown").removeClass("echo-disabled");
  }).render();

  $("#table-echo-0 a.echo-adder").click(function(evt){
    echo.echo();
    evt.stopPropagation();
    return false;
  });
  $(document).delegate("#table-echo-0 a.echo-insert", "click", function(evt){
    echo.echoBefore($(this).parent().parent());
    evt.stopPropagation();
    return false;
  });
  $(document).delegate("#table-echo-0 a.echo-remover", "click", function(evt){
    echo.remove($(this).parent().parent());
    evt.stopPropagation();
    return false;
  });
  $(document).delegate("#table-echo-0 a.echo-moveup", "click", function(evt){
    evt.stopPropagation();
    var curr = $(this).parent().parent();
    //var prev = curr.prev();
    //if(!prev.length){return false;}
    echo.move(curr, -1);
    return false;
  });
  $(document).delegate("#table-echo-0 a.echo-movedown", "click", function(evt){
    evt.stopPropagation();
    var curr = $(this).parent().parent();
    //var next = curr.next();
    //if(!next.length){return false;}
    echo.move(curr, 1);
    return false;
  });

});
````
