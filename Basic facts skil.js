'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = undefined;

var SKILL_NAME = "BMC Facts";
var GET_FACT_MESSAGE = " Welcome to Benjamin Moore Facts !. Here's your Benjamin Moore fact: ";
var GET_ONEMORE_FACT_MESSAGE = ". Say one more fact .  for another ";
var HELP_MESSAGE = "You can say tell me a fact, or, you can say exit... What can I help you with?";
var HELP_REPROMPT = "What can I help you with?";
var STOP_MESSAGE = "Goodbye! Have A Nice day!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "Benjamin Moore Paints is an American company that produces paint. It is owned by Berkshire Hathaway. Founded in 1883.",
    "The Moore Brothers founded the company in Brooklyn, New York and our corporate location is based out of Montvale, New Jersey",
    "Benjamin Moore Paints Ranked No.1 in Customer Satisfaction by J.D. Power and Associates in 2011 & 2012.",
    "Regal,Aura,Natura,MoorGard,Ben,Arborcoat,Ultra Spec,Century,Insl-X,Corotech are some of the products in the Benjamin moore catalog.",
    "Benjamin Moore produces the highest-quality paints and finishes in the industry, and delivers them to independent retailers.",
    "Benjamin Moore is one of the largest paint makers in North America, with 5 manufacturing plants, 18 distribution facilities, and roughly 4,000 independent retailers through out North America",
    "Berkshire Hathaway, a company led by billionaire Warren Buffett, acquired Benjamin Moore",
    "Today, Benjamin Moore & Co, a Berkshire Hathaway company, is a high-performing, innovative manufacturer which tests each of our products against our biggest competitors.",
    "BENJAMIN MOORE INTRODUCES ULTRA SPEC SCUFF-X AS THE INDUSTRY'S FIRST SCUFF-RESISTANT PAINT",
    "Benjamin Moore is an Industry Leader Introducing 75 New Colors in the First-Ever Soft Touch Matte Finish with their century product.",
    "Benjamin Moore & Co conducts all of its research and tests each of our products at our Flanders location in new jersey.",
    "In 2017 BENJAMIN MOORE introduced Notable dry erase paint, with a premium performance, 2 component product coating.",
    "BENJAMIN MOORE REVEALS “Caliente” AS ITS COLOR OF THE YEAR for 2018."
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact  + '. would like hear one more fact?!.';
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
        //this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    
    'GetAnotherNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length) - 1;
        if(factIndex == -1){ factIndex = 1;}
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact + '. would like hear one more fact?!.';
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
        //this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    
    'YesIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length) + 1;
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact + '. Would you like to hear more?';
//this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');

    },
    
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
    
};
