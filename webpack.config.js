var path = require('path');



module.exports={
    mode:"production",
    entry:"./app/assets/scripts/App.js",
    output:{
      path:path.resolve(__dirname,"./app/temp/scripts/"),
      filename:"index.js"
    },
module:{
    rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }
    ]
  }
};
