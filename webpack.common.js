const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(ogg|mp3)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      bodyHtmlSnippet: `<canvas id="myCanvas" width="480" height="320"> </canvas>
      <p>
        Based on: 
        <a href="https://developer.mozilla.org/en-US/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript">
          2D Breakout game pure JavaScript
        </a>
      </p>`,
      scripts: [
        {
          src: 'bundle.js'
        }
      ],
      title: 'Breackout'
    })
  ]
}
