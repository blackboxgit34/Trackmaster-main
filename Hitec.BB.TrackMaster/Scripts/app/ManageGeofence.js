var table;
function format(d) {
    var data = d;

        var a = data;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr></tr></thead>';
    //    a.forEach(function (element) {
            tableString = tableString +
            '<tr>'+
            '<td>Assign Geofence <strong>'+ d.FenceName + '</strong> to multiple vehicles </td>' +
            '</tr>'+
            '<tr>' +
            '<td style="width: 650px;"><select size="9" class="" id="vehicleslist" multiple="multiple"></select></td>' +
            '<td><button type="button" class="edit-task2 btn btn-primary btn-small" onclick="Assign_click();" id="btnAssign"><i class="fa fa-plus"></i>  Assign</button>&nbsp;<button type="reset" class="edit-task3  btn  btn-small" id="btnCancel" onclick="Cancel_click();"><i class="fa fa-times"></i> Cancel</button>&nbsp;<button type="reset" class=" btn btn-danger btn-small" id="btnCancel" onclick="Delete_click();"><i class="fa fa-trash-o"></i> Delete</button></td>' +
            '</tr>'       
       // });

        tableString = tableString + '</table>';
    return tableString;
}

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
    //$('#dt_basic_Master').empty(); // empty in case the columns change   
};
var fanceidcheck;
$(document).ready(function () {
  // GetManageGeofenceReport();
    //deleteTable();
   
   
    var url = apiBase.apiurl + "GeofenceAPI/BindAllFences";
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
            param.push({ "name": "userId", "value": $custid });
        },
        "columns": [
                {
                    // "data": "FenceName",
                    "render": function (data, type, full, meta) {
                        

                        var bbid = full.BBID;
                        //alert(bbid);
                        return '<a href="/Geofence/ViewGeofence?bbid=' + bbid + '">' + full.FenceName + '</a>';

                    }
                },
                { "data": "VehName" },
                { "data": "CreatedOn" },
                { "data": "FenceId" },
                { "data": "BBID" },
                 {
                     "render": function (data, type, full, meta) {
                         

                         var bbid = full.BBID;
                         return '<button type="button" class="edit-task btn btn-danger btn-small" data-toggle="tooltip" title="Delete" data-toggle="tooltip" title="Delete fence"  type="button"  ><i class="fa fa-trash-o"></i></button> <button type="button" class="edit-task1 btn btn-success btn-small" data-toggle="tooltip" data-toggle="tooltip" title="Copy fence"  type="button"  ><i class="fa fa-clone"></i></button>';

                     }
                 },
        ],
        "rowCallback": function (row, data, index) {

            var target = $(row).find(".details-control");
            var index = (target).index();
            //$(row).find('td:eq(' + index + ')').removeClass('details-control')
        }
    });
    function deleteFence(bbid, fenceId) {
        
        var result = confirm('Are you sure?');
        if (result == true) {
            $.ajax({
                dataType: "json",
                type: "GET",
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                url: apiBase.apiurl + "Geofence/DeleteFence",
                data: { bbid: bbid, fenceId: fenceId },
                traditional: true, // required to POST array
                success: function (data, status) {
                    console.log("Success!!");
                    console.log(data);
                    console.log(status);
                    location.reload();
                },
                error: function (xhr, desc, err) {
                    console.log(xhr);
                    console.log("Desc: " + desc + "\nErr:" + err);
                }
            });
        }
    }




    $table = $('#dt_basic_Master').DataTable();

    // logic for delete 
    $table.on('click', 'button.edit-task', function () {

        var closestRow = $(this).closest('tr');
        var data = $table.row(closestRow).data();
        var bbid = data.BBID;
        var fenceid = data.FenceId;
        var result = confirm('Are you sure?');
        if (result == true) {
            
            $.ajax({
                dataType: "json",
                type: "GET",
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                url: apiBase.apiurl + "GeofenceAPI/RemoveFence",
                data: { bbid: bbid, fenceId: fenceid },
                traditional: true, // required to POST array
                success: function (data, status) {
                    
                    console.log("Success!!");
                    console.log(data);
                    console.log(status);
                    location.reload();
                },
                error: function (xhr, desc, err) {
                    
                    console.log(xhr);
                    console.log("Desc: " + desc + "\nErr:" + err);
                }
            });
        }

    });


    $table.on('click', 'button.edit-task1', function () {

        var closestRow = $(this).closest('tr');
        var data = $table.row(closestRow).data();
        var bbid = data.BBID;
        var fenceid = data.FenceId;
        fanceidcheck = fenceid;
        chcek();
        

        var tr = $(this).closest('tr');
        var row = table.row(tr);
        
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row.....
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }

        $("#subTbl th").css("background-color", "rgba(128, 128, 128, 0.74)");
        $("#subTbl th").css("color", "White");
        var taskID = data[0];
    });


    function chcek() {
        var url = apiBase.apiurl + 'adminapi/GetVehiclesForGeoFence?custid=' + $custid;
        console.log('calling url: ' + url + ' to get vehicles list.');

        $.getJSON(url, function (data) {
            var $select = $('#vehicleslist');
            $.each(data, function (i, item) {
                $('#vehicleslist').append($('<option></option>').val(item.Value).html(item.Text));
            });
        }).done(function () {


            $('#vehicleslist').multiSelect({});
        });

        //$('#vehicleslist').multiSelect({});
    };

  
});


function Cancel_click() {
    //$("#subTbl").hide();
    location.reload();

}

function Delete_click() {
    var multiArray = $('#vehicleslist').val();
    var MultipleBBidInMultiSelect = multiArray.toString();

    var FenceAssignId = fanceidcheck.toString();
    //alert(multiArray[0]);
    $.ajax({
        url: apiBase.apiurl + '/GeofenceAPI/RemoveSelectedFence',
        type: 'GET',
        data: { info: MultipleBBidInMultiSelect, fenceId: FenceAssignId },
        // traditional: true, // required to POST array
        success: function (data, status) {
            alert("Delete Selected Fence Sucessfully !");
            console.log("Success!!");
            console.log(data);
            console.log(status);
            //BindGrid();
            //$("#assignPanel").hide();
            location.reload();
        },
        error: function (xhr, desc, err) {
            console.log(xhr);
            console.log("Desc: " + desc + "\nErr:" + err);
        }
    });

}


window.Assign_click=function() {
    var multiArray = $('#vehicleslist').val();
    var MultipleBBidInMultiSelect = multiArray.toString();

    var FenceAssignId = fanceidcheck.toString();
    //alert(multiArray[0]);
    $.ajax({
        url: apiBase.apiurl + '/GeofenceAPI/AssignToMany',
        type: 'GET',
        data: { info: MultipleBBidInMultiSelect, fenceId: FenceAssignId },
        // traditional: true, // required to POST array
        success: function (data, status) {
            alert("Fence Copied Sucessfully !");
            console.log("Success!!");
            console.log(data);
            console.log(status);
            //BindGrid();
            //$("#assignPanel").hide();
            location.reload();
        },
        error: function (xhr, desc, err) {
            alert("Can not create duplicate copy.!");
            console.log(xhr);
            console.log("Desc: " + desc + "\nErr:" + err);
        }
    });
}



