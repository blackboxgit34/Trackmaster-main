var table;

function format(d) {
}
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
$(document).ready(function () {
    GetTripInfo();
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
    GetTripInfo();
});

function GetTripInfo() {
    var $mastertripid = 0;
    
    deleteTable();
    console.log($beginDate);
    console.log($endDate);
    console.log($custid);
    var url = apiBase.apiurl + "FmsApi/GetFMSMasterTripList";
    
    console.log('Calling URL: ' + url + ' to get Report data.');
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "custId", "value": $custid }, { "name": "MasterTripId", "value": $mastertripid });
        },
        "columns": [
                { "data": "TripName" },
                { "data": "StartLoc" },
                { "data": "StartLoc" },
                { "data": "StartLatLong" },
                { "data": "EndLatLong" },
                { "data": "Distance" },
                {
                    "data": null,
                    "render": function (data, type, full, meta) {
                        
                        return '<a href="/fms/tripinfo?mtripid=' + full.TripId + '" class="editor_edit">View</a> /<a href=/fms/AddMasterTrip?tid=' + full.TripId + '>Edit</a>/ <a href="#" class="editor_remove">Delete</a>';
                    }

                },
        ],

        "rowCallback": function (row, data, index) {
            var target = $(row).find(".details-control");
            var index = (target).index();
            //$(row).find('td:eq(' + index + ')').removeClass('details-control')
        }
    });

    $('#dt_basic_Master tbody').on('click', 'a.editor_remove', function () {
        var mtripId = table.row($(this).parents('tr')).data().MasterTripId;
        var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveMasterTrip?masterTripId=" + mtripId;
        $.post(ApiUrl, function (result) {
            
            if (result > 0) {
                toastr.success("Record Deleted successfully!");
            }
            else {
                toastr.error("Record Failed to Delete!");
            }
        });
    });
}