CREATE OR REPLACE FUNCTION get_random_theme()
RETURNS TEXT
AS $$
DECLARE
    random_name TEXT;
BEGIN
    SELECT name INTO random_name FROM art_theme order by random() limit 1;
    RETURN random_name;
END;
$$ LANGUAGE plpgsql;


select
  cron.schedule(
    'create-art_challenge', -- name of the cron job
    '59 23 * * 0', -- every sunday 23:59
    $$
    insert into art_challenge(theme, starting_date, ending_date)
    values (get_random_theme(), CURRENT_DATE + 1, CURRENT_DATE + 7)
    $$
  );
