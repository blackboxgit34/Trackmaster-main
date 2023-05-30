function format(d) {
    debugger;
    var data = d.CompList;
    console.log(data);
    
    
    console.log(data.dataCount);
    //if (data.dataCount > 0) {
        var a = data;
        console.log(a);
        var tableString = '<table id="subTbl" cellpadding="5" class="table table-hover" cellspacing="0" width="100%"   style = "outline-style: solid; outline-width: thin; outline-color: lightgray; "><thead><tr><th>Tag ID</th><th>Veh Name</th><th>Veh Type</th><th>Veh Make</th><th>Veh Model</th><th>Owner Name </th><th>Owner No  </th><th>IsPrime</th><th>IsActive</th><th>Last In </th><th>Last Out </th><th>Duration</th><th>Action</th></tr></thead>';
        a.forEach(function (element) {
            //console.log(element.Location);
            tableString = tableString +
             '<tr>' +
              
              '<td>' + element.Tagid + '</td>' +
               '<td>' + element.VehName + '</td>' +
                '<td>' + element.VehType + '</td>' +
                 '<td>' + element.VehMake + '</td>' +
                 '<td>' + element.VehModel + '</td>' +
               '<td>' + element.OwnerName + '</td>' +
               '<td>' + element.OwnerNo + '</td>' +
                '<td>' + (element.Isprime === true ? '<a href="#" class="use-address"><img id="Action" class="use-address" title="true" src=' + '/content/Image/tickd.png' + ' onmouseover="    this.src = \'/content/Image/tick.png\';" onmouseout="    this.src = \'/content/Image/tickd.png\' ;" style="margin-left: 19px; WIDTH: 33PX; cursor: pointer; MARGIN-TOP: 10PX;"></a>' : '<a class="btn btn-link"   contenteditable="false"><img id="Action" class="use-address" title="False" src=' + '/content/Image/wrong1.png' + ' ;" style="margin-left: 19px; WIDTH: 20PX; cursor: pointer; MARGIN-TOP: 10PX;"></a>') + '</td>' +
              '<td>' + (element.IsActive === true ? '<button class="btn btn-green" style="width:150px!important; cursor: pointer !important"  onclick="deleterecords('+element.Id + ')" >Active</button>' : '<button class="btn btn-red" style="width:150px!important; cursor: pointer !important"  onclick="activaterecords(' + element.Id + ')" >InActive</button>') + '</td>' +
              '<td>' + (element.LastInDate == null? "" :element.LastInDate ) + '</td>' +
              '<td>' + (element.LastOutDate == null? "" :element.LastOutDate ) + '</td>' +
              '<td>' + element.Duration + '</td>' +
        '<td>' + '<a href="/addOn/Godrejvehregistration?TagId=' + element.Tagid + '"  target = "_blank" class="editor_edit">Edit</a>' + '</td>' +
               '</tr>'
        });

        tableString = tableString + '</table>';
    //}
    // `d` is the original data object for the row
    return tableString;
}

$(document).ready(function () {
    debugger;
    GetCompanyListReport(null);
    BindCompany();
   
    debugger;
    // Add event listener for opening and closing details
    $('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
        debugger;
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

function BindCompany() {
    var Url = apiBase.apiurl + 'AddOnAPI/GetGodrejCompanyList';

    $.get(Url, function (data) {
        $("#ddlCompanyName").append($("<option  value='0'>Select Company Name </option>"));
        $.each(data, function (key, value) {

            $("#ddlCompanyName").append($("<option> </option>").val(value.Value).html(value.Name));
        });
    });
}



function GetCompanyListReport(downloadType) {
    debugger;
   
    deleteTable();
   
    var compfilter = null;
    
    var url = baseUrl + "AddOnAPI/RegisteredCompanyLog";
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
            param.push({ "name": "Filter", "value": compfilter }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Godrej Vehicle Report' });
        },

        "columns": [

                { "data": "CompanyName" },
                  { "data": "OwnerName" },
                    { "data": "ContactNo" },
                    { "data": "EmailId" },
                        { "data": "Vehicleallot" },
                       { "data": "FloorNo" },
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
            debugger;
            if (data.dataCount == 0) {


                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });


    var vehicleName = getUrlParameter('CompanyName');
    if (vehicleName)
        table.search(vehicleName).draw();
}

$("#ddlCompanyName").change(function () {

    deleteTable();
    var downloadType = null;
    var compfilter = $("#ddlCompanyName option:selected").text();
    alert(compfilter);
    var url = baseUrl + "AddOnAPI/RegisteredCompanyLog";
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
            param.push({ "name": "Filter", "value": compfilter }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": 'Godrej Vehicle Report' });
        },

        "columns": [

                { "data": "CompanyName" },
                  { "data": "OwnerName" },
                    { "data": "ContactNo" },
                    { "data": "EmailId" },
                        { "data": "Vehicleallot" },
                       { "data": "FloorNo" },
                       {

                           "data": null,
                           "bSortable": false,
                           "render": function (data, type, full) {
                               debugger;
                               if (full.Status == false) {
                                   return "<button class='btn btn-red' style='width:100px!important; cursor: pointer !important'  onclick='activateCompany(" + full.Id + ")' >InActive</button>";

                               }
                               else {
                                   //return '<button class="btn btn-green" style="width:150px!important; cursor: pointer !important;  color:white"  onclick="deleterecords("'+ full.ID+'")" >Active</button>';
                                   return "<button class='btn btn-green' style='width:100px!important; cursor: pointer !important'  onclick='deleteCompany(" + full.Id + ")' >Active</button>";
                               }



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
            debugger;
            if (data.dataCount == 0) {


                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }
    });


    var vehicleName = getUrlParameter('CompanyName');
    if (vehicleName)
        table.search(vehicleName).draw();

});


function deleterecords(id) {
    alert(id);
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





function activateCompany(id) {

    debugger;
    $.ajax({
        type: "GET",
        data: { ID: id, status: 1 },
        url: baseUrl + "AddOnAPI/UpdateCompanyStatus",
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

function deleteCompany(id) {

    debugger;
    $.ajax({
        type: "GET",
        data: { ID: id, status: 0 },
        url: baseUrl + "AddOnAPI/UpdateCompanyStatus",
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