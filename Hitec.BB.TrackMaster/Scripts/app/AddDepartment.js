var baseUrl = apiBase.apiurl;
var custId
var table;

$("#Submit").click(function () {
    
    var deptname = $("#txtDeptName").val();
    
    custId = $custid;
  
    var baseurl = apiBase.apiurl;
    var url = baseurl + 'TaxiAPI/SaveDepartment';
    $.ajax({
        dataType: "json",
        type: "GET",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        url: url,
        data: { deptname: deptname, custid: custId },
        success: function (data) {
            if ( data == 1) {
                toastr.success("Department added Successfully!");
            }

        },
        error: function (error) {
            toastr.error("something went wrong!");
            return;
        }
    });


})