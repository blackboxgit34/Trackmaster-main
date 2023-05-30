
var table;
function format(d) {
    var data = d;

    if (data.IssueList.length > 0) {
        var a = data.IssueList;
        var tableString = '<table id="subTbl" class="table table-bordered" cellpadding="5" cellspacing="0" width="100%" ><thead ><tr"><th> Alert Type</th><th>DateTime</th><th>Message Text</th><th>Location</th></tr></thead>';
        a.forEach(function (element) {
            tableString = tableString +
            '<tr>' +
              '<td>' + element.IssueType + '</td>' +
                '<td>' + (element.Issuedate) + '</td>' +
                 '<td>' + element.IssueText + '</td>' +
                '<td>' + element.location + '</td>' +
                
               
            '</tr>'
        });
        tableString = tableString + '</table>';
    }

    // `d` is the original data object for the row
    return tableString;
}
$("#BtnSearch").click(function () {
   
    GetVehInfos();
});
$(document).ready(function () {
   
    $("#excelExport").hide();
    GetVehInfos();
    $('#dtGetVehInfo tbody').on('click', 'td.details-control', function () {
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
    });
    $('#dtGetVehInfo tbody').on('click', '.btn-submit', function (e) {


      
        var id = this.id;
     
        var box = String($(this).closest('tr').find('#box_' + id).val());
        var vehno = String($(this).closest('tr').find('.vehName').val());
        if (vehno == null || vehno == "") {
            document.getElementById("veh_" + id).style.border = "2px solid red";

            alert("Enter Vehicle no!");
            return false;
        }

        else {
            alertify.confirm(" Do you want to proceed?", function (e) {
                if (e) {
                    ajaxResp(id, box,vehno)
                    return true;
                } else {
                    alertify.error("You've clicked Cancel");
                    return false;
                }
            });
        }
       

      

        console.log('suggested-in-comment', 'click');
    });

  

    //common for both  sms and notification
    var ajaxResp = function (id, box, vehno) {
        $.ajax({
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: apiBase.apiurl + "AdminAPI/MappdevicewithRfid",
            data: { id: id, box: box,vehno:vehno},
            success: function (data) {
                toastr.success('successfully Done!');
                window.location.reload();
            },
            error: function (error) {
                toastr.warning('Something went wrong!');

            }
        });
    };

});
function GetVehInfos() {
   
    $('#dtGetVehInfo').dataTable({
        "bDestroy": true
    }).fnDestroy();
    var url = apiBase.apiurl + "AdminAPI/GetVehicleMappedRFID";

    table = $('#dtGetVehInfo').DataTable({
        //"oLanguage": {
        //    "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
        //},
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "custId", "value": $custid }, { "name": "from", "value": $beginDate }, { "name": "to", "value": $endDate });
        },

        "columns": [


                 { "data": "Mac" },
                 { "data": "Tag" },
                 { "data": "Addedon" },
                 { "data": "Mappedon" },
                 { "data": "Outtime" },
                  {

                      "data": null,
                      "orderable": false, "targets": 0,
                      "width": "15%",
                      "render": function (data, type, full, meta) {

                          if (full.Mappedon == "Still to be mapped")

                          {
                              setTimeout(
                        function () {
                            var list = full.BoxidsList;
                            if (list.length > 0) {
                                $('#box_' + full.ID).html('<select></select>');
                                $.each(list, function (j, item) {
                                  
                                    $('#box_' + full.ID).append($('<option></option>').val(item.Value).html(item.Text));
                                   
                                });
                            }
                        }, 1);

                              return '<span>   <select class="form-control" id="box_' + full.ID + '"></select></span>' + '<span> <input type="text" class="form-control vehName" placeholder="Enter Vehicle no" id="veh_' + full.ID + '" /></span>'
                          }

                          else
                          {
                              return  full.Vehicleno;
                          }
                         
                      }
                  },
                                

                  {

                      "data": null,
                      "width": "15%",
                      "orderable": false, "targets": 0,
                      "render": function (data, type, full, meta) {
                          if (full.Mappedon == "Still to be mapped") {
                              return '<span><button class="btn btn-green btn-submit btn-small" type="button"  id="' + full.ID + '">Assign</button>';
                          }

                          else {
                              debugger;
                              console.log('1');
                              if (full.Issue == true) {
                                  return '<span style="background: #f14c40;color: white;padding: 5px;">Inspection required</span>';
                              }
                              else {
                                  if (full.Outtime != "N/A") {
                                      return '<span style="background: #27bb0c;color: white;padding: 5px;">Allowed to go</span>';
                                  }
                              }
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
                  },
        ],
        "rowCallback": function (row, data, index) {
            if (data.Issue == false) {
                var target = $(row).find(".details-control");
                var index = (target).index();
                $(row).find('td:eq(' + index + ')').removeClass('details-control')
            }
        }


    });


    //table.on('draw', function () {

    //    $("button").attr('disabled', 'disabled');

    //    if (F == 1) {
    //        $("button").removeAttr('disabled');
    //    }
    //});




};