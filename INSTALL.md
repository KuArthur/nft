# Просмотр логов

nest:
```
docker-compose logs --tail 1000 -f nest
```

# Миграции 
Выполнить миграции:
```
docker-compose exec nest npx sequelize-cli db:migrate
```

Откатить миграции:
```
docker-compose exec nest npx sequelize-cli db:migrate:undo:all
```

Запуск сидеров:
```
docker-compose exec nest npx sequelize-cli db:seed:all
```
