#!/bin/bash

cd $(pwd)

search_dir=.

URL=

echo -e "{\n\t\"pages\": [" >index.json

for file in "$search_dir"/*.md; do

	filename=$(echo "$file" | sed "s/\.\///g")
	title=$(head -n 1 $file | sed "s/# //g")

	echo -e "\t\t{" >>index.json
	echo -e "\t\t\t\"title\": \"$title\"," >>index.json
	echo -e "\t\t\t\"url\": \"pages/$filename\"" >>index.json
	echo -e "\t\t}," >>index.json
done

echo -e "\t]\n}" >>index.json
