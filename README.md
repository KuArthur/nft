<p align="center"><img src="https://prestoheads.com/assets/img/logo.png"></p>

# opensea-parsing-lp

# Install

[Инструкция по установке и поднятию докер контейнеров](INSTALL.md)

# Дамп базы. 
    prestoheads@nft-db:~$ sudo -u postgres -i
    postgres@nft-db:~$ pg_dump -U postgres -d app > ~/dump_1312-1955.sql
    postgres@nft-db:~$ mv dump_1312-1955.sql /home/prestoheads/storage/dump_1312-1955.sql
# Запустить парсинг: 
    sudo make start-parsing
# Оптимизировать базу (очистить дупликаты статистики за короткие периоды):
    sudo make clear-duplicates
# Добавить коллекции: 
    docker-compose exec nest npm run parse update-collections config/collections/new.json
    
Принимает JSON файл. Путь к файлу должен идти от директории nest (например config/collections/new2.json)

# Запрос для отключения коллекций для парсинга и вывода на сайт: 
    UPDATE collections SET show_collection=false, parse_collection=false;

# Запрос для включения подколлекций арт-блока для парсинга и вывода на сайт: 
    UPDATE collections SET show_collection=true, parse_collection=true WHERE art_blocks IS NOT NULL;
