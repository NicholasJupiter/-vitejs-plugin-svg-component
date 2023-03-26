const fs = require('fs');
const path = require('path');
const isExists = fs.existsSync('./dist');

const names = ['react', 'vue'];

if (isExists) {
  names.forEach((name) => {
    fs.copyFile(
      path.resolve(__dirname, `./${name}-plugin/${name}-svg-component.d.ts`),
      path.resolve(__dirname, `./dist/${name}/${name}-svg-component.d.ts`),
      (err) => {
        if (err) {
          console.error(name, 'File copied failed!');
        } else {
          console.log(name, 'File copied successfully!');
        }
      }
    );
  });
}
