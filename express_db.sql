-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- ホスト: mysql:3306
-- 生成日時: 2022 年 1 月 24 日 20:48
-- サーバのバージョン： 5.7.36
-- PHP のバージョン: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `express_db`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `bids`
--

CREATE TABLE `bids` (
  `bid_id` int(11) NOT NULL,
  `exhibit_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `bid_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `cars`
--

CREATE TABLE `cars` (
  `car_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `register_flg` tinyint(1) NOT NULL,
  `age` int(4) NOT NULL,
  `type_name` varchar(30) NOT NULL,
  `maker` varchar(30) NOT NULL,
  `displacement` int(5) NOT NULL,
  `model_age` int(4) NOT NULL,
  `grade` varchar(50) NOT NULL,
  `model` varchar(30) NOT NULL,
  `repair` tinyint(1) NOT NULL,
  `capacity` int(2) NOT NULL,
  `door_number` int(2) NOT NULL,
  `shape` varchar(30) NOT NULL,
  `loading_capacity` int(7) NOT NULL,
  `milage` int(7) NOT NULL,
  `transmission` varchar(5) NOT NULL,
  `drive_system` varchar(5) NOT NULL,
  `inspection_deadline` date NOT NULL,
  `manual` tinyint(1) NOT NULL,
  `evaluation` varchar(3) NOT NULL,
  `handle` char(1) NOT NULL,
  `exterior_color` varchar(30) NOT NULL,
  `exterior_color_number` varchar(30) NOT NULL,
  `interior_color` varchar(30) NOT NULL,
  `purchace_price` int(8) NOT NULL,
  `supplier` varchar(30) NOT NULL,
  `comment` text NOT NULL,
  `picture_path` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `cars`
--

INSERT INTO `cars` (`car_id`, `employee_id`, `register_flg`, `age`, `type_name`, `maker`, `displacement`, `model_age`, `grade`, `model`, `repair`, `capacity`, `door_number`, `shape`, `loading_capacity`, `milage`, `transmission`, `drive_system`, `inspection_deadline`, `manual`, `evaluation`, `handle`, `exterior_color`, `exterior_color_number`, `interior_color`, `purchace_price`, `supplier`, `comment`, `picture_path`) VALUES
(1, 1, 0, 2020, 'スープラ', 'トヨタ', 3000, 2019, 'RZ', '3BA-DB02', 0, 2, 3, 'クーペ・スポーツ・スペシャリティ', 0, 17000, '8AT', 'FR', '2023-10-01', 1, '4.5', '右', '灰Ｍ', 'D02', '黒', 5600000, 'AAモータース', 'ＲＺ　フルセグ　ＨＤＤナビ　ミュージックプレイヤー接続可　衝突被害軽減システム　ＥＴＣ　ＬＥＤヘッドランプ　フルエアロ', '/1/1.jpg'),
(2, 2, 1, 2016, 'アルファード', 'トヨタ', 3500, 2015, '3.5SA', 'DBA-GGH35W', 0, 7, 5, 'ミニバン・ワンボックス', 0, 95000, '6AT', '4WD', '2023-01-01', 1, '3.5', '右', '黒', '202', '黒', 2420000, 'BB自動車工業', '', '/2/1.jpg'),
(3, 1, 1, 2017, 'プリウス', 'トヨタ', 1800, 2015, 'S ツーリングセレクション', 'DAA-ZVW50', 0, 5, 5, 'セダン', 0, 31000, 'CVT', 'FF', '2024-03-01', 1, '4', '右', '赤', '3T7', 'グレー', 1642000, 'CC自動車工業', '【クルーズコントロール】高速道路もラクラク走行。アクセルを離しても一定速度で走行ができ、長距離運転時の負担を軽減！加速・減速も簡単なスイッチ操作で調整できます。\r\n【シートヒーター】寒い日に重宝するシートヒーター！エアコンより早く温まってくれるので寒がりの人も安心ですね♪エアコンの温風は乾燥するから苦手、という方にもをおすすめです。\r\n【純正アルミホイール】外観にマッチした純正アルミホイールを装着しております。各種社外アルミホイールや、スタッドレスタイヤも取扱いしております。是非ご相談ください♪', '/3/1.png'),
(4, 3, 0, 2018, 'N-BOX', 'ホンダ', 658, 0, 'Gホンダセンシング', 'DBA-JF3', 0, 4, 5, '軽-RV系', 0, 24000, 'CVT', 'FF', '2023-10-01', 1, 'R', '右', '茶', 'YR633P', 'グレー', 868000, 'AAモータース', 'ＴＶでも放映された!驚きのバリュー!カーバンクライト!●ロープライスカー大型店!●旧来にない高画質○ムービー動画●ＤＶＤ無料配送などでご検討可能！\r\n全国販売承ります●ネット成約時に陸送キャンペーン実施中です●車両の状態を動画配信●スマートフォン対応●ＤＶＤ配送無料で承っておりますのでお問合せ下さい。全５店舗！首都圏仕入れの４ＷＤ車なども常時多数在庫。当社にてタイヤ交換も承っております', '/4/1.png'),
(5, 2, 1, 2020, 'ジムニー', 'スズキ', 658, 2019, 'XC', '3BA-JB64W', 0, 4, 3, 'クロカン・ＳＵＶ', 0, 4000, '5MT', '4WD', '2023-06-01', 0, '6', '右', '緑', 'ZZC', 'ブラック', 2484000, 'DD自動車', '【スズキ　セーフティサポート】走行中に前方の車両等を認識し、衝突しそうな時は警報とブレーキで衝突回避と被害軽減をアシスト。より安全にドライブをお楽しみいただけます。【シートヒーター】寒い日に重宝するシートヒーター！エアコンより早く温まってくれるので寒がりの人も安心ですね♪エアコンの温風は乾燥するから苦手、という方にもをおすすめです。【ダウンヒルアシスト】急な坂道を下るときに自動でブレーキを制御、一定の低速度を保ちます。雪道や悪路など滑りやすい路面の下り坂でもタイヤがロックしないから安心！【クルーズコントロール】高速道路もラクラク走行。アクセルを離しても一定速度で走行ができ、長距離運転時の負担を軽減！加速・減速も簡単なスイッチ操作で調整できます。', '/5/1.png'),
(6, 1, 0, 2015, 'NV200バネット', '日産', 1600, 1111, 'DX', 'DBF-VM20', 0, 2, 5, 'ミニバン', 0, 91000, '4AT', '2WD', '1111-11-11', 0, '3.5', '右', '白', 'QM1', 'グレー', 648000, '北島自動車工業', 'お支払い方法のご相談もお気軽して下さい。一括現金、ローン、またはリースのご案内も可能です。法人様には節税のお話もさせて頂きます。２人乗り仕様なので、荷台は広々使えます！日産純正ラジオデッキ　ＡＭ／ＦＭ対応。新品ナビもご提案できます！', '/6/1.png'),
(7, 1, 0, 2017, 'S660', 'ホンダ', 660, 2015, 'α', 'DBA-JW5', 0, 2, 2, 'オープン・カブリオレ・コンバーチブル', 0, 22000, 'CVT', 'MR', '2022-01-01', 0, '4', '右', '黄', 'Y53', 'ブラック', 1952000, 'まさるモータース', '前期型S660入庫致しました♪カーニバルイエロー2の個体は前期型のみ♪サービスキャンペーンにより外装塗り替え済みのためチェックシートは外板補修有となっております。是非、実車をご確認ください♪\r\nボディカラーはカーニバルイエローⅡです♪\r\nイエロー×ブラックのシートが車体とマッチしていてかっこいいですね♪\r\n社外のドライブレコーダーが付いています。\r\nセンターディスプレイに接続できるHDMI端子やＵＳＢ接続ジャックも装備。', '/7/1.png'),
(8, 3, 0, 2018, 'CX-5', 'マツダ', 2200, 2017, 'XD プロアクティブ', 'LDA-KF2P', 0, 5, 5, 'クロカン・ＳＵＶ', 0, 49000, '6AT', 'FF', '2023-01-01', 0, '4', '右', '灰', '42S', 'ブラック', 217000, 'AAモータース', 'ステアリングスイッチ搭載で運転中に目線を外さずにオーディオ操作が可能です♪\r\n【レーダークルーズコントロール】が装備されております。高速道路等でアクセルを踏まずに車速や車間を一定に保って走ることが可能です。\r\n【パワーシート】最適なシートポジションを提供し、疲れにくくより快適にお乗りいただけます。', '/8/1.png'),
(9, 1, 0, 2020, 'シビック', 'ホンダ', 1500, 2019, 'ハッチバック ホンダセンシング', 'DBA-FK7', 0, 5, 5, 'ハッチバック', 0, 700, 'CVT', 'FF', '2023-11-01', 0, '4.5', '右', '白真珠', 'NH883P', 'ブラック', 2977000, 'DD自動車', '前後ドライブレコーダー取り付け済み。\r\nHonda SENSINGは衝突を予測してブレーキをかけたり、前のクルマとちょうどいい距離でついていったりできる多彩な安心・快適機能を搭載した先進の安全運転支援システムです。\r\nラゲッジシェードは取り外し可能です。\r\n', '/9/1.png'),
(10, 2, 1, 2021, 'M4クーペ', 'BMW', 3000, 2021, 'M4クーペコンペティション', '3BA-52AZ30', 0, 4, 2, 'クーペ', 0, 3000, '8AT', 'FR', '2025-04-01', 0, 'S', '左', '灰M', 'C4P', 'グレー', 14217000, 'AAモータース', '☆★☆M4 Competition【ワンオーナー】【M Driveプロフェッショナル】【Mカーボンエクステリアパッケージ】【フルレザーインテリア】【オプション鍛造20インチAW】【Mカーボンバケットシート】☆★☆\r\n●harman/kardonサラウンド・サウンド・システム（464W、16スピーカー、9チャンネル・サラウンド）\r\n●カーボン・ファイバー強化樹脂（CFRP）製ルーフ\r\n', '/10/1.png');

-- --------------------------------------------------------

--
-- テーブルの構造 `car_pictures`
--

CREATE TABLE `car_pictures` (
  `car_id` int(11) NOT NULL,
  `picture_path` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `car_pictures`
--

INSERT INTO `car_pictures` (`car_id`, `picture_path`) VALUES
(1, '/1/1.jpg'),
(1, '/1/2.jpg'),
(1, '/1/3.jpg'),
(1, '/1/4.jpg'),
(1, '/1/5.jpg'),
(1, '/1/6.jpg'),
(1, '/1/7.jpg'),
(1, '/1/8.jpg'),
(1, '/1/9.jpg'),
(2, '/1/1.jpg'),
(2, '/1/2.jpg'),
(2, '/1/3.jpg'),
(2, '/1/4.jpg'),
(2, '/1/5.jpg'),
(2, '/1/6.jpg'),
(2, '/1/7.jpg'),
(2, '/1/8.jpg'),
(3, '/3/1.png'),
(3, '/3/2.png'),
(3, '/3/3.png'),
(3, '/3/4.png'),
(3, '/3/5.png'),
(3, '/3/6.png'),
(3, '/3/7.png'),
(4, '/4/1.png'),
(4, '/4/2.png'),
(4, '/4/3.png'),
(4, '/4/4.png'),
(4, '/4/5.png'),
(5, '/5/1.png'),
(5, '/5/2.png'),
(5, '/5/3.png'),
(5, '/5/4.png'),
(5, '/5/5.png'),
(6, '/6/1.png'),
(6, '/6/2.png'),
(6, '/6/3.png'),
(6, '/6/4.png'),
(7, '/7/1.png'),
(7, '/7/2.png'),
(7, '/7/3.png'),
(7, '/7/4.png'),
(7, '/7/5.png'),
(7, '/7/6.png'),
(8, '/8/1.png'),
(8, '/8/2.png'),
(8, '/8/3.png'),
(8, '/8/4.png'),
(9, '/9/1.png'),
(9, '/9/2.png'),
(9, '/9/3.png'),
(9, '/9/4.png'),
(9, '/9/5.png'),
(9, '/9/6.png'),
(10, '/10/1.png'),
(10, '/10/2.png'),
(10, '/10/3.png'),
(10, '/10/4.png'),
(10, '/10/5.png'),
(10, '/10/6.png'),
(10, '/10/7.png'),
(10, '/10/8.png');

-- --------------------------------------------------------

--
-- テーブルの構造 `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone_number` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `employees`
--

INSERT INTO `employees` (`employee_id`, `name`, `phone_number`) VALUES
(1, '社員１', '08011111111'),
(2, '社員２', '08022222222'),
(3, '社員３', '08033333333'),
(4, 'test', '0');

-- --------------------------------------------------------

--
-- テーブルの構造 `exhibits`
--

CREATE TABLE `exhibits` (
  `exhibit_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `start_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `exhibits`
--

INSERT INTO `exhibits` (`exhibit_id`, `car_id`, `start_date`) VALUES
(1, 1, '2021-12-14 09:00:00'),
(2, 7, '2021-12-14 09:05:00'),
(22, 5, '2022-01-08 09:00:00'),
(23, 2, '2022-01-08 09:00:00');

-- --------------------------------------------------------

--
-- テーブルの構造 `projects`
--

CREATE TABLE `projects` (
  `project_id` int(11) NOT NULL,
  `exhibit_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `purchase_date` date NOT NULL,
  `price` int(8) NOT NULL,
  `due_date` date NOT NULL,
  `repair_service_flg` tinyint(1) NOT NULL,
  `car_inspection_service_flg` tinyint(1) NOT NULL,
  `documents_flg` tinyint(1) NOT NULL,
  `shipped_flg` tinyint(1) NOT NULL,
  `delivered_flg` tinyint(1) NOT NULL,
  `deposit_apply_flg` tinyint(1) NOT NULL,
  `reminder_flg` tinyint(1) NOT NULL,
  `cancel_flg` tinyint(1) NOT NULL,
  `illegal_action_flg` tinyint(1) NOT NULL,
  `payment_flg` tinyint(1) NOT NULL,
  `receipt_contact_flg` tinyint(1) NOT NULL,
  `total_price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `projects`
--

INSERT INTO `projects` (`project_id`, `exhibit_id`, `buyer_id`, `purchase_date`, `price`, `due_date`, `repair_service_flg`, `car_inspection_service_flg`, `documents_flg`, `shipped_flg`, `delivered_flg`, `deposit_apply_flg`, `reminder_flg`, `cancel_flg`, `illegal_action_flg`, `payment_flg`, `receipt_contact_flg`, `total_price`) VALUES
(1, 1, 2, '2021-12-20', 5800000, '2021-12-27', 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 5800000),
(2, 2, 2, '2021-12-21', 4000000, '2021-12-31', 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4000000),
(3, 22, 2, '2022-01-08', 3000000, '2022-01-22', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3000000);

-- --------------------------------------------------------

--
-- テーブルの構造 `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `distinction` char(2) NOT NULL,
  `name` varchar(30) NOT NULL,
  `birthday` date NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `password` varchar(30) NOT NULL,
  `trust_flg` tinyint(1) NOT NULL DEFAULT '0',
  `cancel_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのデータのダンプ `users`
--

INSERT INTO `users` (`user_id`, `distinction`, `name`, `birthday`, `address`, `phone_number`, `password`, `trust_flg`, `cancel_date`) VALUES
(1, '0', 'テスト１', '2021-11-01', '大阪府大阪市北区wwww-aaaa', '07011112222', '11111', 0, NULL),
(2, '0', 'テスト２', '2021-08-09', '奈良県奈良市xxxx-7777', '08011112222', '22222', 0, '2022-01-24'),
(3, '0', 'テスト３', '2015-03-04', '北海道札幌市xxxx-aaa', '09011112222', '33333', 0, NULL),
(8, '0', '前田test', '2000-05-12', 'Osaka', '07022221111', 'pass', 0, NULL);

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `bids`
--
ALTER TABLE `bids`
  ADD PRIMARY KEY (`bid_id`),
  ADD KEY `exhibit_id` (`exhibit_id`),
  ADD KEY `user_id` (`user_id`);

--
-- テーブルのインデックス `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`car_id`),
  ADD KEY `employees_to_cars` (`employee_id`);

--
-- テーブルのインデックス `car_pictures`
--
ALTER TABLE `car_pictures`
  ADD PRIMARY KEY (`car_id`,`picture_path`);

--
-- テーブルのインデックス `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- テーブルのインデックス `exhibits`
--
ALTER TABLE `exhibits`
  ADD PRIMARY KEY (`exhibit_id`),
  ADD KEY `exhibits_to_cars` (`car_id`);

--
-- テーブルのインデックス `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `users_to_projects` (`buyer_id`),
  ADD KEY `exhibits_to_projects` (`exhibit_id`);

--
-- テーブルのインデックス `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- ダンプしたテーブルの AUTO_INCREMENT
--

--
-- テーブルの AUTO_INCREMENT `bids`
--
ALTER TABLE `bids`
  MODIFY `bid_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- テーブルの AUTO_INCREMENT `cars`
--
ALTER TABLE `cars`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- テーブルの AUTO_INCREMENT `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- テーブルの AUTO_INCREMENT `exhibits`
--
ALTER TABLE `exhibits`
  MODIFY `exhibit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- テーブルの AUTO_INCREMENT `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- テーブルの AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `bids`
--
ALTER TABLE `bids`
  ADD CONSTRAINT `bids_ibfk_1` FOREIGN KEY (`exhibit_id`) REFERENCES `exhibits` (`exhibit_id`),
  ADD CONSTRAINT `bids_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- テーブルの制約 `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `employees_to_cars` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

--
-- テーブルの制約 `exhibits`
--
ALTER TABLE `exhibits`
  ADD CONSTRAINT `exhibits_to_cars` FOREIGN KEY (`car_id`) REFERENCES `cars` (`car_id`);

--
-- テーブルの制約 `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `exhibits_to_projects` FOREIGN KEY (`exhibit_id`) REFERENCES `exhibits` (`exhibit_id`),
  ADD CONSTRAINT `users_to_projects` FOREIGN KEY (`buyer_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
