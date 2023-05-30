var pageload;
function format(d) {
    
    var data = d;

    if (data.dataCount > 0) {
        var a = data.objTravelReport;

        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>StartDate</th><th>EndDate</th><th>Distance</th><th>Driving Time</th><th>StoppageTime</th><th>Start Location</th><th>Stop Location</th></tr></thead>';

        a.forEach(function (element) {
            //console.log(element.Location);
            debugger
            tableString = tableString +
             '<tr>' +
              '<td>' + element.Startdate + '</td>' +
               '<td>' + element.Enddate + '</td>' +
              '<td>' + element.Distance + '</td>' +
                //'<td>' + element.MaxSpeed + '</td>' +
                  '<td>' + element.DriverName + '</td>' +
                 //'<td>' + element.SpeedLimit + '</td>' +
                 //'<td>' + element.OverStoppages + '</td>' +
                 '<td>' + element.StoppageTime + '</td>' +
                       //'<td>' + element.OverSpeedings + '</td>' +
                       '<td>' + element.StartLocation + '</td>' +
                       '<td>' + element.StopLocation + '</td>' +




               '</tr>'
        });

        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {


    
    $("#InvoiceDate").datepicker();
    $("#OtherInvoiceDate").datepicker();

    pageload = 1;



    GetDistanceTravelReport(null, pageload);
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
    pageload = 0;
    GetDistanceTravelReport(null, pageload);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AddOnAPI/CustomizeTripReport";
    DownloadData(url, downloadType, null);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AddOnAPI/CustomizeTripReport";
    DownloadData(url, downloadType);
});

function GetDistanceTravelReport(downloadType, pageload) {
    



    // clear tables contents
    deleteTable();


    var url = baseUrl + "AddOnAPI/CustomizeTripReportForNFL";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        language: {
            searchPlaceholder: "Search Vehicle Name",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Distance Report' }, { "name": "Pageload", "value": pageload });
        },

        "columns": [
                { "data": "VehicleName" },

                { "data": "TotalDistance" },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        
                        var aTag = '<button class="btn btn-primary btn-mini" onclick="AddOrderPopup(' + $custid + ',\'' + data.VehicleName + '\',\'' + data.bbid + '\')">Add Order</button>';
                        return aTag;
                    }
                },
                {
                    "orderable": false,
                    "targets": 0,
                    "className": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": ''
                }
        ],
        "rowCallback": function (row, data, index) {
            
            if (data.dataCount == 0) {


                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });

    //for filter from live status
    var vehicleName = getUrlParameter('vehName');
    if (vehicleName)
        table.search(vehicleName).draw();
}




function DownloadData(url, downloadType) {
    
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");

    var reportName = 'Daily Report';

    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid= &downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&Pageload=" + pageload + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;


    window.onbeforeunload = function () {
        $('.body').block({
            message: '<h1><img src="../../Content/Trackmaster_files/loader.gif" /> </h1><br><h3>Just a moment...</h3>',
            centerX: true,
            centerY: true,
            css: {
                width: '300px',
                height: '300px',
                // border: '3px solid #FF9900',
                //  backgroundColor: '#000',
                color: 'black',
                padding: '25px'
            }
        });
        return null;
    }
}

var pass = false;

function AddOrderPopup(custid, vehname, bbid) {
    
    
    $('#bbid').val(bbid);
    $('#vehname').val(vehname);
    $('#AddOrder').dialog({
        autoOpen: true,
        position: { my: "center", at: "200", of: window },
        width: 700,
        height: 570,
        resizable: true,
        title: 'Add Order',
        modal: true,
        open: function () {
            $(".ui-dialog-titlebar-close").hide();
        },
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    }).css("display", "block");
}

$('#AddNewOrder').submit(function () {
    
    var data = $('#AddNewOrder').serializeArray();
    var StartPoint = $('#SPoint').val() +' at '+ $('#STime').val();
    data.push(
        { name: "BeginDate", value: $('#InvoiceDate').val() },
        { name: "EndDate", value: $('#InvoiceDate').val() },
        { name: "custid", value: $custid },
        { name: "StartPointAndTime", value: StartPoint }
    );
    console.log(data);
    //if (pass == true) {
        
        var EmpUrl = apiBase.apiurl + 'AddonAPI/AddOrdersNFL';
        $.post(EmpUrl, $.param(data), function (result) {
            toastr.success("Record Entered Successfuly.");
            window.setTimeout(function () {
                $('#AddNewOrder').closest('form').find("input[type=text], textarea").val("");
                $('.ui-button-text').trigger('click');
            }, 100);
        });
    //}
    //else {
    //    fg();
    //}
});