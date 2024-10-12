-- 都道府県テーブルの削除
DROP TABLE IF EXISTS population_data CASCADE; 

DROP TABLE IF EXISTS city CASCADE; 

DROP TABLE IF EXISTS prefecture CASCADE; 

-- 都道府県テーブルの作成
CREATE TABLE prefecture( 
    pref_code VARCHAR (5) PRIMARY KEY
    , pref_name VARCHAR (50) NOT NULL
); 

-- 都道府県テーブルへのコメント追加
COMMENT 
    ON TABLE prefecture IS '都道府県の基本情報を保持するテーブル'; 

-- 都道府県テーブルのカラムにコメント追加
COMMENT 
    ON COLUMN prefecture.pref_code IS '都道府県コード'; 

COMMENT 
    ON COLUMN prefecture.pref_name IS '都道府県名'; 

-- 市区町村テーブルの作成
CREATE TABLE city( 
    city_code VARCHAR (10) PRIMARY KEY
    , city_name VARCHAR (100) NOT NULL
    , pref_code VARCHAR (5) NOT NULL
    , FOREIGN KEY (pref_code) REFERENCES prefecture(pref_code)
); 

-- 市区町村テーブルへのコメント追加
COMMENT 
    ON TABLE city IS '市区町村の基本情報を保持するテーブル'; 

-- 市区町村テーブルのカラムにコメント追加
COMMENT 
    ON COLUMN city.city_code IS '市区町村コード'; 

COMMENT 
    ON COLUMN city.city_name IS '市区町村名'; 

COMMENT 
    ON COLUMN city.pref_code IS '都道府県コード'; 

-- 人口データテーブルの作成
CREATE TABLE population_data( 
    city_code VARCHAR (10) NOT NULL
    , pref_code VARCHAR (5) NOT NULL
    , census_year INT NOT NULL
    , total_population INT NOT NULL
    , male_total_population INT NOT NULL
    , female_total_population INT NOT NULL
    , population_under_15 INT NOT NULL
    , population_15_to_64 INT NOT NULL
    , population_over_65 INT NOT NULL
    , male_population_under_15 INT NOT NULL
    , male_population_15_to_64 INT NOT NULL
    , male_population_over_65 INT NOT NULL
    , female_population_under_15 INT NOT NULL
    , female_population_15_to_64 INT NOT NULL
    , female_population_over_65 INT NOT NULL
    , PRIMARY KEY (city_code, census_year)
    , FOREIGN KEY (city_code) REFERENCES city(city_code)
    , FOREIGN KEY (pref_code) REFERENCES prefecture(pref_code)
); 

-- 人口データテーブルへのコメント追加
COMMENT 
    ON TABLE population_data IS '市区町村と調査年ごとの詳細な人口データを保持するテーブル'; 

-- 人口データテーブルのカラムにコメント追加
COMMENT 
    ON COLUMN population_data.city_code IS '市区町村コード'; 

COMMENT 
    ON COLUMN population_data.pref_code IS '都道府県コード'; 

COMMENT 
    ON COLUMN population_data.census_year IS '調査年'; 

COMMENT 
    ON COLUMN population_data.total_population IS '総人口'; 

COMMENT 
    ON COLUMN population_data.male_total_population IS '男性総人口'; 

COMMENT 
    ON COLUMN population_data.female_total_population IS '女性総人口'; 

COMMENT 
    ON COLUMN population_data.population_under_15 IS '15歳未満人口'; 

COMMENT 
    ON COLUMN population_data.population_15_to_64 IS '15～64歳人口'; 

COMMENT 
    ON COLUMN population_data.population_over_65 IS '65歳以上人口'; 

COMMENT 
    ON COLUMN population_data.male_population_under_15 IS '男性15歳未満人口'; 

COMMENT 
    ON COLUMN population_data.male_population_15_to_64 IS '男性15～64歳人口'; 

COMMENT 
    ON COLUMN population_data.male_population_over_65 IS '男性65歳以上人口'; 

COMMENT 
    ON COLUMN population_data.female_population_under_15 IS '女性15歳未満人口'; 

COMMENT 
    ON COLUMN population_data.female_population_15_to_64 IS '女性15～64歳人口'; 

COMMENT 
    ON COLUMN population_data.female_population_over_65 IS '女性65歳以上人口';
