/// <reference path="./typing/moment/moment.d.ts" />
/// <reference path="./typing/jquery/jquery.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//name: Rozita Calendar
//version : 1.0.0.0
//company: silverpath
//author: Mehdi Radi
//summary: This is a javascript library for show event on table automaticlly
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
                if (element.length == 0) {
                    throw "Element '" + element.selector + "' was not found on the page.";
                }
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
                    //if callback field is function name
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
                        //if callback field is function name
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
                        //if callback field is function name
                        else {
                            _this.executeFunctionByName(_this.options.callbacks.eventsSearchingFinished, window, eArgs);
                        }
                    }
                });
            };
            //آماده سازی جدول
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
            //پر کردن اطلاعات در صفحه
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
            // بایند کردن کالبک های های جی کوئری
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
                        //if callback field is function name
                        else {
                            //window[this.options.callbacks.cellClicked](eArgs);
                            _this.executeFunctionByName(_this.options.callbacks.cellClicked, window, eArgs);
                        }
                    }
                });
            };
            //قرار دادن آیتم در جدول
            RozitaCalendar.prototype.putEventToCalendar = function (item) {
                var _this = this;
                //شمارش تعداد ردیف های مورد نیاز برای قراردهی آیتم در جدول
                var childLevel = this.countEventMaxChildsLevel(item);
                var dataRowNumber = 1;
                //console.time("find empty row");
                //پیدا کردن جای خالی در جدول از ردیف اول
                //todo کندی این قسمت باید بررسی شود
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
            // قراردادن جزئیات یک آیتم در جدول
            RozitaCalendar.prototype.putEventSegmentToCalendar = function (rootId, item, baseDataRowNumber, cellType) {
                var dEventStart = moment(item.startDate);
                var dEventFinish = moment(item.finishDate);
                //اگر تاریخ شروع نادرست بود
                if (dEventStart.isValid() === false) {
                    return;
                }
                //اگر تاریخ پایان نادرست بود
                if (dEventFinish.isValid() === false) {
                    return;
                }
                //اگر تاریخ شروع و یا پایان دیتا از تاریخ شروع اصلی کمتر باشد
                if (dEventStart.isBefore(this.dStart) && dEventFinish.isBefore(this.dStart)) {
                    return;
                }
                //اگر تاریخ شروع و یا پایان دیتا از تاریخ پایان اصلی بیشتر باشد
                if (dEventStart.isAfter(this.dFinish) && dEventFinish.isAfter(this.dFinish)) {
                    return;
                }
                //اگر تاریخ شروع دیتا کمتر از تاریخ شروع اصلی باشد ولی تاریخ پایان بیشتر از تاریخ شروع اصلی باشد
                if (dEventStart.isBefore(this.dStart)) {
                    //قرار دادن تاریخ شروع اصلی بعنوان تاریخ شروع دیتا
                    dEventStart = this.dStart;
                }
                //اگر تاریخ پایان دیتا بیشتر از تاریخ پایان اصی باشد ولی تاریخ شروع دیتا کمتر از تاریخ پایان اصلی باشد
                if (dEventFinish.isAfter(this.dFinish)) {
                    //قرار دادن تاریخ پایان اصلی بعنوان تاریخ پایان دیتا
                    dEventFinish = this.dFinish;
                }
                //پیدا کردن شماره ردیف خالی برای جایگذاری دیتاها
                var rowNumber = this.findEmptyRowNumber(item.startDate, item.finishDate, baseDataRowNumber, 0);
                //تعداد روزها از شروع تا پایان
                var diffDays = dEventFinish.diff(dEventStart, 'days');
                var firstCell = null;
                for (var i = 0; i <= diffDays; i++) {
                    var classAttrib = new HtmlClassAttributes();
                    var dCurrent = moment(dEventStart).add(i, 'days');
                    var dCurrentString = dCurrent.format("YYYY/MM/DD");
                    //پیدا کردن خونه از جدول
                    var cell = this.getCellByDate(dCurrentString, rowNumber);
                    if (cell == null) {
                        continue;
                    }
                    //اگر اولین خونه بود
                    if (i === 0) {
                        firstCell = cell;
                        //firstCell.attr(RozitaCalendarConst.cellTypeAttribName, "root");
                    }
                    //اگر اولین خونه بود
                    if (i === 0) {
                        this.putDataToCell(cell, item, 'root', rootId);
                    }
                    else {
                        this.putDataToCell(cell, item, 'data', rootId);
                    }
                    //اگر اولین خونه نبود بعنوان ادغام شده علامت گزاری شود
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
                    //افزودن نام کلاس به خونه ها
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
            // قرار دادن اطلاعات برای یکی خونه از جدول
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
            // قرار دادن ردیف آفست برای یک آیتم
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
                //پیدا کردن شماره ردیف خالی
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
            //گرفتن ردیف با توجه به خونه ی آن
            RozitaCalendar.prototype.getTrByCell = function (cell) {
                //پیدا کردن ردیف با توجه به سل
                return cell.parents("tr:first");
            };
            //متدی که یکی یکی ردیف ها را چک میکند تا بتواند اولین ردیف خالی برای جایگذاری آیتم ها را پیدا کند
            RozitaCalendar.prototype.findEmptyRowNumber = function (startDate, finishDate, dataRowNum, childLevels) {
                //for (var i = rowNum; i <= rowNum + childLevels; i++) {
                //    if (this.isDataRowExisted(i) == false) {
                //        this.elmTbody.append(this.createNewEventRow());
                //    }
                //}
                var crnDataRowNumber = dataRowNum;
                while (true) {
                    //در صورتی که شماره ردیف در جدول وجود نداشت یک ردیف جدید ایجاد می کند
                    if (this.isDataRowExisted(crnDataRowNumber) == false) {
                        this.elmTbody.append(this.createNewEventRow());
                    }
                    //چک کردن اینکه آیا امکان قرار دادن دیتا در جدول وجود دارد یا نه
                    //todo کندی این قسمت باید بررسی شود
                    if (this.canPutEvent(startDate, finishDate, crnDataRowNumber, childLevels)) {
                        break;
                    }
                    // اگر تعداد ردیف ها از این تعداد بیشتر شد دیگر ردیف تولید نکن
                    if (crnDataRowNumber > 1000) {
                        break;
                    }
                    //افزایش شماره ردیف دیتا ها
                    crnDataRowNumber++;
                }
                return crnDataRowNumber;
            };
            //چک کردن اینکه آیا ردیف مورد نظر بر اساس شماره وجود دارد یا خیر
            RozitaCalendar.prototype.isDataRowExisted = function (dataRowNumber) {
                var res = this.element.find("[" + RozitaCalendarConst.dataRowNumberAttribName + " = '" + dataRowNumber + "']");
                if (res.length > 0) {
                    return true;
                }
                else {
                    return false;
                }
            };
            //چک کردن اینکه آیا می توان در ردیف و تارخ های مورد نظر آیتم ها را جایگذاری کرد یا نه
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
                //چک کردن تمامی ردیف ها برای اطمینان از خالی بودن
                for (var j = dataRowNum; j <= dataRowNum + childLevels; j++) {
                    var tr;
                    console.time("while");
                    //این قسمت از کد به تعداد نامحدود ردیف ایجاد میکند تا در نهایت شماره ی ردیف مورد نظر یافت شود در جدول
                    //todo کندی این قسمت باید بررسی شود
                    while (true) {
                        // console.time("getDataTr");
                        tr = this.getDataTr(j);
                        //console.timeEnd("getDataTr");
                        if (tr != null) {
                            break;
                        }
                        else {
                            console.time("createNewEventRow");
                            //todo کندی این قسمت باید بررسی شود
                            this.elmTbody.append(this.createNewEventRow());
                            console.timeEnd("createNewEventRow");
                        }
                    }
                    console.timeEnd("while");
                    //گرفتن تعداد روز از شروع تا پایان
                    var diffDays = dEventFinish.diff(dEventStart, 'days');
                    console.time("for");
                    for (var i = 0; i <= diffDays; i++) {
                        var dCurrent = moment(dEventStart).add(i, 'days');
                        var cell = this.getCellOnTr(tr, dCurrent.format("YYYY/MM/DD"));
                        if (cell == null) {
                            return false;
                        }
                        //چک کردن اینکه خونه ی مورد نظر هیچ تایپی ندارد و قاعدتاً خالی است
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
            // گرفتن ردیف دیتا بر اساس شماره ردیف دیتا
            RozitaCalendar.prototype.getDataTr = function (dataRowNumber) {
                var tr = this.element.find("[" + RozitaCalendarConst.dataRowNumberAttribName + "='" + dataRowNumber + "']");
                if (tr.length == 0) {
                    return null;
                }
                return tr;
            };
            //گرفتن خونه مورد نظر بر اساس شماره و  تاریخ
            RozitaCalendar.prototype.getCellByDate = function (date, rowNum) {
                var tr = this.getDataTr(rowNum);
                var cell = this.getCellOnTr(tr, date);
                return cell;
            };
            //گرفته خونه ی مورد نظر در یک ردیف بر اساس سال
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
            //فهمیدن اینکه آیا برای خونه ی مورد نظر نوع تعیین شده است
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
            //علامت گزاری خونه های جدول جهت ادغام
            RozitaCalendar.prototype.markAsMerge = function (firstCell, cell) {
                var sourceId = firstCell.attr(RozitaCalendarConst.cellUniqueIdAttribName);
                cell.attr(RozitaCalendarConst.cellMustMergedAttribName, sourceId);
                //cell.attr(RozitaCalendarConst.cellHasDataAttribName, "true");
                cell.attr(RozitaCalendarConst.cellTypeAttribName, "data");
            };
            //ادغام خونه های مارک شده
            RozitaCalendar.prototype.mergeCells = function () {
                var _this = this;
                //این خط تمامی خونه های که علامت گزاری شده اند را گرفته
                //و خونه های اضافی را پاک کردن و در عوض برای خونه ی اصلی
                //colspan قرار میدهد
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
            //حذف تمامی دیتا ها از جدول
            RozitaCalendar.prototype.clearEvents = function () {
                var _this = this;
                //گرفتن تمامی خونه های مربوط به ردیف های دیتا
                var items = this.element.find("tr[" + RozitaCalendarConst.rowTypeAttribName + "='" + rowTypes[rowTypes.data].toString() + "']").find("td");
                items.each(function (index, elm) {
                    var cell = $(elm);
                    _this.clearCell(cell);
                });
            };
            //پاک کردن اطلاعات یک خونه
            RozitaCalendar.prototype.clearCell = function (cell) {
                cell.removeAttr(RozitaCalendarConst.cellTypeAttribName);
                //cell.removeAttr(RozitaCalendarConst.cellHasDataAttribName);
                cell.removeAttr(RozitaCalendarConst.cellFirstAttribName);
                cell.removeAttr(RozitaCalendarConst.cellSourceIdAttribName);
                cell.removeAttr(RozitaCalendarConst.cellRootIdAttribName);
                cell.removeClass(RozitaCalendarConst.rootCellClassName);
                //خونه هایی که ادغام شده اند را unmerged می کنیم
                if (cell.attr("colspan") != null) {
                    this.unmergedCell(cell);
                }
                //خونه ی مورد نظر را از محتویات خالی می کنیم
                cell.html("");
            };
            //بازگردانی ادغام خونه های ادغام شده
            RozitaCalendar.prototype.unmergedCell = function (cell) {
                if (cell == null) {
                    return;
                }
                if (cell.attr("colspan") == null) {
                    return;
                }
                //گرفتن تعداد خونه های ادغام شده
                var colspan = Number(cell.attr("colspan"));
                var date = cell.attr(RozitaCalendarConst.cellDateAttribName);
                var tr = this.getTrByCell(cell);
                //add new cell after base cell
                //بخاطر اینکه تاریخ ورود لیست ها درست باشد از انتها به ابتدا وارد میکنیم
                for (var i = colspan - 1; i >= 0; i--) {
                    var dCurrent = moment(date).add(i, 'days');
                    var newTd = this.createNewTd(tr, dCurrent);
                    cell.after(newTd);
                }
                //remove base cell
                cell.remove();
            };
            //چک کردن اینکه در خونه ی مورد نظر دیتا وجود دارد یا نه
            RozitaCalendar.prototype.existEvent = function (rootId) {
                var cells = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + rootId + "']");
                if (cells.length > 0) {
                    return true;
                }
                return false;
            };
            //ورود لیستی از دیتاها بصورت ران تایم به جدول
            RozitaCalendar.prototype.importEvents = function (items) {
                var _this = this;
                if (items == null) {
                    return;
                }
                items.forEach(function (item) {
                    _this.addEvent(item);
                });
            };
            //ورود یک دیتا بصورت ران تایم به جدول
            RozitaCalendar.prototype.addEvent = function (item) {
                if (this.existEvent(item.id)) {
                    return;
                }
                this.putEventToCalendar(item);
            };
            //افزودن یک قسمت از دیتا به جدول
            RozitaCalendar.prototype.addEventSegment = function (rootId, item) {
                if (this.existEvent(rootId) == false) {
                    console.log("event with id = '" + rootId + "' not fount");
                    return;
                }
                var dataRowNum = this.getRootDataRowNumber(rootId);
                this.putEventSegmentToCalendar(rootId, item, dataRowNum, cellTypes.child);
            };
            //بروزرسانی یک دیتا در جدول
            RozitaCalendar.prototype.updateEvent = function (item) {
                this.removeEventById(item.id);
                this.addEvent(item);
            };
            //حذف یک دیتا از جدول بر اساس آی دی
            RozitaCalendar.prototype.removeEventById = function (rootId) {
                var _this = this;
                var cells = this.element.find("[" + RozitaCalendarConst.cellRootIdAttribName + " = '" + rootId + "']");
                cells.each(function (index, elm) {
                    var cell = $(elm);
                    _this.clearCell(cell);
                });
            };
            //حذف یک قسمت از دیتا بر اساس آی دی
            RozitaCalendar.prototype.removeEventSegmentById = function (id) {
                var _this = this;
                var cells = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + id + "']");
                cells.each(function (index, elm) {
                    var cell = $(elm);
                    _this.clearCell(cell);
                });
            };
            //حذف یک دیتا از جدول بر اساس آی دی خود خونه ها
            //TODO
            RozitaCalendar.prototype.removeEventByUid = function (uid) {
            };
            //رندر کردن و دوباره ساختن کل جدول
            RozitaCalendar.prototype.render = function () {
                this.element.html("");
                this.onCreate();
            };
            //تغییر تاریخ های شروع و پایان جدول
            RozitaCalendar.prototype.changeCalendarDate = function (startDate, finishDate) {
                this.options.startDate = startDate;
                this.options.finishDate = finishDate;
                this.render();
            };
            //ساخت کل قسمت thead
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
            //ساخت ردیف های قسمت thead
            RozitaCalendar.prototype.createHeaderRows = function (local, headRowType) {
                var tr = this.createNewTr(rowTypes.header);
                var diffDays = this.dFinish.diff(this.dStart, 'days');
                for (var i = 0; i <= diffDays; i++) {
                    var dCurrent = moment(this.options.startDate).add(i, 'days');
                    //
                    var row = this.createNewTd(tr, dCurrent);
                    //
                    var dayOfWeekName = dCurrent.locale("en").format("dddd");
                    //اگر زبان فارسی باشد
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
                    //اگر زبان غیر فارسی باشد
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
                        //افزودن کلاس های مربوط به شماره ماه به خونه ها
                        this.addMonthClassToCell(row, monthNum);
                        //افزودن کلاس های مربوط به روز های هفته به خونه ها
                        this.addDayOfWeekClassToCell(row, dayOfWeekName);
                    }
                    // افزودن ردیف روزهای خاص به هدر در صورت وجود
                    this.checkForSpecialDay(row);
                    tr.append(row);
                }
                return tr;
            };
            //اضافه کردن کلاس های مربوط به ماه به خونه های جدول
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
            //افزودن کلاس مربوط به روز هفته به خون های جدول
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
            //افزودن اطلاعات روز های خاص به خون های جدول در صورت وجود
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
            //ساخت ردیف رویدادهای تقویم
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
            //ساخت یک ردیف خالی بر اساس نوع ردیف
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
            //ساخت یک tr ساده
            RozitaCalendar.prototype.createNewTr = function (rowType) {
                var tr = $("<tr></tr>");
                this.lastRowNumber++;
                tr.attr(RozitaCalendarConst.rowNumberAttribName, this.lastRowNumber);
                tr.attr(RozitaCalendarConst.rowTypeAttribName, rowTypes[rowType].toString());
                return tr;
            };
            //ساخت یک ردیف خالی آماده برای ورود دیتا
            RozitaCalendar.prototype.createNewEventRow = function () {
                var tr = this.createEmptyRow(rowTypes.data);
                this.lastDataRowNumber++;
                tr.attr(RozitaCalendarConst.dataRowNumberAttribName, this.lastDataRowNumber);
                return tr;
            };
            //ساخت یک خونه یا سل را با توجه به تاریخ و ردیف ایجاد میکند
            RozitaCalendar.prototype.createNewTd = function (tr, date) {
                var td = $("<td></td>");
                td.attr(RozitaCalendarConst.rowNumberAttribName, tr.attr(RozitaCalendarConst.rowNumberAttribName));
                td.attr(RozitaCalendarConst.colNumberAttribName, date.format("D"));
                td.attr(RozitaCalendarConst.cellDateAttribName, date.format("YYYY/MM/DD"));
                td.attr(RozitaCalendarConst.cellUniqueIdAttribName, this.newGuid());
                return td;
            };
            //ساخت یک خونه که یا سل برای هدر با توجه به تاریخ و ردیف
            RozitaCalendar.prototype.createNewTh = function (tr, date) {
                var td = $("<th></th>");
                td.attr(RozitaCalendarConst.rowNumberAttribName, tr.attr(RozitaCalendarConst.rowNumberAttribName));
                td.attr(RozitaCalendarConst.colNumberAttribName, date.format("D"));
                td.attr(RozitaCalendarConst.cellDateAttribName, date.format("YYYY/MM/DD"));
                td.attr(RozitaCalendarConst.cellUniqueIdAttribName, this.newGuid());
                return td;
            };
            //ساخت ساختار کلی table
            RozitaCalendar.prototype.createStructure = function () {
                this.element.html("");
                //
                this.elmMainSection = $("<div></div>");
                this.elmMainSection.addClass(RozitaCalendarConst.calendarClassName);
                if (this.options.isRtl) {
                    this.elmMainSection.addClass(RozitaCalendarConst.rtlCalendarClassName);
                    this.elmMainSection.attr("direction", "rtl");
                }
                //ساخت ساختار جدول
                this.elmTable = $("<table></table>");
                this.elmTable.attr("border", this.options.tableBorder);
                //ساختار هدر
                this.elmThead = $("<thead></thead>");
                //ساختار بدنه
                this.elmTbody = $("<tbody></tbody>");
                //
                this.elmTable.append(this.elmThead);
                this.elmTable.append(this.elmTbody);
                //
                this.elmMainSection.append(this.elmTable);
                //add to main element
                this.element.append(this.elmMainSection);
            };
            //متدی که تعداد ردیف های مورد نیاز برای قرار دهی دیتا را می شمارد
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
            //متدی که از تاریخ و تا تاریخ را میگیرد و آنها را مجزا شده و روز به روز تحویل میدهد
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
            //پیدا کردن شماره ردیف خونه ی ریشه
            RozitaCalendar.prototype.getRootRowNumber = function (rootId) {
                var rootCell = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + rootId + "']");
                var rowNum = rootCell.attr(RozitaCalendarConst.rowNumberAttribName);
                return Number(rowNum);
            };
            // پیدا کردن شماره دیتای ردیف خونه ی ریشه 
            RozitaCalendar.prototype.getRootDataRowNumber = function (rootId) {
                var rootCell = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + rootId + "']");
                var rowNum = rootCell.attr(RozitaCalendarConst.dataRowNumberAttribName);
                return Number(rowNum);
            };
            //-------------------------------------------------------
            //قراردهی دیتا به درون سورس اطلاعات و نه از جدول
            RozitaCalendar.prototype.insertToSource = function (item) {
                this.options.events.push(item);
            };
            //حذف دیتا از سورس و نه از جدول
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
            //چینش دیتاها
            RozitaCalendar.prototype.sortEvents = function (items) {
                var res = items;
                //مقایسه براساس فیلد Order
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
                //مقایسه بر اساس تاریخ تا چنیشن رکوردها فرق کند
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
            //متدی برای شمارش تاریخ های تکراری
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
            //حذف یک رکورد از سورس بر اساس ایندکس
            RozitaCalendar.prototype.removeRecordByIndex = function (data, idx) {
                data.splice(idx, 1);
            };
            //حذف رکورد از سورس بر اساس کلید اصلی
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
            //پیدا کردن شماره ایندکس از سورس با توجه به آبجکت
            RozitaCalendar.prototype.getIndexRecord = function (data, rowObject) {
                var idx = $.inArray(rowObject, data);
                return idx;
            };
            //پیدا کردن شماره ایندکس از سورس بر اساس کلید اصلی
            RozitaCalendar.prototype.getSourceRecordIndexByKey = function (rootId) {
                var item = this.getRecordByKey(rootId);
                if (item == null) {
                    return -1;
                }
                return this.getIndexRecord(this.options.events, item);
            };
            //ساخت یک کلید منحصر به فرد
            RozitaCalendar.prototype.newGuid = function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };
            //تبدیل ارقام انگلیسی به فارسی
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
            //تبدیل ارقام فارسی به انگلیسی
            RozitaCalendar.prototype.convertPersianNumberToEnglish = function (enDigit) {
                if (enDigit == null) {
                    return null;
                }
                var number = enDigit.toString();
                var newValue = "";
                for (var i = 0; i < number.length; i++) {
                    var ch = number.charCodeAt(i);
                    if (ch >= 1776 && ch <= 1785) // For Persian digits.
                     {
                        var newChar = ch - 1728;
                        newValue = newValue + String.fromCharCode(newChar);
                    }
                    else if (ch >= 1632 && ch <= 1641) // For Arabic & Unix digits.
                     {
                        var newChar = ch - 1584;
                        newValue = newValue + String.fromCharCode(newChar);
                    }
                    else
                        newValue = newValue + String.fromCharCode(ch);
                }
                return newValue;
            };
            //متدی که چک می کند که مقدار وارد شده به درون یک فیلد آیا فانکشن است یا خیر
            RozitaCalendar.prototype.isFunction = function (functionToCheck) {
                var getType = {};
                return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
            };
            //اجرای یک فانکشن بر اساس نام آن
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
                        customFormat2: null
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
        //افزودن زبان فارسی به تقویم
        moment.loadPersian();
        //$(function () {
        //    $('.rozita_calendar table').fixedtableheader();
        //});
        return new SilverPath.Components.RozitaCalendar(this, options);
    };
})(jQuery);
