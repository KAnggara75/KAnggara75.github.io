#!/bin/bash

search_dir=.
INDEX=$(pwd)/public/index.json
PUBLIC_IMG=$(pwd)/public/img
WORK_DIR=$(pwd)

abort() {
	echo $platform
	echo "$@"
	exit 1
}

get_all_file() {
	echo -e "{\n\t\"pages\": [" >$INDEX
	for file in "$search_dir"/*.md; do
		filename=$(echo "$file" | sed "s/\.\///g")
		url=$(echo "$filename" | sed "s/\.md//g")
		title=$(head -n 1 $file | sed "s/# //g")

		echo -e "\t\t{" >>$INDEX
		echo -e "\t\t\t\"title\": \"$title\"," >>$INDEX
		echo -e "\t\t\t\"url\": \"post/$url\"," >>$INDEX
		echo -e "\t\t\t\"src\": \"pages/$filename\"," >>$INDEX

		if [ -e "$PUBLIC_IMG/$url.jpeg" ]; then
			echo -e "\t\t\t\"img\": \"img/$url.jpeg\"" >>$INDEX
		elif [ -e "$PUBLIC_IMG/$url.jpg" ]; then
			echo -e "\t\t\t\"img\": \"img/$url.jpg\"" >>$INDEX
		elif [ -e "$PUBLIC_IMG/$url.png" ]; then
			echo -e "\t\t\t\"img\": \"img/$url.png\"" >>$INDEX
		else
			echo -e "\t\t\t\"img\": \"img/default.jpeg\"" >>$INDEX
		fi

		echo -e "\t\t}," >>$INDEX
	done
	echo -e "\t]\n}" >>$INDEX
}

copy_result() {
	cd ..
	cp -rf pages public/
}

main() {
	cd $WORK_DIR/pages
	get_all_file
	copy_result
	pnpm fc
}

main || abort "Compose Error!"
