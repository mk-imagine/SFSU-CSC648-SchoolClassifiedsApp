#!/bin/bash

sudo nginx -s stop
pm2 stop index.js
pm2 delete index
sudo /usr/local/mysql/support-files/mysql.server stop
