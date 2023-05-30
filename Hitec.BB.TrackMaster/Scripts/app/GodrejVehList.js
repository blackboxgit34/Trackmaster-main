
function format(d) {

    var data = d;

    if (data.dataCount > 0) {
        var a = data.objTravelReport;

        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Last Punch Date</th><th>InTime</th><th>Out Time</th></tr></thead>';

        a.forEach(function (element) {
            //console.log(element.Location);
            debugger
            tableString = tableString +
              '<tr>' +
              //'<td>' + element.Startdate + '</td>' +
              //'<td>' + element.Enddate + '</td>' +
              //'<td>' + element.Distance + '</td>' +
              //'<td>' + element.MaxSpeed + '</td>' +
              //'<td>' + element.SpeedLimit + '</td>' +
              //'<td>' + element.OverStoppages + '</td>' +
              //'<td>' + element.StoppageTime + '</td>' +
              //'<td>' + element.Drivingduration + '</td>' +
              // '<td>' + element.IdlingTime + '</td>' +
              //'<td>' + element.OverSpeedings + '</td>' +
              //'<td>' + element.StartLocation + '</td>' +
              //'<td>' + element.StopLocation + '</td>' +
              '</tr>'
        });

        tableString = tableString + '</table>';
    }
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    debugger;
    GetVehListReport(null);
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
    GetVehListReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AddOnAPI/GodrejVehlist";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AddOnAPI/GodrejVehlist";
    DownloadData(url, downloadType);
});

function GetVehListReport(downloadType) {
    debugger;
    // clear tables contents
    deleteTable();


    var url = baseUrl + "AddOnAPI/GodrejVehlist";
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
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Godrej Vehicle Report' });
        },

        "columns": [
           
                { "data": "TagID" },
                  { "data": "VehName" },
                    { "data": "CompanyName" },
                      { "data": "OwnerName" },
                        { "data": "OwnerNo" },
                        {"data":"InTime"},
                        { "data": "OutTime" },
                        {
                            
                            "data": null,
                            "bSortable": false,
                            "render": function (data, type, full) {
                                debugger;
                                if (full.IsActive == 'False') {
                                    return "<button class='btn btn-red' style='width:150px!important; cursor: pointer !important'  onclick='activaterecords(" + full.ID + ")' >InActive</button>";
                                   
                                }
                                else {
                                    //return '<button class="btn btn-green" style="width:150px!important; cursor: pointer !important;  color:white"  onclick="deleterecords("'+ full.ID+'")" >Active</button>';
                                    return "<button class='btn btn-green' style='width:150px!important; cursor: pointer !important'  onclick='deleterecords(" + full.ID + ")' >Active</button>";
                                }


                                
                            }
                        },

                        { "data": null,
                            "bSortable": false,
                            "render": function (data, type, full) {
                              return  "<a href='/addOn/Godrejvehregistration?TagId=" + full.TagID + "'  target = '_blank' class='editor_edit'>Edit</a>"
                                }
                        }

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


function deleterecords( id) {
   
    debugger;
    $.ajax({
        type: "GET",
        data: { ID: id, status: 0 },
        url: baseUrl + "AddOnAPI/UpdateVehicleRegistration",
        success: function (data) {


            if (data) {
                toastr.success("Active successfully.");
                window.location.reload();
            }
            else {
                toastr.warning("Inactive successfully.");
                window.location.reload();
            }

        }


    });
}

function activaterecords(id) {

    debugger;
    $.ajax({
        type: "GET",
        data: { ID: id, status: 1 },
        url: baseUrl + "AddOnAPI/UpdateVehicleRegistration",
        success: function (data) {
           

            if (data) {
                toastr.success("Active successfully.");
                window.location.reload();
            }
            else {
                toastr.warning("Inactive successfully.");
                window.location.reload();
            }

        }


    });
}



