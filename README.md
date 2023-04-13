# Todo

This is the final project in the [Organizing your JavaScript Code](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript#organizing-your-javascript-code) lesson and as such it is much more challenging than previous projects in terms of scale and code complexity. The objective was to write a functioning Todo app using the Model-View-Controller design pattern that is modular and easily extendable.

## Project Requirements
- [x] Dynamically created tasks that have a:
  - [x] title
  - [x] description
  - [x] dueDate (and time)
  - [x] priority
- [x] Tasks are organized in projects with 'Inbox' being the default project
- [x] Users can create new projects and choose which project a task goes into
- [x] User can view all projects
- [x] User can view all tasks in a project
- [x] Tasks can be expanded, edited and deleted
- [x] The app state is stored in the LocalStorage of the browser using the Web Storage API
- [x] separate modules following the MVC pattern

## Technologies used
Since I already have some previous work experience as a developer I decided to use this project as an additional learning opportunity for some new (to me) technologies that I might use on the job. I used TypeScript right from the start and later decided to also include Bootstrap.

To set up the project, I followed [this guide](https://javascript.plainenglish.io/webpack-in-2021-typescript-jest-sass-eslint-7b4640842e27) and later installed more dependencies as I went along. In the end I used the following technologies:

- [webpack](https://webpack.js.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [typescript-eslint](https://typescript-eslint.io/)
- [Bootstrap](https://getbootstrap.com/) (comes with SCSS, but I just used vanilla CSS features)
- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [Jest](https://jestjs.io/) (just a little bit)
- [date-fns](https://date-fns.org/)
- [uuid](https://www.npmjs.com/package/uuid)

## Code organization
At first I struggled with the repository design, but I made it a point to invest in a clean architecture as this was the whole point of the project. While working on the app I constantly refactored whenever I felt that the code could use some more clarity. As suggested, I followed the MVC pattern and followed clean coding guidelines as best as I could. In the end it payed off and resulted in a cleanly written app that made it easy to add new features and fix bugs once I found them.

### Model
Contains the following modules:
- `Task`: a TypeScript interface that defines the central objects of this app. (If you never heard of TS interfaces, think of it as a class)
- `LocalStorage`: a class used to interact with the browsers LocalStorage through the Web Storage API. Provides CRUD methods for tasks and projects.
- `Serialization`: an utility module used to help with JSON stringification and parsing.

Interestingly, I did not use any class or module for projects. I started out with an OOP approach using a `Project` class that holds an array of `Tasks` as one of its properties. However, this proved to be unnecessarily complex and also very brittle when it comes to serialization. After some time I realized that inverting the relationship and adding a reference to the parent project on each task is much simpler and even eradicates the need for a `Project` class altogether.

### View
Contains the following modules:
- `ProjectMenu`: shows the current project and allows the user to switch projects
- `ProjectDialog`: used to create new projects
- `TaskList`: shows all the tasks of the currently selected project
- `TaskDialog`: used to create and update tasks

Initially, I wrote the markup for these components inside their `.js` modules. Since this makes it hard to get proper syntax highlighting I was looking for a better solution. I tried using webpack's [html-loader](https://webpack.js.org/loaders/html-loader/) to import it from proper `.html` files, similar how it is described in [this guide](https://simon-lutterbie.medium.com/html-templates-in-webpack-b9f9d30fffba). However, I wasn't totally happy with that approach either, so I decided to put the markup right into the `index.html` that is loaded with the [html-webpack-plugin](https://webpack.js.org/plugins/html-webpack-plugin/). The dialogs are hidden by default anyways, and the other two components are empty at the start. So they might as well exist on the site right from the start.

The only problem was the markup for the tasks, which shouldn't exist on the page by itself but needs to be injected step by step once tasks are added. To do this, I used a [HTML Template element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template). This allowed me to define a task template right in the `index.html` that isn't visible by itself and get's cloned and moved to the visible DOM every time a new task is created.

### Controller
The controller manages the user input and directs the model and view components accordingly. It provides methods for all possible user interactions which then call the `render` functions of the view modules and the CRUD methods of the `LocalStorage` class that are necessary for that job. The logic inside these methods is left intentionally high-level and all the fine-grained operations are defined in detail in their respective modules. This allows for a clean separation of concerns and easy extensibility of the app.

## Pain Points
### Serialization of Date objects
This gave me more trouble than I like to admit. Somehow there was always something going wrong and dates and times would get all jumbled up when reading or writing them to LocalStorage. Sometimes they would change their localization, sometimes the time values would get lost or shifted by a magical number of hours. If the user didn't input any date, the invalid value would cause problems down the line and cause errors that were hard to debug.

The root of the problem might be the way I create dates and times separately and then merge them together behind the scenes. I did that because the [datetime-local](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local) HTML input element isn't looking very nice in my browser, but that added comfort to the user interface might not have been worth the headache.

### Form validation inside HTML dialogs
I decided to use a modal design for the user input before I decided to use Bootstrap. This lead me to using the [`HTMLDialogElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement) instead of the inbuilt Bootstrap modals. It was a bit hard to combine the two, because it was not obvious to me how to validate the input when the user presses the submit button, but don't do anything like that when the cancel button is pressed. In the end I found a nice enough solution though. It just took me a bit longer than I had wished for.

## Reflections
The project was a nice challenge and a good opportunity to learn. Picking up TypeScript and Bootstrap along the way proved to be good decisions as I feel like I gained a good amount of insight into both technologies without them adding any confusion or slowing me down too much.

I enjoyed working with TypeScript, because the type annotations already reduce a lot of cognitive complexity even in a relatively small project like this. I definitely prefer programming with a strong type system and will probably use TypeScript in all other future projects.

Bootstrap also was a nice addition to my tool box, as it provided me with easy to use components without having to spend too much time figuring out the nitty gritty details of front-end development. Since I prefer back-end work and don't enjoy dealing with topics like cross-browser compatibility, accessibility or form design, a pre-build component library like that is probably the way to go for me in most cases.

When it comes to the design of the app I also learned a good deal. It ended up becoming a mix of object-oriented and functional design that is nicely light-weight and worked out pretty well. Overall, I am happy with how my MVC implementation played out in the end and can see myself coming back to this project without too much of a headache.

## Possible Future Improvements
- [x] store current project
- [ ] improve the project menu
  - [ ] project deletion
  - [ ] project assignment
- [ ] improve the task list
  - [ ] handle text overflow & task collapsing
  - [ ] sorting
- [ ] backup in case LocalStorage is not available
