﻿var table;
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};
$(document).ready(function () {
    GetRefTempReport(null);
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
    })
});
$("#BtnSearch").click(function () {
    GetRefTempReport(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "Reportsapi/GetRefTempAlertReport";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "Reportsapi/GetRefTempAlertReport";
    DownloadData(url, downloadType);
});

function GetRefTempReport(downloadType) {
    deleteTable();
    var url = apiBase.apiurl + "ReportsApi/GetRefTempAlertReport";

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
        //"aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "bbid", "value": "" }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "CustId", "value": $custid }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                {
                    "data": "bbid",
                    "class": "hidden"
                },
                {
                    "data": "VehicleName",
                    "bSortable": false
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        return data.ZeroHour;
                    }
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        return data.OneHundredHour;
                    }
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        return data.TwoHundredHour;
                    }
                },
                {
                    "data": null,
                    "bSortable": false,
                    "render": function (data, type, full) {
                        return data.ThreeHundredHour;
                    }
                },
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FourHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FiveHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.SixHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.SevenHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.EightHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.NineHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TenHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ElevenHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwelveHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ThirteenHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FourteenHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FifteenHundredHour;
    }
},

{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.SixteenHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.SeventeenHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.EighteenHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.NinteenHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwentyHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwentyOneHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwentyTwoHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwentyThreeHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwentyFourHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwentyFiveHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwentySixHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwentySevenHundredHour;
    }
},

{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwentyEightHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.TwentyNineHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ThirtyHundredHour;
    }
},

{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ThirtyOneHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ThirtyOneHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {

        return data.ThirtyThreeHundredHour;
    }
},
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ThirtyFourHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ThirtyFiveHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ThirtySixHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ThirtySevenHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ThirtyEightHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.ThirtyNinehundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FourtyHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FourtyOneHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FourtyTwoHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FourtyThreeHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FourtyFourHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FourtyFiveHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FourtySixHundredHour;
    }
}
        ,
{
    "data": null,
    "bSortable": false,
    "render": function (data, type, full) {
        return data.FourtySevenHundredHour;
    }
},


        ],
        "rowCallback": function (row, data, index) {
            if (data.objRefTemperature == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
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
    var sdt = moment($beginDate).format("D_MMM_YYYY");
    var edt = moment($endDate).format("D_MMM_YYYY");
    var reportName = 'Refrigerator_Temperature_Report_' + sdt + '_TO_' + edt;
    var $bbid = '';
    var url1 = url + "?beginDate=" + $beginDate + "&endDate=" + $endDate + "&bbid=" + $bbid + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}
l