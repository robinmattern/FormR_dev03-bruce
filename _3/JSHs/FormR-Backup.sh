#!/bin/sh

  aSDev=Dev01
  aSApp=app1

  aBDev=${aSDev}
  aBApp=${aSApp}

  aBakDate=

  aRepo=FormR
  aCust=/C/WEBs/8020

  if [ "$1" != "" ]; then aSDev=$1; fi
  if [ "$2" != "" ]; then aSApp=$2; fi
  if [ "$3" != "" ]; then aBDev=$3; fi
  if [ "$4" != "" ]; then aBApp=$4; fi
  if [ "$5" != "" ]; then aBakDate=$5; fi

  export aRepo
  export aBakDate
  export bBackup=1
  export bRestore=0

  export bDoit=0

  aRestore=${aCust}/${aRepo}/BackRest.sh
${aRestore} ${aSDev} ${aSApp} ${aBDev} ${aBApp}
