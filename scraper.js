
// scraper.js contains the command line application for a content scraper scraping http://shirts4mike.com site for shirt information
//The scraper will get the price, title, url and image url from the product page and save this information into a CSV file.

//require dependencies
const fs = require('fs');
const http = require('http');
const Json2csvParser = require('json2csv').Parser;
const scrapeIt = require('scrape-it');

//declare routes
const mainPage = 'http://shirts4mike.com';
const productRoute = `${mainPage}/shirts.php`;

//get and format todays date to be used for csv file
var d = new Date();
var formattedDate = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);

//create array and field options for the resulting data
const shirtsData = [];
const fields = ['Title', 'Price', 'ImageURL', 'URL', 'Time'];
const opts = { fields };

// Use scrape-it module to scrape shirts4mike for shirtdata url's
scrapeIt(productRoute, {
  shirts: {
    listItem: ".products li"
  , data: {
     url: {
        selector: "a"
        , attr: "href"
    }
    }
  }
}).then(({ data, response }) => {
	try {
		if (`${response.statusCode}` == 200) {
			// let the user know the program is running
			console.dir(`Scraper running. Fetching shirt information from ${mainPage}`);
			// loop the shirt url's to scrape specified shirt information
			for (let i of data.shirts) {
			  getShirtInformation(`${mainPage}/${i.url}`);
		  	}
			} else {
				//throw error if something's not right
			  	console.dir(`Something went wrong. Cannot connect to ${productRoute}. Please try again later.(${response.statusCode})`);
			}
		} catch (err) {
			console.error(err);
		}
});


//Function to be used in the loop for gathering individual shirt details
function getShirtInformation(shirtUrl) {
  //Use scrape-it to get the price, title and image url from the product page
  scrapeIt(shirtUrl, {
      title: "title"
    , price: ".price"
    , image: {
        selector: ".shirt-picture img"
      , attr: "src"
    }
	//then assemble the scraped data and push item to shirts array
  }).then(({ data, response }) => {
	  //throw error if page is down
      if (`${response.statusCode}` == 404) {
        console.dir(`Tried to connect to ${shirtUrl}. Page not found.`);
	} else {
     	console.dir(`Scraping shirt details from ${shirtUrl}`);
        let shirt = {
          Title: data.title,
          Price: data.price,
          ImageURL: data.image,
          URL: shirtUrl,
          Time: response.headers.date
        }
        shirtsData.push(shirt);
      };
  });
};

// Create csv file using Json2csv parse method
function createCsv() {
	try {
		const parser = new Json2csvParser(opts);
		const csv = parser.parse(shirtsData);
		//if a "data" folder doesn't exist - create one
		if (!fs.existsSync('data')) {
		  fs.mkdir('data');
		  console.dir('Creating data folder');
		}
		fs.writeFile(`data/${formattedDate}.csv`, csv, (err) => {
			if (err) {
				console.dir(`Could not write to file: ${err.path}`);
			} else {
				console.dir(`Writing csv file: ${formattedDate}.csv`)
			}
		});
	}	catch (err) {
			console.dir(err)
	}
};

// and call settimeout to execute it when scraping shirts is done
setTimeout(createCsv, 2000);
