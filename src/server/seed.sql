insert into users (name, password) values ('user0', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4');

insert into gallery (user_id, album) values (1, 'roses');
insert into gallery (user_id, album) values (1, 'tulips');
insert into gallery (user_id, album) values (1, 'lilies');
insert into gallery (user_id, album) values (1, 'orchids');

insert into images (album_id, img_url, pos) values (1, 'pic_1', 1);
insert into images (album_id, img_url, pos) values (1, 'pic_2', 2);
insert into images (album_id, img_url, pos) values (1, 'pic_3', 3);
insert into images (album_id, img_url, pos) values (1, 'pic_4', 4);

insert into images (album_id, img_url, pos) values (2, 'pic_1', 1);
insert into images (album_id, img_url, pos) values (2, 'pic_1', 2);
insert into images (album_id, img_url, pos) values (2, 'pic_1', 3);
insert into images (album_id, img_url, pos) values (2, 'pic_1', 4);

insert into images (album_id, img_url, pos) values (3, 'pic_2', 1);
insert into images (album_id, img_url, pos) values (3, 'pic_2', 2);
insert into images (album_id, img_url, pos) values (3, 'pic_2', 3);
insert into images (album_id, img_url, pos) values (3, 'pic_2', 4);

insert into images (album_id, img_url, pos) values (4, 'pic_3', 1);
insert into images (album_id, img_url, pos) values (4, 'pic_3', 2);
insert into images (album_id, img_url, pos) values (4, 'pic_3', 3);
insert into images (album_id, img_url, pos) values (4, 'pic_3', 4);