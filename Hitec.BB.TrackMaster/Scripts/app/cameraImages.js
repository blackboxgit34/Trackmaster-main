﻿var table;

var cameraId;
var lastListFlag = false;
var lastCountFlag = false;
function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};
$(document).ready(function () {
    (function WaitForCameraId() {
        if ($('#vehicleslist').val() != null) {
            GetCameraImagesReport();
        } else {
            setTimeout(WaitForCameraId, 50);
        }
    })();
  //  GetCameraImagesReport();
    //$('#dt_basic_Master tbody').on('click', 'td.details-control', function () {
    //    var tr = $(this).closest('tr');
    //    var row = table.row(tr);
    //})
});
$("#BtnSearch").click(function () {
 
    GetCameraImagesReport();
});



function GetCameraImagesReport() {

    var oneday = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var totalDays = Math.round(Math.abs((new Date($beginDate).getTime() - new Date($endDate).getTime()) / (oneday)));
    if (totalDays > 1)
    {
        toastr.warning("Data Difference should not be more than one day");
        return false;
    }

    
     table = $("#dt_basic_Master tr");
     if (table.length > 1) {
         $("#dt_basic_Master tr").remove();
     }
    // deleteTable();

     cameraId = $('#vehicleslist').val();

   // var $custid = '6607';
    var url = apiBase.apiurl + "adminapi/CameraImagesReportLoop";
   

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

    GetImages(cameraId, 0, 30);
   
    var modal = document.getElementById('myModal');
    var modalImg = document.getElementById("img01");
    window.ImgUrl = function (id)
    {
        modal.style.display = "block";
        modalImg.src = id;
    };
    // When the user clicks on <span> (x), close the modal
    window.modalPopUpClose = function () {
        $("#myModal").hide();
    }
    //table = $('#dt_basic_Master').DataTable({
    //    "oLanguage": {
    //        "sProcessing": "<img src='../Content/Trackmaster_files/loader.gif'/>"
    //    },
    //    "processing": true,
    //    "serverSide": true,
    //    destroy: true,
    //    retrieve: true,
    //    "sAjaxSource": url,
    //    "iDisplayLength": 1000,
    //    "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
    //    "fnServerParams": function (param) {
    //        param.push({ "name": "cameraId", "value": cameraId }, { "name": "beginDate", "value": $beginDate }, { "name": "endDate", "value": $endDate }, { "name": "custid", "value": $custid });
    //    },

    //    "columns": [
    //              {
    //                  "orderable": false, "targets": 0,
    //                  "render": function (data, type, full, meta) {
    //                      
    //                      return '<span>' + full.FullImg + '</span>';
    //                  }
    //              },
    //              {
    //                  "orderable": false, "targets": 0,
    //                  "render": function (data, type, full, meta) {
    //                      
    //                      return '<span>' + full.FullImg + '</span>';
    //                  }
    //              },
    //              {
    //                  "orderable": false, "targets": 0,
    //                  "render": function (data, type, full, meta) {
    //                      

    //                      return '<span>' + full.FullImg + '</span>';
    //                  }
    //              },
    //    ],
       
    //});
}

function GetImages(cameraId, startlength, endLength) {

    var url = apiBase.apiurl + "adminapi/CameraImagesReportLoop";
    $.get(url, { beginDate: $beginDate, endDate: $endDate, cameraId: cameraId, custid: $custid, startlength: startlength, endLength: endLength },
        function (data) {
            var count = data.count;
            if (data.CameraModelList.length > 0) {
                var firstCell = 0; var secondCell = 1; var thirdCell = 2; var newLine = 3;
                var test = "<tbody>";
                var d = new Date();
                var numberOfTicks = d.getTime();
                $.each(data.CameraModelList, function (i, item) {
                    if (i == firstCell) {
                        test += '<td><span id="' + item.ImgUrl + '" onClick="ImgUrl(this.id);" style="cursor: pointer;">' + item.FullImg + '</span><br><div><br><b>Location:</b>' + item.Location + '</div></br><div class="col-md-8"><p><b>Date:</b>' + item.DataDate + '</p></div><div class="col-md-4"><a href="' + item.ImgUrl + '" download="CameraImage-' + numberOfTicks + '" >download</a></div></span></td>';
                        firstCell = firstCell + newLine;
                    }
                    if (i == secondCell) {
                        test += '<td><span id="' + item.ImgUrl + '" onClick="ImgUrl(this.id);" style="cursor: pointer;">' + item.FullImg + '</span><br><div><br><b>Location:</b>' + item.Location + '</div></br><div class="col-md-8"><p><b>Date:</b>' + item.DataDate + '</p></div><div class="col-md-4"><a href="' + item.ImgUrl + '" download="CameraImage-' + numberOfTicks + '" >download</a></div></span></td>';
                        secondCell = secondCell + newLine;
                    }
                    if (i == thirdCell) {
                        test += '<td><span id="' + item.ImgUrl + '" onClick="ImgUrl(this.id);" style="cursor: pointer;">' + item.FullImg + '</span><br><div><br><b>Location:</b>' + item.Location + '</div></br><div class="col-md-8"><p><b>Date:</b>' + item.DataDate + '</p></div><div class="col-md-4"><a href="' + item.ImgUrl + '" download="CameraImage-' + numberOfTicks + '" >download</a></div></span></td></tr>';
                        thirdCell = thirdCell + newLine;
                    }
                });
                $('#dt_basic_Master').append(test);
                test += "</tbody>";
                $('.body').unblock();
                if (lastListFlag == false) {

                    if (count < 30) {
                        lastListFlag = true;
                    }
                    else {
                        if (endLength <= count) {

                            var startlength = parseInt(endLength) + 1;
                            var endlength = parseInt(endLength) + 30;
                            if (endlength > count) {
                                lastCountFlag = true;
                            }
                            GetImages(cameraId, startlength, endlength)
                        }
                        else {

                            if (lastCountFlag == false) {

                                var startlength = parseInt(endLength) - 30;
                                var preEndlength = count - startlength;
                                var endlength = startlength + preEndlength;
                                GetImages(cameraId, startlength, endlength)
                            }
                            lastListFlag = true;
                        }
                    }
                }
            }
            else {
                $('.body').unblock();
                var noData = "<tbody><tr><td>No Data Available</td></tr><tbody>";
                $('#dt_basic_Master').append(noData);
            }
        }).done(function () {
           // toastr.success("successfully loaded");
        })
.fail(function () {
    toastr.warning("Something went wrong");

    $('.body').unblock();

});
}
//return '< img src="data:image/jpg; base64,"' + full.Image + '"/>';


