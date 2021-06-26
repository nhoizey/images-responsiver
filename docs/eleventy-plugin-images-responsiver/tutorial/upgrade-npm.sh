#!/bin/sh
for step in `ls -d */`;
do
  cd $step
  ncu -u
  npm i
  cd ..
done
