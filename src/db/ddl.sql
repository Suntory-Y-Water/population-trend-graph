-- 市区町村マスタ
DROP TABLE IF EXISTS m_municipality CASCADE;

CREATE TABLE m_municipality (
    municipality_code VARCHAR(6) PRIMARY KEY,
    prefecture_code VARCHAR(2) NOT NULL,
    prefecture_name VARCHAR(50) NOT NULL,
    municipality_name VARCHAR(100) NOT NULL
);

COMMENT ON TABLE m_municipality IS '市区町村マスタ';
COMMENT ON COLUMN m_municipality.municipality_code IS '団体コード';
COMMENT ON COLUMN m_municipality.prefecture_code IS '都道府県コード';
COMMENT ON COLUMN m_municipality.prefecture_name IS '都道府県名';
COMMENT ON COLUMN m_municipality.municipality_name IS '市区町村名';

-- 性別情報テーブル
DROP TABLE IF EXISTS m_gender CASCADE;

CREATE TABLE m_gender (
    gender VARCHAR(10) PRIMARY KEY
);

INSERT INTO m_gender (gender) VALUES ('男'), ('女');

COMMENT ON TABLE m_gender IS '性別情報マスタ';
COMMENT ON COLUMN m_gender.gender IS '性別';

-- 人口情報マスタ
DROP TABLE IF EXISTS m_population CASCADE;

CREATE TABLE m_population (
    year INTEGER NOT NULL,
    municipality_code VARCHAR(6) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    young_population INTEGER NOT NULL,
    working_age_population INTEGER NOT NULL,
    elderly_population INTEGER NOT NULL,
    PRIMARY KEY (year, municipality_code, gender),
    FOREIGN KEY (municipality_code) REFERENCES m_municipality(municipality_code)
);

COMMENT ON TABLE m_population IS '人口情報マスタ';
COMMENT ON COLUMN m_population.year IS '調査年';
COMMENT ON COLUMN m_population.municipality_code IS '団体コード';
COMMENT ON COLUMN m_population.gender IS '性別';
COMMENT ON COLUMN m_population.young_population IS '年少人口';
COMMENT ON COLUMN m_population.working_age_population IS '生産年齢人口';
COMMENT ON COLUMN m_population.elderly_population IS '老年人口';
