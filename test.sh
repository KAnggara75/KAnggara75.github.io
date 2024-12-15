#!/bin/bash

# Define the URL to scrape
base_url="https://kanggara.my.id/"

title=$(curl -s "$base_url" | grep -o '<script[^>]*>[^<]*</script>' | sed 's/\<script.*src="\(.*\)".*/\1/')

style=$(curl -s "$base_url" | grep -o '<link[^>]*.css">' | sed 's/\<link.*href="\(.*\)".*/\1/')

if [ ! -f dist$title ]; then
    echo "$title Not Deployed"
fi

if [ ! -f dist$style ]; then
    echo "$style Not Deployed"
fi
