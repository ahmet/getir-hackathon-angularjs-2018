'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {
  it('should automatically redirect to /search when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/search");
  });

  describe('view1', function() {
    beforeEach(function() {
      browser.get('index.html#!/search');
    });

    it('should render search when user navigates to /search', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/Search records/);
    });
  });
});
