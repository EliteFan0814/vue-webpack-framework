import './assets/css/base.css'
// import _ from 'lodash'
import { cube } from './math.js'

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!')
}
console.log(cube(4))
// console.log(_.join(['index', '中的', 'www!'], ' '))
