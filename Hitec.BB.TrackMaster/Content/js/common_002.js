function deleteTable(){$("#dt_basic_Master").dataTable({bDestroy:!0}).fnDestroy()}function showMapWindow(n,t,i,r,u){return $("#ShowLocationOnMap").dialog({autoOpen:!0,position:{my:"center",at:"200",of:window},width:750,height:500,resizable:!0,title:"Location On Map",modal:!0,open:function(){var n="../report/GetLocationPartialView?vehname="+t+"&lat="+i+"&longi="+r+"&location="+u;$(this).load(n);$(".ui-dialog-titlebar-close").hide()},buttons:{Close:function(){$(this).dialog("close")}}}),!1}function showMapWindowWithData(n,t,i,r,u,f,e,o,s){return $("#ShowLocationOnMap").dialog({autoOpen:!0,position:{my:"center",at:"200",of:window},width:750,height:500,resizable:!0,title:"Location On Map",modal:!0,open:function(){var n="../report/GetLocationPartialViewWithData?vehname="+t+"&lat="+i+"&longi="+r+"&location="+u+"&driverName="+f+"&driverNumber="+e+"&speed="+o+"&dateTime="+s;$(this).load(n);$(".ui-dialog-titlebar-close").hide()},buttons:{Close:function(){$(this).dialog("close")}}}),!1}function exportExcel(n){alert(n)}function sendEmail(n){alert(n)}function exportPDF(n){alert(n)}var table,baseUrl,$beginDate,$endDate,$custid,beginDateString,endDateString;$custid="1619";baseUrl=apiBase.apiurl;$(function(){function i(n,t){$("#reportrange span").html(n.format("MMM D YYYY, h:mm:ss a")+" - "+t.format("MMM D YYYY, h:mm:ss a"));$beginDate=n.format("MMM D YYYY h:mm:ss a");$endDate=t.format("MMM D YYYY h:mm:ss a")}var n=moment().subtract(0,"days").startOf("day"),t=moment();$("#reportrange").daterangepicker({startDate:n,endDate:t,opens:"right",timePicker:!0,ranges:{Today:[moment().subtract(0,"days").startOf("day"),moment()],Yesterday:[moment().subtract(1,"days").startOf("day"),moment().subtract(1,"days").endOf("day")],"Last 7 Days":[moment().subtract(6,"days").startOf("day"),moment()],"Last 30 Days":[moment().subtract(29,"days").startOf("day"),moment()],"This Month":[moment().startOf("month").startOf("day"),moment()],"Last Month":[moment().subtract(1,"month").startOf("month").startOf("day"),moment().subtract(1,"month").endOf("month")]}},i);i(n,t)});
/*
//# sourceMappingURL=common.min.js.map
*/