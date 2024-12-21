#!/bin/bash

cd $(pwd)/public/pages

search_dir=.

URL=

echo "{\"pages\":[" >index.json

for entry in "$search_dir"/*.md; do
	new_entry=$(echo "$entry" | sed "s/\.\///g")
	echo -e "\"pages/$new_entry\"," >>index.json
done

echo "]}" >>index.json
