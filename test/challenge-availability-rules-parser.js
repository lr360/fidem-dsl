'use strict';

var should = require('should'),
  fs = require('fs'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Availability Rules:', function () {
    beforeEach(function (done) {
      fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
        if (err) {
          return done(err);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });

    describe('created rule',function(){
      
      it('should parse simple created rule with in last',function(){
        
        var rule = parser.parse('member created in last 3 days');
        should(rule).eql([{
          scope:'member',
          type:'created',
          period_filter: {
             duration: 3,
             durationScope: "day",
             type: "last"
          }
        }]);
        
      });

      it('should parse simple created rule with before',function(){
        
        var rule = parser.parse('member created before 2015-04-04T10:10:10');
        should(rule).eql([{
          scope:'member',
          type:'created',
          period_filter: {
            date: [new Date(2015,4-1,4,10,10,10)],
            type: "before"
          }
        }]);
        
      });

      it('should parse simple created rule with between',function(){

        var rule = parser.parse('member created between 2015-04-04T10:10:10 and 2016-04-04T10:10:10');
        should(rule).eql([{
          scope:'member',
          type:'created',
          period_filter: {
            date: [new Date(2015,4-1,4,10,10,10),new Date(2016,4-1,4,10,10,10)],
            type: 'between'
          }
        }]);

      });

      it('should parse simple created rule with after',function(){

        var rule = parser.parse('member created after 2015-04-04T10:10:10');
        should(rule).eql([{
          scope:'member',
          type:'created',
          period_filter: {
            date: [new Date(2015,4-1,4,10,10,10)],
            type: "after"
          }
        }]);

      });
      
      it('should parse simple created rule with since did',function(){
        var rule = parser.parse('member created since did first ACTIONCODE');
        should(rule).eql([{
          scope:'member',
          type:'created',
          period_filter: {
            position:'first',
            actionCode: 'ACTIONCODE',
            type: "since-did"
          }
        }]);

        var rule = parser.parse('member created since did last ACTIONCODE');
        should(rule).eql([{
          scope:'member',
          type:'created',
          period_filter: {
            position:'last',
            actionCode: 'ACTIONCODE',
            type: "since-did"
          }
        }]);
      });

      it('should parse simple created rule with since received',function(){
        var rule = parser.parse('member created since received prize PRIZECODE');
        should(rule).eql([{
          scope:'member',
          type:'created',
          period_filter: {
            prizeCode: 'PRIZECODE',
            target:'prize',
            type: 'since-received'
          }
        }]);
      });
      
    });

    describe('city rule',function(){

      it('should parse simple city rule with =',function(){
        var rule = parser.parse('member city = "montreal"');
        should(rule).eql([{
          scope:'member',
          type:'city',
          condition: {
            operator:'=',
            value:'montreal'
          }
        }]);
      });

      it('should parse simple city rule with !=',function(){
        var rule = parser.parse('member city != "montreal"');
        should(rule).eql([{
          scope:'member',
          type:'city',
          condition: {
            operator:'!=',
            value:'montreal'
          }
        }]);
      });
      
    });
    
    describe('state rule',function(){
      
      it('should parse simple state rule with =',function(){
        var rule = parser.parse('member state = "quebec"');
        should(rule).eql([{
          scope:'member',
          type:'state',
          condition: {
            operator:'=',
            value:'quebec'
          }
        }]);
      });

      it('should parse simple state rule with !=',function(){
        var rule = parser.parse('member state != "quebec"');
        should(rule).eql([{
          scope:'member',
          type:'state',
          condition: {
            operator:'!=',
            value:'quebec'
          }
        }]);
      });
      
    });

    describe('zip rule',function(){

      it('should parse simple state rule with =',function(){
        var rule = parser.parse('member zip = "quebec"');
        should(rule).eql([{
          scope:'member',
          type:'zip',
          condition: {
            operator:'=',
            value:'quebec'
          }
        }]);
      });

      it('should parse simple state rule with !=',function(){
        var rule = parser.parse('member zip != "quebec"');
        should(rule).eql([{
          scope:'member',
          type:'zip',
          condition: {
            operator:'!=',
            value:'quebec'
          }
        }]);
      });
      
    });

    describe('country rule',function(){

      it('should parse simple state rule with =',function(){
        var rule = parser.parse('member country = "quebec"');
        should(rule).eql([{
          scope:'member',
          type:'country',
          condition: {
            operator:'=',
            value:'quebec'
          }
        }]);
      });

      it('should parse simple state rule with !=',function(){
        var rule = parser.parse('member country != "quebec"');
        should(rule).eql([{
          scope:'member',
          type:'country',
          condition: {
            operator:'!=',
            value:'quebec'
          }
        }]);
      });
      
    });

    describe('is rule',function(){

      it('should parse simple is rule with in zone',function(){
        var rule = parser.parse('member is in zone ZONECODE');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'zone',
            zones:['ZONECODE']
          }
        }]);
      });

      it('should parse simple is rule with multiple in zone ,',function(){
        var rule = parser.parse('member is in zone ZONECODE,zone2');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'zone',
            zones:[
              'ZONECODE',
              'zone2'
            ]
          }
        }]);
      });

      it('should parse simple is rule with in range of beacon',function(){
        var rule = parser.parse('member is in range of beacon bob');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type: 'inRange',
            beacons: ['bob']
          }
        }]);
      });
      
      it('should parse simple is rule with multiple in range of beacon ,',function(){
        var rule = parser.parse('member is in range of beacon bob,max,matt');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'inRange',
            beacons:['bob','max','matt']
          }
        }]);
      });

      it('should parse simple is rule with with RSSI below',function(){
        var rule = parser.parse('member is with RSSI below  3 from beacon bob');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'RSSI-below',
            number:3,
            beacons:['bob']
          }
        }]);
      });

      it('should parse simple is rule with with RSSI over',function(){
        var rule = parser.parse('member is with RSSI over  3 from beacon bob');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'RSSI-over',
            number:3,
            beacons:['bob']
          }
        }]);
      });

      it('should parse simple is rule with with RSSI between',function(){
        var rule = parser.parse('member is with RSSI between  3 and 4 from beacon bob');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'RSSI-between',
            number:[3,4],
            beacons:['bob']
          }
        }]);
      });


    });

    describe('smartlist rule',function(){

      it('should parse simple belongs to smartlist rule',function(){
        var rule = parser.parse('member belongs to smartlist montreal');
        should(rule).eql([{
          scope:'member',
          type:'smartlist',
          condition: {
            codes:['montreal']

          }
        }]);
      });

      it('should parse simple belongs to smartlist rule with multiple code',function(){
        var rule = parser.parse('member belongs to smartlist montreal&quebec&bob');
        should(rule).eql([{
          scope:'member',
          type:'smartlist',
          condition: {

            codes:['montreal','quebec','bob']

          }
        }]);
      });

      it('should parse complexe belongs to smartlist rule',function(){
          var rule = parser.parse('member belongs to smartlist montreal&bob since 4 hours');
          should(rule).eql([{
            scope:'member',
            type:'smartlist',
            condition: {
              codes:['montreal','bob'],
              condition:{
                type:'since',
                number:4,
                timeframe:'hour'
              }
            }
          }]);
      });
      
      it('should parse simple do not belongs to smartlist rule',function(){
        
        var rule = parser.parse('member do not belongs to smartlist montreal');
        should(rule).eql([{
          scope:'member',
          type:'smartlist',
          negative:true,
          condition: {
            codes:['montreal']
          }
        }]);
      });

      it('should parse simple do not belongs to smartlist rule with multiple code',function(){
        var rule = parser.parse('member do not belongs to smartlist montreal&quebec&bob');
        should(rule).eql([{
          scope:'member',
          type:'smartlist',
          negative:true,
          condition: {
            codes:['montreal','quebec','bob']
          }
        }]);
      });

      it('should parse complexe do not belongs to smartlist rule',function(){
        var rule = parser.parse('member do not belongs to smartlist montreal&bob since 4 hours');
        should(rule).eql([{
          scope:'member',
          type:'smartlist',
          negative:true,
          condition: {
            codes:['montreal','bob'],
            condition:{
              type:'since',
              number:4,
              timeframe:'hour'
            }
          }
        }]);
      });


    });

    describe('with/without rule',function(){

      it('should parse simple rule with tag',function(){
        var rule = parser.parse('member with tag tagcode');
        should(rule).eql([{
          scope:'member',
          type:'with',
          condition: {
            tagCode:{ tagClusterCode: null, tagCode: 'tagcode' }
          }
        }]);
      });

      it('should parse simple rule with tag and condition',function(){
        var rule = parser.parse('member with tag tagcode > 4');
        should(rule).eql([{
          scope:'member',
          type:'with',
          condition: {
            tagCode: {
              tagClusterCode: null,
              tagCode: 'tagcode'
            },
            operator:">",
            value:4
          }
        }]);
      });

      it('should parse simple rule without tag',function(){
        var rule = parser.parse('member without tag tagcode');
        should(rule).eql([{
          scope:'member',
          type:'with',
          negative:true,
          condition: {
            tagCode: {
              tagClusterCode: null,
              tagCode: 'tagcode'
            }
          }
        }]);
      });

      it('should parse simple rule without tag and condition',function(){
        var rule = parser.parse('member without tag tagcode > 4');
        should(rule).eql([{
          scope:'member',
          type:'with',
          negative:true,
          condition: {
            tagCode: {
              tagClusterCode: null,
              tagCode: 'tagcode'
            },
            operator:">",
            value:4
          }
        }]);
      });

      it('should parse simple rule with points',function(){
        var rule = parser.parse('member with points levelCode >= 3');
        should(rule).eql([{
          scope:'member',
          type:'with',
          condition: {
            levelCode: "levelCode",
            operator:'>=',
            value:3
          }
        }]);
      });

      it('should parse simple rule without points',function(){
        var rule = parser.parse('member without points levelCode >= 3');
        should(rule).eql([{
          scope:'member',
          type:'with',
          negative:true,
          condition: {
            levelCode: "levelCode",
            operator: '>=',
            value:3
          }
        }]);
      });

      it('should parse simple rule with prize',function(){
        var rule = parser.parse('member with prize coupon');
        should(rule).eql([{
          scope:'member',
          type:'with',
          condition: {
            prizeCode: 'coupon'

          }
        }]);
      });

      it('should parse simple rule without prize',function(){
        var rule = parser.parse('member without prize coupon');
        should(rule).eql([{
          scope:'member',
          type:'with',
          negative:true,
          condition: {
            prizeCode: 'coupon'

          }
        }]);
      });

    });

  });
});
