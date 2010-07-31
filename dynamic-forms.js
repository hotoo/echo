/**
 * Dynamic add forms element from template.
 * @param options {Object}
 * @author 闲耘™(hotoo.cn[AT]gmail.com)
 * @version 1.0 2010/07/19
 */
(function(){
    $.fn.extend({
        dynamicForms:function(options){
            var settings = $.extend(settings, defaults, options||{});

            this.each(function(){
                var _this=this,
                    $this=$(this);
                var handler_add,
                    handler_remove =
                        '<a class="remove" href="javascript:void(0);">'+(settings.remover||'x 移除')+'</a>',
                    template;
                if(!settings.template){
                    template = $(this).find("li:first").clone();
                }else{
                    template = $(settings.template).clone();
                }

                if(!settings.handler){
                    handler_add = $('<a class="add" href="javascript:void(0);">+ 添加</a>');
                    $(this).after(handler_add);
                }else{
                    handler_add = settings.handler;
                }

                // init.
                var ilen = $this.find("li").length;
                if(ilen>settings.min){
                    $this.find(">li:not(:has(>a.remove))").append(handler_remove);
                }
                if(ilen>=settings.max){
                    handler_add.hide();
                }

                handler_add.click(function(){
                    var len=$this.find('>li').length;
                    if(len>=settings.max){return;}
                    $this.append(template.clone());
                    if(len>=settings.min){
                        $this.find(">li:not(:has(>a.remove))").append(handler_remove);
                    }
                    if(len>=settings.max-1){
                        handler_add.hide();
                    }
                    return;
                });

                $this.find("ol>li>a.remove").live("click", function(){
                    $(this).parent().remove();
                    handler_add.show();
                    if($this.find('>li').length<=settings.min){
                        $this.find('>li>a.remove').remove();
                    }
                });
            });
        }
    });
    var defaults = {
        template:null,        // {String,HTMLElement}
        min:1,                // {Number} Lower limit of element count.
        max:Number.MAX_VALUE, // {Number} Limit of element count.
        handler:null,         // {String,HTMLElement} HTML code for create new element,
                              //    or exist HTMLElement object.
        remover:null          // {String}
    };
})(jQuery);
