/// <reference path="../../../scripts/typing/moment/moment.d.ts" />
/// <reference path="../../../scripts/typing/jquery/jquery.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//name: Rozita Calendar
//version : 1.0.0.0
//company: silverpath
//author: Mehdi Radi
var SilverPath;
(function (SilverPath) {
    var Components;
    (function (Components) {
        var RozitaCalendarConst = /** @class */ (function () {
            function RozitaCalendarConst() {
            }
            RozitaCalendarConst.cellDataName = "data";
            RozitaCalendarConst.optionsDataName = "options";
            //attributes
            RozitaCalendarConst.rowNumberAttribName = "row_num";
            RozitaCalendarConst.dataRowNumberAttribName = "data_row_num";
            RozitaCalendarConst.colNumberAttribName = "col_num";
            RozitaCalendarConst.cellDateAttribName = "cell_date";
            RozitaCalendarConst.cellUniqueIdAttribName = "cell_uid";
            RozitaCalendarConst.cellMustMergedAttribName = "must_merged";
            RozitaCalendarConst.cellSourceIdAttribName = "src_id";
            RozitaCalendarConst.cellRootIdAttribName = "root_id";
            RozitaCalendarConst.cellFirstAttribName = "first_cell";
            RozitaCalendarConst.cellTypeAttribName = "cell_type";
            RozitaCalendarConst.rowTypeAttribName = "row_type";
            //class names
            RozitaCalendarConst.calendarClassName = "rozita_calendar";
            RozitaCalendarConst.rtlCalendarClassName = "rozita_calendar_rtl";
            RozitaCalendarConst.headerRowClassName = "header_row";
            RozitaCalendarConst.headerSpecialDayRowClassName = "spd_row";
            RozitaCalendarConst.headerYearRowClassName = "year_row";
            RozitaCalendarConst.headerMonthRowClassName = "month_row";
            RozitaCalendarConst.headerDayRowClassName = "day_row";
            RozitaCalendarConst.headerDayOfWeekRowClassName = "day_of_week_row";
            RozitaCalendarConst.headerCustomFormat1RowClassName = "custom_format_1_row";
            RozitaCalendarConst.headerCustomFormat2RowClassName = "custom_format_2_row";
            //public static headerSpringMonthCellClassName = "cell_root";
            //public static headerSummerMonthsCellClassName = "cell_root";
            //public static headerAutumnMonthsCellClassName = "cell_root";
            //public static headerWinterMonthCellClassName = "cell_root";
            RozitaCalendarConst.headerSpecialDayCellClassName = "spd_day";
            RozitaCalendarConst.headerMonth01CellClassName = "month-01";
            RozitaCalendarConst.headerMonth02CellClassName = "month-02";
            RozitaCalendarConst.headerMonth03CellClassName = "month-03";
            RozitaCalendarConst.headerMonth04CellClassName = "month-04";
            RozitaCalendarConst.headerMonth05CellClassName = "month-05";
            RozitaCalendarConst.headerMonth06CellClassName = "month-06";
            RozitaCalendarConst.headerMonth07CellClassName = "month-07";
            RozitaCalendarConst.headerMonth08CellClassName = "month-08";
            RozitaCalendarConst.headerMonth09CellClassName = "month-09";
            RozitaCalendarConst.headerMonth10CellClassName = "month-10";
            RozitaCalendarConst.headerMonth11CellClassName = "month-11";
            RozitaCalendarConst.headerMonth12CellClassName = "month-12";
            RozitaCalendarConst.cellSaturdayClassName = "cell_saturday";
            RozitaCalendarConst.cellSundayClassName = "cell_sunday";
            RozitaCalendarConst.cellMondayClassName = "cell_monday";
            RozitaCalendarConst.cellTuesdayClassName = "cell_tuesday";
            RozitaCalendarConst.cellWednesdayClassName = "cell_wednesday";
            RozitaCalendarConst.cellThursdayClassName = "cell_thursday";
            RozitaCalendarConst.cellFridayClassName = "cell_friday";
            RozitaCalendarConst.rootCellClassName = "cell_root";
            RozitaCalendarConst.childCellClassName = "cell_child";
            return RozitaCalendarConst;
        }());
        var cellTypes;
        (function (cellTypes) {
            cellTypes[cellTypes["root"] = 0] = "root";
            cellTypes[cellTypes["child"] = 1] = "child";
            cellTypes[cellTypes["offset"] = 2] = "offset";
        })(cellTypes || (cellTypes = {}));
        var rowTypes;
        (function (rowTypes) {
            rowTypes[rowTypes["header"] = 0] = "header";
            rowTypes[rowTypes["offset"] = 1] = "offset";
            rowTypes[rowTypes["data"] = 2] = "data";
            rowTypes[rowTypes["footer"] = 3] = "footer";
        })(rowTypes || (rowTypes = {}));
        var headerRowTypes;
        (function (headerRowTypes) {
            headerRowTypes[headerRowTypes["day"] = 0] = "day";
            headerRowTypes[headerRowTypes["month"] = 1] = "month";
            headerRowTypes[headerRowTypes["year"] = 2] = "year";
            headerRowTypes[headerRowTypes["day_of_week"] = 3] = "day_of_week";
            headerRowTypes[headerRowTypes["custom_format_1"] = 4] = "custom_format_1";
            headerRowTypes[headerRowTypes["custom_format_2"] = 5] = "custom_format_2";
            headerRowTypes[headerRowTypes["special_day"] = 6] = "special_day";
        })(headerRowTypes || (headerRowTypes = {}));
        var RozitaCalendar = /** @class */ (function () {
            function RozitaCalendar(element, options) {
                this.lastRowNumber = 0;
                this.lastDataRowNumber = 0;
                // Merge options
                var mergedOptions = $.extend(RozitaCalendar.defaultOptions, options);
                this.options = mergedOptions;
                this.element = element;
                if (options != null) {
                    this.onCreate();
                }
            }
            RozitaCalendar.prototype.onCreate = function () {
                this.dStart = moment(this.options.startDate);
                this.dFinish = moment(this.options.finishDate);
                //validation
                if (this.dStart.isValid() === false) {
                    throw "start date is not validate";
                }
                //validation
                if (this.dFinish.isValid() === false) {
                    throw "finish date is not validate";
                }
                //validation
                var diffDays = this.dFinish.diff(this.dStart, 'days');
                if (diffDays < 0) {
                    throw "finish date must be bigger than of start date";
                }
                //create table structure
                this.prepareTable();
                //event
                if (this.options.callbacks.tableRendered != null) {
                    var eArgs = {};
                    //if callback field is function
                    if (this.isFunction(this.options.callbacks.tableRendered)) {
                        this.options.callbacks.tableRendered(eArgs);
                    }
                    else {
                        this.executeFunctionByName(this.options.callbacks.tableRendered, window, eArgs);
                    }
                }
            };
            //private setOptions() {
            //    this.element.data(RozitaCalendarConst.optionsDataName, this.options);
            //}
            //private loadOptions() {
            //    var opt = this.element.data(RozitaCalendarConst.optionsDataName);
            //    if (opt != null) {
            //        this.options = opt;
            //    }
            //}
            //private existOptions() {
            //    if (this.element.data(RozitaCalendarConst.optionsDataName) != null) {
            //        return true;
            //    }
            //    return false;
            //}
            RozitaCalendar.prototype.search = function (searchText) {
                var _this = this;
                this.executeAsync(function () {
                    //event
                    if (_this.options.callbacks.eventsSearchingStarted != null) {
                        var eArgs = {
                            cellId: null,
                            event: null
                        };
                        //if callback field is function
                        if (_this.isFunction(_this.options.callbacks.eventsSearchingStarted)) {
                            _this.options.callbacks.eventsSearchingStarted(eArgs);
                        }
                        else {
                            _this.executeFunctionByName(_this.options.callbacks.eventsSearchingStarted, window, eArgs);
                        }
                    }
                    //
                    var isFinished = false;
                    var cellId = null;
                    if (_this.options.events != null) {
                        _this.options.events.forEach(function (item, index) {
                            if (isFinished) {
                            }
                            else {
                                if (item.title != null) {
                                    var res = item.title.toLowerCase().search(searchText);
                                    if (res > 0) {
                                        //location.href = "#" + item.id;
                                        cellId = item.id;
                                        isFinished = true;
                                        //$('.rozita_calendar').animate({
                                        //    scrollTop: $("#" + item.id).offset().top,
                                        //    scrollLeft: $("#" + item.id).offset().left
                                        //}, 500);
                                    }
                                }
                            }
                        });
                    }
                    //event
                    if (_this.options.callbacks.eventsSearchingFinished != null) {
                        var eArgs = {
                            cellId: cellId,
                            event: null
                        };
                        if (cellId != null) {
                            eArgs.event = _this.getRecordByKey(cellId);
                        }
                        //if callback field is function
                        if (_this.isFunction(_this.options.callbacks.eventsSearchingFinished)) {
                            _this.options.callbacks.eventsSearchingFinished(eArgs);
                        }
                        else {
                            _this.executeFunctionByName(_this.options.callbacks.eventsSearchingFinished, window, eArgs);
                        }
                    }
                });
            };
            //?????????? ???????? ????????
            RozitaCalendar.prototype.prepareTable = function () {
                var _this = this;
                //create html table strucure
                this.createStructure();
                //create thead rows
                this.createHeader();
                //
                this.executeAsync(function () {
                    _this.fillData();
                });
            };
            RozitaCalendar.prototype.executeAsync = function (func) {
                setTimeout(func, 0);
            };
            //???? ???????? ?????????????? ???? ????????
            RozitaCalendar.prototype.fillData = function () {
                var _this = this;
                if (this.options.events == null) {
                    return;
                }
                //sort event items by date & order field
                this.sortEvents(this.options.events);
                //put event item in tables one by one
                console.time("events");
                if (this.options.events != null) {
                    this.options.events.forEach(function (item, index) {
                        _this.putEventToCalendar(item);
                    });
                }
                console.timeEnd("events");
                //merge cells
                this.mergeCells();
                //bind jquery event
                this.activeTriggers();
            };
            // ?????????? ???????? ?????????? ?????? ?????? ???? ??????????
            RozitaCalendar.prototype.activeTriggers = function () {
                var _this = this;
                //event click on every cell
                this.element.find("td").on("click", function (clickEvent) {
                    if (_this.options.callbacks.cellClicked != null) {
                        //prepare event arg values
                        var cell = $(clickEvent.currentTarget);
                        var row = _this.getTrByCell(cell);
                        var date = cell.attr(RozitaCalendarConst.cellDateAttribName);
                        var uid = cell.attr(RozitaCalendarConst.cellUniqueIdAttribName);
                        var rowType = row.attr(RozitaCalendarConst.rowTypeAttribName);
                        var cellType = row.attr(RozitaCalendarConst.cellTypeAttribName);
                        var dataItem = cell.data(RozitaCalendarConst.cellDataName);
                        var rootId = cell.attr(RozitaCalendarConst.cellRootIdAttribName);
                        //get root item
                        var rootItem = null;
                        if (rootId != null) {
                            rootItem = _this.getRecordByKey(rootId);
                        }
                        //create eventargs callback
                        var eArgs = {
                            clickEvent: event,
                            date: date,
                            rowType: rowType,
                            cellType: cellType,
                            cellUid: uid,
                            item: dataItem,
                            rootItem: rootItem
                        };
                        //if callback field is function
                        if (_this.isFunction(_this.options.callbacks.cellClicked)) {
                            _this.options.callbacks.cellClicked(eArgs);
                        }
                        else {
                            //window[this.options.callbacks.cellClicked](eArgs);
                            _this.executeFunctionByName(_this.options.callbacks.cellClicked, window, eArgs);
                        }
                    }
                });
            };
            //???????? ???????? ???????? ???? ????????
            RozitaCalendar.prototype.putEventToCalendar = function (item) {
                var _this = this;
                //?????????? ?????????? ???????? ?????? ???????? ???????? ???????? ?????????????? ???????? ???? ????????
                var childLevel = this.countEventMaxChildsLevel(item);
                var dataRowNumber = 1;
                //console.time("find empty row");
                //???????? ???????? ?????? ???????? ???? ???????? ???? ???????? ??????
                //todo ???????? ?????? ???????? ???????? ?????????? ??????
                var startRowNumber = this.findEmptyRowNumber(item.startDate, item.finishDate, dataRowNumber, childLevel);
                //console.timeEnd("find empty row");
                //append base (root) cell
                this.putEventSegmentToCalendar(item.id, item, startRowNumber, cellTypes.root);
                //append childs cell
                //console.time("put child cell");
                //startRowNumber = startRowNumber + 1;
                if (item.childs != null) {
                    item.childs.forEach(function (childItem, index) {
                        _this.putEventSegmentToCalendar(item.id, childItem, startRowNumber, cellTypes.child);
                    });
                }
                //console.timeEnd("put child cell");
                // console.time("put offset");
                //append offset row after rows
                for (var i = 1; i <= this.options.eventOffset; i++) {
                    this.putOffsetToCells(item, startRowNumber);
                }
                //console.timeEnd("put offset");
            };
            // ???????????????? ???????????? ???? ???????? ???? ????????
            RozitaCalendar.prototype.putEventSegmentToCalendar = function (rootId, item, baseDataRowNumber, cellType) {
                var dEventStart = moment(item.startDate);
                var dEventFinish = moment(item.finishDate);
                //?????? ?????????? ???????? ???????????? ??????
                if (dEventStart.isValid() === false) {
                    return;
                }
                //?????? ?????????? ?????????? ???????????? ??????
                if (dEventFinish.isValid() === false) {
                    return;
                }
                //?????? ?????????? ???????? ?? ???? ?????????? ???????? ???? ?????????? ???????? ???????? ???????? ????????
                if (dEventStart.isBefore(this.dStart) && dEventFinish.isBefore(this.dStart)) {
                    return;
                }
                //?????? ?????????? ???????? ?? ???? ?????????? ???????? ???? ?????????? ?????????? ???????? ?????????? ????????
                if (dEventStart.isAfter(this.dFinish) && dEventFinish.isAfter(this.dFinish)) {
                    return;
                }
                //?????? ?????????? ???????? ???????? ???????? ???? ?????????? ???????? ???????? ???????? ?????? ?????????? ?????????? ?????????? ???? ?????????? ???????? ???????? ????????
                if (dEventStart.isBefore(this.dStart)) {
                    //???????? ???????? ?????????? ???????? ???????? ???????????? ?????????? ???????? ????????
                    dEventStart = this.dStart;
                }
                //?????? ?????????? ?????????? ???????? ?????????? ???? ?????????? ?????????? ?????? ???????? ?????? ?????????? ???????? ???????? ???????? ???? ?????????? ?????????? ???????? ????????
                if (dEventFinish.isAfter(this.dFinish)) {
                    //???????? ???????? ?????????? ?????????? ???????? ???????????? ?????????? ?????????? ????????
                    dEventFinish = this.dFinish;
                }
                //???????? ???????? ?????????? ???????? ???????? ???????? ???????????????? ????????????
                var rowNumber = this.findEmptyRowNumber(item.startDate, item.finishDate, baseDataRowNumber, 0);
                //?????????? ?????????? ???? ???????? ???? ??????????
                var diffDays = dEventFinish.diff(dEventStart, 'days');
                var firstCell = null;
                for (var i = 0; i <= diffDays; i++) {
                    var classAttrib = new HtmlClassAttributes();
                    var dCurrent = moment(dEventStart).add(i, 'days');
                    var dCurrentString = dCurrent.format("YYYY/MM/DD");
                    //???????? ???????? ???????? ???? ????????
                    var cell = this.getCellByDate(dCurrentString, rowNumber);
                    if (cell == null) {
                        continue;
                    }
                    //?????? ?????????? ???????? ??????
                    if (i === 0) {
                        firstCell = cell;
                        //firstCell.attr(RozitaCalendarConst.cellTypeAttribName, "root");
                    }
                    //?????? ?????????? ???????? ??????
                    if (i === 0) {
                        this.putDataToCell(cell, item, 'root', rootId);
                    }
                    else {
                        this.putDataToCell(cell, item, 'data', rootId);
                    }
                    //?????? ?????????? ???????? ???????? ???????????? ?????????? ?????? ?????????? ?????????? ??????
                    if (i > 0) {
                        //mark as merge
                        this.markAsMerge(firstCell, cell);
                    }
                    //class
                    if (cellType == cellTypes.root) {
                        classAttrib.add(RozitaCalendarConst.rootCellClassName);
                    }
                    else {
                        classAttrib.add(RozitaCalendarConst.childCellClassName);
                    }
                    //add id to page
                    cell.attr("id", item.id);
                    //???????????? ?????? ???????? ???? ???????? ????
                    cell.addClass(classAttrib.print());
                    //add html attributes
                    if (item.htmlAttributes != null) {
                        for (var key in item.htmlAttributes) {
                            if (item.htmlAttributes.hasOwnProperty(key)) {
                                var val = item.htmlAttributes[key];
                                cell.attr(key, val);
                            }
                        }
                    }
                }
            };
            // ???????? ???????? ?????????????? ???????? ?????? ???????? ???? ????????
            RozitaCalendar.prototype.putDataToCell = function (cellTd, item, cellType, rootId) {
                if (cellTd == null) {
                    return;
                }
                if (item == null) {
                    return;
                }
                //has link or not
                if (item.link != null) {
                    var a = $("<a></a>");
                    a.attr("href", item.link);
                    a.append(item.title);
                    if (item.linkTarget != null) {
                        a.attr("target", item.linkTarget);
                    }
                    cellTd.append(a);
                }
                else {
                    cellTd.html(item.title);
                }
                if (item.noWrap) {
                    //nowrap => no word wrap
                    cellTd.attr("nowrap", "");
                }
                if (item.cssClass != null) {
                    cellTd.addClass(item.cssClass);
                }
                if (item.tooltip != null && item.tooltip != "") {
                    cellTd.attr("title", item.tooltip);
                    //uikit attribute
                    cellTd.attr("data-uk-tooltip", "{cls:'long-text'}");
                }
                cellTd.data(RozitaCalendarConst.cellDataName, item);
                cellTd.attr(RozitaCalendarConst.cellRootIdAttribName, rootId);
                cellTd.attr(RozitaCalendarConst.cellSourceIdAttribName, item.id);
                //cellTd.attr(RozitaCalendarConst.cellHasDataAttribName, "true");
                cellTd.attr(RozitaCalendarConst.cellFirstAttribName, "true");
                cellTd.attr(RozitaCalendarConst.cellTypeAttribName, cellType);
            };
            // ???????? ???????? ???????? ???????? ???????? ???? ????????
            RozitaCalendar.prototype.putOffsetToCells = function (item, baseDataRowNumber) {
                var dStr = moment(item.startDate);
                var dFin = moment(item.finishDate);
                if (dStr.isValid() === false) {
                    return false;
                }
                if (dFin.isValid() === false) {
                    return false;
                }
                if (dStr.isBefore(this.dStart) && dFin.isBefore(this.dStart)) {
                    return false;
                }
                if (dStr.isAfter(this.dFinish) && dFin.isAfter(this.dFinish)) {
                    return false;
                }
                if (dStr.isBefore(this.dStart)) {
                    dStr = this.dStart;
                }
                if (dFin.isAfter(this.dFinish)) {
                    dFin = this.dFinish;
                }
                //???????? ???????? ?????????? ???????? ????????
                var rowNumber = this.findEmptyRowNumber(item.startDate, item.finishDate, baseDataRowNumber, 0);
                var diffDays = dFin.diff(dStr, 'days');
                for (var i = 0; i <= diffDays; i++) {
                    var dCurrent = moment(dStr).add(i, 'days');
                    var dCurrentString = dCurrent.format("YYYY/MM/DD");
                    //get cell from table
                    var cell = this.getCellByDate(dCurrentString, rowNumber);
                    if (cell == null) {
                        continue;
                    }
                    //cell.attr(RozitaCalendarConst.cellOffsetAttribName, "true");
                    //cell.attr(RozitaCalendarConst.cellHasUsedAttribName, "true");
                    cell.attr(RozitaCalendarConst.cellRootIdAttribName, item.id);
                    cell.attr(RozitaCalendarConst.cellTypeAttribName, cellTypes[cellTypes.offset].toString());
                }
            };
            //?????????? ???????? ???? ???????? ???? ???????? ?? ????
            RozitaCalendar.prototype.getTrByCell = function (cell) {
                //???????? ???????? ???????? ???? ???????? ???? ????
                return cell.parents("tr:first");
            };
            //???????? ???? ?????? ?????? ???????? ???? ???? ???? ?????????? ???? ???????????? ?????????? ???????? ???????? ???????? ???????????????? ???????? ???? ???? ???????? ??????
            RozitaCalendar.prototype.findEmptyRowNumber = function (startDate, finishDate, dataRowNum, childLevels) {
                //for (var i = rowNum; i <= rowNum + childLevels; i++) {
                //    if (this.isDataRowExisted(i) == false) {
                //        this.elmTbody.append(this.createNewEventRow());
                //    }
                //}
                var crnDataRowNumber = dataRowNum;
                while (true) {
                    //???? ?????????? ???? ?????????? ???????? ???? ???????? ???????? ?????????? ???? ???????? ???????? ?????????? ???? ??????
                    if (this.isDataRowExisted(crnDataRowNumber) == false) {
                        this.elmTbody.append(this.createNewEventRow());
                    }
                    //???? ???????? ?????????? ?????? ?????????? ???????? ???????? ???????? ???? ???????? ???????? ???????? ???? ????
                    //todo ???????? ?????? ???????? ???????? ?????????? ??????
                    if (this.canPutEvent(startDate, finishDate, crnDataRowNumber, childLevels)) {
                        break;
                    }
                    // ?????? ?????????? ???????? ???? ???? ?????? ?????????? ?????????? ???? ???????? ???????? ?????????? ??????
                    if (crnDataRowNumber > 1000) {
                        break;
                    }
                    //???????????? ?????????? ???????? ???????? ????
                    crnDataRowNumber++;
                }
                return crnDataRowNumber;
            };
            //???? ???????? ?????????? ?????? ???????? ???????? ?????? ???? ???????? ?????????? ???????? ???????? ???? ??????
            RozitaCalendar.prototype.isDataRowExisted = function (dataRowNumber) {
                var res = this.element.find("[" + RozitaCalendarConst.dataRowNumberAttribName + " = '" + dataRowNumber + "']");
                if (res.length > 0) {
                    return true;
                }
                else {
                    return false;
                }
            };
            //???? ???????? ?????????? ?????? ???? ???????? ???? ???????? ?? ???????? ?????? ???????? ?????? ???????? ???? ???? ???????????????? ?????? ???? ????
            RozitaCalendar.prototype.canPutEvent = function (startDate, finishDate, dataRowNum, childLevels) {
                var dEventStart = moment(startDate);
                var dEventFinish = moment(finishDate);
                if (dEventStart.isValid() === false) {
                    return false;
                }
                if (dEventFinish.isValid() === false) {
                    return false;
                }
                if (dEventStart.isBefore(this.dStart) && dEventFinish.isBefore(this.dStart)) {
                    return false;
                }
                if (dEventStart.isAfter(this.dFinish) && dEventFinish.isAfter(this.dFinish)) {
                    return false;
                }
                if (dEventStart.isBefore(this.dStart)) {
                    dEventStart = this.dStart;
                }
                if (dEventFinish.isAfter(this.dFinish)) {
                    dEventFinish = this.dFinish;
                }
                //???? ???????? ?????????? ???????? ???? ???????? ?????????????? ???? ???????? ????????
                for (var j = dataRowNum; j <= dataRowNum + childLevels; j++) {
                    var tr;
                    console.time("while");
                    //?????? ???????? ???? ???? ???? ?????????? ?????????????? ???????? ?????????? ?????????? ???? ???? ?????????? ?????????? ?? ???????? ???????? ?????? ???????? ?????? ???? ????????
                    //todo ???????? ?????? ???????? ???????? ?????????? ??????
                    while (true) {
                        // console.time("getDataTr");
                        tr = this.getDataTr(j);
                        //console.timeEnd("getDataTr");
                        if (tr != null) {
                            break;
                        }
                        else {
                            console.time("createNewEventRow");
                            //todo ???????? ?????? ???????? ???????? ?????????? ??????
                            this.elmTbody.append(this.createNewEventRow());
                            console.timeEnd("createNewEventRow");
                        }
                    }
                    console.timeEnd("while");
                    //?????????? ?????????? ?????? ???? ???????? ???? ??????????
                    var diffDays = dEventFinish.diff(dEventStart, 'days');
                    console.time("for");
                    for (var i = 0; i <= diffDays; i++) {
                        var dCurrent = moment(dEventStart).add(i, 'days');
                        var cell = this.getCellOnTr(tr, dCurrent.format("YYYY/MM/DD"));
                        if (cell == null) {
                            return false;
                        }
                        //???? ???????? ?????????? ???????? ?? ???????? ?????? ?????? ?????????? ?????????? ?? ?????????????? ???????? ??????
                        if (this.hasCellType(cell)) {
                            return false;
                        }
                        //else if (this.hasCellOffset(cell)) {
                        //    return false;
                        //}
                    }
                    console.timeEnd("for");
                }
                return true;
            };
            // ?????????? ???????? ???????? ???? ???????? ?????????? ???????? ????????
            RozitaCalendar.prototype.getDataTr = function (dataRowNumber) {
                var tr = this.element.find("[" + RozitaCalendarConst.dataRowNumberAttribName + "='" + dataRowNumber + "']");
                if (tr.length == 0) {
                    return null;
                }
                return tr;
            };
            //?????????? ???????? ???????? ?????? ???? ???????? ?????????? ??  ??????????
            RozitaCalendar.prototype.getCellByDate = function (date, rowNum) {
                var tr = this.getDataTr(rowNum);
                var cell = this.getCellOnTr(tr, date);
                return cell;
            };
            //?????????? ???????? ?? ???????? ?????? ???? ???? ???????? ???? ???????? ??????
            RozitaCalendar.prototype.getCellOnTr = function (tr, date) {
                if (tr == null) {
                    return null;
                }
                var cell = tr.find("[" + RozitaCalendarConst.cellDateAttribName + "='" + date + "']");
                ;
                if (cell.length === 0) {
                    return null;
                }
                return cell;
            };
            //???????????? ?????????? ?????? ???????? ???????? ?? ???????? ?????? ?????? ?????????? ?????? ??????
            RozitaCalendar.prototype.hasCellType = function (cell) {
                if (cell == null) {
                    return false;
                }
                if (cell.attr(RozitaCalendarConst.cellTypeAttribName) == null ||
                    cell.attr(RozitaCalendarConst.cellTypeAttribName) == "") {
                    return false;
                }
                return true;
            };
            /*
            private hasCellData(cell: JQuery): boolean {
                if (cell == null) {
                    return false;
                }
    
                if (cell.attr(RozitaCalendarConst.cellTypeAttribName)) {
                    return false;
                }
    
                return true;
            }
    
            private hasCellOffset(cell: JQuery): boolean {
                if (cell == null) {
                    return false;
                }
    
                if (cell.attr(RozitaCalendarConst.cellTypeAttribName) == "offset") {
                    return false;
                }
    
                return true;
            }
            */
            //?????????? ?????????? ???????? ?????? ???????? ?????? ??????????
            RozitaCalendar.prototype.markAsMerge = function (firstCell, cell) {
                var sourceId = firstCell.attr(RozitaCalendarConst.cellUniqueIdAttribName);
                cell.attr(RozitaCalendarConst.cellMustMergedAttribName, sourceId);
                //cell.attr(RozitaCalendarConst.cellHasDataAttribName, "true");
                cell.attr(RozitaCalendarConst.cellTypeAttribName, "data");
            };
            //?????????? ???????? ?????? ???????? ??????
            RozitaCalendar.prototype.mergeCells = function () {
                var _this = this;
                //?????? ???? ?????????? ???????? ?????? ???? ?????????? ?????????? ?????? ?????? ???? ??????????
                //?? ???????? ?????? ?????????? ???? ?????? ???????? ?? ???? ?????? ???????? ???????? ?? ????????
                //colspan ???????? ??????????
                this.element.find("[" + RozitaCalendarConst.cellFirstAttribName + "]").each(function (index, elm) {
                    var cell = $(elm);
                    //if (cell.attr(RozitaCalendarConst.cellMergeCheckedAttribName) == null) {
                    var uid = cell.attr(RozitaCalendarConst.cellUniqueIdAttribName);
                    var mergItems = _this.element.find("[" + RozitaCalendarConst.cellMustMergedAttribName + " = '" + uid + "']");
                    if (mergItems.length > 0) {
                        mergItems.remove();
                        cell.attr("colspan", mergItems.length + 1);
                        //cell.attr(RozitaCalendarConst.cellMergeCheckedAttribName, "true");
                    }
                    //}
                });
            };
            /*
            //TODO
            private unmergeCells() {
                this.element.find("[colspan]").each((index, elm) => {
                    var cell = $(elm);
                    var colspan = Number(cell.attr("colspan"));
                    var date = cell.attr(RozitaCalendarConst.cellDateAttribName);
                    var tr = this.getTrByCell(cell);
                    if (colspan > 1) {
                        for (var i = 1; i <= colspan; i++) {
                            var dCurrent = moment(date).add(i, 'days');
    
                            var newTd = this.createNewTd(tr, dCurrent);
                            cell.after(newTd);
                        }
                    }
                });
            }
            */
            //?????? ?????????? ???????? ???? ???? ????????
            RozitaCalendar.prototype.clearEvents = function () {
                var _this = this;
                //?????????? ?????????? ???????? ?????? ?????????? ???? ???????? ?????? ????????
                var items = this.element.find("tr[" + RozitaCalendarConst.rowTypeAttribName + "='" + rowTypes[rowTypes.data].toString() + "']").find("td");
                items.each(function (index, elm) {
                    var cell = $(elm);
                    _this.clearCell(cell);
                });
            };
            //?????? ???????? ?????????????? ???? ????????
            RozitaCalendar.prototype.clearCell = function (cell) {
                cell.removeAttr(RozitaCalendarConst.cellTypeAttribName);
                //cell.removeAttr(RozitaCalendarConst.cellHasDataAttribName);
                cell.removeAttr(RozitaCalendarConst.cellFirstAttribName);
                cell.removeAttr(RozitaCalendarConst.cellSourceIdAttribName);
                cell.removeAttr(RozitaCalendarConst.cellRootIdAttribName);
                cell.removeClass(RozitaCalendarConst.rootCellClassName);
                //???????? ???????? ???? ?????????? ?????? ?????? ???? unmerged ???? ????????
                if (cell.attr("colspan") != null) {
                    this.unmergedCell(cell);
                }
                //???????? ?? ???????? ?????? ???? ???? ?????????????? ???????? ???? ????????
                cell.html("");
            };
            //?????????????????? ?????????? ???????? ?????? ?????????? ??????
            RozitaCalendar.prototype.unmergedCell = function (cell) {
                if (cell == null) {
                    return;
                }
                if (cell.attr("colspan") == null) {
                    return;
                }
                //?????????? ?????????? ???????? ?????? ?????????? ??????
                var colspan = Number(cell.attr("colspan"));
                var date = cell.attr(RozitaCalendarConst.cellDateAttribName);
                var tr = this.getTrByCell(cell);
                //add new cell after base cell
                //?????????? ?????????? ?????????? ???????? ???????? ???? ???????? ???????? ???? ?????????? ???? ?????????? ???????? ????????????
                for (var i = colspan - 1; i >= 0; i--) {
                    var dCurrent = moment(date).add(i, 'days');
                    var newTd = this.createNewTd(tr, dCurrent);
                    cell.after(newTd);
                }
                //remove base cell
                cell.remove();
            };
            //???? ???????? ?????????? ???? ???????? ?? ???????? ?????? ???????? ???????? ???????? ???? ????
            RozitaCalendar.prototype.existEvent = function (rootId) {
                var cells = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + rootId + "']");
                if (cells.length > 0) {
                    return true;
                }
                return false;
            };
            //???????? ?????????? ???? ???????????? ?????????? ?????? ???????? ???? ????????
            RozitaCalendar.prototype.importEvents = function (items) {
                var _this = this;
                if (items == null) {
                    return;
                }
                items.forEach(function (item) {
                    _this.addEvent(item);
                });
            };
            //???????? ???? ???????? ?????????? ?????? ???????? ???? ????????
            RozitaCalendar.prototype.addEvent = function (item) {
                if (this.existEvent(item.id)) {
                    return;
                }
                this.putEventToCalendar(item);
            };
            //???????????? ???? ???????? ???? ???????? ???? ????????
            RozitaCalendar.prototype.addEventSegment = function (rootId, item) {
                if (this.existEvent(rootId) == false) {
                    console.log("event with id = '" + rootId + "' not fount");
                    return;
                }
                var dataRowNum = this.getRootDataRowNumber(rootId);
                this.putEventSegmentToCalendar(rootId, item, dataRowNum, cellTypes.child);
            };
            //?????????????????? ???? ???????? ???? ????????
            RozitaCalendar.prototype.updateEvent = function (item) {
                this.removeEventById(item.id);
                this.addEvent(item);
            };
            //?????? ???? ???????? ???? ???????? ???? ???????? ???? ????
            RozitaCalendar.prototype.removeEventById = function (rootId) {
                var _this = this;
                var cells = this.element.find("[" + RozitaCalendarConst.cellRootIdAttribName + " = '" + rootId + "']");
                cells.each(function (index, elm) {
                    var cell = $(elm);
                    _this.clearCell(cell);
                });
            };
            //?????? ???? ???????? ???? ???????? ???? ???????? ???? ????
            RozitaCalendar.prototype.removeEventSegmentById = function (id) {
                var _this = this;
                var cells = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + id + "']");
                cells.each(function (index, elm) {
                    var cell = $(elm);
                    _this.clearCell(cell);
                });
            };
            //?????? ???? ???????? ???? ???????? ???? ???????? ???? ???? ?????? ???????? ????
            //TODO
            RozitaCalendar.prototype.removeEventByUid = function (uid) {
            };
            //???????? ???????? ?? ???????????? ?????????? ???? ????????
            RozitaCalendar.prototype.render = function () {
                this.element.html("");
                this.onCreate();
            };
            //?????????? ?????????? ?????? ???????? ?? ?????????? ????????
            RozitaCalendar.prototype.changeCalendarDate = function (startDate, finishDate) {
                this.options.startDate = startDate;
                this.options.finishDate = finishDate;
                this.render();
            };
            //???????? ???? ???????? thead
            RozitaCalendar.prototype.createHeader = function () {
                var _this = this;
                //create local headers
                this.options.locals.forEach(function (local, index) {
                    if (local.customFormat1 != null && local.customFormat1 == "") {
                        var trCFormat = _this.createHeaderRows(local, headerRowTypes.custom_format_1);
                        //class
                        trCFormat.addClass(RozitaCalendarConst.headerRowClassName);
                        trCFormat.addClass(RozitaCalendarConst.headerCustomFormat1RowClassName);
                        _this.elmThead.append(trCFormat);
                    }
                    if (local.customFormat2 != null && local.customFormat2 == "") {
                        var trCFormat = _this.createHeaderRows(local, headerRowTypes.custom_format_2);
                        //class
                        trCFormat.addClass(RozitaCalendarConst.headerRowClassName);
                        trCFormat.addClass(RozitaCalendarConst.headerCustomFormat2RowClassName);
                        _this.elmThead.append(trCFormat);
                    }
                    if (local.showYear) {
                        var trYear = _this.createHeaderRows(local, headerRowTypes.year);
                        //class
                        trYear.addClass(RozitaCalendarConst.headerRowClassName);
                        trYear.addClass(RozitaCalendarConst.headerYearRowClassName);
                        _this.elmThead.append(trYear);
                    }
                    if (local.showMonth) {
                        var trMonth = _this.createHeaderRows(local, headerRowTypes.month);
                        //class
                        trMonth.addClass(RozitaCalendarConst.headerRowClassName);
                        trMonth.addClass(RozitaCalendarConst.headerMonthRowClassName);
                        _this.elmThead.append(trMonth);
                    }
                    if (local.showDay) {
                        var trDay = _this.createHeaderRows(local, headerRowTypes.day);
                        //class
                        trDay.addClass(RozitaCalendarConst.headerRowClassName);
                        trDay.addClass(RozitaCalendarConst.headerDayRowClassName);
                        _this.elmThead.append(trDay);
                    }
                    if (local.showDayOfWeek) {
                        var trDayOfWeek = _this.createHeaderRows(local, headerRowTypes.day_of_week);
                        //class
                        trDayOfWeek.addClass(RozitaCalendarConst.headerRowClassName);
                        trDayOfWeek.addClass(RozitaCalendarConst.headerDayOfWeekRowClassName);
                        _this.elmThead.append(trDayOfWeek);
                    }
                });
                //create empty row as splitter between thead & tbody
                var emptyRow = this.createEmptyRow(rowTypes.offset);
                this.elmThead.append(emptyRow);
                //add specialDay
                var trSpecialDays = this.createSpecialDayRow();
                if (trSpecialDays != null) {
                    //class
                    trSpecialDays.addClass(RozitaCalendarConst.headerRowClassName);
                    trSpecialDays.addClass(RozitaCalendarConst.headerSpecialDayRowClassName);
                    this.elmThead.append(trSpecialDays);
                }
            };
            //???????? ???????? ?????? ???????? thead
            RozitaCalendar.prototype.createHeaderRows = function (local, headRowType) {
                var tr = this.createNewTr(rowTypes.header);
                var diffDays = this.dFinish.diff(this.dStart, 'days');
                for (var i = 0; i <= diffDays; i++) {
                    var dCurrent = moment(this.options.startDate).add(i, 'days');
                    //
                    var row = this.createNewTd(tr, dCurrent);
                    //
                    var dayOfWeekName = dCurrent.locale("en").format("dddd");
                    //?????? ???????? ?????????? ????????
                    if (local.lang == "fa") {
                        var monthNum = dCurrent.locale(local.lang).format("jM");
                        if (headRowType == headerRowTypes.month) {
                            if (local.showMonthNumber) {
                                row.html(this.convertEnglishNumberToPersian(dCurrent.locale(local.lang).format("jMMMM (jM)")));
                            }
                            else {
                                row.html(this.convertEnglishNumberToPersian(dCurrent.locale(local.lang).format("jMMMM")));
                            }
                        }
                        else if (headRowType == headerRowTypes.day) {
                            row.html(this.convertEnglishNumberToPersian(dCurrent.locale(local.lang).format("jD")));
                        }
                        else if (headRowType == headerRowTypes.day_of_week) {
                            row.html(dCurrent.locale(local.lang).format("dddd"));
                        }
                        else if (headRowType == headerRowTypes.year) {
                            row.html(this.convertEnglishNumberToPersian(dCurrent.locale(local.lang).format("jYYYY")));
                        }
                        else if (headRowType == headerRowTypes.custom_format_1) {
                            row.html(this.convertEnglishNumberToPersian(dCurrent.locale(local.lang).format(local.customFormat1)));
                        }
                        else if (headRowType == headerRowTypes.custom_format_2) {
                            row.html(this.convertEnglishNumberToPersian(dCurrent.locale(local.lang).format(local.customFormat2)));
                        }
                        this.addMonthClassToCell(row, monthNum);
                        this.addDayOfWeekClassToCell(row, dayOfWeekName);
                    }
                    else {
                        var monthNum = dCurrent.locale(local.lang).format("M");
                        if (headRowType == headerRowTypes.month) {
                            if (local.showMonthNumber) {
                                row.html(dCurrent.locale(local.lang).format("MMMM (M)"));
                            }
                            else {
                                row.html(dCurrent.locale(local.lang).format("MMMM"));
                            }
                        }
                        else if (headRowType == headerRowTypes.day) {
                            row.html(dCurrent.locale(local.lang).format("D"));
                        }
                        else if (headRowType == headerRowTypes.day_of_week) {
                            row.html(dCurrent.locale(local.lang).format("dddd"));
                        }
                        else if (headRowType == headerRowTypes.year) {
                            row.html(dCurrent.format("YYYY"));
                        }
                        else if (headRowType == headerRowTypes.custom_format_1) {
                            row.html(dCurrent.locale(local.lang).format(local.customFormat1));
                        }
                        else if (headRowType == headerRowTypes.custom_format_2) {
                            row.html(dCurrent.locale(local.lang).format(local.customFormat2));
                        }
                        //???????????? ???????? ?????? ?????????? ???? ?????????? ?????? ???? ???????? ????
                        this.addMonthClassToCell(row, monthNum);
                        //???????????? ???????? ?????? ?????????? ???? ?????? ?????? ???????? ???? ???????? ????
                        this.addDayOfWeekClassToCell(row, dayOfWeekName);
                    }
                    // ???????????? ???????? ???????????? ?????? ???? ?????? ???? ???????? ????????
                    this.checkForSpecialDay(row);
                    tr.append(row);
                }
                return tr;
            };
            //?????????? ???????? ???????? ?????? ?????????? ???? ?????? ???? ???????? ?????? ????????
            RozitaCalendar.prototype.addMonthClassToCell = function (cell, monthNum) {
                if (monthNum == "1") {
                    cell.addClass(RozitaCalendarConst.headerMonth01CellClassName);
                }
                else if (monthNum == "2") {
                    cell.addClass(RozitaCalendarConst.headerMonth02CellClassName);
                }
                else if (monthNum == "3") {
                    cell.addClass(RozitaCalendarConst.headerMonth03CellClassName);
                }
                else if (monthNum == "4") {
                    cell.addClass(RozitaCalendarConst.headerMonth04CellClassName);
                }
                else if (monthNum == "5") {
                    cell.addClass(RozitaCalendarConst.headerMonth05CellClassName);
                }
                else if (monthNum == "6") {
                    cell.addClass(RozitaCalendarConst.headerMonth06CellClassName);
                }
                else if (monthNum == "7") {
                    cell.addClass(RozitaCalendarConst.headerMonth07CellClassName);
                }
                else if (monthNum == "8") {
                    cell.addClass(RozitaCalendarConst.headerMonth08CellClassName);
                }
                else if (monthNum == "9") {
                    cell.addClass(RozitaCalendarConst.headerMonth09CellClassName);
                }
                else if (monthNum == "10") {
                    cell.addClass(RozitaCalendarConst.headerMonth10CellClassName);
                }
                else if (monthNum == "11") {
                    cell.addClass(RozitaCalendarConst.headerMonth11CellClassName);
                }
                else if (monthNum == "12") {
                    cell.addClass(RozitaCalendarConst.headerMonth12CellClassName);
                }
            };
            //???????????? ???????? ?????????? ???? ?????? ???????? ???? ?????? ?????? ????????
            RozitaCalendar.prototype.addDayOfWeekClassToCell = function (cell, dayOfWeek) {
                if (dayOfWeek.toLowerCase() == "saturday") {
                    cell.addClass(RozitaCalendarConst.cellSaturdayClassName);
                }
                else if (dayOfWeek.toLowerCase() == "sunday") {
                    cell.addClass(RozitaCalendarConst.cellSundayClassName);
                }
                else if (dayOfWeek.toLowerCase() == "monday") {
                    cell.addClass(RozitaCalendarConst.cellMondayClassName);
                }
                else if (dayOfWeek.toLowerCase() == "tuesday") {
                    cell.addClass(RozitaCalendarConst.cellTuesdayClassName);
                }
                else if (dayOfWeek.toLowerCase() == "wednesday") {
                    cell.addClass(RozitaCalendarConst.cellWednesdayClassName);
                }
                else if (dayOfWeek.toLowerCase() == "thursday") {
                    cell.addClass(RozitaCalendarConst.cellThursdayClassName);
                }
                else if (dayOfWeek.toLowerCase() == "friday") {
                    cell.addClass(RozitaCalendarConst.cellFridayClassName);
                }
            };
            //???????????? ?????????????? ?????? ?????? ?????? ???? ?????? ?????? ???????? ???? ???????? ????????
            RozitaCalendar.prototype.checkForSpecialDay = function (cell) {
                var date = cell.attr(RozitaCalendarConst.cellDateAttribName);
                if (this.options.specialDays != null) {
                    this.options.specialDays.forEach(function (item, index) {
                        if (item.date == date) {
                            cell.addClass(RozitaCalendarConst.headerSpecialDayCellClassName);
                            if (item.cssClass != null) {
                                cell.addClass(item.cssClass);
                            }
                        }
                    });
                }
            };
            //???????? ???????? ?????????????????? ??????????
            RozitaCalendar.prototype.createSpecialDayRow = function () {
                var _this = this;
                if (this.options.specialDays == null ||
                    this.options.specialDays.length == 0) {
                    return null;
                }
                var tr = this.createEmptyRow(rowTypes.header);
                this.options.specialDays.forEach(function (item, index) {
                    var cell = _this.getCellOnTr(tr, item.date);
                    if (cell != null) {
                        cell.html(item.title);
                    }
                });
                return tr;
            };
            //???????? ???? ???????? ???????? ???? ???????? ?????? ????????
            RozitaCalendar.prototype.createEmptyRow = function (rowType) {
                var tr = this.createNewTr(rowType);
                var diffDays = this.dFinish.diff(this.dStart, 'days');
                for (var i = 0; i <= diffDays; i++) {
                    var dCurrent = moment(this.options.startDate).add(i, 'days');
                    var td = this.createNewTd(tr, dCurrent);
                    //special days
                    this.checkForSpecialDay(td);
                    tr.append(td);
                }
                return tr;
            };
            //???????? ???? tr ????????
            RozitaCalendar.prototype.createNewTr = function (rowType) {
                var tr = $("<tr></tr>");
                this.lastRowNumber++;
                tr.attr(RozitaCalendarConst.rowNumberAttribName, this.lastRowNumber);
                tr.attr(RozitaCalendarConst.rowTypeAttribName, rowTypes[rowType].toString());
                return tr;
            };
            //???????? ???? ???????? ???????? ?????????? ???????? ???????? ????????
            RozitaCalendar.prototype.createNewEventRow = function () {
                var tr = this.createEmptyRow(rowTypes.data);
                this.lastDataRowNumber++;
                tr.attr(RozitaCalendarConst.dataRowNumberAttribName, this.lastDataRowNumber);
                return tr;
            };
            //???????? ???? ???????? ???? ???? ???? ???? ???????? ???? ?????????? ?? ???????? ?????????? ??????????
            RozitaCalendar.prototype.createNewTd = function (tr, date) {
                var td = $("<td></td>");
                td.attr(RozitaCalendarConst.rowNumberAttribName, tr.attr(RozitaCalendarConst.rowNumberAttribName));
                td.attr(RozitaCalendarConst.colNumberAttribName, date.format("D"));
                td.attr(RozitaCalendarConst.cellDateAttribName, date.format("YYYY/MM/DD"));
                td.attr(RozitaCalendarConst.cellUniqueIdAttribName, this.newGuid());
                return td;
            };
            //???????? ???? ???????? ???? ???? ???? ???????? ?????? ???? ???????? ???? ?????????? ?? ????????
            RozitaCalendar.prototype.createNewTh = function (tr, date) {
                var td = $("<th></th>");
                td.attr(RozitaCalendarConst.rowNumberAttribName, tr.attr(RozitaCalendarConst.rowNumberAttribName));
                td.attr(RozitaCalendarConst.colNumberAttribName, date.format("D"));
                td.attr(RozitaCalendarConst.cellDateAttribName, date.format("YYYY/MM/DD"));
                td.attr(RozitaCalendarConst.cellUniqueIdAttribName, this.newGuid());
                return td;
            };
            //???????? ???????????? ?????? table
            RozitaCalendar.prototype.createStructure = function () {
                this.element.html("");
                //
                this.elmMainSection = $("<div></div>");
                this.elmMainSection.addClass(RozitaCalendarConst.calendarClassName);
                if (this.options.isRtl) {
                    this.elmMainSection.addClass(RozitaCalendarConst.rtlCalendarClassName);
                    this.elmMainSection.attr("direction", "rtl");
                }
                //???????? ???????????? ????????
                this.elmTable = $("<table></table>");
                this.elmTable.attr("border", this.options.tableBorder);
                //???????????? ??????
                this.elmThead = $("<thead></thead>");
                //???????????? ????????
                this.elmTbody = $("<tbody></tbody>");
                //
                this.elmTable.append(this.elmThead);
                this.elmTable.append(this.elmTbody);
                //
                this.elmMainSection.append(this.elmTable);
                //add to main element
                this.element.append(this.elmMainSection);
            };
            //???????? ???? ?????????? ???????? ?????? ???????? ???????? ???????? ???????? ?????? ???????? ???? ???? ??????????
            RozitaCalendar.prototype.countEventMaxChildsLevel = function (item) {
                var level = 0;
                //
                if (item.childs == null || item.childs.length == 0) {
                    return level;
                }
                //splite all days and count
                var allDays = [];
                for (var i = 0; i < item.childs.length; i++) {
                    var child = item.childs[i];
                    var days = this.splitToDays(child.startDate, child.finishDate);
                    for (var day in days) {
                        allDays.push(day);
                    }
                }
                //
                var repeatCountList = this.countingDuplicateDates(allDays);
                var maximumReprat = 0;
                for (var keyName in repeatCountList) {
                    if (repeatCountList[keyName] > maximumReprat) {
                        maximumReprat = repeatCountList[keyName];
                    }
                }
                return maximumReprat;
                /*
                var c = item.childs;
                if (c != null && c.length > 0) {
                    level++;
    
                    c = c[0].childs;
                    if (c != null && c.length > 0) {
                        level++;
    
                        c = c[0].childs;
                        if (c != null && c.length > 0) {
                            level++;
    
                            c = c[0].childs;
                            if (c != null && c.length > 0) {
                                level++;
    
                                c = c[0].childs;
                                if (c != null && c.length > 0) {
                                    level++;
    
                                    c = c[0].childs;
                                    if (c != null && c.length > 0) {
                                        level++;
    
                                        c = c[0].childs;
                                        if (c != null && c.length > 0) {
                                            level++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
    
                return level;
                */
            };
            //???????? ???? ???? ?????????? ?? ???? ?????????? ???? ???????????? ?? ???????? ???? ???????? ?????? ?? ?????? ???? ?????? ?????????? ??????????
            RozitaCalendar.prototype.splitToDays = function (startDate, finishDate) {
                var result = [];
                var dStr = moment(startDate);
                var dFin = moment(finishDate);
                if (dStr.isValid() === false) {
                    return result;
                }
                if (dFin.isValid() === false) {
                    return result;
                }
                var diffDays = dFin.diff(dStr, 'days');
                if (diffDays < 0) {
                    return result;
                }
                for (var i = 0; i <= diffDays; i++) {
                    var dCurrent = moment(dStr).add(i, 'days');
                    result.push(dCurrent.format("YYYY/MM/DD"));
                }
                return result;
            };
            //???????? ???????? ?????????? ???????? ???????? ?? ????????
            RozitaCalendar.prototype.getRootRowNumber = function (rootId) {
                var rootCell = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + rootId + "']");
                var rowNum = rootCell.attr(RozitaCalendarConst.rowNumberAttribName);
                return Number(rowNum);
            };
            // ???????? ???????? ?????????? ?????????? ???????? ???????? ?? ???????? 
            RozitaCalendar.prototype.getRootDataRowNumber = function (rootId) {
                var rootCell = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + rootId + "']");
                var rowNum = rootCell.attr(RozitaCalendarConst.dataRowNumberAttribName);
                return Number(rowNum);
            };
            //-------------------------------------------------------
            //?????????????? ???????? ???? ???????? ???????? ?????????????? ?? ???? ???? ????????
            RozitaCalendar.prototype.insertToSource = function (item) {
                this.options.events.push(item);
            };
            //?????? ???????? ???? ???????? ?? ???? ???? ????????
            RozitaCalendar.prototype.removeFromSource = function (rootId) {
                if (rootId == null) {
                    return false;
                }
                //get source index and current index
                var srcIdx = this.getSourceRecordIndexByKey(rootId);
                if (srcIdx != null && srcIdx >= 0) {
                    //this.source.data.splice(srcIdx, 1);
                    this.removeRecordByIndex(this.options.events, srcIdx);
                }
                return true;
            };
            //-------------------------------------------------------
            //???????? ????????????
            RozitaCalendar.prototype.sortEvents = function (items) {
                var res = items;
                //???????????? ???????????? ???????? Order
                res = res.sort(function (a, b) {
                    if (a.order == b.order) {
                        return 0;
                    }
                    else if (a.order > b.order) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                });
                //???????????? ???? ???????? ?????????? ???? ?????????? ?????????????? ?????? ??????
                res = res.sort(function (a, b) {
                    var dA = moment(a.startDate);
                    var dB = moment(b.startDate);
                    if (dA.isValid() == true && dB.isValid() == false) {
                        return 1;
                    }
                    if (dA.isValid() == false && dB.isValid() == true) {
                        return -1;
                    }
                    if (dB.isAfter(dA)) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                });
                //
                this.options.events = res;
            };
            //-------------------------------------------------------
            //???????? ???????? ?????????? ?????????? ?????? ????????????
            RozitaCalendar.prototype.countingDuplicateDates = function (dates) {
                var repeatCounts = {};
                jQuery.each(dates, function (key, value) {
                    if (!repeatCounts.hasOwnProperty(value)) {
                        repeatCounts[value] = 1;
                    }
                    else {
                        repeatCounts[value]++;
                    }
                });
                return repeatCounts;
            };
            //?????? ???? ?????????? ???? ???????? ???? ???????? ????????????
            RozitaCalendar.prototype.removeRecordByIndex = function (data, idx) {
                data.splice(idx, 1);
            };
            //?????? ?????????? ???? ???????? ???? ???????? ???????? ????????
            RozitaCalendar.prototype.getRecordByKey = function (rootId) {
                if (rootId == null) {
                    return null;
                }
                var findItem = this.options.events.filter(function (item) {
                    if (item.id == rootId) {
                        return true;
                    }
                    return false;
                });
                if (findItem != null && findItem.length > 0) {
                    return findItem[0];
                }
                return null;
            };
            //???????? ???????? ?????????? ???????????? ???? ???????? ???? ???????? ???? ??????????
            RozitaCalendar.prototype.getIndexRecord = function (data, rowObject) {
                var idx = $.inArray(rowObject, data);
                return idx;
            };
            //???????? ???????? ?????????? ???????????? ???? ???????? ???? ???????? ???????? ????????
            RozitaCalendar.prototype.getSourceRecordIndexByKey = function (rootId) {
                var item = this.getRecordByKey(rootId);
                if (item == null) {
                    return -1;
                }
                return this.getIndexRecord(this.options.events, item);
            };
            //???????? ???? ???????? ?????????? ???? ??????
            RozitaCalendar.prototype.newGuid = function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
            //?????????? ?????????? ?????????????? ???? ??????????
            RozitaCalendar.prototype.convertEnglishNumberToPersian = function (enDigit) {
                if (enDigit == null) {
                    return null;
                }
                var number = enDigit.toString();
                var newValue = "";
                for (var i = 0; i < number.length; i++) {
                    var ch = number.charCodeAt(i);
                    if (ch >= 48 && ch <= 57) {
                        // european digit range
                        var newChar = ch + 1584;
                        newValue = newValue + String.fromCharCode(newChar);
                    }
                    else
                        newValue = newValue + String.fromCharCode(ch);
                }
                return newValue;
            };
            //?????????? ?????????? ?????????? ???? ??????????????
            RozitaCalendar.prototype.convertPersianNumberToEnglish = function (enDigit) {
                if (enDigit == null) {
                    return null;
                }
                var number = enDigit.toString();
                var newValue = "";
                for (var i = 0; i < number.length; i++) {
                    var ch = number.charCodeAt(i);
                    if (ch >= 1776 && ch <= 1785) {
                        var newChar = ch - 1728;
                        newValue = newValue + String.fromCharCode(newChar);
                    }
                    else if (ch >= 1632 && ch <= 1641) {
                        var newChar = ch - 1584;
                        newValue = newValue + String.fromCharCode(newChar);
                    }
                    else
                        newValue = newValue + String.fromCharCode(ch);
                }
                return newValue;
            };
            //???????? ???? ???? ???? ?????? ???? ?????????? ???????? ?????? ???? ???????? ???? ???????? ?????? ???????????? ?????? ???? ??????
            RozitaCalendar.prototype.isFunction = function (functionToCheck) {
                var getType = {};
                return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
            };
            //?????????? ???? ???????????? ???? ???????? ?????? ????
            RozitaCalendar.prototype.executeFunctionByName = function (functionName, context, args) {
                //var args = [].slice.call(arguments).splice(2);
                var namespaces = functionName.split(".");
                var func = namespaces.pop();
                for (var i = 0; i < namespaces.length; i++) {
                    context = context[namespaces[i]];
                }
                //return context[func].apply(context, args);
                return context[func](args);
            };
            // Default Options
            RozitaCalendar.defaultOptions = {
                startDate: "",
                finishDate: "",
                isRtl: false,
                locals: [
                    {
                        lang: "en",
                        showDayOfWeek: true,
                        showMonth: true,
                        showMonthNumber: false,
                        showDay: true,
                        showYear: true,
                        customFormat1: null,
                        customFormat2: null,
                    }
                ],
                events: null,
                specialDays: null,
                eventOffset: 1,
                tableBorder: 1,
                callbacks: null
            };
            return RozitaCalendar;
        }());
        Components.RozitaCalendar = RozitaCalendar;
        var RozitaCalendarOptions = /** @class */ (function () {
            function RozitaCalendarOptions() {
            }
            return RozitaCalendarOptions;
        }());
        Components.RozitaCalendarOptions = RozitaCalendarOptions;
        var RozitaCalendarCallbackOptions = /** @class */ (function () {
            function RozitaCalendarCallbackOptions() {
            }
            return RozitaCalendarCallbackOptions;
        }());
        Components.RozitaCalendarCallbackOptions = RozitaCalendarCallbackOptions;
        var RozitaCalendarLocalOptions = /** @class */ (function () {
            function RozitaCalendarLocalOptions() {
            }
            return RozitaCalendarLocalOptions;
        }());
        Components.RozitaCalendarLocalOptions = RozitaCalendarLocalOptions;
        var RozitaCalendarEventBase = /** @class */ (function () {
            function RozitaCalendarEventBase() {
            }
            return RozitaCalendarEventBase;
        }());
        Components.RozitaCalendarEventBase = RozitaCalendarEventBase;
        var RozitaCalendarEvent = /** @class */ (function (_super) {
            __extends(RozitaCalendarEvent, _super);
            function RozitaCalendarEvent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return RozitaCalendarEvent;
        }(RozitaCalendarEventBase));
        Components.RozitaCalendarEvent = RozitaCalendarEvent;
        var RozitaCalendarSpecialDay = /** @class */ (function () {
            function RozitaCalendarSpecialDay() {
            }
            return RozitaCalendarSpecialDay;
        }());
        Components.RozitaCalendarSpecialDay = RozitaCalendarSpecialDay;
        var RozitaCalendarHeaderOptions = /** @class */ (function () {
            function RozitaCalendarHeaderOptions() {
            }
            return RozitaCalendarHeaderOptions;
        }());
        Components.RozitaCalendarHeaderOptions = RozitaCalendarHeaderOptions;
        var HtmlClassAttributes = /** @class */ (function () {
            function HtmlClassAttributes() {
                this.classes = [];
            }
            HtmlClassAttributes.prototype.add = function (className) {
                this.classes.push(className);
            };
            HtmlClassAttributes.prototype.clear = function () {
                this.classes = [];
            };
            HtmlClassAttributes.prototype.print = function () {
                var str = "";
                this.classes.forEach(function (cls, index) {
                    str += cls + " ";
                });
                return str;
            };
            return HtmlClassAttributes;
        }());
    })(Components = SilverPath.Components || (SilverPath.Components = {}));
})(SilverPath || (SilverPath = {}));
(function ($) {
    $.fn.rozitaCalendar = function (options) {
        //???????????? ???????? ?????????? ???? ??????????
        moment.loadPersian();
        //$(function () {
        //    $('.rozita_calendar table').fixedtableheader();
        //});
        return new SilverPath.Components.RozitaCalendar(this, options);
    };
})(jQuery);
//# sourceMappingURL=rozita-calendar.js.map