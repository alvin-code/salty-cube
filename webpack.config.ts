import { WebpackConfiguration } from 'webpack-dev-server'
import path from 'path'

import { supportedLanguages } from './src/i18n'

export default (env: IEnvironment, args: IWebpackArgs): WebpackConfiguration => {
  const serve = env.WEBPACK_SERVE == true
  const build = env.WEBPACK_BUILD == true
  const production = args.mode == 'production'

  return {
    mode: production ? 'production' : 'development',
    devtool: production ? undefined : 'eval-source-map',
    
    devServer: serve ? {
      hot: true,
      port: 8080,
      static: path.resolve(__dirname, 'public')
    } : undefined,

    entry: { 'salty-cube': './src/index.tsx' },
    output: build ? {
      clean: true,
      path: path.resolve(__dirname, 'build')
    } : undefined,

    resolve: {
      extensions: [ '.js', '.ts', '.tsx' ]
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [ '@babel/preset-env', { targets: "defaults", useBuiltIns: 'entry', corejs: '3.28' } ],
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                'babel-plugin-styled-components',
                [
                  'i18next-extract',
                  {
                    outputPath: 'src/i18n/resources/{{locale}}/{{ns}}.json',
                    locales: supportedLanguages,
                    useI18nextDefaultValue: true,
                    keyAsDefaultValue: true,
                    defaultNS: 'messages'
                  }
                ]
              ]
            }
          }
        },
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
      ]
    }
  }
}

interface IEnvironment {
  WEBPACK_SERVE?: boolean
  WEBPACK_BUILD?: boolean
}

interface IWebpackArgs {
  mode?: 'production' | 'development'
  env: IEnvironment
}
