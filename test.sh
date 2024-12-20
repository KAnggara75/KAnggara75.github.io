#!/bin/bash

# Define the URL to scrape
title=$(curl -s "$base_url" | grep -o '<script[^>]*>[^<]*</script>' | sed 's/\<script.*src="\(.*\)".*/\1/' |  sed "s/\<$temp\>//g")

style=$(curl -s "$base_url" | grep -o '<link[^>]*.css">' | sed 's/\<link.*href="\(.*\)".*/\1/')

if [ ! -f dist/assets/$title ]; then
    echo "$title Not Deployed"
fi

if [ ! -f dist/assets/$style ]; then
    echo "$style Not Deployed"
fi
