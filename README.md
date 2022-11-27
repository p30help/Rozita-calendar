# Rozita-calendar
A jQuery Horizontal Calendar with unlimited dates with custom events.

### Getting start:

        <head>
            var options = {
                startDate: "2023/01/01",
                finishDate: "2023/03/29"
            };
            $("#calendar").rozitaCalendar(options);
        </head>
        <body>
            <div id="calendar"></div>
        </body>

### Component options:

        {
            startDate: "2023/01/01", // start calendar date
            finishDate: "2023/03/29", // finish calendar date
            isRtl: true, // enable Right to Left 
            eventOffset: 2, // rows gap between events
            tableBorder: 1, // table border thickness
            events: [{
                        id: "event_01", // html id for table cell
                        startDate:"2023/01/10", // start event date
                        finishDate:"2023/01/17", // finish event date
                        title: "Italy Trip", // title that show in middle of cell
                        order: 10, // order number to show upper or lower than other events
                        cssClass: 'trip', // css class for event cell
                        link: "http://italytrip123.com", // link for the title
                        linkTarget: "_blank", // target for title's link
                    }],
            specialDays: [{
                        date: "2023/01/01", // special date for calendar 
                        title: "New Year's Day", // title of special date
                        cssClass: null // add css class to show this date (column) differently
                    }],
            locals: [{
                        lang: "en", // "en" for gregorian calendar or "fa" for jalali calendar
                        showDayOfWeek : true, // show week row
                        showMonth: true, // show month row
                        showMonthNumber: true, // show month number row
                        showDay: true, // show day row
                        showYear: true, // show year row
                    }]
        }

### **Note:** if you want to change **roozita-calendat.ts** file
- First insatll **TypeScript** with `npm install typescript --save-dev` command
- Second compile that with `npx tsc rozita-calendar.ts` command 