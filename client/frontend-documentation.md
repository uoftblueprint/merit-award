# Frontend Documentation ✨

## Frontend File Structure

* Pages
    * Folders within pages contain page-specific components
* Components: Higher-level components
* Images: store all media here
* Api: Take a look at the [api documentation](../backend/api.md)

> Note: We added in redux because we thought it would be more important but haven't used it yet... QUQ

## Dashboard

The main application dashboard can be edited in pages/Dashboard.js. It switches between different screens by keeping track of the `stageIndex`.

## Student Application

The student application can be edited in pages/application/Student.js. Within the application, there are 4 stages that you can switch between: Applicant Info, Involvement Info, Education Info, Mentorship Info.

At each stage, the appropriate form is generated using FormBody.js by passing in these props:

`<FormBody data={formData} values={values} errors={errors}/>`

## Forms


## React Router

[Official documentation](https://reactrouter.com/web/guides/quick-start)

When creating new pages, go to App.js and add a route to your page

```
// Import page at the top of the App.js file
import NewPage from "./pages/NewPage";

// Route to include the page with a navbar
<Route path="/new-page-url" component={WithNav}/>

// Route to the actual page
<Route path="/new-page-url" component={NewPage}/>
```

When linking to a page, use this syntax:

`<Link className="link-btn" to="/new-page-url">New Page</Link>`

## CSS

We have two styling libraries installed: **Tailwind** and **SCSS**. The majority of the Merit Award site is currently styled using Tailwind. Recommender pages are styled with SCSS.

### Tailwind

Tailwind adds inline styles to HTML so that your elements look like this:

```
<div className="flex border border-blue-900 bg-white relative h-full rounded-md overflow-hidden">
</div>
```

It requires learning a different CSS syntax. The easiest way to pick it up is to refer to the [official documentation](https://tailwindcss.com/docs).

#### Tailwind Benefits

* No need to create single-use CSS classes/ids for elements that are slightly different from their default class
* Goodbye !important conflicts~ everything is inline code
* Responsiveness built in to the styling already

> Note: Positioning and sizing elements relies heavily on relative measurements, so good luck setting a div width to exactly 50px :')

### SCSS

After you cd into `~/path-to-merit-award/client/src/styles` run this command in terminal

`sass scss:css --watch`

DON'T FORGET TO RUN THIS OR YOU WILL NOT SEE YOUR CSS CHANGES SHOW UP. This will make sure that your scss folder compiles into your css folder.

If you want to compile individual files, you would run `sass filename.scss:filename.css --watch`

#### SCSS Benefits

* [Variables](https://sass-lang.com/documentation/variables): Eg. create $blue as a reusable color so that you don't have to remember its hex code
* [Mixins](https://sass-lang.com/documentation/at-rules/mixin): Create style templates for components, kind of like a variable for multiple CSS styles.
* [Nesting CSS](https://sass-lang.com/documentation/style-rules#nesting)
