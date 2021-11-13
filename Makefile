# バックグラウンドで立ち上げる
up -d:
	docker-compose up -d

# ビルドする
b:
	docker-compose build

# dokcerを落としてから立ち上げる
restart:
	dokcer-compose down\
	&& docker-compose up -d


# dockerを落とす
down:
	docker-compose down

# dockerを停止
stop:
	dokcer-compose stop

# mysqlコンテナに接続
sql:
	docker exec -it mysql bash

# docker-compose exec mysql bash

# 立ち上がってるコンテナの確認
ps:
	docker-compose ps