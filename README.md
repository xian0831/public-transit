#Public Transit 
Project 2 for Senior Web Developer Course at [Udacity](https://www.udacity.com).

## Objective:
The objective of this project is to build a offline-first transit application and to further understand the use of the
service worker.

### Required Software
* [Git](https://git-scm.com/)
* [Node/NPM](https://nodejs.org/en/)
* [gulp](http://gulpjs.com/)

### Install Instruction
1. Clone the [meetUp repository](https://github.com/xian0831/meet-up-event-planner.git)
2. go to cloned project:
	linux/Mac: `cd public-transit`
3. Run `npm install` in command line to get the required dependencies
4. Run `gulp dist` in command line to generate production version of the source code 
5. Once you have that you can simply type `gulp` in the command line and it will launch a locally hosted page at port 8080.

### Usage
1. select origination and destination and click submit. If two stations are reachable to each other, no schedule will
be display.
2. Enjoy!

## Technology Used
HTML5, CSS3, Javascript, Sass, Gulp, Bootstrap, AngularJS, [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API),
[Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache),
[Angular-UI](https://angular-ui.github.io/), [Papa Parse](http://papaparse.com/)

##Special Thanks
[Introduction to Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)
