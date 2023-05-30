
var table;

function deleteTable() {
    $('#dt_basic_Master').dataTable({
        "bDestroy": true
    }).fnDestroy();
};

$(document).ready(function () {
    console.log($.fn.dataTable.defaults);
    $.extend(true, $.fn.dataTable.defaults, {
        "columns": [{
            "bSortable": false,
        }]
    });
//    showPasswordDialog();
    GetFmsEmployee(null);
    $('#dt_basic_Master tbody').on('click', 'a.editor_remove', function () {
        
        var res = confirm("Do you want to delete this record?");
        if (res) {
            var empId = table.row($(this).parents('tr')).data().EmployeeID;
            console.log(empId);
            var ApiUrl = apiBase.apiurl + "FmsAPI/RemoveEmployee?empid=" + empId;
            $.post(ApiUrl, function (result) {
                
                if (result > 0) {
                    toastr.success("Employee Deleted successfully!");
                    window.setTimeout(function () {
                        window.location.href = '/Fms/ManageEmployee';
                    }, 1000);
                }
                else {
                    toastr.error("Record Failed to Delete!");
                }

            }).done(function (data) {
                GetFmsEmployee(null);
            });
        }
        else {
            return false;
        }
    });

    $('#dt_basic_Master tbody').on('click', 'a.editor_Separate', function () {
        
        var res = confirm("Is this employee separated and no longer working for us?");
        if (res) {
            var empId = table.row($(this).parents('tr')).data().EmployeeID;
            console.log(empId);
            var ApiUrl = apiBase.apiurl + "FmsAPI/SeparateEmployee?empid=" + empId;
            $.post(ApiUrl, function (result) {
                
                if (result > 0) {
                    toastr.success("Employee Deleted successfully!");
                    window.setTimeout(function () {
                        window.location.href = '/Fms/ManageEmployee';
                    }, 1000);
                }
                else {
                    toastr.error("Record Failed to Delete!");
                }

            }).done(function (data) {
                GetFmsEmployee(null);
            });
        }
        else {
            return false;
        }
    });

});


$("#BtnSearch").click(function () {
    GetFmsEmployee(null);
});

$("#excelExport").click(function () {
    var downloadType = 'Excel';
    var url = baseUrl + "fmsapi/GetEmployeeList";
    DownloadData(url, downloadType);
});

$("#pdfExport").click(function () {
    var downloadType = 'PDF';
    var url = baseUrl + "fmsapi/GetEmployeeList";
    DownloadData(url, downloadType);
});

function GetFmsEmployee(downloadType) {
    deleteTable();
    var $BBID = '';
    //var $empname = $('#empname').val();
    //var $empadd = $('#empadd').val();
    //var $empCtc = $('#empCtc').val();

    var $empname = null;
    var $empadd = null;
    var $empCtc = null;

    var url = apiBase.apiurl + "fmsapi/GetEmployeeList";
    table = $('#dt_basic_Master').DataTable({
        "processing": true,
        "serverSide": true,
        destroy: true,
        retrieve: true,
        language: {
            searchPlaceholder: "Search Employee name",
            sSearch: ""
        },
        "sAjaxSource": url,
        "iDisplayLength": 20,
        "aLengthMenu": [[5, 10, 20, 25, 50], [5, 10, 20, 25, 50]],
        "fnServerParams": function (param) {
            param.push({ "name": "CustId", "value": $custid }, { "name": "EmpName", "value": $empname }, { "name": "Address", "value": $empadd }, { "name": "Ctc", "value": $empCtc }, { "name": "downloadType", "value": downloadType }, { "name": "reportName", "value": '' });
        },

        "columns": [
                        {
                            "data": null,
                            "bSortable": false,
                            "render": function (data, type, full) {
                                var ImagePath = full['ImagePath'];
                                var ImagePath = ImagePath.split(',')[0];
                                var imgTag = '<img src="' + ImagePath + '" height=40px width=40px/>';
                                return imgTag;
                            }
                        },
                        {
                            "data": null,
                            "bSortable": false,
                            "render": function (data, type, full) {
                                return full['FirstName'] + ' ' + full['LastName'];
                            }
                        },
                        {
                            "data": "EmployeeTypeId",
                            "bSortable": false
                        },
                        {
                            "data": null,
                            "bSortable": false,
                            "render": function (data, type, full) {
                                var addr = '';
                                if (full['PermanentAddress'] != '') {
                                    addr = full['PermanentAddress'];
                                }
                                if (full['PermanentState'] != '') {
                                    addr = addr + ', ' + full['PermanentState'];
                                }
                                if (full['PermanentCity'] != '') {
                                    addr = addr + ', ' + full['PermanentCity'];
                                }
                                if (full['PermanentPostalCode'] != '') {
                                    addr = addr + ', ' + full['PermanentPostalCode'];
                                }
                                if (full['Mobile'] != '') {
                                    addr = addr + ', (' + full['Mobile'] + ')';
                                }
                                return addr;
                            }
                        },
                        {
                            "data": "HireDate",
                            "bSortable": false,
                            "render": function (data) {
                                if (data != null && data != "") {
                                    return moment(data).format("MMM D YYYY");
                                }
                                else
                                    return data;
                            }
                        },
                        {
                            "data": "EmployeeCTC",
                            "bSortable": false
                        },
                        {
                            "data": "Qualification",
                            "bSortable": false
                        },
                        {
                            "data": "Experience",
                            "bSortable": false
                        },
                        {
                            "data": "BloodGroup",
                            "bSortable": false
                        },
                        {
                            "data": null,
                            "bSortable": false,
                            "render": function (data, type, full) {
                                var status = '';
                                if (full['Status'] != '') {
                                    status = full['Status'];
                                }
                                if (full['separationdate'] != '' && typeof (full['separationdate']) != "undefined") {
                                    var date = full['separationdate'].split(' ');
                                    status = status + ' (' + date[0] + ')';
                                }

                                if (full['Status'] == 'Separated') {
                                    status = '<span style="color:red;">' + status + '</span>';
                                }
                                return status;
                            }
                        },
                        {
                            "data": "EmergencyContactInfo",
                            "bSortable": false
                        },
                        {
                            "data": "EmpJobType",
                            "bSortable": false
                        },
                        //{
                        //    "data": null,
                        //    "render": function (data, type, full, meta) {
                        //        return '<a href=/' + full.ImagePath + ' download >Image</a>/ <a href=/' + full.AttachmentsPath + ' download >Document</a>';
                        //    }
                        //},
                        {
                            "data": null,
                            "bSortable": false,
                            "render": function (data, type, full, meta) {
                                var selectTag = '';
                                var imagepath = full['ImagePath'];
                                imagepath = imagepath.replace(',', '');

                                if (full['Status'] == 'Separated') {
                                    selectTag =
                                     '<div class="dropdown">' +
                                       '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                                       '<span class="caret"></span></button>' +
                                       '<ul class="dropdown-menu">' +
                                         '<li><a href="' + imagepath + '" download="Employee.png">Download Employee Image</a></li>' +
                                         '<li><a target = "_blank" href=/fms/AddEmployee?empid=' + full.EmployeeID + '>Edit</a></li>' +
                                         '<li><a href="#" class="editor_remove">Delete</a></li>' +
                                       '</ul>' +
                                     '</div>';
                                }
                                else {
                                    selectTag =
                                        '<div class="dropdown">' +
                                          '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Select Action' +
                                          '<span class="caret"></span></button>' +
                                          '<ul class="dropdown-menu">' +
                                            '<li><a href="' + imagepath + '" download="Employee.png">Download Employee Image</a></li>' +
                                            '<li><a target = "_blank" href=/fms/AddEmployee?empid=' + full.EmployeeID + '>Edit</a></li>' +
                                            '<li><a href="#" class="editor_Separate">Separate</a></li>' +
                                            '<li><a href="#" class="editor_remove">Delete</a></li>' +
                                          '</ul>' +
                                        '</div>';
                                }
                                return selectTag;
                            }
                        }
        ],
        "rowCallback": function (row, data, index) {
            var target = $(row).find(".details-control");
            var index = (target).index();
            //$(row).find('td:eq(' + index + ')').removeClass('details-control')
        },
        "initComplete": function (settings, json) {
            var url = apiBase.apiurl + "fmsapi/GetTotalEmpData";
            $.ajax({
                url: url,
                data: {
                    "CustID": $custid
                },
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    $('#emp').text(data.TotalEmp);
                    $('#ctc').text(data.TotalCTC);
                }
            });
            $('th').removeClass('sorting_asc');
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
    var reportName = 'EmployeesList';
    var $bbid = '';
    var $empname = '';
    var $empadd = '';
    var $empCtc = '';

    var url1 = url + "?EmpName=" + $empname + "&Address=" + $empadd + "&Ctc=" + $empCtc + "&downloadType=" + downloadType + "&reportName=" + reportName + "&custId=" + $custid + "&sEcho=" + sEcho + "&iDisplayStart=" + iDisplayStart + "&iDisplayLength=" + iDisplayLength + "&sSearch=" + sSearch + "&iSortCol_0=" + iSortCol_0 + "&sSortDir_0=" + sSortDir_0;
    window.location = url1;
}

function showPasswordDialog() {
    if (localStorage.getItem('IsVerified') == null) {
        $('#MainWindow').css("display", "none");
        $("#PasswordDialog").dialog({
            autoOpen: true,
            position: { my: "center", at: "200", of: window },
            width: 500,
            height: 150,
            resizable: true,
            title: 'Please enter the master password to continue',
            modal: true,
            open: function () {
                var url = "../fms/CheckPassword?custid=" + $custid;
                $(this).load(url);
                $(".ui-dialog-titlebar-close").hide();
            }
        });
        $('.ui-widget-overlay').click(function () { $('#PasswordDialog').dialog("close"); });
    }
    else {
        GetFmsEmployee(null);
    }
    return false;
}