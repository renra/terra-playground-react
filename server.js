// Initial Checks
const isEnvVarEmpty = function(key) {
  const value = process.env[key];

  if(typeof value === 'undefined' || value == '') {
    console.error(`Missing key: ${key}` )
    return true;
  }

  return false
}

const areAnyEnvVarsMissing = function() {
  // Add your checks here
  //if(
  //  isEnvVarEmpty('VAR_A') ||
  //  isEnvVarEmpty('VAR_B')
  //) {
  //  return true;
  //}

  return false;
}

if(areAnyEnvVarsMissing()) {
  console.error("Please fill in all values in your .env file first.");
  process.exit(1);
}

//

const
  fs = require('fs'),
  http = require('http'),
  port = process.env.PORT;

const readFile = function(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, function(err, contents) {
      if(err) {
        reject(err);
      } else {
        resolve(contents);
      }
    })
  });
}

const getIndexBody = function(variables) {
  let template = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="app.css" />
      </head>

      <body>
        <script src="polyfills.js"></script>
        <script src="app.js"></script>

        <div id="outlet"></div>

        <script type="text/javascript">
          // Look! I'm client-side JavaScript in server-side JavaScript!
          TerraPlayground('outlet');
        </script>
      </body>
    </html>
  `

  Object.keys(variables).forEach(function(key) {
    template = template.replace(key, variables[key]);
  });

  return template;
};

const contentType = (path) => {
  if(path.endsWith('.jpg')) {
    return 'image/jpeg';
  } else if(path.endsWith('.css')) {
    return 'text/css';
  } else if(path.endsWith('.js')) {
    return 'application/javascript';
  } else {
    return 'text/html';
  }
}

const successResponseHeaders = (path, contents) => {
  return {
    'Content-Type': contentType(path),
    'Content-Length': contents.length,
  }
}

http.createServer(async function (req, res) {
  // TODO: Handle request cancellation
  if(req.url.startsWith('/favicon.ico')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end();
  } else if(req.url == '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Add variables to replace from process.env if you want
    // TOKEN: process.env.TOKEN,
    res.write(getIndexBody({}));
    res.end();
  } else {
    let filepath = `./dist${req.url.replace('../', './')}`;  // Replacing just to be sure

    // TODO: Use pipes here
    await readFile(filepath)
      .then(function(contents) {
        res.writeHead(200, successResponseHeaders(filepath, contents));
        res.write(contents);
        res.end();

        fs.writeFileSync(`${filepath}2`, contents);
      })
      .catch(function(err) {
        console.log(err);

        res.writeHead(404);
        res.end();
      })
  }
}).listen(port);

console.log(`Server listening on port ${port}`);
