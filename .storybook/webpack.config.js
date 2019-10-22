const path = require('path')
// your app's webpack.config.js
const custom = require('../config/webpack.config.js')

// https://www.jianshu.com/p/cbd3375e2575

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  })
  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'less-loader',
        options: {
          //modifyVars: antdTheme, // 如果要自定义主题样式
          javascriptEnabled: true
        }
      }
    ],
    include: path.resolve(__dirname, '../')
  })
  return config
}
// ---------------------------------------------------------------------

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.scss|css$/,
//         use: [
//           {
//             loader: 'style-loader'
//           },
//           {
//             loader: 'css-loader'
//           },
//           {
//             loader: 'sass-loader',
//             options: {
//               //modifyVars: antdTheme, // 如果要自定义主题样式
//               javascriptEnabled: true
//             }
//           }
//         ]
//       }
//     ]
//   }
//   // resolve: custom().resolve
// }
