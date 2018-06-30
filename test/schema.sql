select `id`, `email`, `username` from `User`;
insert into `User` (`email`, `username`, `id`) values (?, ?, ?, ?);
update `User` set `email`=?, `username`=? where `id`=?;
delete from `User` where `id`=?;