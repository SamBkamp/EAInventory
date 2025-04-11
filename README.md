# EA inventory system
simple internal inventory system for Exotic Aquaculture's products.

## prerequisites 
 1. `npm`
 2. `docker compose`

## install
 1. `cd init`
 2. `./install.sh`
 3. `cd ../`
 4. `docker compose up`

## configuration
all configuration options are read from the `.env` file. There is an example `.env.example` file included in this repo.

`MYSQL_ROOT_PASSWORD` - the root password for the mysql container
`MYSQL_DATABASE` - The selected database that will be created on startup
`MYSQL_USER` - The default mysql user	
`MYSQL_PASSWORD` - The default mysql password
`NODE_USER` - The db user nodejs will use to connect (almost always the same as `MYSQL_USER`)
`NODE_PASSWORD` - The db user nodejs will use to connect (almost always the same as `MYSQL_PASSWORD`)
`NODE_LOGIN_PW` - The password users will use to log in to the system
`TZ` - Local timezone for accurate date representations
`NGINX_FILE` - The nginx conf file (usually either nginx.conf or nginx-nossl.conf) 

