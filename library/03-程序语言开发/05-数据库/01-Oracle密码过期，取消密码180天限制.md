## Oracle密码过期，取消密码180天限制
1. 进入sqlplus模式
```sql
sqlplus / as sysdba;
```
1. 查看用户密码的有效期设置(一般默认的配置文件是DEFAULT)
```sql
　　SELECT * FROM dba_profiles WHERE profile='DEFAULT' AND resource_name='PASSWORD_LIFE_TIME';
```
1. 将密码有效期由默认的180天修改成“无限制”，修改之后不需要重启动数据库，会立即生效
```sql
　　ALTER PROFILE DEFAULT LIMIT PASSWORD_LIFE_TIME UNLIMITED;
```
1. 帐户再改一次密码
```sql
　　alter user 用户名 identified by 原密码;
```
1. 使用修改后的用户登录，如果报“ORA-28000:用户已被锁”，解锁
```sql
　　alter user db_user account unlock;
　　commit;
```

