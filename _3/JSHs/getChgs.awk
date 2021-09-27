BEGIN{ }

/# .\(/ { aChgNo = $2
          aDate  = $3
          aUID   = $4
          aTime  = sub( "|", "", $5)
          aNote  = substr($0, 33,56)
          aFile  = FILENAME; sub( /\.\.\//, "", aFile ); # sub( ".*/", "", aFile )

          printf " | %10s | %-56s | %s\n", aChgNo, aNote, aFile
#         printf " %-89s %s\n", $0, aFile
          }

# .(10212.03  1/12/21 RAM  8:00a| pUsers must be global
# | .(10123.02 | Keep sendError_InvalidRoute in server.js | server_app_v01.js
# .(10123.01  1/23/21 RAM  5:26p| Moved app to seperate file                              server_app_a14.njs