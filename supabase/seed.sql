-- Content seed (safe for production): video cards only. No figures here —
-- enter the real member count and survey results in the dashboard.

-- Verified official video: Yubi Fest 2020 live-streamed recital (official EYS Music School YouTube channel)
-- Custom thumbnail: YouTube's own thumbnail has Japanese text burned in
insert into public.videos (placement, youtube_id, title, subtitle, meta, image, sort) values
  ('workshop', 'AQXESSmW5Gw', 'Yubi Fest 2020: Live-Streamed Recital (Dec 12, 2020)', 'EYS-Kids Dance Academy', 'Kanto / Recital', '/images/events/friends.webp', 0),
  ('activity', 'AQXESSmW5Gw', 'Yubi Fest 2020: Live-Streamed Recital (Dec 12, 2020)', 'EYS-Kids Dance Academy', 'Kanto / Recital', '/images/events/friends.webp', 0);

-- Remaining cards from the design. Add youtube_id when each video is published.
insert into public.videos (placement, title, subtitle, meta, image, sort) values
  ('workshop', 'Hip-Hop Workshop with Pro Dancers: Highlights', 'EYS-Kids Dance Academy', 'Kanto / Hip-Hop', '/images/events/lesson.webp', 1),
  ('workshop', 'Rock & Pop Band Taster: First Time on Drums', 'EYS-Kids Music School', 'Kanto / Drums', null, 2),
  ('workshop', 'Parade Dance Workshop: Mini Parade Day', 'EYS-Kids Dance Academy', 'Kanto / Theme Park', '/images/events/stage-class.webp', 3),
  ('workshop', 'Mural Workshop: One Big Picture, Painted Together', 'EYS-Kids Art & Design', 'Kansai / Art', null, 4),
  ('workshop', 'Kids Dance Battle: Final Highlights', 'EYS-Kids Dance Academy', 'Kanto / Battle', '/images/events/duo.webp', 5),
  ('activity', 'Hip-Hop Workshop with Pro Dancers: Highlights', 'EYS-Kids Dance Academy', 'Kanto / Hip-Hop', '/images/events/lesson.webp', 1),
  ('activity', 'Parade Dance Workshop: Mini Parade Day', 'EYS-Kids Dance Academy', 'Kanto / Theme Park', '/images/events/stage-class.webp', 2),
  ('activity', 'Kids Dance Battle: Final Highlights', 'EYS-Kids Dance Academy', 'Kanto / Battle', '/images/events/duo.webp', 3);

insert into public.videos (placement, title, subtitle, meta, instructor, image, sort) values
  ('home', 'First Kids Hip-Hop | Finding the Beat, the Fun Way', 'EYS-Kids Daikanyama Studio', 'Kanto / Hip-Hop', 'MIKU', '/images/home/class-1.webp', 0),
  ('home', 'Beginner Jazz | Turns and Graceful Expression', 'EYS-Kids Ginza Studio', 'Kanto / Jazz', 'AYA', '/images/home/class-2.webp', 1),
  ('home', 'K-Pop Covers | Master the Hit Choreography', 'EYS-Kids Shibuya Studio', 'Kanto / K-Pop', 'YUNA', '/images/home/class-3.webp', 2),
  ('home', 'Intro to Cheer | Smiles and Teamwork', 'EYS-Kids Shinjuku Studio', 'Kanto / Cheer', 'SAKI', '/images/home/class-4.webp', 3),
  ('home', 'Breakin’ | Floor-Move Basics, Safely', 'EYS-Kids Ikebukuro Studio', 'Kanto / Breakin’', 'RYO', '/images/home/class-5.webp', 4),
  ('home', 'Contemporary | Growing Free Expression', 'EYS-Kids Yokohama Studio', 'Kanto / Contemporary', 'NANA', '/images/home/class-6.webp', 5);
