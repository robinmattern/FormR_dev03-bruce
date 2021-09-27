#!/bin/sh

 if [ "${bBackup}"  == ""  ]; then bBackup=1; fi
 if [ "${bRestore}" == ""  ]; then bRestore=0; fi
 if [ "${bDoit}"    == ""  ]; then bDoit=0; fi
 if [ "${bBackup}"  == "1" ]; then bRestore=0; fi
 if [ "${bRestore}" == "1" ]; then bBackup=0; fi

 aSDev="$1"; if [ "${aSDev}" == "" ]; then aSDev=Dev01;    fi
 aSApp="$2"; if [ "${aSApp}" == "" ]; then aSApp=app1;     fi
 aBDev="$3"; if [ "${aBDev}" == "" ]; then aBDev=${aSDev}; fi
 aBApp="$4"; if [ "${aBApp}" == "" ]; then aBApp=${aSApp}; fi
 aODev="$5"; if [ "${aODev}" == "" ]; then aODev=${aBDev}; fi

 aCurDir="$( pwd )"
 aSrcDir="$( pwd )"

# --------------------------------------------------------

 aSSvrDir="server/${aSDev}s"
 aSCltDir="client/${aSDev}c"
 aBSvrDir="server/${aBDev}s"
 aBCltDir="client/${aBDev}c"
 aOSvrDir="server/${aODev}s"
 aOCltDir="client/${aODev}c"

 aSSvrApp="server/${aSDev}s/${aSApp}s"
 aSCltApp="client/${aSDev}c/${aSApp}c"
 aBSvrApp="server/${aBDev}s/${aBApp}s"
 aBCltApp="client/${aBDev}c/${aBApp}c"
 aOSvrApp="server/${aODev}s/${aBApp}s"
 aOCltApp="client/${aODev}c/${aBApp}c"

 if [ "${aBakDate}" == "" ]; then aTS=$( date +%y%m%d ); fi
 if [ "${aBakDate}" != "" ]; then aTS=${aBakDate}; fi

 aBBakDir="${aCurDir}/_/ZIPs/${aRepo}_${aBDev}_v$aTS"
 aOBakDir="${aCurDir}/_/ZIPs/${aRepo}_${aODev}_v$aTS"

 aSSrcSvr="${aCurDir}/${aSSvrApp}"
 aSSrcClt="${aCurDir}/${aSCltApp}"
#aBSrcSvr="${aBakDir}/${aBSvrApp}"
#aBSrcClt="${aBakDir}/${aBCltApp}"
#aOSrcSvr="${aBakDir}/${aBSvrApp}"
#aOSrcClt="${aBakDir}/${aBCltApp}"

# --------------------------------------------------------

function cpy( ) {
    aRecursive=$3; if [ "$3" == "" ]; then aRecursive=" "; fi

    echo "  cp    -p${aRecursive}  $1/*  $2"
    if [ "${bDoit}" == "1" ]; then
            cp    -p${aRecursive}  $1/*  $2 2>&1 | awk '!/r not/'
       fi
    }
# --------------------------------------------------------

function makDir( ) {
 if [ ! -d "$1" ]; then
    echo "  mkdir -p   $1"
            mkdir -p  "$1"
    fi
    }
# --------------------------------------------------------

function chkDir( ) {
    bOpps=0
 if [ ! -d "$1/$2" ]; then
    echo "* $1/$2 doesn't exist"
    bOpps=1
    fi
 if [ ! -d "$1/$3" ]; then
    echo "* $1/$3 doesn't exist"
    bOpps=1
    fi
 if [ "${bOpps}" == "1" ]; then echo ""; fi
    }
# --------------------------------------------------------

   echo ""
   if [ "${bBackup}"  == "1" ]; then echo "  Backing up ${aSDev}/${aSApp} to ${aBDev}/${aBApp} (${aBBakDir})"; fi
   if [ "${bRestore}" == "1" ]; then echo "  Restoring ${aODev}/${aBApp} to ${aSDev}/${aSApp} (${aBBakDir})";  fi
   echo "------------------------------------------------------------------------------------------------------------"

# --------------------------------------------------------

 if [ "${bBackup}" == "1" ]; then

    chkDir  ${aSrcDir} ${aSSvrApp} ${aSCltApp}; if [ "${bOpps}" == "1" ]; then exit; fi

    makDir "${aBBakDir}/${aBSvrApp}"
    makDir "${aBBakDir}/${aBCltApp}"
    makDir "${aBBakDir}/.vscode"

    cpy ${aSrcDir}              ${aSBakDir}
    cpy ${aSrcDir}/.vscode      ${aSBakDir}/.vscode r

    cpy ${aSrcDir}/${aSSvrDir}  ${aBBakDir}/${aBSvrDir}
    cpy ${aSrcDir}/${aSCltDir}  ${aBBakDir}/${aBCltDir}

    cpy ${aSSrcSvr}             ${aBBakDir}/${aBSvrApp} r
    cpy ${aSSrcClt}             ${aBBakDir}/${aBCltApp} r

    if [ -d "${aBBakDir}/${aBCltApp}/node_modules/.cache" ]; then
    echo "  rm -rf  ${aBBakDir}/${aBCltApp}/node_modules/.cache/*"
            rm -rf  ${aBBakDir}/${aBCltApp}/node_modules/.cache/*
       fi
    fi
# --------------------------------------------------------

 if [ "${bRestore}" == "1" ]; then

    chkDir ${aBBakDir} ${aOSvrApp} ${aOCltApp}; if [ "${bOpps}" == "1" ]; then exit; fi

    makDir "${aSrcDir}/${aSSvrApp}"
    makDir "${aSrcDir}/${aSCltApp}"
    makDir "${aSrcDir}/.vscode"

    cpy ${aBBakDir}              ${aSrcDir}
    cpy ${aBBakDir}/.vscode      ${aSrcDir}/.vscode r

    cpy ${aBBakDir}/${aOSvrDir}  ${aSrcDir}/${aSSvrDir}
    cpy ${aBBakDir}/${aOCltDir}  ${aSrcDir}/${aSCltDir}

    cpy ${aBBakDir}/${aOSvrApp}  ${aSSrcSvr} r
    cpy ${aBBakDir}/${aOCltApp}  ${aSSrcClt} r
    fi
# --------------------------------------------------------



