#!/bin/bash

search_dir=.
INDEX=index.json

abort() {
	echo $platform
	echo "$@"
	exit 1
}

get_all_file() {
	echo -e "{\n\t\"pages\": [" >$INDEX
	for file in "$search_dir"/*.md; do
		filename=$(echo "$file" | sed "s/\.\///g")
		title=$(head -n 1 $file | sed "s/# //g")

		echo -e "\t\t{" >>$INDEX
		echo -e "\t\t\t\"title\": \"$title\"," >>$INDEX
		echo -e "\t\t\t\"url\": \"pages/$filename\"" >>$INDEX
		echo -e "\t\t}," >>$INDEX
	done
	echo -e "\t]\n}" >>$INDEX
}

copy_result() {
	cd ..
	cp -rf pages public/
}

main() {
	cd $(pwd)/pages
	get_all_file
	copy_result
	pnpm fc
}

main || abort "Compose Error!"
