### run docker
```
docker-compose up -d --build
```


### Database
run migrations 
```
docker-compose exec nest npx sequelize-cli db:migrate
```

run seeders 
```
docker-compose exec nest npx sequelize-cli db:seed:all
```
