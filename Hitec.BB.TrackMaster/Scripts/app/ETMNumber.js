
$(document).ready(function () {
    GetETMRecords();
    $("#BtnAdd").click(function () {
        $('#AddNewETM').modal('show');
    });
    $('#txt_EtmDate').datepicker({
        changeYear: true,
        minDate: 0,
        maxDate: '+30',
    });
});

$("#AddNewEMT").click(function () {
        var EmtNumber = $("#txt_EtmNumb").val();
    var ForDate = $("#txt_EtmDate").val();
    var data = [];
    //  alert(EmtNumber + "  " + ForDate);
    var url = apiBase.apiurl + 'FmsAPI/AddNewEMTNumber';
    data.push(
    { name: 'ETMNumber', value: EmtNumber },
     { name: "CustId", value: $custid }
    );
    $.post(url, $.param(data), function (result) {
        if (result > 0) {
            if (result == 1) {
                toastr.success(" created successfully.")
            }
            window.setTimeout(function () {
                window.location.href = '/Fms/ManageETM';
            }, 1000);
        }
        else
            toastr.error("Failed!!!")
    });
    GetETMRecords();
});

function GetETMRecords() {
    deleteTable();

    var url = apiBase.apiurl + "FmsAPI/GetEMTRecords";
    var Table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        "sAjaxSource": url,
        "iDisplayLength": 20,
        language: {
            searchPlaceholder: "Search ",
            sSearch: ""
        },
        "aLengthMenu": [[5, 10, 20, 25, 50 , 100], [5, 10, 20, 25, 50,100]],
        "fnServerParams": function (param) {
            param.push({ "name": "CustId", "value": $custid });
        },

        "columns": [
            {
                "data": "ETMNumber",
                "bSortable": false
            },
            {
                "data": "DriverName",
                "bSortable": false
            },
            {
                "data": null,
                "bSortable": false,
                "render": function (data, type, full) {
                   // var VehicleName = full['VehicleName'];
                   // VehicleName = VehicleName.replace(/ /g, "&nbsp;");

                    return "<a href='javascript:' onclick=ShowEMTChnage()>Assign</a>";
                }
            },
        ]
    });
}

function ShowEMTChnage()
{   
    $("#DriverChangeDialog").dialog({
        autoOpen: true,
        position: { my: "center", at: "200", of: window },
        width: 500,
        height: 650,
        resizable: true,
        title: 'Assigne Device To New conductor',
        modal: true,
        open: function () {

            var url = "../fms/GetETMChange?custid=" + $custid;
            $(this).load(url);
            $(".ui-dialog-titlebar-close").hide();
        },
        buttons: {
            Close: function () {
                $(this).dialog("close");
            }
        }
    });
    return false;
}

