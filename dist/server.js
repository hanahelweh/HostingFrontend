const path = require('path');
const axios = require("axios").default;
const func = require('./func');
const app = func.app();
const server = func.server();
var config = func.config;

var API =
{
    get: async function (u, d, h, a) {
        return await this.req(u, d, h, "GET", a);
    },
    put: async function (u, d, h, a) {
        return await this.req(u, d, h, "PUT", a);
    },
    post: async function (u, d, h, a) {
        return await this.req(u, d, h, "POST", a);
    },
    delete: async function (u, d, h, a) {
        return await this.req(u, d, h, "DELETE", a);
    },
    patch: async function (u, d, h, a) {
        return await this.req(u, d, h, "PATCH", a);
    },
    req: async function (u, d, h, m, a) {
        let res = await axios({
            method: m.toString().toLowerCase(),
            url: func.validURL(u) ? u : (config.apis[a ?? 0].baseURL + u),
            data: d ?? {},
            headers: h ?? config.apis[a ?? 0].headers
        });
        return res.data;
    }
};

//APP_HOLDER

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

app.get('*', function (req, res) {
  let nodes = req.params[0].split("/");
  if (nodes.length) nodes.shift();
  res.sendFile(path.join(__dirname, './src/index.html'));
});
app.post('*', function (req, res) {
  let nodes = req.params[0].split("/");
  if (nodes.length) nodes.shift();
  // console.log(req.body);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("");
  return res.end();
});

server.listen(config.server.port, function () {
  console.log(`LumenJS client server running at http://${config.server.host}:${config.server.port}/`);
});