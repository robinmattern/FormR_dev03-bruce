#!/bin/sh

     aTS=$( date +%y%m%d ); aTS=${aTS:1}
     aDir="/C/WEBs/8020/IODD/FormR/P09/Master"
     pAWK="/C/WEBs/8020/IODD/FormR/P09/Master/_3/JSHs/shoEnvs.awk"
#    aENVs="$(pwd)/FormR-P08_ENVs_v${aTS}_filelist.txt"
     aENVs="FormR-P09_ENVs_v${aTS}_filelist.txt"

#    cd ${aDir}

#    rdir -r 9     .env  >${aENVs}
#    rdir -r 9 ../  .env  >${aENVs}
#    rdir -r 9 ../../ .env  >${aENVs}

  function show2() {
#    aLine=$( awk "${aDir}/$3" -f ${pAWK} )
     aLine=$( cat "${aDir}/$3" | awk -f ${pAWK} )
     printf "%10s %5s  %-28s %s\n" $1 $2 $3 "${aLine}"
     }

  function show1() {

     echo ""
     echo "-----------------------------------------------------------------------"
     echo "  $3 ( $1 $2 )"
     echo "-------------------------------------------------------------"
      cat    ${aDir}/$3
     echo "-------------------------------------------------------------"
     }

#     echo "PORT   DBSN   CORS_CLIENT_URL  DBSN_4BRUCE   CORS_CLIENT_URL   REACT_APP_API_URL"
      echo ""
      echo "                                                                                     REACT_APP_API_URL "
      echo "  Date Time       .ENV FILE for APP            PORT  DBSN          DBSN_4USER        CORS_CLIENT_URL   "
      echo "----------------  ---------------------------- ----- ------------- ----------------- --------------------------"

# for aFile in $( rdir -r 9 .env ); do
  while IFS= read -r aFile; do
#            2021-03-04 10:01  ../client/app2c/.env
#            2021-03-04 10:01  ../../client/app3c/.env
     if [ "${aFile:14:2}" == '20' ]; then
#    echo "Processing ${aFile:14:10}   ${aFile:25:5}   ${aFile:38}"
     show2           "${aFile:14:10}" "${aFile:25:5}" "${aFile:38}"
     fi

     done < ${aENVs}

#    show 2020-12-13 23:01 ./client/app2c/.env
#    show 2020-12-13 23:01 ./client/app3c/.env
#    show 2020-12-13 23:01 ./client/app4c/.env
#    show 2020-12-13 23:37 ./client/app6c/.env
#    show 2021-02-12 19:11 ./client/app6c0/.env
#    show 2021-02-12 21:25 ./client/app6c1/.env
#    show 2021-01-09 01:46 ./client2/app08c/.env
#    show 2021-02-12 17:05 ./server/app1s/.env
#    show 2021-02-10 11:51 ./server2/app01s/.env
#    show 2021-01-23 02:54 ./server2/app05s/.env
#    show 2021-02-13 03:47 ./server2/app06s/.env
#    show 2021-02-09 10:18 ./server2/app07s/.env
#    show 2021-02-09 16:17 ./server2/app08s/.env
#    show 2021-01-23 02:54 ./server2/app21s/.env



#   Size       Date Time        ./*.env*
#----------  ----------------  +-------------------------+---------+---------+----------------------------+
#         52  2020-12-13 23:01  ./client/app2c/.env
#         52  2020-12-13 23:01  ./client/app3c/.env
#         52  2020-12-13 23:01  ./client/app4c/.env
#         52  2020-12-13 23:37  ./client/app6c/.env
#         52  2021-02-12 19:11  ./client/app6c0/.env
#         52  2021-02-12 21:25  ./client/app6c1/.env
#         54  2021-01-09 01:46  ./client2/app08c/.env
#         65  2021-02-12 17:05  ./server/app1s/.env
#         67  2021-02-10 11:51  ./server2/app01s/.env
#         65  2021-01-23 02:54  ./server2/app05s/.env
#         65  2021-02-13 03:47  ./server2/app06s/.env
#         65  2021-02-09 10:18  ./server2/app07s/.env
#         65  2021-02-09 16:17  ./server2/app08s/.env
#         65  2021-01-23 02:54  ./server2/app21s/.env

#   Size       Date Time        ./*.env*
#----------  ----------------  +-------------------------+---------+---------+----------------------------+
#         52  2020-12-13 23:01  ./client/app2c/.env
#         52  2020-12-13 23:01  ./client/app3c/.env
#         52  2020-12-13 23:01  ./client/app4c/.env
#         52  2020-12-13 23:37  ./client/app6c/.env
#         52  2021-02-12 19:11  ./client/app6c0/.env
#         52  2021-02-12 21:25  ./client/app6c1/.env
#         52  2021-02-19 09:13  ./client0/app02c/.env
#         52  2021-02-19 09:13  ./client0/app04c/.env
#         52  2021-02-19 09:13  ./client0/app06c/.env
#         52  2021-02-16 08:38  ./client2/app00c/.env
#         52  2021-02-19 12:09  ./client2/app04c/.env
#         54  2021-01-09 01:46  ./client2/app08c/.env
#         52  2021-02-14 03:40  ./client3/app07c/.env
#         52  2021-02-16 09:22  ./client3/app07c1/.env
#         52  2021-02-16 10:04  ./client3/app07c2/.env
#         65  2021-02-12 17:05  ./server/app1s/.env
#         65  2021-02-19 09:12  ./server0/app01s/.env
#         65  2021-02-19 12:09  ./server2/app01s/.env
#         65  2021-02-13 03:47  ./server2/app06s_v10212/.env
#         65  2021-02-19 13:15  ./server2/app21s/.env
#         67  2021-02-19 12:09  ./server3/app01s/.env
#         67  2021-02-19 12:09  ./server3/app01s.env.bak
#         65  2021-02-19 12:09  ./server3/app05s/.env
#         65  2021-02-19 12:09  ./server3/app06s/.env
#         65  2021-02-19 12:09  ./server3/app08s/.env
#         91  2021-02-19 13:18  ./server3/app09s/.env
#         93  2021-02-19 13:18  ./server3/app21s/.env


