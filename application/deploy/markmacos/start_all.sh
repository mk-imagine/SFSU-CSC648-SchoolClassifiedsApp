#!/bin/bash

sudo /usr/local/mysql/support-files/mysql.server start
cd ~/Repos/csc648-03-sp22-team8/application/server/
pm2 start index.js
sudo nginx
