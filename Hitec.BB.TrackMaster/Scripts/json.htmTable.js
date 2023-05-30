
function CreateDynamicTable(objArray,datacount,page) {
    debugger;
    var array = JSON.parse(objArray);

    var str = '<table class="table table-bordered" id="test">';
    str += '<tr>';
    for (var index in array[0]) {
        if (index != "bbid")
        {
            if (index == "rowno")
            {
                str += '<th scope="col">S.No</th>';
            }
            else if (index == "Bus Rto no")
            {
                str += '<th scope="col">Vehicle No</th>';
            }
            else
            {
                var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

                var d = new Date(index);
                var curr_date = d.getDate();
                var curr_month = d.getMonth();
               // var curr_year = d.getFullYear();
                var diststartdate = m_names[curr_month] + "-" + curr_date;

                str += '<th scope="col">' + diststartdate + '</th>';
            }

          
        }

     
       
    }
    str += '<th scope="col">Total</th>';
    str += '</tr>';
    str += '<tbody>';
    for (var i = 0; i < array.length; i++) {
        var dis = 0;
        str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
        for (var index in array[i]) {
            debugger;
           
            var dateval = null;
            if (index != "" && index != "rowno" && index != "Bus Rto no" && index != "bbid" )
            {
                dateval = index;
                str += '<td ><a href="/map/replay?tableNameLvStatus=' + array[i]["bbid"] + '&vehicleNameLvStatus=' + array[i]["Bus Rto no"] + '&date=' + dateval + '" target="_blank">' + array[i][index] + '</a></td>';
            }
            else
            {

                if (index != "bbid")
                {
                    str += '<td >' + array[i][index] + '</td>';
                }
               

            }

           
           
         

         

                if (index == "rowno" || index == "Bus Rto no" || index == "" || index == "bbid")
            {

            }
            else
            {

                var d;
                d = array[i][index]
                dis = parseFloat(d) + parseFloat(dis);
            }
        }

        str += '<td>' + dis.toFixed(2) + '</td>';
        str += '</tr>';
    }

 
   
    str += '</tbody>'
    str += '</table>';



   
    var rowsShown =parseInt($('#ddlpage').val());
    var rowsTotal = datacount;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        if (page == pageNum)
        {
            $('#nav').append('<a href="#"  class="active" onclick="myfunction( ' + pageNum + ')">' + pageNum + '</a> ');

        }
        else {
            $('#nav').append('<a href="#"  onclick="myfunction( ' + pageNum + ')">' + pageNum + '</a> ');

        }
    }

    return str;
}
function processJson() {
    $("#DynamicGrid").html(buildTable(getJsonVar(objArray)));
    showTree()
}
function buildTable(a) {
    var e = document.createElement("table"),
        d, b;
    if (isArray(a)) return buildArray(a);
    for (var c in a) "object" != typeof a[c] || isArray(a[c]) ? "object" == typeof a[c] && isArray(a[c]) ? (d = e.insertRow(-1), b = d.insertCell(-1), b.colSpan = 2, b.innerHTML = '<div class="td_head">' + encodeText(c) + '</div><table style="width:100%">' + $(buildArray(a[c]), !1).html() + "</table>") : (d = e.insertRow(-1), b = d.insertCell(-1), b.innerHTML = "<div class='td_head'>" + encodeText(c) + "</div>", d = d.insertCell(-1), d.innerHTML = "<div class='td_row_even'>" +
        encodeText(a[c]) + "</div>") : (d = e.insertRow(-1), b = d.insertCell(-1), b.colSpan = 2, b.innerHTML = '<div class="td_head">' + encodeText(c) + '</div><table style="width:100%">' + $(buildTable(a[c]), !1).html() + "</table>");
    return e
}

function getJsonVar(objArray) {
    try {
        var a = $.parseJSON(objArray);
        $("#json_vl").val(JSON.stringify(objArray, void 0, 2));
        return a
    } catch (e) {
        //return $("#error_msg").text(e.message), $("#errorModal").modal("show"), {}
    }
}