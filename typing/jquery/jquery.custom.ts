/// <reference path="jquery.d.ts" />

interface JQuery {
    goTo(): JQuery;
    oLoader(options: any): JQuery;
    serializeObject(): string;
    iCheck(options: any): JQuery;
    formParams(convert: boolean): Object;
}

interface JQueryStatic {
    modal(): JQuery;
    modal(settings: Object, options: any): JQuery;
    UIkit;
}