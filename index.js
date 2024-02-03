import { object, string } from '@robolex/sure'

const schema = object({
  name: string,
  
  age: val => {
    // check if it's integer
    if 
  }
})

console.log(`Hello Node.js v${process.versions.node}!`);
