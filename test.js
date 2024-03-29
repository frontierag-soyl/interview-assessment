'use strict';

//Class to store and sort a list of numeric years (4 digit)
var YearData = (function () {

    //Constructor
    function YearData() {
        this.yearDataList = [];
    }

    //Add either an array of year or a single year to the associative array or year strings
    YearData.prototype.addToYearList = function (yearToAdd) {

        var _this = this;
        var i, inLength;

        if (yearToAdd instanceof Array) {

            inLength = yearToAdd.length;
            _this.yearToAdd.sort();
            for (i = 0; i < inLength; i++) {
                if (_this.yearDataList.indexOf(yearToAdd[i]) < 0) {
                    //Not in list yet, so add to start of list
                    _this.yearDataList.push(yearToAdd[i]);

                }
            }
        } else {
            _this.yearDataList.push(yearToAdd);
        }

        //Make sure everything is an integer
        for (i = 0; i < _this.yearDataList.length; i++) {
            _this.yearDataList[i] = parseInt(_this.yearDataList[i]);
        }

        //Sort the list using a number compare
        _this.yearDataList.sort(function (a, b) {
            if (a < b) {
                return -1;
            } else if (a > b) {
                return 1;
            }
            return 0;
        });


        return _this.yearDataList;
    };


    //Return a copy of the array
    YearData.prototype.getYearDataList = function () {
        return this.yearDataList.slice();
    };


    //Use the underlying year data list to return a contiguous list of years up until this year
    //ie. fill in gaps and add in next year
    YearData.prototype.getContiguousYearDataListWithExtension = function () {
        var retArray = [];
        var i, minYear, maxYear;
        var timeNow = new Date();
        var nextYear = timeNow.getFullYear() + 1;

        minYear = Math.min.apply(Math, this.yearDataList);
        maxYear = Math.max.apply(Math, this.yearDataList);

        //Years are in descending order
        if (nextYear > maxYear) {
            maxYear = nextYear;
        }
        if (minYear > 0 && maxYear - minYear < 100) {
            for (i = maxYear; i >= minYear; i--) {
                retArray.push(i);
            }
        }

        //We must sort the return list
        return retArray.sort(
        );
    };

    return YearData;
}());
