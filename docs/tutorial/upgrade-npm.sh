#!/bin/sh
for step in `ls -d */`;
do
  cd $step
  npm i
  cd ..
done
