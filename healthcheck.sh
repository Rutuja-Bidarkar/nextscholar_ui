#!/bin/bash
# Simple healthcheck script

if curl -s -o /dev/null -w "%{http_code}" http://localhost/ | grep "200" > /dev/null; then
    echo "Healthy"
    exit 0
else
    echo "Unhealthy"
    exit 1
fi
