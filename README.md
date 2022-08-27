# TapandGo : find a bicycle station near you

With TapandGo, you can check for all on-demand bicycle stations around you on a map.
This version only include Nantes (FR) stations.

Technical stack: React with Redux Toolkit + react-leaflet to manage the map + Material UI to design components.

## How to run the app ? 

To run this app, you'll need to get an API key from JCDecaux: add it in a .env file (project directory). 

<img src="https://i.ibb.co/CPR0X8t/screenshot.png" alt="Tapandgo application" style="width:600px"/>
<img src="https://i.ibb.co/KDNkYhV/tapandgo-searchlist.png" alt="Tapandgo search list feature" style="width:300px"/>

## Features

- You can check all the stations on the map.
- Geolocate yourself to know which station are near.
- Use the routing button to plan a path and you'll see the closest station near your starting/arrival point.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
To learn React, check out the [React documentation](https://reactjs.org/).
