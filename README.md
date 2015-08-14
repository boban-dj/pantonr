# Pantonr

Convert PMS colors to other formats.

Give a PMS code and get a JSON object with LAB, RGB, HSL, CMYK, and hex values.
Or, use the JSON in [dist/](dist/) however you'd like.

## Installation

```
npm install pantonr
```

## Usage

### JS

```javascript
var pantonr = require('pantonr');

var pantoneGreen = pantonr('green');
var pantone100c  = pantonr('100-c');
```

### CLI
```
pantonr green
pantonr 100-c
```

*Currently defaults to uncoated colors if not specified*

## License

MIT
