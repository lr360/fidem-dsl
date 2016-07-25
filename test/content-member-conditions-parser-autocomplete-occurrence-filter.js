'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Content Member Conditions Member:', function () {
        var literalChoices;
        var otherChoices;
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/content-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('should auto-complete the occurrence filter', function () {

            it('member did something at', function () {
                try {
                    parser.parse('member did something at');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['least']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something at least', function () {
                try {
                    parser.parse('member did something at least');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member did something at least number', function () {
                try {
                    parser.parse('member did something at least 2');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['time', 'times']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something at least number times', function () {
                try {
                    parser.parse('member did something at least 2 times 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(11);
                    should(literalChoices).eql([  'after', 'and', 'before', 'between', 'in range of', 'in zone', 'in', 'since', 'with RSSI']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something at least number time', function () {
                try {
                    parser.parse('member did something at least 1 time 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(11);
                    should(literalChoices).eql([  'after', 'and', 'before', 'between', 'in range of', 'in zone', 'in', 'since', 'with RSSI']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something less', function () {
                try {
                    parser.parse('member did something less');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['than']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something less than', function () {
                try {
                    parser.parse('member did something less than');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member did something less than number', function () {
                try {
                    parser.parse('member did something less than 2');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['time', 'times']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something less than number times', function () {
                try {
                    parser.parse('member did something less than 2 times 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(11);
                    should(literalChoices).eql([  'after', 'and', 'before', 'between', 'in range of', 'in zone', 'in', 'since', 'with RSSI']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something less than number time', function () {
                try {
                    parser.parse('member did something less than 1 time 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(11);
                    should(literalChoices).eql([  'after', 'and', 'before', 'between', 'in range of', 'in zone', 'in', 'since', 'with RSSI']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something exactly', function () {
                try {
                    parser.parse('member did something exactly');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member did something exactly number', function () {
                try {
                    parser.parse('member did something exactly 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['time', 'times']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something exactly number times', function () {
                try {
                    parser.parse('member did something exactly 2 times 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(11);
                    should(literalChoices).eql([  'after', 'and', 'before', 'between', 'in range of', 'in zone', 'in', 'since', 'with RSSI']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something exactly number time', function () {
                try {
                    parser.parse('member did something exactly 1 time 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(11);
                    should(literalChoices).eql([  'after', 'and', 'before', 'between', 'in range of', 'in zone', 'in', 'since', 'with RSSI']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

        });

    });
});