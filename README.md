# ExpressJS Starter Kit

This project suggest a MVC (model - view - controller) architecture for an ExpressJS project.
It uses MongoDB to store data as well as Nunjucks for templating.


## Project structure

```
	|-- app.js (main script to start the app)
	|-- package.json (metadata and dependencies)
	|-- gulpfile.js (specify files to watch)
	|-- models
		|-- db.js (to connect to database)
		|-- users.js (define users contenttype)
	|-- controllers
		|-- index.js (for homepage)
		|-- users.js (for users contenttype)
	|-- views
		|-- users (templates for users contenttype)
		|-- partials (templates called with 'include')
		|-- layout (templates called with 'extends')
		|-- something.html (any template used by Nunjucks)
		|-- ...
	|-- public
		|-- assets (any css, js or img that need to be publicly accessible)

```


## Installation

You must have nodejs and mongodb installed on your system, verify with :

`node --version && mongo --version`

Go into root folder and enter the following line in your terminal :

`npm install`

Install gulp : 

`npm install --global gulp-cli`


## Launch project

You may start the project with

`node app`

or use Gulp automation so that any modifications to files will reload the app :

`gulp`

Your project is accessible at [localhost:3000](http://localhost:3000).


## About design

The administrative panel template is from [Ad.min](https://github.com/Mikescops/ad.min) which is a minimal admin template.


## Various documentation

- ExpressJS : https://expressjs.com/en/starter/hello-world.html
- Mongoose (mongodb object modeling for nodejs) : https://mongoosejs.com/docs/
- Nunjucks (mozilla templating for nodejs) : https://mozilla.github.io/nunjucks/templating.html
- GulpJS (development automation) : https://gulpjs.com/
- FontAwesome (icons font) : https://fontawesome.com/icons
- Kacole2's skeleton (inspiration of this project) : https://git.io/fxQXK


## Contributing

Feel free to contribute to this project, fork and pull request your ideas.
Don't include work that is not open source or not from you.


## Authors

| [![twitter/mikescops](https://avatars0.githubusercontent.com/u/4266283?s=100&v=4)](http://twitter.com/mikescops "Follow @mikescops on Twitter") |                                
|---|                                                                                                                                                                              
| [Corentin Mors](https://pixelswap.fr/) |      