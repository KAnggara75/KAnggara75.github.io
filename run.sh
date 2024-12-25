#!/bin/bash

search_dir=.
INDEX=$(pwd)/public/index.json
PUBLIC_IMG=$(pwd)/public/img
WORK_DIR=$(pwd)
YYYY=1999
MM=01
DD=24

abort() {
	echo $platform
	echo "$@"
	exit 1
}

get_all_file() {
	echo -e "{\n\t\"pages\": [" >$INDEX
	for file in "$search_dir"/*.md; do
		filename=$(echo "$file" | sed "s/\.\///g")

		# Pisahkan berdasarkan tanda '-'
		IFS='-' read -r YYYY MM DD name <<<"$filename"

		# membuat folder hanya jika folder tersebut belum ada
		mkdir -p ../public/pages/$YYYY
		mkdir -p ../public/pages/$YYYY/$MM

		# copy md file to public
		# remofe line 1 to 8
		sed '1,8d' $file >../public/pages/$YYYY/$MM/$DD-$name

		# pharse from md file
		src=$(echo "pages/$YYYY/$MM/$DD-$name")
		url=$(echo "post/$YYYY/$MM/$DD-$name" | sed "s/\.md//g")
		title=$(sed -n '/title:/I{p;q;}' $file | sed "s/title: //g")
		tags=$(sed -n '/tags:/I{p;q;}' $file | sed "s/tags: \[//g" | sed 's/\]//g' | sed 's/, /","/g' | sed 's/^/["/' | sed 's/$/"]/')
		subtitle=$(sed -n '/subtitle:/I{p;q;}' $file | sed "s/subtitle: //g")
		source=$(sed -n '/source:/I{p;q;}' $file | sed "s/source: //g")
		author=$(sed -n '/author:/I{p;q;}' $file | sed "s/author: //g")

		# Write to file
		echo -e "\t\t{" >>$INDEX
		echo -e "\t\t\t\"title\": \"$title\"," >>$INDEX
		echo -e "\t\t\t\"subtitle\": \"$subtitle\"," >>$INDEX
		echo -e "\t\t\t\"author\": \"$author\"," >>$INDEX
		echo -e "\t\t\t\"source\": \"$source\"," >>$INDEX
		echo -e "\t\t\t\"url\": \"$url\"," >>$INDEX
		echo -e "\t\t\t\"src\": \"$src\"," >>$INDEX
		echo -e "\t\t\t\"postOn\": \"$YYYY-$MM-$DD\"," >>$INDEX

		if [ -e "$PUBLIC_IMG/$url.jpeg" ]; then
			echo -e "\t\t\t\"img\": \"img/$url.jpeg\"," >>$INDEX
		elif [ -e "$PUBLIC_IMG/$url.jpg" ]; then
			echo -e "\t\t\t\"img\": \"img/$url.jpg\"," >>$INDEX
		elif [ -e "$PUBLIC_IMG/$url.png" ]; then
			echo -e "\t\t\t\"img\": \"img/$url.png\"," >>$INDEX
		else
			echo -e "\t\t\t\"img\": \"img/default.jpeg\"," >>$INDEX
		fi
		echo -e "\t\t\t\"tags\": $tags" >>$INDEX

		echo -e "\t\t}," >>$INDEX
	done
	echo -e "\t]\n}" >>$INDEX
}

main() {
	rm -rf public/pages
	mkdir public/pages
	cd $WORK_DIR/pages
	get_all_file
	pnpm fc
}

main || abort "Compose Error!"
