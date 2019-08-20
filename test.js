// This could be moved into the anonymous function, as it stands it applies to whole file.
"use strict";

//Class to store and sort a list of numeric years (4 digit)
//stop YearData from being redefined.
const YearData = (function() {
  //Constructor
  function YearData() {
    this.yearDataList = [];
  }

  //Add either an array of year or a single year to the associative array or year strings
  YearData.prototype.addToYearList = function(yearToAdd) {
    // No scoping issue. I didn't think it was necessary to scope this to the function.
    // var _this = this;

    if (yearToAdd instanceof Array) {
      let inLength = yearToAdd.length;
      //The below sort would convert the array items into strings and then sort. passed in comparison function. removed.
      //   yearToAdd.sort(decendingSort);

      for (let i = 0; i < inLength; i++) {
        //check for two digit date input
        if (yearToAdd[i] < 100) {
          yearToAdd[i] = shortToFullYear(yearToAdd[i]);
        }

        if (this.yearDataList.indexOf(yearToAdd[i]) < 0) {
          //Not in list yet, so add to start of list
          // Array.push() adds items to the end of the list.
          this.yearDataList.push(yearToAdd[i]);
        }
      }
    } else {
      if (yearToAdd < 100) {
        this.yearDataList.push(shortToFullYear(yearToAdd));
      } else {
        this.yearDataList.push(yearToAdd);
      }
    }

    //Make sure everything is an integer
    for (let i = 0; i < this.yearDataList.length; i++) {
      this.yearDataList[i] = parseInt(this.yearDataList[i]);
    }

    //Sort the list on return
    return this.yearDataList.sort(decendingSort);
  };

  //Return a copy of the array
  YearData.prototype.getYearDataList = function() {
    return this.yearDataList.slice();
  };

  //Use the underlying year data list to return a contiguous list of years up until this year
  //ie. fill in gaps and add in next year
  YearData.prototype.getContiguousYearDataListWithExtension = function() {
    const retArray = [];
    // Used let because the values change on each test for min + max year
    let minYear, maxYear;
    let timeNow = new Date();
    let nextYear = timeNow.getFullYear() + 1;

    minYear = Math.min.apply(Math, this.yearDataList);
    maxYear = Math.max.apply(Math, this.yearDataList);

    //Years are in descending order
    if (nextYear > maxYear) {
      maxYear = nextYear;
    }
    if (minYear > 0 && maxYear - minYear < 100) {
      for (let i = maxYear; i >= minYear; i--) {
        retArray.push(i);
      }
    }

    //We must sort the return list
    return retArray.sort(decendingSort);
  };

  // Errors from using a Array.sort() method without passing a comparison function lead the array items being converted to a string and having it sorted by utf units
  // this comparison function passed into the the sort methods above; decending the order.
  function decendingSort(a, b) {
    return b - a;
  }

  // convert short year into 4 digit year
  function shortToFullYear(year) {
    return year + 2000;
  }

  return YearData;
})();
