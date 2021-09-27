 BEGIN { aFile = FILENAME; } # sub( /\.env/, "", aFile ) }
#BEGIN { aFile = "ereenv"; } # sub( /\.env/, "", aFile ) }

  /PORT=/               { sub( /^.+=/, "" ); aPORT  = $0 }
  /DBSN=/               { sub( /^.+=/, "" ); aDBSN  = $0 }
  /DBSN_/               { sub( /^.+=/, "" ); aDBSN2 = $0 }
  /CORS_CLIENT_URL=/    { sub( /^.+=/, "" ); aURL   = $0 }
  /REACT_APP_API_URL=/  { sub( /^.+=/, "" ); aURL   = $0 }

#END   { printf "%-20s %5s %-15s %-15s %s\n", aFile, aPORT, aDBSN, aDBSN2, aURL }
 END   { printf       "%5s %-15s %-15s %s\n",        aPORT, aDBSN, aDBSN2, aURL }

