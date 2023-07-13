
// انشاء قاعدة البيانات وتوصيلها
const db = openDatabase("area1", "1.0", "My Database", 2 * 1024 * 1024);

function do_qua(query) {
    db.transaction(function (tx) {
        tx.executeSql(query, [], function (tx, results) {
            console.log(results);
            return results;
        }, function (tx, error) {
            console.log(error);
        });
    })
}
// random number
const tablename = "area" + Math.floor(Math.random() * 1000);

// create table area if not exists
const qua = "CREATE TABLE IF NOT EXISTS " + tablename + " (id INTEGER PRIMARY KEY AUTOINCREMENT, lineNo INTEGER, side1 INTEGER, side2 INTEGER, side3 INTEGER, area_m INTEGER, area_l INTEGER)";
const namedone = true;
function log_to_db(lineNo, side1, side2, side3, area_m, area_l) {
    // skip if any value == NaN or empty
    if (isNaN(side1) || side1 == '') return;
    if (isNaN(side2) || side2 == '') return;
    if (isNaN(side3) || side3 == '') return;
    if (isNaN(area_m) || area_m == '') return;
    if (isNaN(area_l) || area_l == '') return;
    //---
    do_qua(qua);
    //---
	// console.log(lineNo + " " + side1 + " " + side2 + " " + side3 + " " + area_m + " " + area_l);
	var sql = "INSERT INTO " + tablename + " (lineNo, side1, side2, side3, area_m, area_l) VALUES (" + lineNo + "," + side1 + "," + side2 + "," + side3 + "," + area_m + "," + area_l + ")";
	// console.log(sql);
    do_qua(sql);
}

function get_all_tables() {
    var tables = [];
    var sql = "SELECT name FROM sqlite_master WHERE type='table'";
    db.transaction(function (tx) {
        tx.executeSql(sql, [], function (tx, results) {
            for (var i = 0; i < results.rows.length; i++) {
                // console.log(name);
                var name = results.rows.item(i).name;
                // if name starts with "area"
                if (name.startsWith("area")) {
                    tables.push(name);
                    var dd = $("#all_tables");
                    dd.append("<li class='list-group-item'><a class='nav-link' onclick='javascript:Table(\"" + name + "\")' data-toggle='tab' href='#tab3'>" + name + "</a></li>");
                }
            }
        }, function (tx, error) {
            console.log(error);
        });
    })
    // console.log(tables);
    return tables;
}

function Table(name) {
    var sql1 = "SELECT * FROM " + name;
    var z = 0;
    db.transaction(function (tx) {
        tx.executeSql(sql1, [], function (tx, results) {

            for (var i = 0; i < results.rows.length; i++) {
                var row = results.rows.item(i);
                z++;
                markup = "<tr>";
                markup += "<td>" + z + "</td>";
                markup += "<td>" + row.side1 + "</td>";
                markup += "<td>" + row.side2 + "</td>";
                markup += "<td>" + row.side3 + "</td>";
                markup += "<td>" + row.area_m + "</td>";
                markup += "<td>" + row.area_l + "</td>";
                markup += "</tr>";
                $("#allrows1").append(markup);
            }
        }, function (tx, error) {
            console.log(error);
        }
        );
    })               
}