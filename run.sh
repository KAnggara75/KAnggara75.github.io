#!/bin/bash

search_dir=.
INDEX=$(pwd)/public/index.json
PUBLIC_IMG=$(pwd)/public/img
WORK_DIR=$(pwd)
YYYY=1999
MM=01
DD=24

abort() {
	echo "ERROR! => $@"
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

		if [[ $(head -n 1 "$file") != "---" ]]; then
			# Remove coma symbol on last line
			sed -i='' -e '$s/,$//' "$INDEX"
			echo "WARN: Invalid Header for $filename"
			break
		fi

		# copy md file to public
		# remofe line 1 to 8
		sed '1,8d' $file >../public/pages/$YYYY/$MM/$DD-$name

		# parse variable from md file
		src=$(echo "pages/$YYYY/$MM/$DD-$name")
		url=$(echo "/post/$YYYY/$MM/$DD-$name" | sed "s/\.md//g")
		title=$(sed -n '/title:/I{p;q;}' $file | sed "s/title: //g")
		tags=$(sed -n '/tags:/I{p;q;}' $file | sed "s/tags: \[//g" | sed 's/\]//g' | sed 's/, /","/g' | sed 's/^/["/' | sed 's/$/"]/')
		subtitle=$(sed -n '/subtitle:/I{p;q;}' $file | sed "s/subtitle: //g")
		source=$(sed -n '/source:/I{p;q;}' $file | sed "s/source: //g")
		author=$(sed -n '/author:/I{p;q;}' $file | sed "s/author: //g")

		if [ -z "$tags" ]; then
			sed -i='' -e '$s/,$//' "$INDEX"
			echo "WARN: Tag for $filename Empty"
			break
		fi

		# Write to file
		echo -e "\t\t{" >>$INDEX
		echo -e "\t\t\t\"title\": \"$title\"," >>$INDEX
		echo -e "\t\t\t\"subtitle\": \"$subtitle\"," >>$INDEX
		echo -e "\t\t\t\"author\": \"$author\"," >>$INDEX
		echo -e "\t\t\t\"source\": \"$source\"," >>$INDEX
		echo -e "\t\t\t\"url\": \"$url\"," >>$INDEX
		echo -e "\t\t\t\"src\": \"$src\"," >>$INDEX
		echo -e "\t\t\t\"postOn\": \"$YYYY-$MM-$DD\"," >>$INDEX

		if [ -e "$PUBLIC_IMG$url.jpeg" ]; then
			echo -e "\t\t\t\"img\": \"/img$url.jpeg\"," >>$INDEX
		elif [ -e "$PUBLIC_IMG$url.jpg" ]; then
			echo -e "\t\t\t\"img\": \"/img$url.jpg\"," >>$INDEX
		elif [ -e "$PUBLIC_IMG$url.png" ]; then
			echo -e "\t\t\t\"img\": \"/img$url.png\"," >>$INDEX
		else
			echo -e "\t\t\t\"img\": \"/img/default.jpeg\"," >>$INDEX
		fi

		echo -e "\t\t\t\"tags\": $tags" >>$INDEX

		echo -e "\t\t}," >>$INDEX
	done
	sed -i='' -e '$s/,$//' "$INDEX"
	echo -e "\t]\n}" >>$INDEX
}

generate_sitemap() {
	SITEMAP="$WORK_DIR/public/sitemap.xml"
	BASE_URL="https://kanggara.my.id"

	echo '<?xml version="1.0" encoding="UTF-8"?>' >"$SITEMAP"
	echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' >>"$SITEMAP"

	# Core pages
	echo -e "\t<url>\n\t\t<loc>$BASE_URL/</loc>\n\t\t<changefreq>weekly</changefreq>\n\t\t<priority>1.0</priority>\n\t</url>" >>"$SITEMAP"
	echo -e "\t<url>\n\t\t<loc>$BASE_URL/about</loc>\n\t\t<changefreq>monthly</changefreq>\n\t\t<priority>0.8</priority>\n\t</url>" >>"$SITEMAP"
	echo -e "\t<url>\n\t\t<loc>$BASE_URL/tags</loc>\n\t\t<changefreq>weekly</changefreq>\n\t\t<priority>0.8</priority>\n\t</url>" >>"$SITEMAP"

	# Unique tags
	TAGS_LIST=$(grep -i 'tags:' "$WORK_DIR"/pages/*.md | sed -e 's/.*tags: \[//' -e 's/\].*//' -e 's/,/ /g' | tr -s ' ' | tr ' ' '\n' | sort -u | grep -v '^$' || true)
	for tag in $TAGS_LIST; do
		echo -e "\t<url>\n\t\t<loc>$BASE_URL/tags/$tag</loc>\n\t\t<changefreq>weekly</changefreq>\n\t\t<priority>0.6</priority>\n\t</url>" >>"$SITEMAP"
	done

	# Articles
	for file in "$WORK_DIR"/pages/*.md; do
		filename=$(basename "$file")
		IFS='-' read -r YYYY MM DD name <<<"$filename"
		post_url="/post/$YYYY/$MM/${DD}-${name%.md}"
		post_date="$YYYY-$MM-$DD"

		echo -e "\t<url>\n\t\t<loc>$BASE_URL$post_url</loc>\n\t\t<lastmod>$post_date</lastmod>\n\t\t<changefreq>monthly</changefreq>\n\t\t<priority>0.7</priority>\n\t</url>" >>"$SITEMAP"
	done

	echo '</urlset>' >>"$SITEMAP"
	cp "$SITEMAP" "$WORK_DIR/sitemap.xml"
}

sync_static_assets() {
	# Ensure root static assets are mirrored to public/ so Vite copies them to dist/
	cp "$WORK_DIR/CNAME" "$WORK_DIR/public/CNAME" 2>/dev/null || true
	cp "$WORK_DIR/ads.txt" "$WORK_DIR/public/ads.txt" 2>/dev/null || true
	cp "$WORK_DIR/.nojekyll" "$WORK_DIR/public/.nojekyll" 2>/dev/null || true
	cp "$WORK_DIR/robots.txt" "$WORK_DIR/public/robots.txt" 2>/dev/null || true
}

main() {
	rm -rf public/pages
	mkdir -p public/pages
	cd "$WORK_DIR/pages"
	get_all_file
	rm -f "$INDEX="
	cd "$WORK_DIR"
	generate_sitemap
	sync_static_assets
}

main || abort "Compose Error!"
