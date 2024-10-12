--*DataTitle '人口動態マスタ'
--*CaptionFromComment
SELECT
    mp.city_code                                -- 市区町村コード
    , mpr.pref_name                             -- 都道府県名
    , mc.city_name                              -- 市区町村名
    , census_year                               -- 調査年
    , total_population                          -- 総人口
FROM
    public.m_population_data as mp 
    INNER JOIN m_city as mc 
        ON mc.city_code = mp.city_code 
    INNER JOIN m_prefecture as mpr 
        on mpr.pref_code = mc.pref_code 
WHERE
    mp.city_code = '01101' 
    and census_year = '2020' 
ORDER BY
    city_code
    , census_year
