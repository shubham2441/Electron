const $ = require("jquery");
const fs = require("fs");
const electron = require("electron");
const dialog = require("electron").remote.dialog;

$(document).ready(
    function () {
        $("#grid .cell").on("click", function () {
            let rid = Number($(this).attr("ri"));
            let cid = Number($(this).attr("ci"));
            let ciAdrr = String.fromCharCode(cid + 65);
            $("#address-container").val(ciAdrr + (rid + 1));
        })

        $(".menu-items").on("click", function () {
            $(".menu-options-item").removeClass("selected");
            let id = $(this).attr("id");
            $(`#${id}-options`).addClass("selected");
        })

        $("#New").on("click", function () {
            db = [];
            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let row = [];
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    let cell = "";
                    row.push(cell);
                    $(cRowCells[j]).html("false");
                }

                db.push(row);
            }
        })

        $("#grid .cell").on("keyup", function () {
            let rowId = $(this).attr("ri");
            let colId = $(this).attr("ci");
            db[rowId][colId] = $(this).html();
            console.log(db);
        })


        $("#Save").on("click", async function () {
            let sdb = await dialog.showOpenDialog();
            let jsonData = JSON.stringify(db);
            fs.writeFileSync(sdb.filePaths[0], jsonData);
        })

        $("#Open").on("click", async function () {
            let odb = await dialog.showOpenDialog();
            let fp = odb.filePaths[0];
            let content =fs.readFileSync(fp);
            db = JSON.parse(content);

            let rows = $("#grid").find(".row");
            for (let i = 0; i < rows.length; i++) {
                let cRowCells = $(rows[i]).find(".cell");
                for (let j = 0; j < cRowCells.length; j++) {
                    // let rowId = $(cRowCells[j]).attr("ri");
                    // let colId = $(cRowCells[j]).attr("ci");
                    $(cRowCells[j]).html(db[i][j]);
                }
            }
        })
        function init() {
            $("#File").trigger("click");
            $("#New").trigger("click");
        }
        init();
    }
);