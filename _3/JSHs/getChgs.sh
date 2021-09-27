#!/bin/sh

echo ""

  if [ "$1" != "" ]; then

    awk -f getChgs.awk "$1"  >>chgs.md

   else

# for aFile in $( find ../ -type f -print )
                  find ../ -type f | while read aFile;
do
 if [ "${aFile:3:1}" != "!" ]; then

    echo "  ${aFile:3}"
#   awk -f getChgs.awk "../server_app_a14.njs" >>chgs.md
#   awk -f getChgs.awk "$1"  >>chgs.md
    awk -f getChgs.awk "$aFile"  >>chgs.md

    fi
done

   fi

   sort -u -o chgs.md chgs.md

echo ""

