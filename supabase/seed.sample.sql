-- STAGING / PREVIEW ONLY. These are the placeholder figures from the Figma design,
-- not real data. Do not run this against production — enter real figures instead.

insert into public.site_stats (key, value, as_of) values ('members_total', 68434, '2023-12-31');

insert into public.member_history (year, members) values
  (2009, 40), (2011, 3200), (2013, 9800), (2015, 18500), (2017, 27400),
  (2019, 38600), (2021, 47900), (2023, 58200), (2024, 68434);

insert into public.surveys (id, title, fiscal_year, respondents, published) values
  ('enrollment-sample', 'Enrollment survey (sample)', null, null, true);

with r as (insert into public.ranking_reasons (survey_id, title, votes) values ('enrollment-sample', E'Dance stylists', 99) returning id)
insert into public.ranking_voices (reason_id, platform, name, profile, body, posted_at) values
  ((select id from r), 'facebook', 'Natsuko Kimura', '38 / Female / Shinjuku Studio', 'The tips are tailored to each child, so my daughter improves far faster than she did practicing to videos at home.', now() - interval '1 days'),
  ((select id from r), 'twitter', 'rikanyaso', '35 / Female / Shinjuku Studio', 'They really listen to our questions. We look forward to every lesson.', now() - interval '4 days'),
  ((select id from r), 'instagram', 'Ruri Matsubara', '32 / Female / Shinjuku Studio', 'It is easy to ask questions, and the pace suits my child well.', now() - interval '7 days'),
  ((select id from r), 'facebook', 'Daisuke Murakami', '41 / Male / Shibuya Studio', 'They helped with everything from music to costumes, so getting ready for the recital was stress-free.', now() - interval '10 days');

with r as (insert into public.ranking_reasons (survey_id, title, votes) values ('enrollment-sample', E'Guaranteed progress', 62) returning id)
insert into public.ranking_voices (reason_id, platform, name, profile, body, posted_at) values
  ((select id from r), 'facebook', 'Kyoko', '30 / Female / Shinjuku Studio', 'They pick songs and choreography that beginners can manage, so my son feels confident in class.', now() - interval '1 days'),
  ((select id from r), 'instagram', 'amuamu', '29 / Female / Shinjuku Studio', 'I know nothing about dance, so seeing progress in the Karte report really helps.', now() - interval '4 days'),
  ((select id from r), 'facebook', 'Atsushi Tanaka', '36 / Male / Shinjuku Studio', 'I had no idea what goals to set, so the step-by-step targets were a big help.', now() - interval '7 days');

with r as (insert into public.ranking_reasons (survey_id, title, votes) values ('enrollment-sample', E'Free make-up lessons', 40) returning id)
insert into public.ranking_voices (reason_id, platform, name, profile, body, posted_at) values
  ((select id from r), 'facebook', 'Makoto Goto', '33 / Male / Shinjuku Studio', 'I assumed make-up lessons would cost extra, but they are free every time. That sold me.', now() - interval '1 days'),
  ((select id from r), 'twitter', 'Shinobu Torikai', '30 / Female / Shinjuku Studio', 'We use a make-up lesson every few months.', now() - interval '4 days'),
  ((select id from r), 'facebook', 'Shingo Hoshino', '32 / Male / Shinjuku Studio', 'Our schedule changes a lot, so the make-up lesson system is a lifesaver!', now() - interval '7 days');

with r as (insert into public.ranking_reasons (survey_id, title, votes) values ('enrollment-sample', E'Open until 10 p.m.', 27) returning id)
insert into public.ranking_voices (reason_id, platform, name, profile, body, posted_at) values
  ((select id from r), 'twitter', 'Haru''s mom', '37 / Female / Musashi-Kosugi Studio', 'There are classes we can make after work, so it works even with two working parents.', now() - interval '1 days'),
  ((select id from r), 'facebook', 'Ken Konishi', '42 / Male / Ikebukuro Studio', 'Late classes that fit after cram school were the deciding factor.', now() - interval '4 days');

with r as (insert into public.ranking_reasons (survey_id, title, votes) values ('enrollment-sample', E'Free trial lesson', 22) returning id)
insert into public.ranking_voices (reason_id, platform, name, profile, body, posted_at) values
  ((select id from r), 'instagram', 'mii', '34 / Female / Daikanyama Studio', 'My daughter had so much fun at the trial that we signed up on the spot.', now() - interval '1 days'),
  ((select id from r), 'facebook', 'Rie Asano', '39 / Female / Ginza Studio', 'Even at the trial they gave careful attention, and we got a real feel for the studio.', now() - interval '4 days');

with r as (insert into public.ranking_reasons (survey_id, title, votes) values ('enrollment-sample', E'Tailor-made\nlessons', 18) returning id)
insert into public.ranking_voices (reason_id, platform, name, profile, body, posted_at) values
  ((select id from r), 'facebook', 'Mai Noguchi', '36 / Female / Daikanyama Studio', 'They built a practice plan around my daughter for her audition.', now() - interval '1 days');

with r as (insert into public.ranking_reasons (survey_id, title, votes) values ('enrollment-sample', E'The other students', 9) returning id)
insert into public.ranking_voices (reason_id, platform, name, profile, body, posted_at) values
  ((select id from r), 'twitter', 'Yuta''s dad', '40 / Male / Shibuya Studio', 'When we visited, older kids were kindly helping the little ones. You could feel the good vibe.', now() - interval '1 days');
