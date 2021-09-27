#!/bin/sh

      aRepo=Bruce-dev03
      aTS=$( date +%y%m%d ); aTS=${aTS:1}
      aBack=${aRepo}_v${aTS}
      aClient=client3
      aServer=server3

# ---------------------------------------------
      echo ""

  if [   -d "${aBack}" ]; then
      rm -rf ${aBack}/
      fi

  if [ ! -d "${aBack}" ]; then
      echo " Making dir: ${aBack}"
      mkdir  ${aBack}
      fi
# ---------------------------------------------

      mkdir  ${aBack}/${aClient}
      mkdir  ${aBack}/${aServer}

      rm -rf ${aRepo}/${aClient}/1c-world/node_modules
      rm -rf ${aRepo}/${aClient}/3c-rauth/node_modules
      rm -rf ${aRepo}/${aClient}/4c-admin/node_modules
      rm -rf ${aRepo}/${aClient}/5c-formr/node_modules

      cp -r  ${aRepo}/_3                       ${aBack}
      cp -r  ${aRepo}/__P*                     ${aBack}
      cp -r  ${aRepo}/.git                     ${aBack}
      cp -r  ${aRepo}/.vscode                  ${aBack}
      cp -r  ${aRepo}/README.md                ${aBack}
      cp -r  ${aRepo}/FormR*                   ${aBack}

      cp -r  ${aRepo}/${aClient}//1c-world     ${aBack}/${aClient}
      cp -r  ${aRepo}/${aClient}//3c-rauth     ${aBack}/${aClient}
      cp -r  ${aRepo}/${aClient}//4c-admin     ${aBack}/${aClient}
      cp -r  ${aRepo}/${aClient}//5c-formr     ${aBack}/${aClient}

      cp -r  ${aRepo}/${aServer}//1s-world     ${aBack}/${aServer}
      cp -r  ${aRepo}/${aServer}//3s-rauth     ${aBack}/${aServer}
      cp -r  ${aRepo}/${aServer}//4s-admin     ${aBack}/${aServer}
      cp -r  ${aRepo}/${aServer}//5s-formr     ${aBack}/${aServer}

      cp -r  ${aRepo}/${aClient}/package.json  ${aBack}/${aClient}
      cp -r  ${aRepo}/${aServer}/package.json  ${aBack}/${aServer}

#     cp -r  ${aRepo}/${aClient}/_4            ${aBack}/${aClient}
      cp -r  ${aRepo}/${aServer}/_4            ${aBack}/${aServer}

# ---------------------------------------------


# ---------------------------------------------

      echo ""
