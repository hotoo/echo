# TABS DEMO

---

<style>
#tab-demo-1 {
    font: 14px/1.5 'Xin Gothic', 'PT Sans', 'Hiragino Sans GB', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    position: relative;
    width: 750px;
    padding-top: 29px;
}

#tab-demo-1 .ui-switchable-nav {
    position: absolute;
    top: 0;
    left: 20px;
    margin: 0;
    padding: 0;
    z-index: 99;
    list-style: none;
}

#tab-demo-1 .ui-switchable-nav li {
    float: left;
    width: 130px;
    height: 27px;
    line-height: 21px;
    text-align: center;
    background: url(assets/tabs-sprite.gif) no-repeat 0 6px;
    margin-right: 3px;
    padding-top: 8px;
    cursor: pointer;
    list-style: none;
}

#tab-demo-1 .ui-switchable-nav .ui-switchable-active {
    background-position: 0 -40px;
    cursor: default;
}

#tab-demo-1 .ui-switchable-content {
    position: relative;
    height: 150px;
    padding: 20px;
    border: 1px solid #AEC7E5;
}
.hidden {
  display:none;
}
</style>

````html
<div id="tab-demo-1" class="tab-demo">
  <ul class="ui-switchable-nav">
    <li class="ui-switchable-nav-item">默认</li>
    <li class="add">+</li>
  </ul>
  <div class="ui-switchable-content">
    <div class="hidden">
      * 点击标签页切换<br/>
      * 点击标签页后面的 `+` 添加标签页。
    </div>
  </div>
</div>
````

````javascript
seajs.use(['jquery', 'arale-switchable', 'index'], function($, Switchable, Echo) {

  function renderTabs(){
    var activeIndex = 0;
    $('.ui-switchable-nav > li.ui-switchable-nav-item').each(function(index){
      if($(this).hasClass("ui-switchable-active")){
        activeIndex = index;
      }
    });
    var tabs = new Switchable.Tabs({
      element: '#tab-demo-1',
      triggers: '.ui-switchable-nav > li.ui-switchable-nav-item',
      triggerType: 'click',
      panels: '.ui-switchable-content > div',
      activeIndex: activeIndex || 0
    });
  }

  var _index = 0;
  var echo_nav = new Echo("#tab-demo-1 > .ui-switchable-nav > li.ui-switchable-nav-item", {
    min: 1,
    max: 5,
    template: function(){
      return '<li class="ui-switchable-nav-item">标签 ' + ++_index + '</li>';
    }
  }).on("unmax", function(item){
    $(".add").show();
  }).on("max", function(){
    $(".add").hide();
  });

  var echo_panel = new Echo("#tab-demo-1 > .ui-switchable-content > div", {
    min: 1,
    max: 5,
    template: '<div class="hidden">双击标签页，删除当前标签页。</div>'
  })

  renderTabs();

  $(".add").click(function(evt){
    echo_nav.echo();
    echo_panel.echo();
    renderTabs();
    evt.stopPropagation();
    return false;
  });
  $(document).delegate("#tab-demo-1 .ui-switchable-nav-item", "dblclick", function(evt){
    var index = $("#tab-demo-1 .ui-switchable-nav-item").index(this);
    echo_nav.removeAt(index);
    echo_panel.removeAt(index);
    renderTabs();
    evt.stopPropagation();
    return false;
  });

});
````
