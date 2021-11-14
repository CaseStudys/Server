# サーバーサイドの環境構築

</br>

## 開発ポート番号

サーバー側 : http://localhost:8080/

PHPMyAdmin : http://localhost:8888/
</br>

## .env ファイルの作成

※ backend 直下に.env ファイルを作成して以下を記述する

```
PORT=6000
ADDMINHOST=mysql
ADMINNPASS=root
USER=root
SQLPASS=root
```

![](https://i.imgur.com/e9jsTRt.png)

</br>

## 環境構築

※ 注意事項 MAMP や ZAMP が立ち上がってる時は落としといてね

</br>

### 1. リポジトリを clone する

```
$ git clone リポジトリのID
```

※ デスクトップ内で clone すると便利だよ 👍

---

### 2. ディレクトリ移動する

#### ✅ Mac の人

[ターミナルコマンド一覧(Mac)](https://qiita.com/ryouzi/items/f9dee1540a04a0bfb9a3)

#### ✅ Windows の人

[ターミナルコマンド一覧(Win)](https://eng-entrance.com/windows-command-cd)

#### 確認方法

![](https://i.imgur.com/UjXQNKK.png)

---

### 3. backend 内で以下のコマンドを実行

</br>

① docker-compose を用いてビルドを行う

```
$ docker-compose build
```

![](https://i.imgur.com/XmAcHrb.png)

</br>

② コンテナを立ち上げる

```
$ docker-compose up -d
```

![](https://i.imgur.com/hihncNZ.png)

※この時、done となったら立ち上げ完了 ❗️

</br>

③ コンテナが立ち上がっているか確認する

```
$ docker-compose ps
```

![](https://i.imgur.com/bxhO7WD.png)

※ この時３つの status が up になっていれば完了。

</br>

④ Yarn のインストール & サーバーの起動

yarn のインストール

```
$ yarn
```

サーバー起動

```
$ yarn dev
```

![](https://i.imgur.com/SbdcDux.png)

### MYSQL データにデータの流し込み

[データの保存先](https://drive.google.com/drive/folders/1zFX03jUdipY5NImJCsc3L4PNUIjZtNi4)

http://localhost:8888/ にアクセスして、
express_db って DB を作って、先ほど保存したデータを import する。

Mysql データは追加必要

## Makefile

#### Make コマンドとは？

~ エイリアスを設定して簡単にコマンドを実行できるやつ
</br>

#### Make コマンドの構築

参照記事

- [Windows で make コマンドを使う方法](https://qiita.com/carax2/items/f501f44a8d44e3fd6987)
- [Make コマンド便利だよ](https://bluebirdofoz.hatenablog.com/entry/2019/10/24/221517)

</br>

**make コマンド使う**

docke-copose up -d を make up -d で実行できる

以下を参照

```mediawiki=
# バックグラウンドで立ち上げる(make up -d)
up -d:
    docker-compose up -d

# ビルドする(make b)
b:
     docker-compose build

# コンテナを落としてから立ち上げる(make restart)
restart:
    dokcer-compose down\
    && docker-compose up -d


# コンテナを落とす
down:
    docker-compose down

# コンテナの停止
stop:
    dokcer-compose stop

# mysqlコンテナに接続
sql:
    docker exec -it mysql bash

# 立ち上がってるコンテナの確認
ps:
    docker-compose ps
```
