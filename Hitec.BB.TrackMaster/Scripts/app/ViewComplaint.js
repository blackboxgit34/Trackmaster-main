function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};
var table;
$(document).ready(function () {
    GetServiceRequest();
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
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    })
});


$("#BtnSearch").click(function () {
    GetServiceRequest();
});

function GetServiceRequest() {
    // clear tables contents
    deleteTable();
   
    var url = baseUrl + "ComplaintAPI/GetServiceRequest";
    console.log("date: " + $beginDate + "endDAte:" + $endDate + "url:" + url);
    table = $('#dt_basic_Master').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img id='loaderGif' src='../Content/Trackmaster_files/loader.gif'/>"
        //},
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "bbid", "value": "" }, { "name": "custid", "value": $custid });
        },
        "columns": [    
                { "data": "Row" },
                { "data": "ComplaintId" },
                //{ "data": "ComplaintDate" },

                {
                    "data": "ComplaintDate",
                    "render": function (data) {
                        if (data != null && data != "") {
                            return moment(data).format("MMM D YYYY, hh:mm:ss a");
                        }
                        else
                            return data;
                    }
                },

                { "data": "VehicleName" },
                {
     //               "data": "Description"
                       "render": function (data, type, full, meta) {
                           return '<div><a  onClick="getComments(this.id);"   id="' + full.ComplaintId + '" href="#"  data-toggle="tooltip" title="click to view detail page">View Comment</a></div>';

                        }
                },
                //{ "data": "AssignedOn" },

                {
                    "data": "AssignedOn",
                    "render": function (data) {
                        if (data != null && data != "" && data != '1900-01-01T00:00:00') {
                            return moment(data).format("MMM D YYYY, hh:mm:ss a");
                        }
                        else
                            return 'NA';
                    }
                },

                { "data": "AssignedTo" },
                {
                    "data": "ClosedDate",
                    "render": function (data) {
                        if (data != null && data != "" && data != '1900-01-01T00:00:00') {
                            return moment(data).format("MMM D YYYY, hh:mm:ss a");
                        }
                        else
                            return 'NA';
                    }
                },
                { "data": "Status" },
                 //{
                 //    "orderable": false, "targets": 0,
                 //    "className": 'details-control',
                 //    "orderable": false,
                 //    "data": null,
                 //    "defaultContent": ''
                 //}
        ],
        "rowCallback": function (row, data, index) {
            if (data.overstoppageCount == 0) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });
}


function getComments(id) {
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: baseUrl + "ComplaintAPI/GetComplaintComments",
        data: {compId : id},
        success: function (data) {
            var table = "<ul tyle='list-style: none;'>";
            table+="<li><div class='col-md-12'><div class='col-md-4'><b>Commented Date</b></div><div class='col-md-4'><b>Commented By</b></div><div class='col-md-4'><b>Comment</b></div></li>"
            for (var i = 0; i < data.length; i++) {
                table += "<li><div class='col-md-12'><div class='col-md-4'>" + data[i].CommentDate + "</div><div class='col-md-4'>" + data[i].CommentBy + "</div><div class='col-md-4'>" + data[i].Comment + "</div></li>";
            }
            table = table + "</ul>";
            $("#divWhatsNew").dialog({
                autoOpen: true,
                position: { my: "center", at: "200", of: window },
                width: 750,
                height: 500,
                resizable: true,
                title: "Comment board",
                modal: true,
                open: function () {
                    $(".ui-dialog-titlebar-close").addClass("hidden");

                    $(this).html(table);
                },
                buttons: {
                    Close: function () {
                        $(this).dialog("close");
                    }
                }
            });

            //$('#modalInnerContain').html(data);
            //$('#modalOuterDiv').modal('show');
        },
        error: function () {
            toastr.error("Error");
        }
    });
}