/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        //allFeeds object has been defined and is not empty.
        it(' defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

    //allFeeds object and ensures it has a url defined and that the url is not empty.
        it('Urls are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
    });

        //allFeeds object and ensures it has a name defined and that the name is not empty.
        it('Names are defined', function () {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The Menu', function () {

        // Searches for the class of 'menu-hidden'
        it('hidden menu element', function () {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
        });
        //does the menu display when clicked and does it hide when clicked again.
        it('toggle is working', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

// test - initial entries
    describe('Initial Entries', function () {

        // asynchronous request
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });
    //* function is called and completes its work, there is at least
   //     * a single .entry element within the .feed container.
        it('feed has at least a single entry', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
        var firstFeed, secondFeed;

        // Ensures that the new feed is loaded
        beforeEach(function(done) {
            loadFeed(1, function() {

                // Test first feed
                console.log('First feed correctly loaded');

                // Loads first entry
                firstFeed = $('.feed').html();
                loadFeed(2, function() {

                    // Tests second feed
                    console.log('Second feed correctly loaded!');
                    done();
                });
            });
        });
        afterEach(function() {
            loadFeed(0);
        });

        // check if two entries are not equal
        it('two feeds are different', function() {

            //second feed
            secondFeed = $('.feed').html();
            expect(firstFeed).not.toEqual(secondFeed);
        });
    });
}());
