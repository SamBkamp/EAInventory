#!/bin/bash

if [[ $(dpkg -s npm 2> /dev/null) == "" ]]; then
    echo -e "\e[1;31mPlease install npm\e["
    exit 0
fi

cd ../node && npm install 

echo -e "\e[0;32mnode dependancies installed!\e["

echo -e "\e[0;33mNOTE: install mysql database data either with PMA or by piping it into the mysql container with:\e["
echo -e "\e[1;33mmysql -u [username] -p [password] < inventory.sql\e["
