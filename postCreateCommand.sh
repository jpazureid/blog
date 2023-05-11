#!/bin/bash

file_list=(
    "package.json"
    "package-lock.json"
    "lib"
    "gulpfile.js"
    "node_modules"
)

source_dir="/blog"
target_dir=`pwd`

for file_name in "${file_list[@]}"
do
  if [ -e "$source_dir/$file_name" ] && [ ! -e "$target_dir/$file_name" ]; then
    echo "create link: $source_dir/$file_name -> $target_dir/$file_name"
    ln -sn "$source_dir/$file_name" "$target_dir/$file_name"
  fi
done

echo "symbolic link created. Please run 'npm start' to run development server."
git submodule update -i
