#!/bin/bash

STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3018/api/v1/health)

echo "$STATUS" > health_check.log
