DROP TABLE IF EXISTS m_prefecture CASCADE; 

CREATE TABLE m_prefecture( 
    pref_code VARCHAR (5) PRIMARY KEY
    , pref_name VARCHAR (50) NOT NULL
); 

COMMENT 
    ON TABLE m_prefecture IS '都道府県マスタ'; 

COMMENT 
    ON COLUMN m_prefecture.pref_code IS '都道府県コード'; 

COMMENT 
    ON COLUMN m_prefecture.pref_name IS '都道府県名'; 

DROP TABLE IF EXISTS m_city CASCADE; 

CREATE TABLE m_city( 
    city_code VARCHAR (10) PRIMARY KEY
    , city_name VARCHAR (100) NOT NULL
    , pref_code VARCHAR (5) NOT NULL
    , FOREIGN KEY (pref_code) REFERENCES m_prefecture(pref_code)
); 

COMMENT 
    ON TABLE m_city IS '市区町村マスタ'; 

COMMENT 
    ON COLUMN m_city.city_code IS '市区町村コード'; 

COMMENT 
    ON COLUMN m_city.city_name IS '市区町村名'; 

COMMENT 
    ON COLUMN m_city.pref_code IS '都道府県コード'; 

DROP TABLE IF EXISTS m_population_data CASCADE; 

CREATE TABLE m_population_data( 
    city_code VARCHAR (10) NOT NULL
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
    , FOREIGN KEY (city_code) REFERENCES m_city(city_code)
); 

COMMENT 
    ON TABLE m_population_data IS '人口動態マスタ'; 

COMMENT 
    ON COLUMN m_population_data.city_code IS '市区町村コード'; 

COMMENT 
    ON COLUMN m_population_data.census_year IS '調査年'; 

COMMENT 
    ON COLUMN m_population_data.total_population IS '総人口'; 

COMMENT 
    ON COLUMN m_population_data.male_total_population IS '男性総人口'; 

COMMENT 
    ON COLUMN m_population_data.female_total_population IS '女性総人口'; 

COMMENT 
    ON COLUMN m_population_data.population_under_15 IS '15歳未満人口'; 

COMMENT 
    ON COLUMN m_population_data.population_15_to_64 IS '15～64歳人口'; 

COMMENT 
    ON COLUMN m_population_data.population_over_65 IS '65歳以上人口'; 

COMMENT 
    ON COLUMN m_population_data.male_population_under_15 IS '男性15歳未満人口'; 

COMMENT 
    ON COLUMN m_population_data.male_population_15_to_64 IS '男性15～64歳人口'; 

COMMENT 
    ON COLUMN m_population_data.male_population_over_65 IS '男性65歳以上人口'; 

COMMENT 
    ON COLUMN m_population_data.female_population_under_15 IS '女性15歳未満人口'; 

COMMENT 
    ON COLUMN m_population_data.female_population_15_to_64 IS '女性15～64歳人口'; 

COMMENT 
    ON COLUMN m_population_data.female_population_over_65 IS '女性65歳以上人口';
