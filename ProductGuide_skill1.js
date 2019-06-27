
// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

const languageStrings = {
    'en': {
        'translation': {
            'WELCOME' : "Welcome to Benjamin moore Color Guide!",
            'HELP'    : "To hear more about the Benjamin moore say about, prodult list, and, to hear Product suggestions: say interior, exterior, primer,door,ceiling ,bath and spa, chalk board, or pool, , or say weather outside. ",
            'ABOUT'   : "Benajmin moore is an American company that produces paint. It is owned by Berkshire Hathaway. Founded in 1883, is based in Montvale, New Jersey.",
            'STOP'    : "Okay, see you next time!"
        }
    }
};
const data = {
    "city"        : "Montvale",
    "state"       : "NJ",
    "postcode"    : "07645",
    "products" : [
        { "name":"aura exterior",
            "brand":"Benjamin moore", "sheen": "flat",
            "type": "exterior, rich and smooth finish",
            "description": "Provides Exceptional fade-resistance,mositure protection and durability,Mold and Mildew resistant.!"
        },
        { "name":"regal select",
            "brand":"Benjamin moore", "sheen": "satin",
            "type": "exterior, Superior adhesion for difficult surfaces",
            "description": "Provides superior adhesion and resistance to chalking,excellent floe and levelling for easy application."
        },
        { "name":"ben exterior, ben",
            "brand":"Benjamin moore", "sheen": "flat",
            "type": "exterior, easy application",
            "description": " provides good coverage and durability with 25 year limited waranty."
        },
        { "name":"fresh start primers",
             "brand":"Benjamin moore", "sheen": "primer",
             "type": "exterior, primer",
             "description": "This gives excellent hide,covers dark colors and imperfections."
        },
        { "name":"regal select interior",
            "brand":"Benjamin moore",  "sheen": "flat",
            "type": "interior, high hiding,great coverage",
            "description": "Enhanced with cutting edge technology in wide variety of finishes."
        },
        { "name": "natura",
             "brand":"Benjamin moore",  "sheen": "flat",
             "type": "interior, beautiful,durable",
            "description": "Environmentally friendly, dries quickly,good for living rroms,kids rooms,dining rooms."
        },
        {  "name": "super coat",
            "brand":"Coronado",  "sheen": "flat eggshell ",
            "type": "speciality coatings",
            "description": "Coronado brnad is an architectural line that balances performance and value."
        },
        
          { "name":"swimming pool paint",
            "brand":"INSL-X",  "sheen": "semi gloss",
            "type": "pool,swimming pool",
            "description": "this pool paint protects and beautifies the pool. Resists Softening, Chalking, Chipping, And Peeling."
        },
        { "name":"aura grand",
            "brand":"Benjamin moore",  "sheen": "satin",
            "type": "doors , entrance",
            "description": "Aura Grand Entrance brings rich, vivid color and exceptional durability to your interior/exterior doors and trim."
        },
        { "name":"Waterborne Ceiling Paint",
            "brand":"Benjamin moore",  "sheen": " Ultra Flat",
            "type": "ceiling,",
            "description": "Waterborne Ceiling Paint is an ultra flat finish designed to hide common ceiling imperfections for a look that is virtually flawless."
        },
        { "name":"aura bath and spa",
            "brand":"Benjamin moore",  "sheen": "matte",
            "type": "bath and spa,",
            "description": "Aura Bath & Spa is a luxurious matte finish designed for high-humidity environments."
        },
        { "name":"ben chalk board",
            "brand":"Benjamin moore",  "sheen": "egg shell",
            "type": "chalkboard,",
            "description": "Chalkboard Paint, available in any color, lets you turn virtually any interior surface into an erasable chalkboard."
        },
        { "name": "studio finishes,",
            "brand":"Benjamin moore",  "sheen": "A topcoat that turns virtually any interior surface into a chalkboard",
            "type": "speciality coatings,",
            "description": "Studio Finishes are creative glazes, metallics, faux finishes and unique effects that transform surfaces into works of art."
        },
         { "name": "muresco paint",
            "brand":"Benjamin moore",  "sheen": "solid hiding and easy application",
            "type": "Ceiling,",
            "description": "It Provides a beautiful uniform flat finish and Tones down ceiling glare and provides maximum diffused light."
        },
         { "name": "composite deck cleaner,",
            "brand":"Benjamin moore",  "sheen": "Ideal for deck maintenance and restoration",
            "type": "Satin,",
            "description": "Prepares surfaces for painting and staining. Removes mold and mildew stains from composite decks & Removes grease and oil."
        },
        { "name": "ben exterior paint,",
            "brand": "Benjamin moore",  "sheen": "Resistant to peeling, cracking, and blistering",
            "type": "exterior paint,",
            "description": "ben Exterior is user-friendly paint for flawless results and beautiful transformations."
        },
    ]
}


const SKILL_NAME = "color Guide";

// Weather courtesy of the Yahoo Weather API.
// This free API recommends no more than 2000 calls per day

const myAPI = {
    host: 'query.yahooapis.com',
    port: 443,
    path: `/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(data.city)}%2C%20${data.state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
    method: 'GET'
};
// 2. Skill Code =======================================================================================================

const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    ///alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        var say = this.t('WELCOME') + ' ' + this.t('HELP');
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'AboutIntent': function () {
        this.response.speak(this.t('ABOUT'));
        this.emit(':responseReady');
    },
    
    'ProductsIntent': function () {
    var list ='we have various product lines for Interior, exterior, exterior satin, primer, speciality coatings. Few  product names are : ';
    var catalog = 'aura exterior, regal select,Aura Grand,fresh start primers,natura,studio finishes,Aura Bath And Spa,Muresco Paint,super coat,Composite Deck Cleaner.';
    var say = list + catalog + ' To know more about., select any product, and  say what is natura or tell me about regal select';
    this.response.speak(say).listen(say);
    this.emit(':responseReady');
    },

    'CoffeeIntent': function () {
        var product = randomArrayElement(getRestaurantsByMeal('interior'));
        this.attributes['product'] = product.name;

        var say = 'For a great interior paint , I recommend, ' + product.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'BreakfastIntent': function () {
        var product = randomArrayElement(getRestaurantsByMeal('exterior'));
        this.attributes['product'] = product.name;

        var say = 'For exterior paint, try this, ' + product.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'LunchIntent': function () {
        var product = randomArrayElement(getRestaurantsByMeal('primer'));
        this.attributes['product'] = product.name;

        var say = 'Primers! Here is a good product. ' + product.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

    'DinnerIntent': function () {
        var product = randomArrayElement(getRestaurantsByMeal('pool'));
        this.attributes['product'] = product.name;

        var say = 'Here is a good product for pool, ' + product.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },
    
     'DoorIntent': function () {
        var product = randomArrayElement(getRestaurantsByMeal('door'));
        this.attributes['product'] = product.name;

        var say = 'Here is a good product for door, ' + product.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },
    
     'CeilingIntent': function () {
        var product = randomArrayElement(getRestaurantsByMeal('ceiling'));
        this.attributes['product'] = product.name;

        var say = 'Here is good product for ceiling, ' + product.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },
    
    'BathandSpaIntent': function () {
        var product = randomArrayElement(getRestaurantsByMeal('bath and spa'));
        this.attributes['product'] = product.name;

        var say = 'We have great product for bath and spa, ' + product.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },

  'ChalkBoardIntent': function () {
        var product = randomArrayElement(getRestaurantsByMeal('chalkboard'));
        this.attributes['product'] = product.name;

        var say = 'We have great product for chalkboard, ' + product.name + '. Would you like to hear more?';
        this.response.speak(say).listen(say);
        this.emit(':responseReady');
    },
    
     'ProductListIntent': function () {
         
         if (this.event.request.intent.slots.PLIST.value) {
            prodname = this.event.request.intent.slots.PLIST.value;
        }
       var product = randomArrayElement(getProductListByName(prodname));
       this.attributes['product'] = product.name;
        var productName = this.attributes['product'];
        var productDetails = getproductByName(productName);
        
        var cnf = 'OK ,You want to know about ' + prodname + ' .Here we go ! ';
        var say = cnf + productDetails.name
            + ' is a brand of ' + productDetails.brand + ' can be used for '
            +  productDetails.type + ', the features are . ' + productDetails.sheen
            + ', and  , ' + productDetails.description
            + ' Hope to see you at store. Enjoy ! <say-as interpret-as="interjection"> Have Color full Home</say-as>' ;

        this.response.speak(say);
        this.emit(':responseReady');
    },
    
    
    'AMAZON.YesIntent': function () {
        var productName = this.attributes['product'];
        var productDetails = getproductByName(productName);

        var say = productDetails.name
            + ' is a brand of ' + productDetails.brand + ' can be used for '  +  productDetails.type
            + ', the sheen or gloss type is ' + productDetails.sheen
            + ', and , ' + productDetails.description
            + '  I have sent these details to the Alexa App on your phone.  Enjoy ! <say-as interpret-as="interjection">have Color full Home</say-as>' ;

        var card = productDetails.name + '\n' + productDetails.brand + '\n' + productDetails.sheen + '\n'
        +  productDetails.type + '\n' + data.city + ', ' + data.state + ' ' + data.postcode;

        this.response.cardRenderer(SKILL_NAME, card);
        this.response.speak(say);
        this.emit(':responseReady');

    },

    'GoOutIntent': function () {

        getWeather( ( localTime, currentTemp, currentCondition) => {
            // time format 10:34 PM
            // currentTemp 72
            // currentCondition, e.g.  Sunny, Breezy, Thunderstorms, Showers, Rain, Partly Cloudy, Mostly Cloudy, Mostly Sunny
            // sample API URL for Irvine, CA
            // https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22irvine%2C%20ca%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys

            var say = 'It is ' + localTime
                + ' and the weather in ' + data.city
                + ' is '
                + currentTemp + ' and ' + currentCondition;
            this.response.speak(say);
            this.emit(':responseReady');

    
        });
    },

    'AMAZON.NoIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.HelpIntent': function () {
        this.response.speak(this.t('HELP')).listen(this.t('HELP'));
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('STOP'));
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.response.speak(this.t('STOP'));
        this.emit(':responseReady');
    }

};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function getRestaurantsByMeal(mealtype) {

    var list = [];
    for (var i = 0; i < data.products.length; i++) {

        if(data.products[i].type.search(mealtype) >  -1) {
            list.push(data.products[i]);
        }
    }
    return list;
}



function getproductByName(productName) {

    var product1 = {};
    for (var i = 0; i < data.products.length; i++) {

        if(data.products[i].name == productName) {
            product1 = data.products[i];
        }
    }
    return product1;
}

function getProductListByName(productN) {

  var list = [];
    for (var i = 0; i < data.products.length; i++) {

        if(data.products[i].name.search(productN) >  -1) {
            list.push(data.products[i]);
        }
    }
    return list;
}

function getWeather(callback) {
    var https = require('https');

    var req = https.request(myAPI, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });
        res.on('end', () => {
            var channelObj = JSON.parse(returnData).query.results.channel;

            var localTime = channelObj.lastBuildDate.toString();
            localTime = localTime.substring(17, 25).trim();

            var currentTemp = channelObj.item.condition.temp;

            var currentCondition = channelObj.item.condition.text;

            callback(localTime, currentTemp, currentCondition);

        });

    });
    req.end();
}
function randomArrayElement(array) {
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
