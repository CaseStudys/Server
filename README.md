# WebSocketと定時処理テスト方法
両方ともindex.jsに書いてます。
## webSocketテスト
user_bid_test.ejsにてテスト出来ます。</br>
IH資料node6のwebSocketを一通り読んでから、コメントアウト読んでください。理解しやすくなります。</br>
難しい場合は北島に聞いてください。
</br>
## webSocketと合わせて定時処理（落札時の自動処理の予約）もテストする
IH資料node７のcronを一通り読んでから、コメントアウト読んでください。理解しやすくなります。</br>
cronの時間指定等変更してください。</br>
特にこれも難しい場合は北島に聞いてください。</br>
[この記事も読むと理解しやすいです。](https://qiita.com/katsukii/items/d5f90a6e4592d1414f99)</br>

## 具体的なテスト手順
1. DBで出品物(exhibits)のstart_dateを変更し、いくつかを約２～3分後に始まるようにする。
2. cronの時間指定を変更して、約２～3分後に実行されるようにする。
3. 実行、cronが実行されるまでしばらく待つ。
4. オークションページにて入札のテスト。
5. オークションが終わるまで、落札処理は動かないので待つ！！！
6. 落札処理の結果を見る。（入札がない場合や複数入札の場合など）

## いろいろとエラーが出る場合。
### referenceエラー
入札者がいなかった場合、その出品物のexhibitsのレコードとbidsのデータをdeleteしますが、projectsテーブル等から参照されていると外部キーの参照制限でエラーが出ます。<br />参照しているprojectsテーブルのレコードを削除すると解決すると思います。

### packageがどうたらでエラー
新しいパッケージをインストールしているので、「yarn」コマンドを実行してインストールしてください。

**この説明じゃきつい場合は気軽に聞いてください申し訳ない。。。メッセ以外に通話も全然おけです。**
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
