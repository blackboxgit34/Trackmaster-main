$(document).ready(function () {

 
        
        $('[data-toggle="tooltip"]').tooltip();
        var reportName = document.location.pathname.match(/[^\/]+$/)[0];
        var url = apiBase.apiurl + "adminapi/CheckForAdOnReports";
        $.ajax({
            url: url,
            dataType: "json",
            type: "GET",
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            data: { custid: $custid, reportName: reportName },
            async: false,
            success: function (data) {
                if (data == "0") {
                    window.location.href = "../../home/FeatureDisable";
                 }
             },
            error: function (err) {
                toastr.warning('something went wrong!');
            }

        });
    });

