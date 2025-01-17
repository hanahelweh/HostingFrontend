const axios = require("axios").default;
const path = require("path");
const express = require("express");
var compression = require("compression");
const app = express();
const server = require("http").createServer(app);

var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ server: server, path: "/" });

var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
const bodyParser = require("body-parser");
var multer = require("multer");
const config = require("./config").config;
var upload = multer();
let session = expressSession({
  secret: "lumenjs",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 9999000 },
});

function validURL(string) {
let url;
try {
    url = new URL(string);
} catch (_) {
    return false;
}
return url.protocol === "http:" || url.protocol === "https:";
}

exports.validURL = validURL;

exports.config = config;
exports.server = function () {
  return server;
};
exports.app = function () {
  app.use(cookieParser());
  app.use(session);
  app.use(compression());
  app.use(express.static(path.join(__dirname, "./src")));
  app.set("etag", false);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());
  app.use(upload.array());

  wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
      try {
        const buffer = Buffer.from(message);
        const data = JSON.parse(buffer.toString());

        if (data.hasOwnProperty("e")) {
          var _data = {
            e: data.e,
            _iter: data._iter,
            payload: {},
          };

          if (data.e == "request") {
            try {
              let pata = data.payload;
              let __data = pata["data"];
              let _body = pata["body"];
              let res = await axios({
                method: _body["method"].toString().toLowerCase(),
                url: fcs.validURL(_body["path"])
                  ? _body["path"]
                  : config.apis[_body["api"] ?? 0].baseURL + _body["path"],
                data: __data ?? {},
                headers:
                  _body["headers"] ?? config.apis[_body["api"] ?? 0].headers,
              });
              _data.payload = _body["full"]
                ? {
                    headers: res.headers,
                    data: res.data,
                  }
                : res.data;
              ws.send(JSON.stringify(_data));
            } catch (e) {
              _data.payload = {
                code: 108,
                error: e.message,
                type: "RequestError",
              };
              ws.send(JSON.stringify(_data));
            }
            return;
          }

          ws.send(JSON.stringify(_data));
        }
      } catch (e) {}
    });
  });
  return app;
};