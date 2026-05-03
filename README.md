# SaaSquatch Lead Scraper

Welcome to SaaSquatch. This project helps you find business leads from Google Maps very easily. It comes with a chrome extension that does the scraping and a nice landing page where people can download it.

## What is this project

This is a tool made for people who want to collect business information like names, phone numbers, and addresses from Google Maps without doing it manually. You just search for what you need on Maps, and the extension grabs all the data for you so you can save it as an Excel or CSV file.

## How to set everything up

Follow these simple steps to get the project running on your computer.

### Step 1: Run the landing page

The landing page is built with Next.js. This is where users see the product and download the extension.

1. Open your terminal and go into the frontend folder.
2. Run the command npm install to get all the needed files.
3. Run the command npm run dev to start the website.
4. You can now see the website at http://localhost:3000.

### Step 2: Install the extension in Chrome

The extension is the actual tool that scrapes the data.

1. Open your Google Chrome browser.
2. Go to the address chrome://extensions.
3. Turn on the Developer Mode switch at the top right corner.
4. Click the button that says Load unpacked.
5. Select the extension folder from this project.
6. You will now see the SaaSquatch icon in your browser toolbar.

## How it works in real life

Using the tool is very simple.

First, you go to Google Maps in your browser.
Second, you search for a business like "Pizza in New York" or "Plumbers in London".
Third, you click the SaaSquatch icon in your toolbar and a window will pop up.
Fourth, you choose how many leads you want and click the Start button.
Fifth, the tool will automatically scroll through the results and collect the information.
Finally, when it is done, you click the Export button to download your list of leads.

That is all there is to it. Enjoy your lead generation!
