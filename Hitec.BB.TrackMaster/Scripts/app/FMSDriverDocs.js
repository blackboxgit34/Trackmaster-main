var table;

$(document).ready(function () {
    console.log($custid);
    console.log(apiBase.apiurl);
    GetDriverDocsList(null);
});

$("#BtnSearch").click(function () {
    GetDriverDocsList(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "FmsAPI/GetDriverDocsList";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "FmsAPI/GetDriverDocsList";
    DownloadData(url, downloadType);
});


function GetDriverDocsList(downloadType) {

    // clear tables contents
    deleteTable();

    var url = baseUrl + "FmsAPI/GetDriverDocsList";

    table = $('#dt_basic_Master').DataTable({
        "scrollX": true,
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 10,
        language: {
            searchPlaceholder: "Search Driver Name",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "custid", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "DriverName",
                    "bSortable": false
                },
                //{
                //    "data": "VehicleRegNo",
                //    "bSortable": false
                //},
                {
                    "data": "DriverMobNo",
                    "bSortable": false
                },
                {
                    "data": "DriverLicenseNo",
                    "bSortable": false
                },
                {
                    "data": "DLExpiry",
                    "bSortable": false,
                    "render": function (data) {
                        if (data != null && data != "") {
                            return moment(data).format("MMM D YYYY");
                        }
                        else
                            return data;
                    }
                },
                {
                    "data": "DLRemDays",
                    "bSortable": false
                },
                {
                    "data": "BadgeNo",
                    "bSortable": false
                },
                {
                    "data": "BadgeExpiry",
                    "bSortable": false,
                    "render": function (data) {
                        if (data != null && data != "") {
                            return moment(data).format("MMM D YYYY");
                        }
                        else
                            return data;
                    }
                },
                {
                    "data": "BdgRemDays",
                    "bSortable": false
                },
                {
                    "data": "PoliceVerificationNo",
                    "bSortable": false
                },
                {
                    "data": "PoliceVerificationExpiry",
                    "bSortable": false,
                    "render": function (data) {
                        if (data != null && data != "") {
                            return moment(data).format("MMM D YYYY");
                        }
                        else
                            return data;
                    }
                },
                {
                    "data": "PolRemDays",
                    "bSortable": false
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full, meta) {
                        //return '<a href=/fms/AddEditDriverDocs?driverId=' + full.DriverID + '>Edit</a>/ <a href="#" onclick="RemoveDriverDocs(this)" class="editor_remove">Delete</a>';
                        var selectTag =
                                   '<div class="dropdown">' +
                                     '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                                     '<span class="caret"></span></button>' +
                                     '<ul class="dropdown-menu">' +
                                       '<li><a target = "_blank" href=/fms/AddEditDriverDocs?driverId=' + full.DriverID + '>Edit</a></li>' +
                                       '<li><a href="#" onclick="RemoveDriverDocs(this)" class="editor_remove">Delete</a></li>' +
                                     '</ul>' +
                                   '</div>';
                        return selectTag;
                    }
                }
        ],
        "initComplete": function (settings, json) {
            var url = apiBase.apiurl + "fmsapi/GetTotalDriverDocsData";
            $.ajax({
                url: url,
                data: {
                    "CustID": $custid
                },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('#totalDrivers').text(data.totalDrivers);
                    $('#driverDocsComplete').text(data.driverDocsComplete);
                    $('#driverDocsIncomplete').text(data.driverDocsIncomplete);
                }
            });
            $('th').removeClass('sorting_asc');
        }
    });
}


function DownloadData(url, downloadType) {
    var sEcho = 1;
    var iDisplayStart = 0;
    var iDisplayLength = 100000;
    var sSearch = $('input[type=search]').val();
    var iSortCol_0 = 0;
    var sSortDir_0 = 'asc';
    var reportName = 'Driver_Documents_' + $beginDate + '_TO_' + $endDate;
    var $bbid = '';
    var renewalId = 0;
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&renewalId=" + renewalId + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custid=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}

function RemoveDriverDocs(e) {
    
    var res = confirm("Do you want to delete this record?");
    if (res) {
        var DriverID = table.row($(e).parents('tr')).data().DriverID;
        console.log(DriverID);
        var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveDriverDocs?DriverId=" + DriverID;
        $.post(ApiUrl, function (result) {
            
            if (result > 0) {
                toastr.success("Record Deleted successfully!");
                window.setTimeout(function () {
                    window.location.href = '/Fms/ManageDriverDocs';
                }, 1000);
            }
            else {
                toastr.error("Record Failed to Delete!");
            }

        }).done(function (data) {
            GetDriverDocsList(null);
        });
    }
    else {
        return false;
    }
}