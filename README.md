# line-pay-drink-bar

## install firebase CLI

```bash
npm i -g firebase-tools
```

## Create firebase project

visit and create project

https://console.firebase.google.com

Create app.
Set to use Firestore and locale to same location of Google analistics (ex. asia-northeast1)

## enable Google App Engine

visit and enable Google App Engine(GAE)
https://console.cloud.google.com/appengine/

## deploy to GAE

create [app.yaml](app.yaml).

build project

```bash
npm run build
> line-pay-drink-bar@1.0.0 build /Users/sumihiro/projects/LinePayDrinkBar
> nuxt-ts build

ℹ Production build                                                                                                                 23:58:44
✔ Builder initialized                                                                                                              23:58:44
✔ Nuxt files generated                                                                                                             23:58:44
ℹ Starting type checking service...                                                                                nuxt:typescript 23:58:46

✔ Client
  Compiled successfully in 25.91s

✔ Server
  Compiled successfully in 8.88s

Entrypoint app = server.js
```

deploy to GAE/SE

```bash
gcloud app deploy app.yaml --project [YOUR_PROJECT_ID]
```

browse app

```bash
gcloud app browse
```

## add express as backend for frontend api server

```bash
npm install --save express express-session body-parser
```


add serverMiddleware setting in nuxt.config.js

```js
serverMiddleware: ['~/server/'],
```

add [server/index.ts](src/server/index.ts) and implement LINE Bot webhooks in [server/apis/bot.ts](src/server/apis/bot.ts)

## Deploy to Netlify with GitHubActions

install netlify-cli for deploy

```bash
npm install -D netlify-cli
```

add action file in .github/workflows/netlify.yml

### Get APP ID

Access to below linkand get APP ID.

https://app.netlify.com/sites/line-pay-drink-bar/settings/general#site-information


### Generate Personal access tokens

Access to below link and generate Personal access token.

https://app.netlify.com/user/applications#personal-access-tokens


### Netlifyの認証キーをGithubに登録

GitHub Repository -> Settings -> Secrets

- NETLIFY_SITE_ID
  - Netlify APP ID
- NETLIFY_AUTH_TOKEN
  - Netlify Personal access tokens

### Add Environment values to GitHub

GitHub Repository -> Settings -> Secrets

- LIFF_ID
- FIREBASE_API_KEY
- FIREBASE_AUTH_DOMAIN
- FIREBASE_DATABASE_URL
- FIREBASE_PROJECT_ID
- FIREBASE_STORAGE_BUCKET
- FIREBASE_MESSAGING_SENDER_ID
- FIREBASE_APP_ID
- FIREBASE_MEASUREMENT_ID
