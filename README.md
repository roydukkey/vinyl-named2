# vinyl-named2

[![Release Version](https://img.shields.io/npm/v/vinyl-named2.svg)](https://www.npmjs.com/package/vinyl-named2)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Give vinyl files arbitrary chunk names, using `through2`, with type declarations.

## Usage

```js
const named = require('vinyl-named2');
const fs = require('vinyl-fs');
const through = require('through2');

fs.src('src/*.js')
  .pipe(named())
  .pipe(through.obj((file) => {
    // file.named now equals the basename minus the extension.
  }));

// Or, return a name for a given file.
fs.src('src/*.js')
  .pipe(named((file) => 'your own name'));

// Or, specify a custom name property.
fs.src('src/*.js')
  .pipe(named(function (file) {
    file.customName = 'your name';
    this.push(file);
  }));
```

### TypeScript

```ts
import named from 'vinyl-named2';
import * as fs from 'vinyl-fs';
import * as through from 'through2';

fs.src('src/*.js')
  .pipe(named())
  .pipe(through.obj((file) => {
    // file.named now equals the basename minus the extension.
  }));

// Or, return a name for a given file.
fs.src('src/*.js')
  .pipe(named((file) => 'your own name'));

// Or, specify a custom name property.
fs.src('src/*.js')
  .pipe(named(function (this, file) {
    file.customName = 'your name';
    this.push(file);
  }));
```
