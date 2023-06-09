/**
 * Tooltip Module
 * @author  Lee Le
 * @website http://www.melonhtml5.com
 * @email   lee@melonhtml5.com
 */
var UI=function(n){this.init=function(){$(document).on("mouseenter","div.star-rating i",d);$(document).on("mouseleave","div.star-rating",f);$(document).on("click","div.star-rating i",g);$(document).on("click","div.todo input:checkbox",h);$(document).on("click","div.alert button.close, div.info button.close, div.note button.close",k)};this.update=function(){l();$("div.todo").sortable({item:".todo-item"});m()};var d=function(a){$(this).attr("class","icon-star");$(this).prevAll().attr("class","icon-star");
$(this).nextAll().attr("class","icon-star-empty")},f=function(a){a=$(this).data("rating");0<a?($(this).children(":lt("+a+")").attr("class","icon-star"),$(this).children(":gt("+(a-1)+")").attr("class","icon-star-empty")):$(this).children().attr("class","icon-star-empty")},g=function(a){$(this).parent().data("rating",$(this).index()+1)},h=function(a){$(this).is(":checked")?$(this).parent().parent().addClass("checked"):$(this).parent().parent().removeClass("checked")},k=function(a){$(this).trigger("mouseleave");
$(this).parent().remove()},l=function(){$("div.star-rating").each(function(){var a=$(this).children("i.icon-star:last").index()+1;$(this).data("rating",a)})},m=function(){$("div.slider").each(function(){var a=$(this),b=null,e=a.data("orientation");a.slider({min:a.data("min")?a.data("min"):0,max:a.data("max")?a.data("max"):100,range:a.data("range")?!0:!1,values:a.data("values")?a.data("values").split(","):null,value:a.data("value")?a.data("value"):0,orientation:e,stop:function(a,c){b.remove();b=null},
slide:function(d,c){b||(b=$("<div>").addClass("slider-helper slider-helper-"+a.data("orientation")).appendTo(a));b.text(c.value);"vertical"===e?b.css("top",c.handle.offsetTop):b.css("left",c.handle.offsetLeft)}})})}};

/**
 * Widget Module
 * @author  Lee Le
 * @website http://www.melonhtml5.com
 * @email   lee@melonhtml5.com
 */
var Widget=function(g){this.init=function(){$(document).on("click","div.dashboard-widget button.setting",c);$(document).on("click","div.dashboard-widget button.refresh",d);$(document).on("click","div.dashboard-widget button.toggle",e)};this.update=function(){f()};var f=function(){var a=$(".dashboard-widget-sortable");a.sortable({items:".dashboard-widget",connectWith:".dashboard-widget-sortable",placeholder:"sortable-placeholder",tolerance:"pointer",handle:".title",dropOnEmpty:!0,start:function(b,
c){a.css("min-height",40)},stop:function(b,c){a.css("min-height","")}})},c=function(a){},d=function(a){var b=$(this).children("i");b.addClass("icon-spin");setTimeout(function(){b.removeClass("icon-spin")},2E3)},e=function(a){a=$(this);var b=a.parents(".dashboard-widget:first");b.hasClass("dashboard-widget-closed")?(a.data("tooltip","Close"),a.children("i").attr("class","icon-chevron-down"),b.removeClass("dashboard-widget-closed")):(a.data("tooltip","Open"),a.children("i").attr("class","icon-chevron-up"),
b.addClass("dashboard-widget-closed"));a.trigger("mouseleave")}};

/**
 * Tab Module
 * @author  Lee Le
 * @website http://www.melonhtml5.com
 * @email   lee@melonhtml5.com
 */
var Tab=function(e){this.init=function(){$(document).on("click","div.tab-menu li",b)};this.update=function(){d()};var d=function(){$(".tab-menu > ul").each(function(){var a=$(this).children(".active:first");a.length||(a=$(this).children().first());a.trigger("click")})},b=function(a){a=$(this);var b=a.index(),c=a.parents(".tab:first");c.find(".tab-menu li.active").removeClass("active");a.addClass("active");c.find(".tab-content > div.active").removeClass("active");c.find(".tab-content > div").eq(b).addClass("active")}};

/**
 * Accordion Module
 * @author  Lee Le
 * @website http://www.melonhtml5.com
 * @email   lee@melonhtml5.com
 */
var Accordion=function(d){this.init=function(){$(document).on("click",".accordion-menu",c)};this.update=function(){$("div.accordion").children("div.open").removeClass("open").children().click()};var c=function(a){a=$(this).parent();var b=a.parent().children("div.active");a.hasClass("active")?(a.removeClass("active"),a.children(".accordion-content").slideUp(200)):(a.addClass("active"),a.children(".accordion-content").slideDown(200),b.removeClass("active"),b.children(".accordion-content").slideUp(200))}};

/**
 * Button Module
 * @author  Lee Le
 * @website http://www.melonhtml5.com
 * @email   lee@melonhtml5.com
 */
var Button=function(e){this.init=function(){$(document).on("click","button.btn-dropdown",b);$(document).on("click","button.btn-split",b);$(document).on("click",d)};var c=function(){var a=$("button.btn-dropdown.active, button.btn-split.active");a.length&&(a.removeClass("active"),a.next("ul").hide())},b=function(a){a.stopPropagation();a=$(this);a.hasClass("active")?(a.removeClass("active"),a.next("ul").hide()):(c(),a.addClass("active"),a.next("ul").show())},d=function(a){c()}};

/**
 * Dialog Module
 * @author  Lee Le
 * @website http://www.melonhtml5.com
 * @email   lee@melonhtml5.com
 */
var Dialog=function(b){var f=this;this.init=function(){$(document).on("click","div.dialog > div.title button",f.close)};var g=function(a){var c=a.data("countdown");1>=c?(a.data("countdown",!1),a.find("span.countdown").remove()):(c--,a.data("countdown",c),a.find("span.countdown").text("("+c+")"),setTimeout(function(){g(a)},1E3))};this.open=function(a){App.showOverlay();var c=a.width===b?400:parseInt(a.width,10),f=a.title===b?"":a.title,k=a.content===b?"":a.content,h=a.theme===b?"normal":a.theme,l=
a.theme===b?!1:a.draggable,d=$("<div>").addClass("dialog dialog-"+h),e='<div class="title text-overflow">'+f+'<button title="Close"><i class="icon-remove"></i></button></div><div class="content"><div>'+k+'</div></div><div class="button">';a.buttons!==b&&$(a.buttons).each(function(){e+='<button class="btn btn-small btn-'+h+'">'+(this.icon?'<i class="'+this.icon+'"></i> ':"")+this.text+(this.countdown?'<span class="countdown">('+this.countdown+")</span>":"")+"</button>"});e+="</div>";d.css({width:c,
"margin-left":-1*(c/2)});d.html(e);a.buttons!==b&&$(a.buttons).each(function(a){var c=this.click,b=d.children("div.button").children("button").eq(a);b.on("click",function(a){b.data("countdown")||c(a,b,d)});this.countdown&&(b.data("countdown",parseInt(this.countdown,10)),setTimeout(function(){g(b)},1E3))});d.appendTo($(document.body));l&&d.addClass("dialog-draggable").draggable({handle:d.children(".title"),containment:$(document.body),start:function(a,b){d.addClass("dialog-dragging")},stop:function(a,
b){d.removeClass("dialog-dragging")}})};this.close=function(){App.transitionEnd($("div.dialog"),function(a,b){App.hideOverlay();$("div.dialog").remove()}).addClass("dialog-closing")}};

/**
 * Form Module
 * @author  Lee Le
 * @website http://www.melonhtml5.com
 * @email   lee@melonhtml5.com
 */
var Form=function(f){this.init=function(){$(document).on("click",".form-wizard-previous",d);$(document).on("click",".form-wizard-next",d);$(document).on("keyup",".form-row input.creditcard",e)};var e=function(b){b=$(this);var a=parseInt(b.attr("maxlength"),10);a&&b.val().length>=a&&b.next("input.creditcard").focus()},d=function(b){b.preventDefault();b=$(this).hasClass("form-wizard-next")?"next":"back";var a=$(this).parents("form:first"),c=a.data("step"),d=a.data("total_steps");"back"===b?c--:c++;
c=Math.min(c,d);c=Math.max(c,1);1===c?a.find(".form-wizard-previous").prop("disabled",!0):a.find(".form-wizard-previous").prop("disabled",!1);c<d?(a.find(".form-wizard-submit").hide(),a.find(".form-wizard-next").show()):(a.find(".form-wizard-submit").show(),a.find(".form-wizard-next").hide());a.find(".form-wizard").removeClass("active");a.find(".form-wizard").eq(c-1).addClass("active");a.find(".form-wizard-indicator").removeClass("completed current");a.find(".form-wizard-indicator").eq(c-1).addClass("current");
a.find(".form-wizard-indicator:lt("+(c-1)+")").addClass("completed");a.data("step",c)};this.update=function(){Modernizr.inputtypes.date||$('.form-row input[type="date"]').datepicker({dateFormat:"dd/mm/yy"});$("form.wizard").each(function(){var b=$(this);b.data("step",1);b.data("total_steps",b.find(".form-wizard").length);b.find(".form-wizard:first").addClass("active");b.find(".form-wizard-indicator:first").addClass("current");b.find(".form-wizard-previous").prop("disabled",!0)})}};

/**
 * Notification Module
 * @author  Lee Le
 * @website http://www.melonhtml5.com
 * @email   lee@melonhtml5.com
 */
var Notification=function(f){var b=null,e=0,g=function(a){b||(b=$("<div>").addClass("notification-container").appendTo($(document.body)));var d='<div class="close"><i class="icon-remove"></i></div>';a.title&&(d+='<div class="title">'+a.title+"</div>");var d=d+('<div class="content">'+a.content+"</div>"),c=$("<div>").html(d).addClass("notification").prependTo(b);0<a.countdown&&(a=setTimeout(function(){c.children("div.close").trigger("click")},a.countdown),c.data("timeout_id",a));e++},h=function(a){e--;
a=$(this).parent();App.transitionEnd(a,function(a,c){c.remove();0>=e&&(b.remove(),b=null)}).addClass("closing");a.data("timeout_id")&&clearTimeout(a.data("timeout_id"))};this.init=function(){$(document).on("click","div.notification div.close",h)};this.add=function(a,b,c){c===f&&(c=-1);g({title:a,content:b,countdown:parseInt(c,10)})};this.removeAll=function(){b&&b.find("div.notification > div.close").trigger("click")};this.removeLast=function(){b&&b.find("div.notification:first > div.close").trigger("click")};
this.removeFirst=function(){b&&b.find("div.notification:last > div.close").trigger("click")};this.removeAt=function(a){if(b){var d=b.children("div.notification").length;b.find("div.notification:nth-child("+(d-a)+") > div.close").trigger("click")}}};

/**
 * Table Module
 * @author  Lee Le
 * @website http://www.melonhtml5.com
 * @email   lee@melonhtml5.com
 */
var Table=function(f){this.init=function(){$(document).on("mouseenter","div.data-table > table tbody th",c);$(document).on("mouseleave","div.data-table > table tbody th",d);$(document).on("click","div.data-table > table tbody th input:checkbox",e)};var c=function(a){a=$(this);if(a.children(".icon-sort").length){if(!a.data("columns")){var b=a.index();a.data("columns",a.parents("table:first").find("tbody td:nth-child("+(b+1)+")"))}a.addClass("hover");a.data("columns").addClass("hover")}},d=function(a){a=
$(this);if(a.children(".icon-sort").length){if(!a.data("columns")){var b=a.index();a.data("columns",a.parents("table:first").find("tbody td:nth-child("+(b+1)+")"))}a.removeClass("hover");a.data("columns").removeClass("hover")}},e=function(a){a=$(this);if(!a.data("checkboxes")){var b=a.index();a.data("checkboxes",a.parents("table:first").find("tbody td:nth-child("+(b+1)+")").children("input:checkbox"))}a.data("checkboxes").prop("checked",a.prop("checked"))}};

/**
 * Tooltip Module
 * @author  Lee Le
 * @website http://www.melonhtml5.com
 * @email   lee@melonhtml5.com
 */
var Tooltip=function(h){var b=null;this.init=function(){};this.update=function(){b=$("[title]");b.on("mouseenter",e);b.on("mouseleave",f);g()};var g=function(){b.each(function(){var a=$(this).attr("title").split("||"),c="top";2===a.length&&(c=a[1],a=a[0]);$(this).data("tooltip",a).data("tooltipPosition",c).removeAttr("title")})},e=function(a){a=$(this);var c=$("<div>").addClass("tooltip tooltip-"+a.data("tooltipPosition")).text(a.data("tooltip")).appendTo($(document.body));$("<div>").addClass("tooltip-arrow").appendTo(c);
a.data("tooltip_element",c);var b="center bottom-12",d="center top";switch(a.data("tooltipPosition")){case "bottom":b="center top+12";d="center bottom";break;case "left":b="right-12 center";d="left  center";break;case "right":b="left+12 center",d="right  center"}c.position({of:a,my:b,at:d,collision:"none"})},f=function(a){if(a=$(this).data("tooltip_element"))a.remove(),$(this).data("tooltip_element",!1)}};