'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
    describe('SmartList Member Conditions has completed:', function () {
	    before(function (done) {
		    return helper.smartlistParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });

        describe('completed',function(){

            it('member has completed TEST ', function (done) {

                var rule = parser.parse('member has completed TEST ');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                type:'completed',
                                challengeCode: 'TEST'
                            }

                        }]
                });
                done();
            });

            it('member has not completed TEST', function (done) {

                var rule = parser.parse('member has not completed TEST');
                should(rule).eql({
                    conditions: [{
                        scope: 'member',
                        type: 'has',
                        negative:true,
                        query: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        }

                    }]
                });
                done();
            });

            it('member has not completed TEST less than 3 times', function (done) {

                var rule = parser.parse('member has not completed TEST less than 3 times');
                should(rule).eql({
                    conditions: [{
                        scope: 'member',
                        type: 'has',
                        negative:true,
                        query: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        occurrenceFilter: {
                            type: 'less',
                            frequency: 3
                        }
                    }]
                });
                done();
            });

            it('member has not completed TEST before 2016-03-03 04:40 am', function (done) {

                var rule = parser.parse('member has not completed TEST before 2016-03-03 04:40 am');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            query: {
                                type: 'completed',
                                challengeCode: 'TEST'
                            },
                            periodFilter: {
                                type: 'before',
                                date: '2016-03-03 04:40'
                            }
                        }]
                });
                done();
            });

	        it('member has not completed TEST less than 3 times after 2016-03-03 4:40 am', function (done) {

		        var rule = parser.parse('member has not completed TEST less than 3 times after 2016-03-03 4:40 am');
		        should(rule).eql({
			        conditions: [
				        {
					        scope: 'member',
					        type: 'has',
					        negative:true,
					        query: {
						        type: 'completed',
						        challengeCode: 'TEST'
					        },
					        occurrenceFilter: {
						        type: 'less',
						        frequency: 3
					        },
					        periodFilter: {
						        type: 'after',
						        date: '2016-03-03 04:40'
					        }
				        }]
		        });
		        done();
	        });


	        it('member has not completed TEST less than 3 times after 2016-03-03 4:40 am after 2:00', function (done) {

		        var rule = parser.parse('member has not completed TEST less than 3 times after 2016-03-03 4:40 am after 2:00');
		        should(rule).eql({
			        conditions: [
				        {
					        scope: 'member',
					        type: 'has',
					        negative:true,
					        query: {
						        type: 'completed',
						        challengeCode: 'TEST'
					        },
					        occurrenceFilter: {
						        type: 'less',
						        frequency: 3
					        },
					        periodFilter: {
						        type: 'after',
						        date: '2016-03-03 04:40'
					        },
                            momentFilter: {
					            type:'after',
                                times: ['02:00']
                            }
				        }]
		        });
		        done();
	        });

        });


    });
});