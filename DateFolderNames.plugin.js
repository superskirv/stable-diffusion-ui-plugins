// ==UserScript==
// @name         sessionID Date Folder Names
// @version      0.2
// @description  Changes `sessionId` to YYYYMMDD
// @author       Super.Skirv

DateFoldersDate = new Date();
//I dont know if I need to initialize all of these but I did.
DateString = new String();
YearString = new String();
MonthString = new String();
DayString = new String();

//Break up the parts of the date into strings
YearString = DateFoldersDate.getFullYear().toString();
MonthString = ((DateFoldersDate.getMonth()+1).toString());
DayString = DateFoldersDate.getDate().toString();

//Fix the one digit days to have 2 digits by adding a zero in front.
if(MonthString.length == 1) {
  MonthString = "0" + MonthString
}
if(DayString.length == 1) {
  DayString = "0" + DayString
}
//Joins date string together
DateString = YearString + MonthString + DayString;
//Replaces the sessionId with our new string/date
sessionId = DateString.replaceAll(/:/g, '-');
