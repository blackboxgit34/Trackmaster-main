$(document).ready(function () {
    debugger;
    GetVehListReport(null);
  
    BindCompany();
    BindTimeInterval();
    BindCounter();
    debugger;
    // Add event listener for opening and closing details
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {

            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
    })

});

$("#BtnSearch").click(function () {
    BindCounter();
    GetVehListReportTime(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AddOnAPI/InVehicleLog";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AddOnAPI/InVehicleLog";
    DownloadData(url, downloadType);
});

function GetVehListReport(downloadType) {
    debugger;
    BindCounter();
    // clear tables contents
    deleteTable();
    var TimeInterval = $('#ddlTimeInterval option:selected').val();
    
        TimeInterval = null;
    
    var search = null;
    var url = baseUrl + "AddOnAPI/InVehicleLog";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 100,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[100, 250, 500, 750, 1000], [100, 250, 500, 750, 1000]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "search", "value": search }, { "name": "custid", "value": $custid }, { "name": "TimeInterval", "value": TimeInterval }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Godrej Vehicle Report' });
        },

        "columns": [
              { "data": "CompanyName" },
              { "data": "vehname" },
                { "data": "ReaderName" },
                  { "data": "InDate" },
                    
                                       
                        { "data": "duration" }
        ],

    });


    var vehicleName = getUrlParameter('vehName');
    if (vehicleName)
        table.search(vehicleName).draw();
}

function GetVehListReportTime(downloadType) {
    debugger;
    BindCounter();
    // clear tables contents
    deleteTable();
    var TimeInterval = $('#ddlTimeInterval option:selected').val();
    if (TimeInterval == "Vehicle Parked Since ") {
        TimeInterval = null;
    }
    var search = $("#ddlCompanyName  option:selected").text();
    if (search == "Select Company Name ")
    {
        search = null;
    }
   
    
    var url = baseUrl + "AddOnAPI/InVehicleLogTime";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 100,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[100, 250, 500, 750, 1000], [100, 250, 500, 750, 1000]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "TimeInterval", "value": TimeInterval }, { "name": "search", "value": search }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Godrej Vehicle Report' });
        },

        "columns": [

               { "data": "CompanyName" },
              { "data": "vehname" },
                { "data": "ReaderName" },
                  { "data": "InDate" },


                        { "data": "duration" }
        ],

    });


    var vehicleName = getUrlParameter('vehName');
    if (vehicleName)
        table.search(vehicleName).draw();
}

function DownloadData(url, downloadType) {
    debugger;
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");

    var reportName = 'RegisterdVehicles' + sdt + '_TO_' + edt;

    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid= &downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;


    window.onbeforeunload = function () {
        $('.body').block({
            message: '<h1><img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3>',
            centerX: true,
            centerY: true,
            css: {
                width: '300px',
                height: '300px',

                color: 'black',
                padding: '25px'
            }
        });
        return null;
    }
}

function BindCompany() {
    var Url = apiBase.apiurl + 'AddOnAPI/GetGodrejCompanyList';

    $.get(Url, function (data) {
        $("#ddlCompanyName").append($("<option>Select Company Name </option>"));
        $.each(data, function (key, value) {

            $("#ddlCompanyName").append($("<option> </option>").val(value.Value).html(value.Name));
        });
    });
}

function BindTimeInterval() {      
    $("#ddlTimeInterval").append($("<option value='0,0'>Vehicle Parked Since </option>"));
    $("#ddlTimeInterval").append($("<option value='0,1'>0 - 1 hour </option>"));
    $("#ddlTimeInterval").append($("<option value='1,5'>1 - 5 hours</option>"));
    $("#ddlTimeInterval").append($("<option value='5,10'>5 - 10 hours </option>"));
    $("#ddlTimeInterval").append($("<option value='10,24'>10 - 24 hours</option>"));
    $("#ddlTimeInterval").append($("<option value='24,48'>24 hours - 2 days</option>"));
       $("#ddlTimeInterval").append($("<option value='48,120'>2 days - 5 days</option>"));
    $("#ddlTimeInterval").append($("<option value='120,720'>5 days - 1 month</option>"));
    $("#ddlTimeInterval").append($("<option value='720,10000'> 1+ month</option>"));
}

$("#ddlCompanyName").change(function () {
    deleteTable();
    var downloadType = null;
    var TimeInterval = $('#ddlTimeInterval option:selected').val();
    
    var search = $("#ddlCompanyName  option:selected").text();
    if (search == "Select Company Name ") {
        search = null;
    }
    var begindaye = $beginDate;
    var oldDate = new Date($beginDate);
    var newDate = new Date();
    newDate.setDate(oldDate.getDate() - 31);

    var sdt = moment(newDate).format("D-MMM-YYYY");
    
    var url = baseUrl + "AddOnAPI/InVehicleLogTime";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 100,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[100, 250, 500, 750, 1000], [100, 250, 500, 750, 1000]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": sdt }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "TimeInterval", "value": TimeInterval }, { "name": "search", "value": search }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Godrej Vehicle Report' });
        },

        "columns": [

               { "data": "CompanyName" },
              { "data": "vehname" },
                { "data": "ReaderName" },
                  { "data": "InDate" },
                        { "data": "duration" }
        ],

    });


    var vehicleName = getUrlParameter('vehName');
    if (vehicleName)
        table.search(vehicleName).draw();


});

$("#ddlTimeInterval").change(function () {
    deleteTable();
    var downloadType = null;
    var TimeInterval = $('#ddlTimeInterval option:selected').val();
   
    var search = $("#ddlCompanyName  option:selected").text();
    if (search == "Select Company Name ") {
        search = null;
    }
    var begindaye = $beginDate;
    var oldDate = new Date($beginDate);
    var newDate = new Date();
    newDate.setDate(oldDate.getDate() - 31);

    var sdt = moment(newDate).format("D-MMM-YYYY");
    var url = baseUrl + "AddOnAPI/InVehicleLogTime";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 100,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[100, 250, 500, 750, 1000], [100, 250, 500, 750, 1000]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": sdt }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "TimeInterval", "value": TimeInterval }, { "name": "search", "value": search }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Godrej Vehicle Report' });
        },

        "columns": [

              { "data": "CompanyName" },
              { "data": "vehname" },
                { "data": "ReaderName" },
                  { "data": "InDate" },


                        { "data": "duration" }
        ],

    });


    var vehicleName = getUrlParameter('vehName');
    if (vehicleName)
        table.search(vehicleName).draw();
});

function BindCounter()
{
    debugger;
   
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: baseUrl + 'AddOnAPI/InVehicleLogTimeCounter',
        data: { beginDate: $beginDate, endDate: $endDate, custid: $custid },
        success: function (data) {
            $("#av").text(data.Hour1);
            $("#hs").text(data.Hours5);
            $("#is").text(data.Hours10);
            $("#ms").text(data.Hours24);
            $("#ps").text(data.Days2);
            $("#ts").text(data.Days5);
            $("#us").text(data.Month1);
            $("#vbd").text(data.Months1);
            //$("#vbd").text(data.);
            
        

        },
        error: function (error) {
            toastr.error("something went wrong!");
            $.unblockUI();
        }
    });


}

window.LegendClick = function (id) {
    deleteTable();
    var TimeInterval;
   
    if (id == "O")
    {
        TimeInterval='0,1';
    } 
     if (id == "H")
    {
        TimeInterval='1,5';
        }
     if (id == "I")
    {
        TimeInterval='5,10';
        }
     if (id == "M")
    {
        TimeInterval='10,24';
        }
     if (id == "P")
    {
       TimeInterval='24,48';
        }
    if (id == "T")
    {
       TimeInterval='48,120';
        }
     if (id == "U")
    {
        TimeInterval = '120,720';
    }
  if (id == "BD")
    {
        TimeInterval = '720,1000';
    }
    var search = null;
    
    var downloadType = null;
   
    var begindaye= $beginDate;
    var oldDate = new Date($beginDate);
    var newDate = new Date();
    newDate.setDate(oldDate.getDate() - 31);
   
    var sdt = moment(newDate).format("D-MMM-YYYY");
   
    var url = baseUrl + "AddOnAPI/InVehicleLogTime";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 100,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[100, 250, 500, 750, 1000], [100, 250, 500, 750, 1000]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": sdt }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "TimeInterval", "value": TimeInterval }, { "name": "search", "value": search }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Godrej Vehicle Report' });
        },

        "columns": [

                { "data": "ReaderName" },
                  { "data": "InDate" },
                    { "data": "vehname" },
                    { "data": "CompanyName" },
                        { "data": "duration" }
        ],

    });


    var vehicleName = getUrlParameter('vehName');
    if (vehicleName)
        table.search(vehicleName).draw();
}