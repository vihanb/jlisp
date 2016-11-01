#!/usr/bin/env sh

mkdir langref/bin 2>/dev/null

npm run lint &&
    npm run build &&
    npm run gendoc &&
    cd langref &&
    ruby build_doc.rb
