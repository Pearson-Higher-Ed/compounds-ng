# Compounds-ng

This module is designed to allow Angular projects to easily integrate the React-based Compounds project.

## Use

You do not need to include Pearson Compound separately, it is brought in as part of this compatibility module.

Install with npm.
`npm i --save pearson-compounds-ng`

Your application **will** need to include both Angular (at least 1.2) and React (at least 0.14) to use this module.  This module does use directives and is considered to be incompatible with Angular 2.

#### With webpack

Include the module definition in your source
`require('pearsone-cmpounds-ng')`

#### Without Webpack

You can build the module manually, and use the resulting distributable in your application.  To do this, simply run `webpack` in the module root, and then use the resulting .js file in /dist.

## Use on the page


Add the dependency to your application (everything is packaged into the module 'compounds-ng')
`angular.module('your-app', ['compounds-ng']);`

This will add the `<compound />` directive, which can then be used as follows:

`<compound>
  <Button>ButtonText</Button>
</compound>`

Anything inside the `<compound />` directive will be treated as a React Component, and handed off to a custom ReactDOM.render based parser.

This means that naything inside the directive **MUST** have a single root.  You can wrap multiple components in `<div />` or `<span />` tags to get to a single root element.  This markup is more or less treated as if it was JSX, but the change from 'class' to 'className' is handled for you.

This directive will **ONLY** render components from **pearson-compounds**.
