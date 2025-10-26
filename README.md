# wget-js

`wget` like for Javascript generated web site.

If you use the regular `wget` or `curl` on a website that generate content via `JS`, then you are stuck. Because with these tools, there's no embeding of a `JS` engine.

There's no support for `wget`'s switchs, the script is only designed to the same as a `wget -O - <URL>`

## Install prerequisites, example for `Debian`/`Ubuntu`:

```
$ curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
$ sudo apt update
$ sudo apt install nodejs
$ npm install playwright
```

## Usage:

```sh
node wget.js 'https://example.com'
```


 
