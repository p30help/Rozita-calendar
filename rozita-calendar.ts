/// <reference path="./typing/moment/moment.d.ts" />
/// <reference path="./typing/jquery/jquery.d.ts" />

//name: Rozita Calendar
//version : 1.0.0.0
//company: silverpath
//author: Mehdi Radi
//summary: This is a javascript library for show event on table automaticlly

module SilverPath.Components {

    class RozitaCalendarConst {

        public static cellDataName = "data";
        public static optionsDataName = "options";

        //attributes
        public static rowNumberAttribName = "row_num";
        public static dataRowNumberAttribName = "data_row_num";
        public static colNumberAttribName = "col_num";
        public static cellDateAttribName = "cell_date";
        public static cellUniqueIdAttribName = "cell_uid";

        public static cellMustMergedAttribName = "must_merged";
        public static cellSourceIdAttribName = "src_id";
        public static cellRootIdAttribName = "root_id";

        public static cellFirstAttribName = "first_cell";
        public static cellTypeAttribName = "cell_type";
        public static rowTypeAttribName = "row_type";

        //class names
        public static calendarClassName = "rozita_calendar";
        public static rtlCalendarClassName = "rozita_calendar_rtl";

        public static headerRowClassName = "header_row";
        public static headerSpecialDayRowClassName = "spd_row";
        public static headerYearRowClassName = "year_row";
        public static headerMonthRowClassName = "month_row";
        public static headerDayRowClassName = "day_row";
        public static headerDayOfWeekRowClassName = "day_of_week_row";
        public static headerCustomFormat1RowClassName = "custom_format_1_row";
        public static headerCustomFormat2RowClassName = "custom_format_2_row";

        //public static headerSpringMonthCellClassName = "cell_root";
        //public static headerSummerMonthsCellClassName = "cell_root";
        //public static headerAutumnMonthsCellClassName = "cell_root";
        //public static headerWinterMonthCellClassName = "cell_root";

        public static headerSpecialDayCellClassName = "spd_day";

        public static headerMonth01CellClassName = "month-01";
        public static headerMonth02CellClassName = "month-02";
        public static headerMonth03CellClassName = "month-03";
        public static headerMonth04CellClassName = "month-04";
        public static headerMonth05CellClassName = "month-05";
        public static headerMonth06CellClassName = "month-06";
        public static headerMonth07CellClassName = "month-07";
        public static headerMonth08CellClassName = "month-08";
        public static headerMonth09CellClassName = "month-09";
        public static headerMonth10CellClassName = "month-10";
        public static headerMonth11CellClassName = "month-11";
        public static headerMonth12CellClassName = "month-12";

        public static cellSaturdayClassName = "cell_saturday";
        public static cellSundayClassName = "cell_sunday";
        public static cellMondayClassName = "cell_monday";
        public static cellTuesdayClassName = "cell_tuesday";
        public static cellWednesdayClassName = "cell_wednesday";
        public static cellThursdayClassName = "cell_thursday";
        public static cellFridayClassName = "cell_friday";

        public static rootCellClassName = "cell_root";
        public static childCellClassName = "cell_child";
        //public static cellDataClassName = "cell_Data";
    }

    enum cellTypes {
        root,
        child,
        offset,
    }

    enum rowTypes {
        header,
        offset,
        data,
        footer
    }

    enum headerRowTypes {
        day,
        month,
        year,
        day_of_week,
        custom_format_1,
        custom_format_2,
        special_day
    }

    export class RozitaCalendar {



        // Default Options
        static defaultOptions: RozitaCalendarOptions =
        {
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
                }],
            events: null,
            specialDays: null,
            eventOffset: 1,
            tableBorder: 1,
            callbacks: null
        };

        // Fields
        element: JQuery;
        options: RozitaCalendarOptions;

        dStart: moment.Moment;
        dFinish: moment.Moment;

        elmMainSection: JQuery;
        elmTable: JQuery;
        elmThead: JQuery;
        elmTbody: JQuery;
        lastRowNumber: number = 0;
        lastDataRowNumber: number = 0;

        constructor(element: JQuery, options: RozitaCalendarOptions) {

            if(element.length == 0)
            {
                throw "Element '" + element.selector  + "' was not found on the page.";
            }

            // Merge options
            var mergedOptions: RozitaCalendarOptions = $.extend(RozitaCalendar.defaultOptions, options);
            this.options = mergedOptions;
            this.element = element;


            if (options != null) {
                this.onCreate();
            }
        }

        onCreate() {

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
                var eArgs: ITableRenderedCallbackArgs = {

                }

                //if callback field is function
                if (this.isFunction(this.options.callbacks.tableRendered)) {
                    this.options.callbacks.tableRendered(eArgs);
                }
                //if callback field is function name
                else {
                    this.executeFunctionByName(this.options.callbacks.tableRendered, window, eArgs);
                }
            }
        }

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

        public search(searchText: string): void {

            this.executeAsync(() => {

                //event
                if (this.options.callbacks.eventsSearchingStarted != null) {
                    var eArgs: IEventsSearchCallbackArgs = {
                        cellId: null,
                        event : null
                    }

                    //if callback field is function
                    if (this.isFunction(this.options.callbacks.eventsSearchingStarted)) {
                        this.options.callbacks.eventsSearchingStarted(eArgs);
                    }
                    //if callback field is function name
                    else {
                        this.executeFunctionByName(this.options.callbacks.eventsSearchingStarted, window, eArgs);
                    }
                }

                //
                var isFinished = false;
                var cellId = null;
                if (this.options.events != null) {
                    this.options.events.forEach((item, index) => {

                        if (isFinished) {

                        } else {

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
                if (this.options.callbacks.eventsSearchingFinished != null) {
                    var eArgs: IEventsSearchCallbackArgs = {
                        cellId : cellId,
                        event : null
                    }
                    if (cellId != null) {
                        eArgs.event = this.getRecordByKey(cellId);
                    }

                    //if callback field is function
                    if (this.isFunction(this.options.callbacks.eventsSearchingFinished)) {
                        this.options.callbacks.eventsSearchingFinished(eArgs);
                    }
                    //if callback field is function name
                    else {
                        this.executeFunctionByName(this.options.callbacks.eventsSearchingFinished, window, eArgs);
                    }
                }

            });
        }

        //آماده سازی جدول
        private prepareTable() {

            //create html table strucure
            this.createStructure();

            //create thead rows
            this.createHeader();

            //
            this.executeAsync(() => {
                this.fillData();
            });
        }

        private executeAsync(func): void {
            setTimeout(func, 0);
        }

        //پر کردن اطلاعات در صفحه
        private fillData(): void {

            if (this.options.events == null) {
                return;
            }


        
            //sort event items by date & order field
            this.sortEvents(this.options.events);


            //put event item in tables one by one
            console.time("events");
            if (this.options.events != null) {
                this.options.events.forEach((item, index) => {
                    this.putEventToCalendar(item);
                });
            }
            console.timeEnd("events");

     
            //merge cells
            this.mergeCells();
         
            

            //bind jquery event
            this.activeTriggers();
        }

        // بایند کردن کالبک های های جی کوئری
        private activeTriggers() {

            //event click on every cell
            this.element.find("td").on("click", (clickEvent) => {

                if (this.options.callbacks.cellClicked != null) {

                    //prepare event arg values
                    var cell = $(clickEvent.currentTarget);
                    var row = this.getTrByCell(cell);
                    var date = cell.attr(RozitaCalendarConst.cellDateAttribName);
                    var uid = cell.attr(RozitaCalendarConst.cellUniqueIdAttribName);
                    var rowType = row.attr(RozitaCalendarConst.rowTypeAttribName);
                    var cellType = row.attr(RozitaCalendarConst.cellTypeAttribName);
                    var dataItem: RozitaCalendarEventBase = cell.data(RozitaCalendarConst.cellDataName);
                    var rootId: string = cell.attr(RozitaCalendarConst.cellRootIdAttribName);

                    //get root item
                    var rootItem = null;
                    if (rootId != null) {
                        rootItem = this.getRecordByKey(rootId);
                    }

                    //create eventargs callback
                    var eArgs: ICellClickedCallbackArgs = {
                        clickEvent: event,
                        date: date,
                        rowType: rowType,
                        cellType: cellType,
                        cellUid: uid,
                        item: dataItem,
                        rootItem: rootItem
                    };

                    //if callback field is function
                    if (this.isFunction(this.options.callbacks.cellClicked)) {
                        this.options.callbacks.cellClicked(eArgs);
                    }
                    //if callback field is function name
                    else {
                        //window[this.options.callbacks.cellClicked](eArgs);
                        this.executeFunctionByName(this.options.callbacks.cellClicked, window, eArgs);
                    }

                }
            });

        }

        //قرار دادن آیتم در جدول
        private putEventToCalendar(item: RozitaCalendarEvent): void {

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
                item.childs.forEach((childItem, index) => {
                    this.putEventSegmentToCalendar(item.id, childItem, startRowNumber, cellTypes.child);
                });
            }
            //console.timeEnd("put child cell");

           // console.time("put offset");
            //append offset row after rows
            for (var i = 1; i <= this.options.eventOffset; i++) {
                this.putOffsetToCells(item, startRowNumber);
            }
            //console.timeEnd("put offset");

        }

        // قراردادن جزئیات یک آیتم در جدول
        private putEventSegmentToCalendar(rootId: string, item: RozitaCalendarEventBase, baseDataRowNumber: number, cellType: cellTypes) {

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
                } else {
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
                } else {
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


        }

        // قرار دادن اطلاعات برای یکی خونه از جدول
        private putDataToCell(cellTd: JQuery, item: RozitaCalendarEventBase, cellType: string, rootId: string): void {

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
            } else {
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

        }

        // قرار دادن ردیف آفست برای یک آیتم
        private putOffsetToCells(item: RozitaCalendarEvent, baseDataRowNumber: number) {

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


        }

        //گرفتن ردیف با توجه به خونه ی آن
        private getTrByCell(cell: JQuery): JQuery {
            //پیدا کردن ردیف با توجه به سل
            return cell.parents("tr:first");
        }

        //متدی که یکی یکی ردیف ها را چک میکند تا بتواند اولین ردیف خالی برای جایگذاری آیتم ها را پیدا کند
        private findEmptyRowNumber(startDate: string, finishDate: string, dataRowNum: number, childLevels: number): number {

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
        }

        //چک کردن اینکه آیا ردیف مورد نظر بر اساس شماره وجود دارد یا خیر
        private isDataRowExisted(dataRowNumber: number): boolean {

            var res = this.element.find("[" + RozitaCalendarConst.dataRowNumberAttribName + " = '" + dataRowNumber + "']");
            if (res.length > 0) {
                return true;
            } else {
                return false;
            }
        }

        //چک کردن اینکه آیا می توان در ردیف و تارخ های مورد نظر آیتم ها را جایگذاری کرد یا نه
        private canPutEvent(startDate: string, finishDate: string, dataRowNum: number, childLevels: number): boolean {

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
                    } else {
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


        }

        // گرفتن ردیف دیتا بر اساس شماره ردیف دیتا
        private getDataTr(dataRowNumber: number): JQuery {
            var tr = this.element.find("[" + RozitaCalendarConst.dataRowNumberAttribName + "='" + dataRowNumber + "']");
            if (tr.length == 0) {
                return null;
            }
            return tr;
        }

        //گرفتن خونه مورد نظر بر اساس شماره و  تاریخ
        private getCellByDate(date: string, rowNum: number): JQuery {
            var tr = this.getDataTr(rowNum);
            var cell = this.getCellOnTr(tr, date);
            return cell;
        }

        //گرفته خونه ی مورد نظر در یک ردیف بر اساس سال
        private getCellOnTr(tr: JQuery, date: string): JQuery {
            if (tr == null) {
                return null;
            }

            var cell = tr.find("[" + RozitaCalendarConst.cellDateAttribName + "='" + date + "']");;
            if (cell.length === 0) {
                return null;
            }
            return cell;
        }

        //فهمیدن اینکه آیا برای خونه ی مورد نظر نوع تعیین شده است
        private hasCellType(cell: JQuery): boolean {
            if (cell == null) {
                return false;
            }

            if (
                cell.attr(RozitaCalendarConst.cellTypeAttribName) == null ||
                cell.attr(RozitaCalendarConst.cellTypeAttribName) == ""
            ) {
                return false;
            }

            return true;
        }

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
        private markAsMerge(firstCell: JQuery, cell: JQuery) {


            var sourceId = firstCell.attr(RozitaCalendarConst.cellUniqueIdAttribName);

            cell.attr(RozitaCalendarConst.cellMustMergedAttribName, sourceId);
            //cell.attr(RozitaCalendarConst.cellHasDataAttribName, "true");
            cell.attr(RozitaCalendarConst.cellTypeAttribName, "data");
        }

        //ادغام خونه های مارک شده
        private mergeCells() {

            //این خط تمامی خونه های که علامت گزاری شده اند را گرفته
            //و خونه های اضافی را پاک کردن و در عوض برای خونه ی اصلی
            //colspan قرار میدهد
            this.element.find("[" + RozitaCalendarConst.cellFirstAttribName + "]").each((index, elm) => {

                var cell = $(elm);

                //if (cell.attr(RozitaCalendarConst.cellMergeCheckedAttribName) == null) {

                var uid = cell.attr(RozitaCalendarConst.cellUniqueIdAttribName);
                var mergItems = this.element.find("[" + RozitaCalendarConst.cellMustMergedAttribName + " = '" + uid + "']");
                if (mergItems.length > 0) {
                    mergItems.remove();
                    cell.attr("colspan", mergItems.length + 1);
                    //cell.attr(RozitaCalendarConst.cellMergeCheckedAttribName, "true");

                }
                //}

            });
        }

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
        public clearEvents() {
            //گرفتن تمامی خونه های مربوط به ردیف های دیتا
            var items = this.element.find("tr[" + RozitaCalendarConst.rowTypeAttribName + "='" + rowTypes[rowTypes.data].toString() + "']").find("td");

            items.each((index, elm) => {
                var cell = $(elm);
                this.clearCell(cell);
            });

        }

        //پاک کردن اطلاعات یک خونه
        private clearCell(cell: JQuery): void {
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

        }

        //بازگردانی ادغام خونه های ادغام شده
        private unmergedCell(cell: JQuery): void {
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
        }

        //چک کردن اینکه در خونه ی مورد نظر دیتا وجود دارد یا نه
        public existEvent(rootId: string): boolean {
            var cells = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + rootId + "']");
            if (cells.length > 0) {
                return true;
            }

            return false;
        }

        //ورود لیستی از دیتاها بصورت ران تایم به جدول
        public importEvents(items: RozitaCalendarEvent[]) {
            if (items == null) {
                return;
            }

            items.forEach((item) => {
                this.addEvent(item);
            });
        }

        //ورود یک دیتا بصورت ران تایم به جدول
        public addEvent(item: RozitaCalendarEvent) {
            if (this.existEvent(item.id)) {
                return;
            }

            this.putEventToCalendar(item);
        }

        //افزودن یک قسمت از دیتا به جدول
        private addEventSegment(rootId: string, item: RozitaCalendarEventBase) {

            if (this.existEvent(rootId) == false) {
                console.log("event with id = '" + rootId + "' not fount");
                return;
            }

            var dataRowNum = this.getRootDataRowNumber(rootId);
            this.putEventSegmentToCalendar(rootId, item, dataRowNum, cellTypes.child);
        }

        //بروزرسانی یک دیتا در جدول
        public updateEvent(item: RozitaCalendarEvent) {
            this.removeEventById(item.id);
            this.addEvent(item);
        }

        //حذف یک دیتا از جدول بر اساس آی دی
        public removeEventById(rootId: string) {
            var cells = this.element.find("[" + RozitaCalendarConst.cellRootIdAttribName + " = '" + rootId + "']");
            cells.each((index, elm) => {
                var cell = $(elm);
                this.clearCell(cell);
            });
        }

        //حذف یک قسمت از دیتا بر اساس آی دی
        public removeEventSegmentById(id: string) {
            var cells = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + id + "']");
            cells.each((index, elm) => {
                var cell = $(elm);
                this.clearCell(cell);
            });
        }

        //حذف یک دیتا از جدول بر اساس آی دی خود خونه ها
        //TODO
        private removeEventByUid(uid: string) {

        }

        //رندر کردن و دوباره ساختن کل جدول
        public render() {
            this.element.html("");
            this.onCreate();
        }

        //تغییر تاریخ های شروع و پایان جدول
        public changeCalendarDate(startDate: string, finishDate: string) {

            this.options.startDate = startDate;
            this.options.finishDate = finishDate;

            this.render();
        }

        //ساخت کل قسمت thead
        private createHeader() {

            //create local headers
            this.options.locals.forEach((local, index) => {

                if (local.customFormat1 != null && local.customFormat1 == "") {
                    var trCFormat = this.createHeaderRows(local, headerRowTypes.custom_format_1);

                    //class
                    trCFormat.addClass(RozitaCalendarConst.headerRowClassName);
                    trCFormat.addClass(RozitaCalendarConst.headerCustomFormat1RowClassName);

                    this.elmThead.append(trCFormat);
                }

                if (local.customFormat2 != null && local.customFormat2 == "") {
                    var trCFormat = this.createHeaderRows(local, headerRowTypes.custom_format_2);

                    //class
                    trCFormat.addClass(RozitaCalendarConst.headerRowClassName);
                    trCFormat.addClass(RozitaCalendarConst.headerCustomFormat2RowClassName);

                    this.elmThead.append(trCFormat);
                }

                if (local.showYear) {
                    var trYear = this.createHeaderRows(local, headerRowTypes.year);

                    //class
                    trYear.addClass(RozitaCalendarConst.headerRowClassName);
                    trYear.addClass(RozitaCalendarConst.headerYearRowClassName);

                    this.elmThead.append(trYear);
                }

                if (local.showMonth) {
                    var trMonth = this.createHeaderRows(local, headerRowTypes.month);

                    //class
                    trMonth.addClass(RozitaCalendarConst.headerRowClassName);
                    trMonth.addClass(RozitaCalendarConst.headerMonthRowClassName);

                    this.elmThead.append(trMonth);
                }

                if (local.showDay) {
                    var trDay = this.createHeaderRows(local, headerRowTypes.day);

                    //class
                    trDay.addClass(RozitaCalendarConst.headerRowClassName);
                    trDay.addClass(RozitaCalendarConst.headerDayRowClassName);

                    this.elmThead.append(trDay);
                }


                if (local.showDayOfWeek) {
                    var trDayOfWeek = this.createHeaderRows(local, headerRowTypes.day_of_week);

                    //class
                    trDayOfWeek.addClass(RozitaCalendarConst.headerRowClassName);
                    trDayOfWeek.addClass(RozitaCalendarConst.headerDayOfWeekRowClassName);

                    this.elmThead.append(trDayOfWeek);
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


        }

        //ساخت ردیف های قسمت thead
        private createHeaderRows(local: RozitaCalendarLocalOptions, headRowType: headerRowTypes): JQuery {

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
                        } else {
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
                        } else {
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
        }

        //اضافه کردن کلاس های مربوط به ماه به خونه های جدول
        private addMonthClassToCell(cell: JQuery, monthNum: string) {
            if (monthNum == "1") {
                cell.addClass(RozitaCalendarConst.headerMonth01CellClassName);
            } else if (monthNum == "2") {
                cell.addClass(RozitaCalendarConst.headerMonth02CellClassName);
            } else if (monthNum == "3") {
                cell.addClass(RozitaCalendarConst.headerMonth03CellClassName);
            } else if (monthNum == "4") {
                cell.addClass(RozitaCalendarConst.headerMonth04CellClassName);
            } else if (monthNum == "5") {
                cell.addClass(RozitaCalendarConst.headerMonth05CellClassName);
            } else if (monthNum == "6") {
                cell.addClass(RozitaCalendarConst.headerMonth06CellClassName);
            } else if (monthNum == "7") {
                cell.addClass(RozitaCalendarConst.headerMonth07CellClassName);
            } else if (monthNum == "8") {
                cell.addClass(RozitaCalendarConst.headerMonth08CellClassName);
            } else if (monthNum == "9") {
                cell.addClass(RozitaCalendarConst.headerMonth09CellClassName);
            } else if (monthNum == "10") {
                cell.addClass(RozitaCalendarConst.headerMonth10CellClassName);
            } else if (monthNum == "11") {
                cell.addClass(RozitaCalendarConst.headerMonth11CellClassName);
            } else if (monthNum == "12") {
                cell.addClass(RozitaCalendarConst.headerMonth12CellClassName);
            }


        }

        //افزودن کلاس مربوط به روز هفته به خون های جدول
        private addDayOfWeekClassToCell(cell: JQuery, dayOfWeek: string) {
            if (dayOfWeek.toLowerCase() == "saturday") {
                cell.addClass(RozitaCalendarConst.cellSaturdayClassName);
            } else if (dayOfWeek.toLowerCase() == "sunday") {
                cell.addClass(RozitaCalendarConst.cellSundayClassName);
            } else if (dayOfWeek.toLowerCase() == "monday") {
                cell.addClass(RozitaCalendarConst.cellMondayClassName);
            } else if (dayOfWeek.toLowerCase() == "tuesday") {
                cell.addClass(RozitaCalendarConst.cellTuesdayClassName);
            } else if (dayOfWeek.toLowerCase() == "wednesday") {
                cell.addClass(RozitaCalendarConst.cellWednesdayClassName);
            } else if (dayOfWeek.toLowerCase() == "thursday") {
                cell.addClass(RozitaCalendarConst.cellThursdayClassName);
            } else if (dayOfWeek.toLowerCase() == "friday") {
                cell.addClass(RozitaCalendarConst.cellFridayClassName);
            }
        }

        //افزودن اطلاعات روز های خاص به خون های جدول در صورت وجود
        private checkForSpecialDay(cell: JQuery) {
            var date = cell.attr(RozitaCalendarConst.cellDateAttribName);
            if (this.options.specialDays != null) {
                this.options.specialDays.forEach((item, index) => {
                    if (item.date == date) {
                        cell.addClass(RozitaCalendarConst.headerSpecialDayCellClassName);
                        if (item.cssClass != null) {
                            cell.addClass(item.cssClass);
                        }
                    }
                });
            }
        }

        //ساخت ردیف رویدادهای تقویم
        private createSpecialDayRow(): JQuery {

            if (this.options.specialDays == null ||
                this.options.specialDays.length == 0
            ) {
                return null;
            }

            var tr = this.createEmptyRow(rowTypes.header);

            this.options.specialDays.forEach((item: RozitaCalendarSpecialDay, index) => {
                var cell = this.getCellOnTr(tr, item.date);
                if (cell != null) {
                    cell.html(item.title);
                }

            });

            return tr;
        }

        //ساخت یک ردیف خالی بر اساس نوع ردیف
        private createEmptyRow(rowType: rowTypes): JQuery {

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
        }

        //ساخت یک tr ساده
        private createNewTr(rowType: rowTypes) {
            var tr = $("<tr></tr>");

            this.lastRowNumber++;
            tr.attr(RozitaCalendarConst.rowNumberAttribName, this.lastRowNumber);
            tr.attr(RozitaCalendarConst.rowTypeAttribName, rowTypes[rowType].toString());

            return tr;
        }

        //ساخت یک ردیف خالی آماده برای ورود دیتا
        private createNewEventRow() {
            var tr = this.createEmptyRow(rowTypes.data);

            this.lastDataRowNumber++;
            tr.attr(RozitaCalendarConst.dataRowNumberAttribName, this.lastDataRowNumber);
       

            return tr;
        }

        //ساخت یک خونه یا سل را با توجه به تاریخ و ردیف ایجاد میکند
        private createNewTd(tr: JQuery, date: moment.Moment): JQuery {
            var td = $("<td></td>");

            td.attr(RozitaCalendarConst.rowNumberAttribName, tr.attr(RozitaCalendarConst.rowNumberAttribName));
            td.attr(RozitaCalendarConst.colNumberAttribName, date.format("D"));
            td.attr(RozitaCalendarConst.cellDateAttribName, date.format("YYYY/MM/DD"));

            td.attr(RozitaCalendarConst.cellUniqueIdAttribName, this.newGuid());

            return td;
        }

        //ساخت یک خونه که یا سل برای هدر با توجه به تاریخ و ردیف
        private createNewTh(tr: JQuery, date: moment.Moment): JQuery {
            var td = $("<th></th>");

            td.attr(RozitaCalendarConst.rowNumberAttribName, tr.attr(RozitaCalendarConst.rowNumberAttribName));
            td.attr(RozitaCalendarConst.colNumberAttribName, date.format("D"));
            td.attr(RozitaCalendarConst.cellDateAttribName, date.format("YYYY/MM/DD"));

            td.attr(RozitaCalendarConst.cellUniqueIdAttribName, this.newGuid());

            return td;
        }

        //ساخت ساختار کلی table
        private createStructure() {
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
        }

        //متدی که تعداد ردیف های مورد نیاز برای قرار دهی دیتا را می شمارد
        private countEventMaxChildsLevel(item: RozitaCalendarEvent) {

            var level = 0;

            //
            if (item.childs == null || item.childs.length == 0) {
                return level;
            }

            //splite all days and count
            var allDays: string[] = [];
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


        }

        //متدی که از تاریخ و تا تاریخ را میگیرد و آنها را مجزا شده و روز به روز تحویل میدهد
        private splitToDays(startDate: string, finishDate: string): string[] {
            var result: string[] = [];

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
        }

        //پیدا کردن شماره ردیف خونه ی ریشه
        private getRootRowNumber(rootId: string): number {
            var rootCell = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + rootId + "']");
            var rowNum = rootCell.attr(RozitaCalendarConst.rowNumberAttribName);

            return Number(rowNum);
        }

        // پیدا کردن شماره دیتای ردیف خونه ی ریشه 
        private getRootDataRowNumber(rootId: string): number {
            var rootCell = this.element.find("[" + RozitaCalendarConst.cellSourceIdAttribName + " = '" + rootId + "']");
            var rowNum = rootCell.attr(RozitaCalendarConst.dataRowNumberAttribName);

            return Number(rowNum);
        }

        //-------------------------------------------------------

        //قراردهی دیتا به درون سورس اطلاعات و نه از جدول
        private insertToSource(item: RozitaCalendarEvent) {
            this.options.events.push(item);
        }

        //حذف دیتا از سورس و نه از جدول
        private removeFromSource(rootId: string): boolean {

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

        }

        //-------------------------------------------------------

        //چینش دیتاها
        private sortEvents(items: RozitaCalendarEvent[]) {

            var res = items;

            //مقایسه براساس فیلد Order
            res = res.sort((a, b) => {

                if (a.order == b.order) {
                    return 0;
                }
                else if (a.order > b.order) {
                    return 1;
                } else {
                    return -1;
                }

            });

            //مقایسه بر اساس تاریخ تا چنیشن رکوردها فرق کند
            res = res.sort((a, b) => {

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
                } else {
                    return 1;
                }

            });


            //
            this.options.events = res;
        }

        //-------------------------------------------------------

        //متدی برای شمارش تاریخ های تکراری
        private countingDuplicateDates(dates: string[]): any {

            var repeatCounts: any = {};

            jQuery.each(dates, (key, value) => {
                if (!repeatCounts.hasOwnProperty(value)) {
                    repeatCounts[value] = 1;
                } else {
                    repeatCounts[value]++;
                }
            });


            return repeatCounts;
        }

        //حذف یک رکورد از سورس بر اساس ایندکس
        private removeRecordByIndex(data: Object[], idx: number): void {
            data.splice(idx, 1);
        }

        //حذف رکورد از سورس بر اساس کلید اصلی
        private getRecordByKey(rootId: string): Object {
            if (rootId == null) {
                return null;
            }

            var findItem = this.options.events.filter((item) => {
                if (item.id == rootId) {
                    return true;
                }
                return false;
            });

            if (findItem != null && findItem.length > 0) {
                return findItem[0];
            }
            return null;
        }

        //پیدا کردن شماره ایندکس از سورس با توجه به آبجکت
        private getIndexRecord(data: Object[], rowObject: Object) {
            var idx = $.inArray(rowObject, data);

            return idx;
        }

        //پیدا کردن شماره ایندکس از سورس بر اساس کلید اصلی
        private getSourceRecordIndexByKey(rootId: string) {
            var item = this.getRecordByKey(rootId);
            if (item == null) {
                return -1;
            }

            return this.getIndexRecord(this.options.events, item);
        }

        //ساخت یک کلید منحصر به فرد
        private newGuid(): string {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        //تبدیل ارقام انگلیسی به فارسی
        private convertEnglishNumberToPersian(enDigit: string): string { // PERSIAN, ARABIC, URDO
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
                } else
                    newValue = newValue + String.fromCharCode(ch);
            }
            return newValue;
        }

        //تبدیل ارقام فارسی به انگلیسی
        private convertPersianNumberToEnglish(enDigit: string): string { // PERSIAN, ARABIC, URDO
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
                } else if (ch >= 1632 && ch <= 1641) // For Arabic & Unix digits.
                {
                    var newChar = ch - 1584;
                    newValue = newValue + String.fromCharCode(newChar);
                } else
                    newValue = newValue + String.fromCharCode(ch);
            }
            return newValue;
        }

        //متدی که چک می کند که مقدار وارد شده به درون یک فیلد آیا فانکشن است یا خیر
        private isFunction(functionToCheck: any): boolean {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }

        //اجرای یک فانکشن بر اساس نام آن
        private executeFunctionByName(functionName, context, args) {
            //var args = [].slice.call(arguments).splice(2);
            var namespaces = functionName.split(".");
            var func = namespaces.pop();
            for (var i = 0; i < namespaces.length; i++) {
                context = context[namespaces[i]];
            }
            //return context[func].apply(context, args);
            return context[func](args);
        }

    }

    export class RozitaCalendarOptions {
        public startDate: string;
        public finishDate: string;
        public isRtl: boolean;
        public locals: RozitaCalendarLocalOptions[];
        public events: RozitaCalendarEvent[];
        public specialDays: RozitaCalendarSpecialDay[];
        public eventOffset: number;
        public tableBorder: number;
        public callbacks: RozitaCalendarCallbackOptions;
    }

    export class RozitaCalendarCallbackOptions {
        public cellClicked: (e: ICellClickedCallbackArgs) => void;
        public tableRendered: (e: ITableRenderedCallbackArgs) => void;
        public eventsSearchingStarted: (e: IEventsSearchCallbackArgs) => void;
        public eventsSearchingFinished: (e: IEventsSearchCallbackArgs) => void;
    }


    export class RozitaCalendarLocalOptions {
        public lang: string;
        public showDayOfWeek: boolean;
        public showMonth: boolean;
        public showMonthNumber: boolean;
        public showDay: boolean;
        public showYear: boolean;
        public customFormat1: string;
        public customFormat2: string;
    }

    export class RozitaCalendarEventBase {
        public id: string;
        public startDate: string;
        public finishDate: string;
        public title: string;
        public order: number;
        public cssClass: string;
        public tooltip: string;
        public link: string;
        public linkTarget: string;
        public noWrap: boolean;
        public extra: any;
        public htmlAttributes: any;
    }

    export class RozitaCalendarEvent extends RozitaCalendarEventBase {
        public childs: RozitaCalendarEventBase[];
    }

    export class RozitaCalendarSpecialDay {
        public date: string;
        public title: string;
        public cssClass: string;
    }

    export class RozitaCalendarHeaderOptions {

    }

    export interface ICellClickedCallbackArgs {
        clickEvent: any;
        date: string;
        rowType: string;
        cellType: string;
        cellUid: string;
        item: RozitaCalendarEventBase;
        rootItem: RozitaCalendarEvent;
    }

    export interface ITableRenderedCallbackArgs {
    }

    export interface IEventsSearchCallbackArgs {
        event: Object;
        cellId: string;
    }

    class HtmlClassAttributes {
        private classes: string[];

        constructor() {
            this.classes = [];
        }

        public add(className: string): void {
            this.classes.push(className);
        }

        public clear(): void {
            this.classes = [];
        }

        public print(): string {
            var str = "";
            this.classes.forEach((cls, index) => {
                str += cls + " ";
            });

            return str;
        }
    }
}

declare namespace moment {
    interface MomentStatic {
        loadPersian();
    }
}




interface JQuery {

    rozitaCalendar: (options: SilverPath.Components.RozitaCalendarOptions) => void;
    fixedtableheader();
    //SpCalendar();
    //SpCalendar(obj?: any);
    //SpCalendar(options?: RozitaCalendarOptions);
}


(($) => {
    $.fn.rozitaCalendar = function (options) {
        //افزودن زبان فارسی به تقویم
        moment.loadPersian();

        //$(function () {
        //    $('.rozita_calendar table').fixedtableheader();
        //});

        return new SilverPath.Components.RozitaCalendar(this, options);

    }
})(jQuery);