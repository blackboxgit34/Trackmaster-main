function format(n){return'<table cellpadding="5" cellspacing="0" border="0"><tr><td  style="color: black;">Latitude:<\/td><td>'+n.Latitude+'<\/td><td  style="color: black;">Longitude:<\/td><td>'+n.Longitude+'<\/td><td  style="color: black;">Driver Name:<\/td><td>'+n.DriverName+'<\/td><td  style="color: black;">Driver Mobile number:<\/td><td>'+n.DriverMobileNumber+"<\/td>"}var param1;$(document).ready(function(){var n=apiBase.apiurl+"LiveStatus/LiveStatus",t=$("#dt_basic_Master").DataTable({processing:!0,serverSide:!0,iDisplayLength:20,aLengthMenu:[[5,10,20,25,50],[5,10,20,25,50]],sAjaxSource:n,aaSorting:[],columns:[{"class":"hidden",render:function(n,t,i){return'<span class="hidden">'+i.BBID+"<\/span>"}},{orderable:!1,targets:0,data:"Sno",width:"2%"},{orderable:!1,targets:0,render:function(n,t,i){return Vicon=i.VIcon.replace("~/","/"),'<img src="'+Vicon+'">'}},{render:function(n,t,i){return'<a href="/Report/Details?bbid='+i.BBID+'">'+i.VehicleName+"<\/a>"}},{orderable:!1,targets:0,render:function(n,t,i){return VehStatus=i.Status.replace("~/","../../"),'<span data-toggle="tooltip" title="this is test"><img src="'+VehStatus+'"><\/span>'}},{orderable:!1,targets:0,data:"DateTime"},{orderable:!1,targets:0,data:"Location"},{orderable:!1,targets:0,data:"Speed"},{orderable:!1,targets:0,data:"Distance"},{orderable:!1,targets:0,render:function(n,t,i){return GSMSignal=i.antenaText.replace("~/","../../"),'<img src="'+GSMSignal+'">'}},{orderable:!1,targets:0,render:function(n,t,i){return GPSText=i.gpsText.replace("~/","../../"),'<img src="'+GPSText+'">'}},{orderable:!1,targets:0,render:function(n,t,i){return BatteryText=i.batteryText.replace("~/","../../"),'<img src="'+BatteryText+'">'}},{orderable:!1,targets:0,render:function(){return'<div class="mouseon-examples"><a href="#">Reports<\/a><\/div>'}},{orderable:!1,targets:0,className:"details-control",orderable:!1,data:null,defaultContent:""},{orderable:!1,targets:0,render:function(n,t,i){return'<a href="/Report/Details?bbid='+i.BBID+'">Details<\/a>'}}],order:[[3,"desc"]]});$("#dt_basic_Master").on("draw.dt",function(){$('[data-toggle="tooltip"]').tooltip();var n=$(".mouseon-examples"),t=$('<p><a href="#" onClick="myClick()"; class="reportToolTip">Report1sfdfsdfdfsdfd<\/a><\/p><p><a href="#" class="reportToolTip">Report1<\/a><\/p><p><a href="#" class="reportToolTip">Report1<\/a><\/p><p><a href="#" class="reportToolTip">Report1<\/a><\/p>');n.data("powertipjq",t);n.powerTip({placement:"s",mouseOnToPopup:!0,smartPlacement:!0});$(".mouseon-examples").on("click",function(){alert("Tolltip");$.powerTip.hide();$.powerTip.show(this)});$(".mouseon-examples").on({mouseenter:function(n){param1=$(this).parents("tr:first").find("td:eq(0)").text();$.powerTip.show(this,n)},mouseleave:function(){$.powerTip.hide(this)}})});$("#dt_basic_Master tbody").on("click","td.details-control",function(){var i=$(this).closest("tr"),n=t.row(i);n.child.isShown()?(n.child.hide(),i.removeClass("shown")):(n.child(format(n.data())).show(),i.addClass("shown"))})});
/*
//# sourceMappingURL=LiveStatus.min.js.map
*/