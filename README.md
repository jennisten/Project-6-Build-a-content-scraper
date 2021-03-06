# Content scraper
This is a student project as a part of Treehouse Techdegree Fullstack JavaScript program.

## Project instructions
* Create a scraper.js file that will contain your command line application. Your project should also include a package.json file that includes your project’s dependencies. The npm install command should install your dependencies.
* Program your scraper to check for a folder called ‘data’. If the folder doesn’t exist, the scraper should create one. If the folder does exist, the scraper should do nothing.
* Choose and use third-party npm packages.
* For scraping content from the site, either use a scraping module or use the Cheerio module to create your own scraper.
* To create the CSV file, use a CSV creation module.
* Program your scraper
	* Your scraper should visits the website http://shirts4mike.com and use http://shirts4mike.com/shirts.php as single entry point to scrape information for 8 tee-shirts from the site, without using any hard-coded urls like http://www.shirts4mike.com/shirt.php?id=101. If you’re unsure of how to get started, try googling ‘node scraper’ to get a feel for what a scraper is and what it does.
* Scraping and Saving Data:
	* The scraper should get the price, title, url and image url from the product page and save this information into a CSV file.
	* The information should be stored in an CSV file that is named for the date it was created, e.g. 2016-11-21.csv.
	* Assume that the the column headers in the CSV need to be in a certain order to be correctly entered into a database. They should be in this order: Title, Price, ImageURL, URL, and Time
	* The CSV file should be saved inside the ‘data’ folder.
* If your program is run twice, it should overwrite the data in the CSV file with the updated information.
* If http://shirts4mike.com is down, an error message describing the issue should appear in the console.
* The error should be human-friendly, such as “There’s been a 404 error. Cannot connect to http://shirts4mike.com.”

## CREDITS
* In this project I have used scrapeIt and json2csv modules - big thanks for the comprehensive documentation and to everyone contributing to these modules
