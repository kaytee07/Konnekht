#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <filename> <commit_message>"
    exit 1
fi

filename=$1
commit_message=$2

git add "$filename"
git commit -m"$commit_message"
git push

echo "Git operations completed successfully"