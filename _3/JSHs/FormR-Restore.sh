#!/bin/sh

  aBDev=Dev02
  aODev=Dev01
  aBApp=app1

  aSDev=Test1
  aSApp=app1

  aBakDate=01104

  aRepo=FormR
  aCust=/C/WEBs/8020

  if [ "$1" != "" ]; then aSDev=$1; fi
  if [ "$2" != "" ]; then aSApp=$2; fi
  if [ "$3" != "" ]; then aBDev=$3; fi
  if [ "$4" != "" ]; then aBApp=$4; fi
  if [ "$5" != "" ]; then aBakDate=$5; fi

  export aRepo
  export aBakDate
  export bBackup=0
  export bRestore=1

  export bDoit=1

  aRestore=${aCust}/${aRepo}/BackRest.sh
${aRestore} ${aSDev} ${aSApp} ${aBDev} ${aBApp} ${aODev}

