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



