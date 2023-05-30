
function CreateDynamicTable(objArray) {
    debugger;
  //  var array = JSON.parse(objArray.aaData);


    var array = objArray.aaData;

    var str = '<table class="lightPro" id="test">';
    str += '<tr>';
    for (var index in array[0]) {
        if (index == 'Distance') {
            index = "Distance";
        }
        
        else if (index == 'EndLocation') {
            index = "EndLocation";
        }
        else if (index == 'ExpectedTime') {
            index = "ExpectedTime";
        }
      
      
        else if (index == 'RouteName') {
            index = "RouteName";
        }
        else if (index == 'Routetype') {
            index = "Routetype";
        }
       
        else if (index == 'StartLocation') {
            index = "StartLocation";
        }
      
        else if (index == 'TripType') {
            index = "TripType";
        }
        str += '<th scope="col">' + index + '</th>';
    }
    //str += '<th scope="col">Total</th>';
    str += '</tr>';
    str += '<tbody>';
    for (var i = 0; i < array.length; i++) {
        var dis = 0;
        str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
        for (var index in array[i]) {
            str += '<td>' + array[i][index] + '</td>';
            //if (index == "Bus Rto no" || index == "Route" || index == "Routeno" || index == "") {

            //}

            //else {

            //    var d;
            //    d = array[i][index]
            //    dis = parseFloat(d) + parseFloat(dis);

            //}
        }

        //str += '<td>' + dis.toFixed(2) + '</td>';
        str += '</tr>';
    }
    str += '</tbody>'
    str += '</table>';
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