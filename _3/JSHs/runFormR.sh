#!/bin/sh

      aRepo=Bruce-dev03
      aTS=$( date +%y%m%d ); aTS=${aTS:1}
      aBack=${aRepo}_v${aTS}
      aClient=client3
      aServer=server3

      echo "  For ${aBack}"
      cd ${aBack}

function runIt {
      cd $1/$2
#     aName=$( ls -1 '\!_*' )
      echo "  Starting: $1/$2 - ${aName:2}"
      echo "  --------------------------------------------------------"

      start npm start
      cd ../../
      }
# ---------------------------------------------

      aCmd=$1; if [ "${aCmd}" == "" ]; then aCmd=cs; fi

      echo ""

  if [ "${aCmd/s/}" != "${aCmd}" ]; then

      runIt ${aServer} 1s-world
#     runIt ${aServer} 2s-setdb
      runIt ${aServer} 3s-rauth
      runIt ${aServer} 4s-admin
      runIt ${aServer} 5s-formr
      fi

  if [ "${aCmd/c/}" != "${aCmd}" ]; then

      runIt ${aClient} 1c-world
#     runIt ${aClient} 2c-setdb
      runIt ${aClient} 3c-rauth
      runIt ${aClient} 4c-admin
      runIt ${aClient} 5c-formr
      fi

# ---------------------------------------------

      echo ""
