#!/bin/sh
echo "Updating the Table of Content…"
doctoc --github ./README.md
echo "Synchronizing with the docs…"
cp ./README.md ./docs/index.md
