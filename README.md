# TodoApp (htmx + Node.js)

This is a work-in-progress project that I am using to experiment with HTMX and EXPRESS JS. TodoApp is a simple task management application, that allows you to create, edit, and manage your tasks efficiently.

## Requirements

- Node.js
- npm

## Installation
```git clone https://github.com/crestianiam/htmx-crud.git```<br/>
```cd htmx-crud```<br/>
```npm i```

## Setup
The project requires environment variables to function properly. In the repository, you will find a file named **TEMPLATE_VARS** that describes the necessary variables. Rename this file to **.env** and then assign the required values to the environment variables. The variable names are self-explanatory.
Change the variables value and and remove the asterisks at the beginning and end of the variable, used only as a visual help.

## Usage
```npm run dev``` for starting the project

## Next Steps
- fix CRUD operation (disable buttons while updating or creating one todo)
- change persistance location from the file system to a DB
- create categories for todo tasks
