### Installation

```sh
$ npm install
```

### Development with MockServer

Edit .env file:

```sh
CLIENT_TYPE=mock
```

then

```sh
$ npm start
```


### Development with WebServer

Edit .env file:

```sh
CLIENT_TYPE=web
BASE_URL=http://your.api.url
```

then

```sh
$ npm start
```