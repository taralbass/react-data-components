'use strict';

var $__0=     require('./utils'),sort=$__0.sort,filter=$__0.filter;

var containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

module.exports = {

  getInitialState:function() {
    return {
      sortBy: this.props.initialSortBy,
      filterValues: {
        globalSearch: ""
      },
      currentPage: 0,
      pageLength: this.props.initialPageLength
    };
  },

  getDefaultProps:function() {
    return {
      initialPageLength: 10,
      pageLengthOptions: [ 5, 10, 20 ],
      filters: {
        globalSearch: {
          filter: containsIgnoreCase
        }
      }
    };
  },

  onSort:function(sortBy) {
    this.setState({
      sortBy: sortBy
    });
  },

  onFilter:function(filterName, filterValue) {
    var $__0=  this.state,filterValues=$__0.filterValues;
    filterValues[filterName] = filterValue;

    this.setState({
      filterValues: filterValues,
      currentPage: 0
    });
  },

  // Pagination
  buildPage:function() {
    var $__0=     this.state,filterValues=$__0.filterValues,sortBy=$__0.sortBy,currentPage=$__0.currentPage,pageLength=$__0.pageLength;
    var $__1=  this.props,filters=$__1.filters;
    var start = pageLength * currentPage;

    var pageData = filter(filters, filterValues, this.props.initialData);
    pageData = sort(sortBy, pageData);
    pageData = pageData.slice(start, start + pageLength);

    return {
      data: pageData,
      currentPage: currentPage,
      totalPages: Math.ceil(pageData.length / pageLength)
    };
  },

  onChangePage:function(pageNumber) {
    this.setState({ currentPage: pageNumber });
  },

  onPageLengthChange:function(value) {
    var newPageLength = +value;
    var $__0=   this.state,currentPage=$__0.currentPage,pageLength=$__0.pageLength;
    var newPage = Math.floor((currentPage * pageLength) / newPageLength);

    this.setState({
      pageLength: newPageLength,
      currentPage: newPage
    });
  }

};
