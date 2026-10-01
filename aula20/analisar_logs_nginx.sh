#!/bin/bash

echo "Últimas requisições HTTP 200 do Nginx:"

tail -n 15 /var/log/nginx/access.log | awk '$9 == 200'
