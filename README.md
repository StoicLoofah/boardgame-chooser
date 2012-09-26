#Board Game Chooser

The Board Game Chooser is a website to help you find a board game for any occasion with a few simple questions.

You can see it live at [http://kevinleung.com/boardgamechooser/](http://kevinleung.com/boardgamechooser/)

From a technical perspective, there isn't too much going on, though I will point out what does exist.

##Requirements
* jQuery - I'm on 1.8.1, though I don't think it matters too much
* bootstrap - is amazing

##qsonly.js - for making a branching questionnaire
The data backing this is all in JSON format as a directed acyclic graph. This particular data happens to be a binary tree, but it doesn't have to be. To support this, I threw together a simple library for generating the content for the site given just the data. The data was transformed using some simple scripts, and it is interpreted into the body text, choices, and history of choices that you see. It's mostly uninteresting except for some big wins with browser history

###Browser History

I managed to get this working using the [HTML5 browser history](https://developer.mozilla.org/en-US/docs/DOM/Manipulating_the_browser_history). This has a few wins here.

* fewer server requests
* faster client-side interaction
* URL manipulation for return visits
* good interaction with the browser "back" and "forward" buttons

It's not too tricky, so look at the code if you're interested

##Credits

* Thanks the Silver Oak Casino for the [data](http://www.silveroakcasino.com/blog/entertainment/how-to-choose-the-perfect-board-game.html)