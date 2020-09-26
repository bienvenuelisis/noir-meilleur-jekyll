function dataTableFr(id, objects) {
    return $('#' + id).DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "language": {
            "previous": "Précedent",
            "next": "Suivant",
            "lengthMenu": "Afficher  _MENU_  " + objects,
            "info": "Affchage de _START_ à _END_ de _TOTAL_ " + objects,
            "emptyTable": "Aucune donnée disponible.",
            "zeroRecords": "Aucune donnée disponible.",
            "infoEmpty": "",
            "infoFiltered": " - recherche sur _MAX_ " + objects,
            "search": "Rechercher : ",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        }
    });
}

function prefix(string, prefix, nbMax) {
    while (string.length < nbMax) {
        string = prefix + string;
    }
    return string;
}

function formatCurrency(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };

function formatMoney(number, decPlaces, decSep, thouSep) {
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSep = typeof decSep === "undefined" ? "." : decSep;
    thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    const sign = number < 0 ? "-" : "";
    const i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    const j = (j = i.length) > 3 ? j % 3 : 0;

    return sign +
        (j ? i.substr(0, j) + thouSep : "") +
        i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
        (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

function dataTableFrWithExportsButtons(id, objects) {
    return $('#' + id).DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Copier',
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            },
            {
                text: 'CSV',
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            }, {
                text: 'Excel',
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                text: 'JSON',
                action: function (e, dt, button, config) {
                    const data = dt.buttons.exportData();

                    $.fn.dataTable.fileSave(
                        new Blob([JSON.stringify(data)]),
                        objects + '.json'
                    );
                }
            },
            {
                text: 'Cacher/Afficher Colonnes',
                extend: 'colvis'
            },
            {
                text: 'Imprimer (PDF)',
                extend: 'print',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        colReorder: {
            realtime: true
        },
        rowReorder: {
            selector: 'tr'
        },
        "language": {
            "previous": "Précedent",
            "next": "Suivant",
            "lengthMenu": "Afficher  _MENU_  " + objects,
            "info": "  Affichage de _START_ à _END_ de _TOTAL_ " + objects,
            "emptyTable": "Aucune donnée disponible.",
            "zeroRecords": "Aucune donnée disponible.",
            "infoEmpty": "",
            "infoFiltered": " - recherche sur _MAX_ " + objects,
            "search": "Rechercher : ",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        }
    });
}

function dataTableFrWithExportsButtonsScroll(id, objects, scroll) {
    return $('#' + id).DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Copier',
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            },
            {
                text: 'CSV',
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            }, {
                text: 'Excel',
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                text: 'JSON',
                action: function (e, dt, button, config) {
                    const data = dt.buttons.exportData();

                    $.fn.dataTable.fileSave(
                        new Blob([JSON.stringify(data)]),
                        objects + '.json'
                    );
                }
            },
            {
                text: 'Cacher/Afficher Colonnes',
                extend: 'colvis'
            },
            {
                text: 'Imprimer (PDF)',
                extend: 'print',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        colReorder: {
            realtime: true
        },
        rowReorder: {
            selector: 'tr'
        },
        scrollY: scroll,
        paging: false,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "language": {
            "previous": "Précedent",
            "next": "Suivant",
            "lengthMenu": "Afficher  _MENU_  " + objects,
            "info": "Affchage de _START_ à _END_ de _TOTAL_ " + objects,
            "emptyTable": "Aucune donnée disponible.",
            "zeroRecords": "Aucune donnée disponible.",
            "infoEmpty": "",
            "infoFiltered": " - recherche sur _MAX_ " + objects,
            "search": "Rechercher : ",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        }
    });
}

function dataTableFrWithExportsButtonsScrollAdvancedSearchSelect(id, objects, scroll) {
    return $('#' + id).DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Copier',
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            },
            {
                text: 'CSV',
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            }, {
                text: 'Excel',
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                text: 'JSON',
                action: function (e, dt, button, config) {
                    const data = dt.buttons.exportData();

                    $.fn.dataTable.fileSave(
                        new Blob([JSON.stringify(data)]),
                        objects + '.json'
                    );
                }
            },
            {
                text: 'Cacher/Afficher Colonnes',
                extend: 'colvis'
            },
            {
                text: 'Imprimer (PDF)',
                extend: 'print',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        colReorder: {
            realtime: true
        },
        rowReorder: {
            selector: 'tr'
        },
        scrollY: scroll,
        paging: false,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "language": {
            "previous": "Précedent",
            "next": "Suivant",
            "lengthMenu": "Afficher  _MENU_  " + objects,
            "info": "Affchage de _START_ à _END_ de _TOTAL_ " + objects,
            "emptyTable": "Aucune donnée disponible.",
            "zeroRecords": "Aucune donnée disponible.",
            "infoEmpty": "",
            "infoFiltered": " - recherche sur _MAX_ " + objects,
            "search": "Rechercher : ",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        },
        initComplete: function () {
            this.api().columns().every(function () {
                const column = this;
                const select = $('<select class="form-control form-control-sm"><option value=""></option></select>')
                    .appendTo($(column.footer()).empty())
                    .on('change', function () {
                        const val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        }
    });
}

function dataTableFrWithExportsButtonsAdvancedSearch(id, objects, scroll) {

    // Setup - add a text input to each footer cell
    $('#' + id + ' tfoot th').each(function () {
        $(this).html('<input type="text" class="form-control" placeholder="' + $(this).text() + '" />');
    });

    const table = $('#' + id).DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Copier',
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            },
            {
                text: 'CSV',
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            }, {
                text: 'Excel',
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                text: 'JSON',
                action: function (e, dt, button, config) {
                    const data = dt.buttons.exportData();

                    $.fn.dataTable.fileSave(
                        new Blob([JSON.stringify(data)]),
                        objects + '.json'
                    );
                }
            },
            {
                text: 'Cacher/Afficher Colonnes',
                extend: 'colvis'
            },
            {
                text: 'Imprimer (PDF)',
                extend: 'print',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        colReorder: {
            realtime: true
        },
        rowReorder: {
            selector: 'tr'
        },
        // scrollY: scroll,
        // paging: false,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "language": {
            "previous": "Précedent",
            "next": "Suivant",
            "lengthMenu": "Afficher  _MENU_  " + objects,
            "info": "Affchage de _START_ à _END_ de _TOTAL_ " + objects,
            "emptyTable": "Aucune donnée disponible.",
            "zeroRecords": "Aucune donnée disponible.",
            "infoEmpty": "",
            "infoFiltered": " - recherche sur _MAX_ " + objects,
            "search": "Rechercher : ",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        }
    });

    // Apply the search
    table.columns().every(function () {
        const that = this;

        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });

    return table;
}

function dataTableFrWithExportsButtonsScrollAdvancedSearch(id, objects, scroll) {

    // Setup - add a text input to each footer cell
    $('#' + id + ' tfoot th').each(function () {
        $(this).html('<input type="text" class="form-control" placeholder="' + $(this).text() + '" />');
    });

    const table = $('#' + id).DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Copier',
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            },
            {
                text: 'CSV',
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            }, {
                text: 'Excel',
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                text: 'JSON',
                action: function (e, dt, button, config) {
                    const data = dt.buttons.exportData();

                    $.fn.dataTable.fileSave(
                        new Blob([JSON.stringify(data)]),
                        objects + '.json'
                    );
                }
            },
            {
                text: 'Cacher/Afficher Colonnes',
                extend: 'colvis'
            },
            {
                text: 'Imprimer (PDF)',
                extend: 'print',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        colReorder: {
            realtime: true
        },
        rowReorder: {
            selector: 'tr'
        },
        scrollY: scroll,
        paging: false,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "language": {
            "previous": "Précedent",
            "next": "Suivant",
            "lengthMenu": "Afficher  _MENU_  " + objects,
            "info": "Affchage de _START_ à _END_ de _TOTAL_ " + objects,
            "emptyTable": "Aucune donnée disponible.",
            "zeroRecords": "Aucune donnée disponible.",
            "infoEmpty": "",
            "infoFiltered": " - recherche sur _MAX_ " + objects,
            "search": "Rechercher : ",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        }
    });

    // Apply the search
    table.columns().every(function () {
        const that = this;

        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();
            }
        });
    });

    return table;
}

function dataTableFrWithExportsButtonsScrollSelect(id, objects, scroll) {
    return $('#' + id).DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Copier',
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            },
            {
                text: 'CSV',
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            }, {
                text: 'Excel',
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                text: 'JSON',
                action: function (e, dt, button, config) {
                    const data = dt.buttons.exportData();

                    $.fn.dataTable.fileSave(
                        new Blob([JSON.stringify(data)]),
                        objects + '.json'
                    );
                }
            },
            {
                text: 'Cacher/Afficher Colonnes',
                extend: 'colvis'
            },
            {
                text: 'Imprimer (PDF)',
                extend: 'print',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                text: 'Selection',
                extend: 'selected'
            },
            {
                text: 'Selection Unique',
                extend: 'selectedSingle'
            },
            {
                text: 'Selectionnez Tous',
                extend: 'selectAll'
            },
            {
                text: 'Annuler la sélection',
                extend: 'selectNone'
            },
            {
                text: 'Selection des lignes',
                extend: 'selectRows'
            },
            {
                text: 'Selection des Colonnes',
                extend: 'selectColumns'
            },
            {
                text: 'Selection des Cellules',
                extend: 'selectCells'
            }
        ],
        colReorder: {
            realtime: true
        },
        rowReorder: {
            selector: 'tr'
        },
        select: true,
        scrollY: scroll,
        paging: false,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "language": {
            "previous": "Précedent",
            "next": "Suivant",
            "lengthMenu": "Afficher  _MENU_  " + objects,
            "info": "Affchage de _START_ à _END_ de _TOTAL_ " + objects,
            "emptyTable": "Aucune donnée disponible.",
            "zeroRecords": "Aucune donnée disponible.",
            "infoEmpty": "",
            "infoFiltered": " - recherche sur _MAX_ " + objects,
            "search": "Rechercher : ",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        }
    });
}

function dataTableFrWithScrollSelect(id, objects, scroll) {
    return $('#' + id).DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Cacher/Afficher Colonnes',
                extend: 'colvis'
            },
            {
                text: 'Selection',
                extend: 'selected'
            },
            {
                text: 'Selection Unique',
                extend: 'selectedSingle'
            },
            {
                text: 'Selectionnez Tous',
                extend: 'selectAll'
            },
            {
                text: 'Annuler la sélection',
                extend: 'selectNone'
            },
            {
                text: 'Selection des lignes',
                extend: 'selectRows'
            },
            {
                text: 'Selection des Colonnes',
                extend: 'selectColumns'
            },
            {
                text: 'Selection des Cellules',
                extend: 'selectCells'
            }
        ],
        colReorder: {
            realtime: true
        },
        rowReorder: {
            selector: 'tr'
        },
        select: true,
        scrollY: scroll,
        paging: false,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "language": {
            "previous": "Précedent",
            "next": "Suivant",
            "lengthMenu": "Afficher  _MENU_  " + objects,
            "info": "Affchage de _START_ à _END_ de _TOTAL_ " + objects,
            "emptyTable": "Aucune donnée disponible.",
            "zeroRecords": "Aucune donnée disponible.",
            "infoEmpty": "",
            "infoFiltered": " - recherche sur _MAX_ " + objects,
            "search": "Rechercher : ",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        }
    });
}

function unEscapeHtml(value) {
    return value.replace(/[\u00A0-\u9999<>\&]/gim, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    });
}

function waitSeconds(seconds, func) {
    setTimeout(func(), seconds);
}

function dataTableFrWithExportsButtonsScrollResponsive(id, objects, scroll) {
    return $('#' + id).DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                text: 'Copier',
                extend: 'copyHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            },
            {
                text: 'CSV',
                extend: 'csvHtml5',
                exportOptions: {
                    columns: [':visible']
                }
            }, {
                text: 'Excel',
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                }
            },
            {
                text: 'JSON',
                action: function (e, dt, button, config) {
                    const data = dt.buttons.exportData();

                    $.fn.dataTable.fileSave(
                        new Blob([JSON.stringify(data)]),
                        objects + '.json'
                    );
                }
            },
            {
                text: 'Cacher/Afficher Colonnes',
                extend: 'colvis'
            },
            {
                text: 'Imprimer (PDF)',
                extend: 'print',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ],
        colReorder: {
            realtime: true
        },
        rowReorder: {
            selector: 'tr'
        },
        scrollY: scroll,
        paging: false,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                type: ''
            }
        },
        "language": {
            "previous": "Précedent",
            "next": "Suivant",
            "lengthMenu": "Afficher  _MENU_  " + objects,
            "info": "Affchage de _START_ à _END_ de _TOTAL_ " + objects,
            "emptyTable": "Aucune donnée disponible.",
            "zeroRecords": "Aucune donnée disponible.",
            "infoEmpty": "",
            "infoFiltered": " - recherche sur _MAX_ " + objects,
            "search": "Rechercher : ",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        }
    });
}

function dataTableFrById(id, objects) {
    return $('#' + id).DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "language": {
            "previous": "Précedent",
            "next": "Suivant",
            "lengthMenu": "Afficher  _MENU_  " + objects,
            "info": "Affchage de _START_ à _END_ de _TOTAL_ " + objects,
            "emptyTable": "Aucune donnée disponible.",
            "zeroRecords": "Aucune donnée disponible.",
            "infoEmpty": "",
            "infoFiltered": " - recherche sur _MAX_ " + objects,
            "search": "Rechercher : ",
            "paginate": {
                "previous": "Précédent",
                "next": "Suivant"
            }
        }
    });
}

function dataTableFrByClass(className, objects) {
    const ids = $('.' + className).map(function () {
        return $(this).attr('id');
    }).get();

    $.each(ids, function (key, value) {
        $('#' + value).DataTable({
            "paging": true,
            "lengthChange": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "autoWidth": false,
            "language": {
                "previous": "Précedent",
                "next": "Suivant",
                "lengthMenu": "Afficher  _MENU_  " + objects,
                "info": "Affchage de _START_ à _END_ de _TOTAL_ " + objects,
                "emptyTable": "Aucune donnée disponible.",
                "zeroRecords": "Aucune donnée disponible.",
                "infoEmpty": "",
                "infoFiltered": " - recherche sur _MAX_ " + objects,
                "search": "Rechercher : ",
                "paginate": {
                    "previous": "Précédent",
                    "next": "Suivant"
                }
            }
        });
    });

}

function dataEventTargetElisis(event, name) {
    return event.currentTarget.dataset[name];
}

function getYear() {
    return new Date().getFullYear();
}

function getMonth() {
    return new Date().getMonth();
}

function getDay() {
    return new Date().getDay();
}

function getMonthName() {
    return new Date().getMonthName();
}

function getDayName() {
    return new Date().getDayName();
}

function getDate() {
    return new Date().getDate();
}

function utcDate() {
    return new Date().getUTCDate();
}

function utcDay() {
    return new Date().getUTCDay();
}

function setInputDateTimeLocalToNow(id) {
    $('#id').val(d.getFullYear() + "-" + zeroPadded(d.getMonth() + 1) + "-"
        + zeroPadded(d.getDate()) + "T" + zeroPadded(d.getHours()) + ":" + zeroPadded(d.getMinutes()) +
        ":" + zeroPadded(d.getSeconds()));
}

function getDateTimeLocalToString(year, month, date, hour, min, sec) {
    return year + "-" + zeroPadded(month) + "-"
        + zeroPadded(date) + "T" + zeroPadded(hour) + ":" + zeroPadded(min) +
        ":" + zeroPadded(sec);
}

function setInputDateTimeLocal(inputId, year, month, date, hour, min, sec) {
    $('#' + inputId).val(getDateTimeLocalToString(year, month, date, hour, min, sec));
}

function utcFullYear() {
    return new Date().getUTCFullYear();
}

function utcHours() {
    return new Date().getUTCHours();
}

function chooseSelectByText(selectId, text) {
    $("#" + selectId).filter(function () {
        return this.text === text;
    }).attr('selected', true);
}

function chooseSelect2ByText(selectId, text) {
    const select2 = $('#' + selectId);
    select2.filter(function () {
        return this.text === text;
    }).attr('selected', true);
    select2.trigger('change');
}

function chooseSelectByVal(selectId, value) {
    $("#" + selectId).filter(function () {
        return this.val() === value;
    }).attr('selected', true);
}

function printDiv(printAreaId) {
    const printContents = document.getElementById(printAreaId).innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

function pNotifyResult(results) {
    if (ajaxResultIsOkay(results))
        pNotifySimpleSuccess(getAjaxMessage(results));
    else
        pNotifySimpleError(getAjaxMessage(results));
}

function pNotifyResultWarn(results) {
    if (ajaxResultIsOkay(results))
        pNotifySimpleSuccess(getAjaxMessage(results));
    else
        pNotifySimpleWarning(getAjaxMessage(results));
}

function pNotifySimpleSuccess(message) {
    new PNotify({
        text: "" + message + "",
        icon: 'icofont icofont-check-circled',
        type: 'success'
    });
}

function pNotifySimpleSuccessWithTitle(title, message) {
    new PNotify({
        title: title,
        text: "" + message + "",
        icon: 'icofont icofont-check-circled',
        type: 'success'
    });
}

function redirectTo(link) {
    window.location.href = link;
}

function pNotifySimpleWarningWithTitle(title, message) {
    new PNotify({
        title: title,
        text: "" + message + "",
        icon: 'icofont icofont-warning',
        type: 'warning'
    });
}

function testLocalization(messageSuccess, messageFail, isWarning) {
    if ("geolocation" in navigator) {
        if (!isEmptyValue(messageSuccess))
            pNotifySimpleSuccess(messageSuccess);
        return true;
    } else {
        if (isWarning)
            pNotifySimpleWarning(messageFail);
        else
            pNotifySimpleError(messageFail);
        return false;
    }
}

function pNotifySimpleWarning(message) {
    if (message === undefined) {
        pNotifyUnknownException();
    } else
        new PNotify({
            text: "" + message + "",
            icon: 'icofont icofont-warning',
            type: 'warning'
        });
}

function pNotifySimpleInfo(message) {
    if (message === undefined) {
        pNotifyUnknownException();
    } else
        new PNotify({
            text: "" + message + "",
            icon: 'icofont icofont-warning',
            type: 'info'
        });
}

function pNotifySimpleInfoWithTitle(title, message) {
    if (message === undefined) {
        pNotifyUnknownException();
    } else
        new PNotify({
            title: title,
            text: "" + message + "",
            icon: 'icofont icofont-warning',
            type: 'info'
        });
}

function pNotifyUnknownException(message) {
    if (typeof message === 'undefined') {
        if (navigator.onLine) {
            pNotifySimpleError('Une erreur indéfinie s\'est produite.' +
                '<br><br>Votre session a expiré ou vous n\'avez pas le droit ' +
                ' d\'interagir avec cette page.' +
                '<br><br> Rechargez la page');
        } else {
            pNotifySimpleError('Il semblerait que vous ne soyez pas connecté à Internet.' +
                '<br><br>L\'erreur est peut être dû à cela. ' +
                '<br><br> Ou votre session a expiré ou vous n\'avez pas le droit ' +
                ' d\'interagir avec cette page.' +
                '<br><br> Rechargez la page');
        }
    }
    else
        pNotifySimpleError(message);
}
function pNotifyUnknownExceptionWarn(message) {
    if (typeof message === 'undefined') {
        if (navigator.onLine) {
            pNotifySimpleWarning('Une erreur indéfinie s\'est produite.' +
                '<br><br>Votre session a expiré ou vous n\'avez pas le droit ' +
                ' d\'interagir avec cette page.' +
                '<br><br> Rechargez la page');
        } else {
            pNotifySimpleWarning('Il semblerait que vous ne soyez pas connecté à Internet.' +
                '<br><br>L\'erreur est peut être dû à cela. ' +
                '<br><br> Ou votre session a expiré ou vous n\'avez pas le droit ' +
                ' d\'interagir avec cette page.' +
                '<br><br> Rechargez la page');
        }
    }
    else
        pNotifySimpleWarning(message);
}

function hostReachable() {
    const xhr = new (window.ActiveXObject || XMLHttpRequest)("Microsoft.XMLHTTP");
    let status;

    xhr.open("HEAD", "//" + window.location.hostname + "/?rand=" + Math.floor((1 + Math.random()) * 0x10000), false);

    try {
        xhr.send();
        return (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304);
    } catch (error) {
        return false;
    }
}

function pNotifySimpleError(message) {
    if (message === undefined) {
        pNotifyUnknownException();
    } else
        new PNotify({
            text: "" + message + "",
            icon: 'icofont icofont-close-circled',
            type: 'error'
        });
}

function pNotifySimple(actionResult, message) {
    if (actionResult) {
        pNotifySimpleSuccess(message);
    } else {
        pNotifySimpleError(message);
    }
}

function pNotifySimpleWarn(actionResult, message) {
    if (actionResult) {
        pNotifySimpleSuccess(message);
    } else {
        pNotifySimpleWarning(message);
    }
}

function isEmptyInput(id) {
    return isEmptyInputElement($('#' + id));
}

function isEmptyInputElement(element) {
    return isEmptyValue(element.val());
}

function radioInputValue(name) {
    return $('input[name=' + name + ']:checked').val();
}

function isChecked(id) {
    return $('#' + id).is( ":checked" );
}

function hidden(id, value) {
    $('#' + id).prop('hidden', value);
}

function hiddenEl(el, value) {
    el.prop('hidden', value);
}

function value(id) {
    return $('#' + id).val();
}

function valueText(id) {
    return $('#' + id).text();
}

function objectLengthSafe(object) {
    Object.size = function (obj) {
        let size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

// Get the size of an object
    return Object.size(object);
}

function objectLength(object) {
    if (object === undefined || object === null)
        return 0;

    if (!Object.keys) {
        Object.keys = function (object) {
            const keys = [];
            let k;
            for (k in object) {
                if (Object.prototype.hasOwnProperty.call(object, k)) {
                    keys.push(k);
                }
            }
            return keys;
        };
    }

    return Object.keys(object).length;
}

function isEmptyValue(value) {
    if (value === undefined || value === null)
        return true;
    const finalValue = value.replace('/ /', '');
    return finalValue.length === 0 || finalValue === '' || finalValue === ' ';
}

function removeFromAList(list, toRemove) {
    const index = list.indexOf(toRemove);
    if (index > -1) {
        list.splice(index, 1);
    }
    return list;
}

function listContains(list, value) {
    let contains = false;
    list.forEach(function (val) {
        if (val === value) {
            contains = true;
        }
    });
    return contains;
}

function equalsInput(id, valueInput) {
    const finalValue = value(id);
    return finalValue === valueInput || finalValue == valueInput;
}

function equalsValues(value1, value2) {
    return value1 === value2 || (value1 + "") === (value2 + "");
}

function removeStr(initial, toRemove) {
    return initial.replace(toRemove, '');
}

function equals(value1, value2) {
    return value1 === value2 || (value1 + "") === (value2 + "");
}

function parseToTwoFloat(number) {
    return Math.round(number * 100) / 100;
}

function setValue(id, value) {
    $('#' + id).val(value);
}

function resetValue(id) {
    $('#' + id).val('');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setValueFromMap(id, map, element) {
    setValue(id, map[element]);
}

function setHtmlFromMap(id, map, element) {
    setHtml(id, map[element]);
}

function setValueFromMapSelect(id, map, element) {
    setValue(id, map[element]);
    $('#' + id).trigger('change');
}

function enableElement(id) {
    $('#' + id).prop('disabled', false);
}

function disableElement(id) {
    $('#' + id).prop('disabled', true);
}

function setValueResults(id, results, element) {
    $('#' + id).val(results[element]);
}

function setHtml(id, value) {
    $('#' + id).html(value);
}

function validateInput(id) {
    return validateInputElement($('#' + id));
}

function validateFileInput(id) {
    const inputFile = $('#' + id);
    if (inputFile.get(0).files.length === 0) {
        invalidateInputElement(inputFile);
        return false;
    }
    return true;
}

function resetValidationInput(id) {
    resetValidationInputElement($('#' + id));
}

function resetValidationInputElement(element) {
    element.css('border-color', '');
    element.css('border-width', '');
    element.css('border-style', '');
}

function invalidateInput(id) {
    invalidateInputElement($('#' + id));
}

function invalidateInputElement(element) {
    element.css('border-color', 'red');
    element.css('border-width', '2px');
    element.css('border-style', 'solid');
    element.focus();
}

function validateInputElement(element) {
    if (isEmptyInputElement(element)) {
        element.css('border-color', 'red');
        element.css('border-width', '2px');
        element.css('border-style', 'solid');
        element.focus();
        return false;
    }
    return true;
}


function validateFormClass(class_) {
    let isValidate = true;
    $('.' + class_).each(function (i, element) {
        isValidate = validateInputElement($(element));
        if (!isValidate)
            return false;
    });
    return isValidate;
}

function resetInputs() {
    $('input').on('enter input edit change', function (e) {
        resetValidationInputElement($(this));
    });
    $('textarea').on('enter input edit change', function (e) {
        resetValidationInputElement($(this));
    })
}

function resetInputsNow() {
    resetValidationInputElement($('input'));
    resetValidationInputElement($('textarea'));
}

function ajaxResultIsOkay(response) {
    return (response['result'] === true || response['result'] === 'true');
}

function ajaxResultIsFail(response) {
    return (response['result'] === false || response['result'] === 'false');
}

function getAjaxMessage(response) {
    return response['message'];
}

function isURL(url) {
    return url.match(new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi))
}

function createMap() {
    return new Map();
}

function addInputValueToMap(map, id) {
    map.set(id, value(id));
    return map;
}

function ajaxCall(type, url, map, functionSuccess, functionError, functionException) {
    $.ajax({
        url: url,
        type: type,
        data: {
            params: map
        },

        success: function (results) {
            if (ajaxResultIsOkay(results)) {
                functionSuccess();
            } else {
                functionError();
            }

            return results;
        },

        error: function (results) {
            functionException();
            return results;
        }
    });
}

function ajaxResultsId(url, id) {
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            id: id
        },

        success: function (results) {
            if (ajaxResultIsOkay(results)) {
                return results;
            } else {
                pNotifySimpleWarning(getAjaxMessage(results));
            }
        },

        error: function () {
            pNotifyUnknownException();
        }
    });
}

function ajaxCallPost(url, map, functionSuccess, functionError, functionException) {
    ajaxCall('POST', url, map, functionSuccess, functionError, functionException);
}

function ajaxCallGet(url, map, functionSuccess, functionError, functionException) {
    ajaxCall('GET', url, map, functionSuccess, functionError, functionException);
}

function addSpinner(id) {
    const element = $('#' + id);
    const html = element.html();
    element.html('');
    element.append(createSpinner(id));
    return html;
}

function addSpinnerAndRemove(id, timeout) {
    const element = $('#' + id);
    const html = element.html();
    setTimeout(function () {
        removeSpinner(id, html);
    }, timeout);
    element.html('');
    element.append(createSpinner(id));
}

function doWhen(when, functionSuccess, functionError) {
    if (when)
        functionSuccess();
    else
        functionError();
}

function removeSpinner(id, html) {
    const element = $('#' + id);
    element.remove('#' + id + spinnerAd);
    element.html(html);
}

function createSpinner(id) {
    return '<i id="' + id + spinnerAd + '" class="kt-spinner kt-spinner--sm kt-spinner--light"></i>'
}

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element);
    node.classList.add('animate', animationName);

    function handleAnimationEnd() {
        node.classList.remove('animate', animationName);
        node.removeEventListener('animationend', handleAnimationEnd);

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

var spinnerAd = "-spinner";

const bootstrapSpinner = '<span class="spinner-border spinner-border-md" role="status" aria-hidden="true"></span>';

let lastBtnHtmlMap= new Map();

function btnLoadStart(btnId) {
    const button = $('#' + btnId);
    button.prop('disabled', true);
    lastBtnHtmlMap.set(btnId, button.html());
    button.html(bootstrapSpinner);
}

function btnLoadStartEl(btnEl) {
    btnEl.prop('disabled', true);
    lastBtnHtmlMap.set(btnEl.attr('id'), btnEl.html());
    btnEl.html(bootstrapSpinner);
}

function btnLoadStop(btnId) {
    const button = $('#' + btnId);
    button.html(lastBtnHtmlMap.get(btnId));
    button.prop('disabled', false);
}

function btnLoadStopEl(btnEl) {
    btnEl.html(lastBtnHtmlMap.get(btnEl.attr('id')));
    btnEl.prop('disabled', false);
}

function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function filePondInitFr(id, fileLabel, maxSize) {
    FilePond.registerPlugin(
        FilePondPluginFileValidateType,
        FilePondPluginImageExifOrientation,
        FilePondPluginImagePreview,
        FilePondPluginImageCrop,
        FilePondPluginImageResize,
        FilePondPluginImageTransform,
        FilePondPluginImageEdit,
        FilePondPluginFileEncode
    );

    return FilePond.create(
        document.querySelector('#' + id),
        {
            maxFiles: maxSize,
            allowBrowse: true,
            allowMultiple: true,
            required: true,
            allowDrop: true,
            allowReplace: true,
            allowRevert: true,
            labelInvalidField: 'Les ' + fileLabel + 's choisis ne sont pas dans le bon format.',
            labelFileSizeNotAvailable: 'Le fichier a une trog grande taille (5Mb maximum)',
            labelFileLoading: 'Chargement',
            labelTapToCancel: 'Cliquez pour annuler',
            labelButtonRemoveItem: 'Supprimer',
            labelIdle: 'Glisser & Déposer ' + fileLabel + ' ou <span class="filepond--label-action"> Explorer </span>'
        }
    );
}

function bAlertF(message, aFunction) {
    bootbox.alert(message, aFunction());
}

function bAlert(message) {
    bootbox.alert(message, function () {
        return true;
    });
}

function bAlertAdv(size, title, message) {
    bootbox.alert({
        size: size,
        title: title,
        locale: 'fr',
        message: message,
        callback: function () {
            return true;
        }
    })
}

function bAlertAdvF(size, title, message, aFunction) {
    bootbox.alert({
        size: size,
        locale: 'fr',
        title: title,
        message: message,
        callback: aFunction()
    })
}

function bConfirm(message) {
    bootbox.confirm(message, function (result) {
        return result;
    })
}

function bConfirmAdv(size, message) {
    bootbox.confirm({
        size: size,
        locale: 'fr',
        message: message,
        callback: function (result) {
            return result;
        }
    })
}

function select2ValuesEmpty(element2) {
    return element2.find(':selected').length === 0;
}

function resetSelect2Values(id) {
    $('#' + id).html('').select2({data: [{id: '', text: ''}]});
}

function setSelect2ValuesByMap(map, id) {
    resetSelect2Values(id);
    const select2El = $('#' + id);
    $.each(map, function (id, value) {
        select2El.append(new Option(value, id, false, false));
    });
    select2El.val(null).trigger('change');
}

const sizes = ['small', 'sm', 'large', 'lg', 'xl', 'extra-large'];

function bDialogFr(message, size, successFunction) {
    bootbox.dialog({
        locale: 'fr',
        message: message,
        size: size,
        onEscape: true,
        backdrop: true,
        buttons: {
            cancel: {
                label: 'Annuler',
                className: 'btn-warning',
                callback: function () {
                    return true;
                }
            },
            yes: {
                label: 'Oui',
                className: 'btn-success',
                callback: function () {
                    successFunction();
                    return true;
                }
            }
        }
    })
}

function bDialogFr2(message, size, yesFunction, noFunction) {
    bootbox.dialog({
        locale: 'fr',
        message: message,
        size: size,
        onEscape: true,
        backdrop: true,
        buttons: {
            cancel: {
                label: 'Annuler',
                className: 'btn-warning',
                callback: function () {
                    return true;
                }
            },
            no: {
                label: 'Non',
                className: 'btn-outline-info',
                callback: function () {
                    noFunction();
                    return true;
                }
            },
            yes: {
                label: 'Oui',
                className: 'btn-success',
                callback: function () {
                    yesFunction();
                    return true;
                }
            }
        }
    })
}

function getSelect2ElValues(element2) {
    const actualValues = element2.find(':selected');
    const valuesTab = [];
    for (let i = 0; i < actualValues.length; i++) {
        valuesTab.push(actualValues[i].value);
    }
    return valuesTab;
}

function getSelectedText(id) {
    return $('#' + id + ' option:selected').text()
}

function getSelected2Text(id) {
    const data = $('#' + id).select2('data');
    return data.text;
    //return $('#' + id + ' option:selected').text()
}

function bConfirmDialog(message, falseLabel, trueLabel) {
    bootbox.confirm({
        message: message,
        buttons: {
            confirm: {
                label: trueLabel,
                className: 'btn-success'
            },
            cancel: {
                label: falseLabel,
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            return true;
        }
    });
}

function fakeLoader(spinnerNb, timeToHide, rgbColor) {
    $.fakeLoader({
        'bgColor': rgbColor,
        'spinner': 'spinner' + spinnerNb,
        'timeToHide': timeToHide
    });
}

const cookieBubblePosition = ['bottom-left', 'bottom-center', 'bottom-right', 'top-left', 'top-center', 'top-right'];

function cookieBubbleDialog(message, position, age, okText, delay, cookiePolicyURL) {
    $.cookieBubble({
        messageText: message,
        cookiePolicyButtonTarget: '_blank',
        boxPosition: position,
        iconVisibility: false,
        cookieMaxAge: age,
        buttonText: okText,
        boxAppearDelay: delay,
        cookiePolicyButtonUrl: cookiePolicyURL
    });
}

function scrollToElId(id) {
    scrollToItem(document.getElementById(id));
}

function scrollToItem(item) {
    const diff = (item.offsetTop - window.scrollY) / 8;
    if (Math.abs(diff) > 1) {
        window.scrollTo(0, (window.scrollY + diff));
        clearTimeout(window._TO);
        window._TO = setTimeout(scrollToItem, 30, item)
    } else {
        window.scrollTo(0, item.offsetTop)
    }
}

function unblockEl(blockEl) {
    if (blockEl !== undefined && blockEl !== null) {
        try {
            blockEl.unblock();
        } catch (e) {
            console.log(e);
        }
    }
    return undefined;
}

function onModalShow(modalId, fn) {
    $('#' + modalId).on('shown.bs.modal', fn());
}

function blockUIElisisColorNoTimer(id, message, color) {
    const block = ('#' + id);
    return $(block).block({
        message: '<span class="font-weight-semibold"><i class="icon-spinner4 spinner mr-2"></i>&nbsp; '
            + message + '</span>',
        overlayCSS: {
            backgroundColor: color,
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            width: 'auto',
            '-webkit-border-radius': 2,
            '-moz-border-radius': 2,
            padding: 0,
            border: 0,
            backgroundColor: 'transparent'
        }
    });
}

function blockUIElisisColor(id, message, time, color) {
    const block = ('#' + id);
    return $(block).block({
        message: '<span class="font-weight-semibold"><i class="icon-spinner4 spinner mr-2"></i>&nbsp; '
            + message + '</span>',
        timeout: time,
        overlayCSS: {
            backgroundColor: color,
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            width: 'auto',
            '-webkit-border-radius': 2,
            '-moz-border-radius': 2,
            padding: 0,
            border: 0,
            backgroundColor: 'transparent'
        }
    });
}

function blockUIElisis(id, message, time) {
    const block = ('#' + id);
    return $(block).block({
        message: '<span class="font-weight-semibold"><i class="icon-spinner4 spinner mr-2"></i>&nbsp; '
            + message + '</span>',
        timeout: time,
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            width: 'auto',
            '-webkit-border-radius': 2,
            '-moz-border-radius': 2,
            padding: 0,
            border: 0,
            backgroundColor: 'transparent'
        }
    });
}

function blockUIElisisNoTimer(id, message) {
    const block = ('#' + id);
    return $(block).block({
        message: '<span class="font-weight-semibold"><i class="icon-spinner4 spinner mr-2"></i>&nbsp; '
            + message + '</span>',
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            width: 'auto',
            '-webkit-border-radius': 2,
            '-moz-border-radius': 2,
            padding: 0,
            border: 0,
            backgroundColor: 'transparent'
        }
    });
}

function isListEmpty(elements) {
    return (elements === '' || elements === [] || elements === null || elements === undefined);
}

function isMobileAdvanced() {
    // Check if it is a mobile by testing the userAgent. If it is recognized set the isMobile bool to true
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))); //This is a mobile
}

function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function distance(lat1, lon1, lat2, lon2) {
    const p = 0.017453292519943295;    // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}


function select2BootIssuesResolve() {
    try {
        $.fn.modal.Constructor.prototype.enforceFocus = function () {
        };
    } catch (e) {
    }

    try {
        $.fn.modal.Constructor.prototype._enforceFocus = function () {
        };
    } catch (e) {
    }
}

function generateString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomIntFromInterval(min, max) { // min and max included
    if (min === max)
        return min;
    if (min > max)
        return randomIntFromInterval(max, min);

    return Math.floor(Math.random() * (max - min + 1) + min);
}

function initPasswordPreview(buttonId, passwordInputId) {
    $('#' + buttonId).click(function (e) {
        const actualPassword = $('#' + passwordInputId);
        if (actualPassword.attr('type') === 'password') {
            actualPassword.attr('type', 'text');
            $(this).removeClass('fa-eye-slash');
            $(this).addClass('fa-eye');
        }
        else {
            actualPassword.attr('type', 'password');
            $(this).removeClass('fa-eye');
            $(this).addClass('fa-eye-slash');
        }
    });
}