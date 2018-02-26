# Create React App Custom

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## What's Different?

Below are some of the changes/updates that are done to the create-react-app. Updates are done to make it more suitable my own workflow/preferences.

- Not using the modular css approach. Need to read up more about it to understand the tradeoff. Here is an [article](https://medium.com/seek-developers/block-element-modifying-your-javascript-components-d7f99fcab52b#.58mbeb9ns) about it. 
- Making use of scss so installs a scss pre-processor
- changes the folder structure quite a bit to put components, styles, etc... into their own folders.
- include react router and show the basic usage of it.
- to be able to work with an API backend proxying the port:3001 in package.json 
`"proxy": "http://localhost:3001/",`
- to get more information about the setup of the API backend visit this [link](https://github.com/fullstackreact/food-lookup-demo)
- Have things loaded through the html to see how that works.
- Uses HTTPS, you can find more information about that in the [Create React App Page](https://github.com/facebookincubator/create-react-app).