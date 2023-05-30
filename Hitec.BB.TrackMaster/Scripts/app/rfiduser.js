$(document).ready(function () {
    GetEmployeeRfidReport(null);
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {

            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
    })
});

$("#BtnSearch").click(function () {
    GetEmployeeRfidReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "AddOnAPI/rfiduserReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "AddOnAPI/rfiduserReport";
    DownloadData(url, downloadType);
});

function GetEmployeeRfidReport(downloadType) {

    var i = 0;
    deleteTable();


    var url = baseUrl + "AddOnAPI/rfiduserReport";

    table = $('#dt_basic_Master').DataTable({

        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Employee Rfid Report' });
        },

        "columns": [

            {
                "data": null,
                "bSortable": false,
                "render": function (data, type, full) {
                    i++;
                    return i;
                }
            },
               
                  {
                      "data": "FirstName",
                       
                       
                  },
                { "data": "employeeid" },
                { "data": "RfTagId" },
                
             { "data": "Gender" },
              { "data": "ContactNo" },
              { "data": "DataDate" },

              

               

              

                {
                    
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                       
                        if (full.IsActive == 1) {
                            return "<button class='btn btn-green' style='width:150px!important; cursor: pointer !important'  onclick='deleterecords(" + full['Userid'] + ")' >Active</button>";
                          
                        }
                        else {
                            return "<button class='btn btn-red' style='width:150px!important; cursor: pointer !important;  color:white'  onclick='deleterecords(" + full['Userid'] + ")' >Inactive</button>";
                           
                        }
                            
                       
                       // return "<button class='btn btn-green' style='width:150px!important; cursor: pointer !important'  onclick='deleterecords(" + full['Userid'] + ")' >Delete</button>";
                    }
                },


        ]
    });
}








function DownloadData(url, downloadType) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var reportName = 'Employee RFID Report';

    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
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




function deleterecords(userid) {

    debugger;
    $.ajax({
        type: "GET",
        data: { id: userid },
        url: baseUrl + "AddOnAPI/updaterfidcard",
        success: function (data) {
          
           
            if (data) {
                toastr.success("Rfid Card Active successfully.");
                window.location.reload();
            }
            else {
                toastr.warning("Rfid Card Inactive successfully.");
                window.location.reload();
            }
           
        }
        
       
    });
}