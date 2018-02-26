# CHW Guitars website

## Getting Started

To get started, you can either clone the repository, or deploy straight to [Netlify](#deploy-to-netlify). Then run the following from the project root:

```
npm install
npm run server
```

### Available Commands

There are 3 commands available:

* `npm run build` - Builds assets (sass, js, fonts, images) and runs `hugo`
* `npm run build:preview` - The same as `build`, but runs `hugo --buildDrafts --buildFuture`
* `npm run server` - Runs BrowserSync and watches for changes, running `build` when changes are detected

## Robots.txt

A default robots.txt can be found at `/layouts/robots.txt` which is configured to disallow crawlers when the `HUGO_ENV` environment variable is **not** set to `"production"`.

## Headers

Headers can be configured within `/layouts/index.headers`, which is then built to `/public/_headers`.

This is a Netlify feature. Learn more about [Headers with Netlify](https://www.netlify.com/docs/headers-and-basic-auth/).

### Security Headers

Atlas comes with some default headers to help you better protect your site. The default headers we include are: [X-Frame-Options](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options), [X-XSS-Protection](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-xss-protection), [X-Content-Type-Options](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options), [Referrer-Policy](https://scotthelme.co.uk/a-new-security-header-referrer-policy/).

These headers are configured with the following values:

```
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: origin-when-cross-origin
```

## Redirects

Redirect rules can be appended to `/layouts/index.redirects`, which is then built to `/public/_redirects`.

This is a Netlify feature. Learn more about [Netlify Redirects](https://www.netlify.com/docs/redirects/).

### Aliases

Hugo [Aliases](https://gohugo.io/content-management/urls/#aliases) are usually handled by `<meta http-equiv="refresh" ...>` tags. These have been disabled within `config.toml` with `disableAliases = true`, and instead are handled by [Netlify Redirects](https://www.netlify.com/docs/redirects/). This is handled automatically and you should continue to add aliases as described in the Hugo documentation.

## Deploy to Netlify

You can deploy directly to Netlify using this button:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/chwguitars/website)

## License

MIT © [Sunwolf Studio](https://sunwolf.studio)