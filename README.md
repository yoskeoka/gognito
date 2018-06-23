# gognito

golang api server + AWS cognito + JWT Auth

AWS Cognito User Pool と FederatedIdentities(Google+)に対応

FederatedIdentities(Google+)は AWS の JWT 検証手順とほぼ同じ手順なので、調べたついでに実装してあります。

## 動かし方

ターミナルを 2 つ立ち上げて、

1 つめ

```sh
yarn install
yarn start
```

2 つめ

```sh
cp .env.sample .env
dep ensure
go run main.go
```

[`http://localhost:3000/`](http://localhost:3000/)にアクセスする

## AWSへのデプロイ

`S3_BUCKET_NAME`, `ACM_IDENTIFIER`, `HOSTED_ZONE_ID`を指定して下記のコマンドを実行する。

```sh
make deploy-web S3_BUCKET_NAME=gognito.example.com ACM_IDENTIFIER=1234xxxx-1010-1010-aaaa-123123123123 HOSTED_ZONE_ID=Z123XXXXXXXXXX
```

## 重要メモ

Cognito UserPool ID Token(JWT)のデコードのキーは以下のリンクを参考にした。

[Cognito JWT 検証](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html#amazon-cognito-identity-user-pools-using-id-and-access-tokens-in-web-api)

Google JWT の検証は以下のリンクを参考にした。

[Google JWT 検証](https://developers.google.com/identity/sign-in/web/backend-auth)
