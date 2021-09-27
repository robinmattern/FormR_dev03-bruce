// #!/usr/bin/env node

//          require(      '/webs/vnds1.3/JSs/JScripts_v2.njs' )  // .help(); return


//          require(             './_3/JSs/JScripts_v2.0.njs' )

//          <script src="/webs/vnds1.3/JSs/JScripts_v2.0.njs" type="text/javascript"></script>
//          <script src=  "../../../_3/JSs/JScripts_v2.0.njs" type="text/javascript"></script>

//          --------------  =  ----------------------------------------------------

            TheOffsetHrs    =  4  // 4) EDT, 3)EST, 7)PDT                                                       // .(90614.03.1 RAM Set Default TheOffsetHrs)

  function  shoHelp( ) {
       var  aStr = '\n'
              + '  JScript Utility Functions\n'
              + '  -------------------------------------\n'
              + '  getArg( aKey,  aVal1, aVal2 )\n'
              + '  parse(  aStr1, pRE1,  aStr2 )\n'
              + '  take(   nLen,  aStr )\n'
              + '  mIota(  mMat,  pRE  )\n'
              + '  fmtTS(  nFmt,  nHrs )\n'
              + '  cnum(   aStr   )\n'
              + '  fmtObj( pObj, [nCd]  ) -- nCd: 1) Chop \n'
              + '  say(    aStr,  pVar, [nCd] )\n'
              + '  logIt( aFncLn, aStr, pVar, [nCd] )\n'
              + '  Alert( aStr, aFncLn, pVar,  nCd, bDoit )\n'
              + '  setPage( aDir, aFileName )\n'
              + '  trace( aMsg, bShow )\n'                                 // .(10228.09.1 RAM Added trace doTest)
              + '  doTest( aTest(s) )\n'                                   // .(10228.09.2)

            say( aStr )
            }
//          --------------  =  ----------------------------------------------------

  function  getArg( aKey, aVal1, aVal2 ) {                                  // .(90605.05.1 RAM Beg Use global named TheArgs instead of mArgs)
        if (aKey.match(/reset/i) == 'reset') { delete TheArgs; return }     // .(90605.05.2 RAM Add 'reset' command)
        if (typeof( TheArgs ) == 'undefined' ) {
            TheArgs = (typeof(window) != 'undefined') ? ('?' + window.location.href).split( /[?&]/ ) : process.argv; TheArgs.splice( 0, 2 ) } // .(90604.07.5 RAM Adjust for Windows or Node)
       var  pRE = new RegExp( aKey, 'i' ), iNo = mIota( TheArgs, pRE ), aArg = TheArgs[ iNo ]
//          console.log( "aKey: " + aKey + ", iNo: " + iNo + ", '" + aArg + "'" )
        if (iNo >= 0 ) { TheArgs.splice( iNo, 1 )
                         return aVal1 ? aVal1 : aArg }                      // If aKey is found,     return aVal1 if given, otherwise TheArgs[ aKey ]
    return (typeof(aVal2) != 'undefined') ? aVal2 : ''      // .(90603.04.1 RAM If aKey is not found, return aVal2 if given, otherwise ''
//      if (aVal2    ) { return aVal2 } else { return '' }  //#.(90603.04.1 RAM Returns undefined even if aVal2 is zero or '')
            }
//          --------------  =  ----------------------------------------------------

  function  parse1( aStr,  pRE,  aEnd, bDebug ) {
        if (typeof( pRE  ) == 'string')  { pRE  =        new RegExp( pRE  )      }
        if (typeof( aEnd ) == 'string')  { aEnd = aEnd ? new RegExp( aEnd ) : '' }
            pRE  =  aEnd ? new RegExp( pRE.source + '([\\s\\S]*?)' + aEnd.source ) : pRE                // .(90702.08.2 RAM Just needed [\s\S]*? instead of .*?)
        if (bDebug) { logIt( "parse[1]", "Searching for " + pRE ) }
       var  mFound = (aStr || '').match( pRE ), aStr1 = mFound ? mFound[ mFound.length == 1 ? 0 : 1 ] : ''
        if (mFound) { var nPos = mFound.index,  nLen  = aStr1.length
        if (bDebug) { logIt( "parse[2]", "Found " + nLen + " chars from char " + nPos + " to " + (nPos + nLen ) ) }
        } else {
        if (bDebug) { logIt( "parse[4]", "* Not Found" ); }; return "" }
    return  aStr1
            }

  function  parse( aStr,  pRE,  aEnd, bDebug ) {                                                        // .(90702.08.1 Rewrote parse to accomodate multiple lines)
//          pRE  = aEnd ? pRE + '(.*?)' + aEnd : pRE
        if (typeof( pRE  ) == 'string')  { pRE  =        new RegExp( pRE  )      }
        if (typeof( aEnd ) == 'string')  { aEnd = aEnd ? new RegExp( aEnd ) : '' }
        if (bDebug) { logIt( "parse[1]", "Searching for " + ( aEnd ? '/' + pRE.source + '/ to /' + aEnd.source + '/' : pRE ) ) }
       var  mFound = (aStr || '').match( pRE ), aStr1 = '', nPos, nLen
        if (mFound) { nPos =  mFound.index; aStr1 = mFound[1] ? mFound[1] : mFound[0]
//      if (aEnd)   { pRE  = (typeof( aEnd ) == 'string') ? new RegExp( '[\\s\\S]*?' + aEnd ) : aEnd
        if (aEnd)   { pRE  =  new RegExp( '[\\s\\S]*?' + aEnd.source )
        if (mFound = (aStr.substr( nPos + aStr1.length )).match( pRE )) {
       var  nLen   = (aStr1 = mFound[0]).length; nLen = (aStr1 = aStr1.substr( 0, nLen - pRE.source.length + 8 )).length
        if (bDebug) { logIt( "parse[2]", "Found " + aStr1.length + " chars from char " + nPos + " to " + (nPos + nLen ) ) }; return aStr1
        } else {
        if (bDebug) { logIt( "parse[2]", "Found " + aStr1.length + " chars from char " + nPos + ". Didn't find 2nd match" ); return aStr1 } } }
        if (bDebug) { logIt( "parse[3]", "Found " + aStr1.length + " chars from char " + nPos ) }; return aStr1
        } else {
        if (bDebug) { logIt( "parse[4]", "* Not Found" ); }; return "" }
        if (bDebug) { logIt( "parse[4]", "* Noting to search" ) }; return ""
            }
//          --------------  =  ----------------------------------------------------

  function  take( nLen, aStr, aFill ) { aFill = aFill ? aFill : ' '     // .(90605.07.01 RAM Add Fill char )
//          aStr  = (nLen > 0) ? (aStr +   ' '.repeat( nLen )) : (   ' '.repeat( -nLen ) + aStr )
            aStr  = (nLen > 0) ? (aStr + aFill.repeat( nLen )) : ( aFill.repeat( -nLen ) + aStr )
    return          (nLen > 0) ?  aStr.substr(  0, nLen ) : aStr.substr( aStr.length + nLen )
            }
//          --------------  =  ----------------------------------------------------

  function  mIota(  mMat, pRE ) {
        if (typeof( pRE ) == 'string') { pRE = new RegExp( pRE ) }; var i
       for (i = 0; i < mMat.length; i++) { if (pRE.test( mMat[i] )) { return i } }
            return - ( mMat.length + 1 )  // Has to be 1 for when m.length is 0
            }

  function  mIota1( mArr, pRE ) {
        if (typeof( pRE ) == 'string') { pRE = new RegExp( pRE ) }
//          mArry.each( function( i, aStr ) { if ( aStr   == a      ) { return i } } )
//     for (i = 0; i < mArr.length; i++) { if (mArray[i] == a      ) { return i } }
       for (i = 0; i < mArr.length; i++) { if (pRE.test( mArry[i] )) { return i } }
            return - ( mArr.length + 0 )
            }
//          --------------  =  ----------------------------------------------------

  function  fmtTS( nFmt, nHrs ) {
         // nHrs -> Hrs from GMT time (default: 4 EST, not 3 EDT or 7 PDT)
         // nFmt -> 1:    ymmdd               90523
         //         2:   yymmdd              190523
         //         3: yyyymmdd            20190523
         //         4:    ymmdd-hhnn          90523-1031
         //         5:    ymmdd-hhnnss        90523-103107  (default)
         //         6:   yymmdd-hhnnss       190523-1031-078                                                    // .(90802.04.1 RAM was -07)
         //         7:   yymmdd-hhnnssiii    190523-1031-07899
         //         8: yyyymmdd-hhnnssiii  20190523-1031-07899
       var  d = (new Date((new Date) - (nHrs ? nHrs : TheOffsetHrs) * 60 * 60 * 1000)).toISOString()            // .(90614.03.2 RAM Use Default TheOffsetHrs)
       var  i = ((nFmt || '') + '').match( /[12345678]/ ) ? nFmt - 1 : 5 - 1, j = [11, 11, 13][i-5]
       var  p = [3, 2, 0, 3, 3, 2, 2, 0][i]; var l = [7, 8, 10, 13, 16, 19, 21, 23][i]                          // .(90802.05.2 RAM was 18)
            d =  d.substr( p, l ).replace( /[-:.]/g, '').replace(/T/, '-')
    return  l > 16 ? d.substr(0, j) + '-' + d.substr(j) : d
            }
//          --------------  =  ----------------------------------------------------
/*\
'#SRC      .--------------------+----------------------------------------------+
'    69.631. fmtAmt             |  Format Numeric Amount
'    69.632. fmtDate            |  Format Date and Tim
'#SRC      .--------------------+----------------------------------------------+
\*/
   function  fmtAmt( nAmt, nWdt, nDec ) {                                                           // .(90629.07.1 RAM Make nWdt optional; Add number of decimals)
                     nAmt = String( cnum(nAmt) )
         if ( -1 == (nAmt + '').indexOf('.') ) { nAmt = nAmt + '.00' }
         if (       (nAmt + '').indexOf('.') == (nAmt.length - 2)) { nAmt = nAmt + '0' }
         if (  0 ==  nAmt   ) { nAmt = '  0.00' } else {
         if (100 ==  nAmt   ) { nAmt = '100.00' } else {
         if (100 >   nAmt   ) { nAmt = ' ' + take(8,nAmt) } else nAmt = take(9,nAmt) } }
//           nAmt =  nAmt.replace( /\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,' )                            //#.(90629.07.2 RAM Insert commas).(91014.02.4)

//           nAmt =  nDec == 2 ? nAmt : nAmt.replace( nDec == 1 ? /\d$/ : /\.\d\d/, '')             // .(90629.07.2 RAM 2, 1 or 0 decimals).(91014.02.1 RAM Nice try)
             nAmt =  nDec == 0 ? nAmt.replace( /\.\d*/,        '' ) : nAmt                          // .(91014.02.1)
             nAmt =  nDec == 1 ? nAmt.replace( /(\.\d).+/,   '$1' ) : nAmt                          // .(91014.02.2)
             nAmt =  nDec == 2 ? nAmt.replace( /(\.\d\d).+/, '$1' ) : nAmt                          // .(91014.02.3)

             nAmt =  nAmt.replace( /\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,' )                            // .(91014.02.4 RAM Move to here).(90629.07.2 RAM Insert commas)

     return  nWdt ? take( -nWdt, nAmt ) : nAmt                                                      // .(90629.07.3)
             }

   function  now() { return fmtDate( new Date ) }

   function  fmtDate( aDate, nTyp, n ) {
         if (typeof(aDate) == 'number'  ) { var dt = aDate; aDate = nTyp; nTyp = dt; }              // .(80916.05.1).(10314.05.1 RAM Assign aData too)
         if (typeof(aDate) != 'number' && aDate > '' ) {                                            // .(80916.05.2
         if (aDate instanceof Date && aDate.getTime() ) { aDate = aDate.toISOString() }             // .(10314.05.2 RAM Is this fullproof??)
         if (String(aDate).match( /-[0-9][0-9]T[0-9][0-9]:/ )) {                                    // .(10314.05.3 RAM Added String and [0-9]s)
//           aDate  = aDate.substr( 0,  4 ) + "-" + aDate.substr(  4, 2 ) + "-" + aDate.substr(  6, 2 ) + " "                       //#.(10314.05.4 RAM Wow, so wrong)
//                  + aDate.substr( 9,  2 ) + ":" + aDate.substr( 11, 2 ) + ":" + aDate.substr( 13, 2 ) + "." + aDate.substr( 15 )  //#.(10314.05.4)
             aDate  = aDate.substr( 0, 10 ) + " " + aDate.substr( 11, 8 ) + "." + aDate.substr( 20, 3 )                             // .(10314.05.4 RAM Correct)
             }
        var  dt =  new Date( String( aDate ) ) } else  { dt = new Date( ) }                         // .(60508.05.2
             dt = ( n ) ? new Date( dt.setDate( dt.getDate( ) + n ) ) : dt                          // .(10314.05.5 RAM Do some date arithmatric)
        var  yr =      dt.getYear();     if (yr < 999) { yr = 1900 + yr  } yr += ''
        var  mn = (1 + dt.getMonth());   if (mn <  10) { mn = '0'  + mn  } mn += ''
        var  dy = (0 + dt.getDate());    if (dy <  10) { dy = '0'  + dy  } dy += ''
        var  hr = (0 + dt.getHours());   if (hr <  10) { hr = '0'  + hr  } hr += ''
        var  mm = (0 + dt.getMinutes()); if (mm <  10) { mm = '0'  + mm  } mm += ''
        var  nn = (0 + dt.getSeconds()); if (nn <  10) { nn = '0'  + nn  } nn += ''
        var  ss = (0 + dt.getMilliseconds()); ss = (ss <  10) ? '0'  : String(ss).substr(0,1)       // .(80916.05.3)  // tenth of a second
        var  ms = (0 + dt.getMilliseconds()); ms = (ms <  10  ? '00' : (ms < 100 ? '0' : '' )) + ms // .(90505.05.1)  // millisecond

     switch (nTyp) {
       case  1: return mn + '/' + dy + '/' + yr                                                                  // .(80728.02.1
       case  2: return mn + '/' + dy + '/' + yr             + ' ' + hr.replace(/^0/, ' ') + ':' + mm + ':' + nn  // .(80728.02.2

       case  5: return yr + mn  + dy + '.' + hr + mm + nn                                           //  20040416.041600
//     case  6: return yr + '-' + mn + '-' + dy + 'T' + hr + ':' + mm + ':' + nn                    //  2004-08-20T16:30:47'
       case  6: return yr + '-' + mn + '-' + dy + ' ' + hr + ':' + mm + ':' + nn                    //  2004-08-20T16:30:47'
       case  7: return yr.substr(3) + mn + dy
       case  8: return yr.substr(3) + mn + dy + '.' + hr + mm

       case  9: return yr.substr(3) + mn + dy + '.' + hr + mm + '.' + nn + ' '                      // .(80916.05.4

       case 10: return yr.substr(2) + mn + dy + '.' + hr + mm + '.' + nn + ss                       // .(80916.05.5).(91003.02.3 RAM Removed training ' ')
//     case 11: return yr.substr(3) + mn + dy + '.' + hr + mm + '.' + nn + '.' + ms                 //#.(90505.05.2).(91003.02.4)
       case 11: return yr.substr(2) + mn + dy + '.' + hr + mm + '.' + nn       + ms                 // .(91003.01.2 RAM Removed '.')

       case 12: return                mn.replace( /^0/, ' ' ) + '/' + dy + '/' + yr                 // .(90629.03.4 RAM)
       default: return                mn.replace( /^0/, ' ' ) + '/' + dy + '/' + yr.substr(2,2) + ' ' + hr.replace(/^0/, ' ') + ':' + mm + ':' + nn
         }   }
//          --------------  =  ----------------------------------------------------

  function  cnum( aStr ) {
    return  parseInt( aStr ) || 0
            }
//          --------------  =  ----------------------------------------------------

  function  Alert( aStr, aFncLn, pVar, nCd, bDoit ) { var aMsg = fmtPage( aFncLn, aStr, pVar, true )
        if (typeof( window ) == 'undefined' ) { say( "** Error", "This is not a browser"); logIt( aFncLn, aStr, pVar, nCd ) }
        if (bDoit) { alert( aMsg ) }
//                   alert( aMsg )
            }
//          --------------  =  ----------------------------------------------------

  function  sho( a ) { say( "--------------------"); say( a, eval( global[a] ) ); say("------------------------") }  // .(90605.09.1 RAM Added, but no Workie)

  function  say( aStr, pVar, nCd ) {                                                                                                          // .(90601.02.1 Beg RAM Created)
//      if (aStr) { console.log(        pVar                 ?        fmtTS( 4, 5 ) + " " + fmtPage( "say[ 1]", aStr, pVar, nCd ) : aStr ) }  //#.(90605.08.1)
//      if (aStr) { console.log( typeof(pVar) == 'undefined' ? aStr : fmtTS( 4, 5 ) + " " + fmtPage( "say[ 1]", aStr, pVar, nCd )        ) }  //#.(90605.08.1 RAM What if b is '')
        if (aStr) { console.log( typeof(pVar) == 'undefined' ? aStr : fmtTS( 5    ) + " " + fmtPage( "say[ 1]", aStr, pVar, nCd )        ) }  // .(90614.03.3 RAM Use Default TheOffsetHrs).(90802.04.3 RAM Not for say)
//      if (aStr) { console.log( typeof(pVar) == 'undefined' ? aStr : fmtTS( 6    ) + " " + fmtPage( "say[ 1]", aStr, pVar, nCd )        ) }  //#.(90614.03.3 RAM Use Default TheOffsetHrs).(90802.04.1 RAM Show 10th of a sec)
          else { console.log( "   " ) }
            }                                                                                                                                 // .(90601.02.1 End)
//          --------------  =  ----------------------------------------------------

/*function  logIt( f, a, b ) {                                                                          //#.(90530.05.1 RAM Use new version)
        if (typeof(b) == 'object') { b = fmtObj( b ) }; a = (f || "") + (a ? "  " + a + ": " : (f ? "  " : '') )
        if (a == "" ||  a.substr(0,1) == '\n') { console.log( '' )
        if (a != "" ) { a = a.substr(1) } else { return } }
            console.log( fmtTS( 4, 5 ) + " " + a + (typeof(b) == 'undefined' ? '' : b ) )
            }
//          --------------  =  ----------------------------------------------------
*/
//          console.log( "-----"  )
//          logIt( )                            // -> "             "
//          logIt( "" )                         // -> "             "
//          logIt( " " )                        // -> "             "
//          logIt( "say hey" )                  // -> "say hey"
//          logIt( "\nsay hey" )                // -> "say hey"
//          logIt( "",   "hey" )                // -> "90601-115020 .  hey"
//          logIt( "    ", "hey" )              // -> "90601-115037 .      hey"
//          logIt( "say[1]" )                   // -> "90601-123618 .say[1]   "
//          logIt( "say[1]", "" )               // -> "90601-115203 .say[1]    "
//          logIt( "say[1]", "hey" )            // -> "90601-115227 .say[1]  hey"
//          logIt( "say[1]", "\nhey" )          // -> "             "
//                                              // -> "90601-115357 .say[1]  hey"
//          logIt( "say[1]", "hey", "Willie" )  // -> "90601-172802 .say[1]  hey: Willie"
//          logIt( "say[1]", "hey", "  "     )  // -> "90601-172802 .say[1]  hey:   "
//          logIt( "say[1]", "", "hey Willie")  // -> "90601-172802 .say[1]  hey Willie"
//          logIt( "say[1]", "hey Willie"    )  // -> "90601-172802 .say[1]  hey Willie"
//          console.log( "-----"  )

//function  logIt( f, a, b, c ) {   f = f || ""; a = typeof(a) == 'undefined' ? " " : a                 // .(90530.05.1 RAM Use new version)
  function  logIt( aFncLn, aStr, pVar, nCd ) {
       var  f = aFncLn || "", a = aStr || (f.match( /\]/ ) ? ' ' : f)                                   // .(90601.03.1 RAM Prevent Fnc[ n] from printing)
        if (a == "" ||  a.match( /^\n/ )) { console.log( "             " ); f = f.replace( /^\n/, '')   // .(90601.03.2 RAM If single arg has leading \n)
        if (a != "") {  a = a.substr(1) } else { if (f == "") { return } } }
//          console.log( (a == f) ? a : ( fmtTS( 4, 5 ) + " " + fmtPage( f, a, pVar, nCd ) ) )          // .(90601.03.3 RAM No TS or Fnc[ n] if only one arg)
            console.log( (a == f) ? a : ( fmtTS( 7    ) + " " + fmtPage( f, a, pVar, nCd ) ) )          // .(90701.11.1 RAM 5) hhmmss, 4)default: EST).(90802.04.1 RAM Show 10th of a sec)
            }
//          --------------  =  ----------------------------------------------------

  function  setPage( aDir, aFileName ) {                                                                // .(90531.06.3 RAM Created)
            __filename  = (typeof(__filename) != 'undefined') ? __filename : window.location.href       // .(90703.03.1 RAM Maybe this will avoid the error)
            aFileName   =  aFileName   ? aFileName : __filename                                         // .(90601.02.4 RAM Needs to get obtained from parent)
            aDir        =  aDir == "." ? aFileName.split('/').slice(-2)[0] : aDir
//          console.log( fmtTS( 4, 5 ) + " ./setPage[ 1]  Setting ThePageName for aDir: '" + aDir + "'" )
//   delete aPageName; var pRE = new RegExp( '\/' +  aDir                 + '.+' )                      //#.(90531.05.2 RAM Reset aPageName and ThePageName here).(90601.02.2)
     delete aPageName; var pRE = new RegExp( '\/' + (aDir || '_[12345]/JSs') + '.+' )                   // .(90601.02.2 RAM Set default Dir).(90914.01.1 RAM Was: [34])
//f (typeof(ThePathName)  == 'string') { return }                                                       // .(90530.05.8 RAM Only for client)
            aPath       =  aFileName.replace( /.+nodeapps\//, '' ).replace( /\\/g, '/')                 // .(90601.02.3 RAM If in DOS do as DOSians do)

             aAppName   =  aPath.replace( pRE, '')                                                      // .(90531.05.7 RAM Sniff it)
          ThePageName   =  aPath.replace( aAppName, '').replace(/.n?j./, '');                           // .(91223.05.1 RAM)
//          console.log(  "setPage[ 1]  aDir: '"        + aDir + "'" )
//          console.log(  "setPage[ 2]  aPath: '"       + aPath + "'" )
//          console.log(  "setPage[ 3]  aAppName: '"    + aAppName + "'" )
//          console.log(  "setPage[ 4]  ThePageName: '" + ThePageName + "'" )
//          console.log(   fmtTS( 4, 5 ) + " ./setPage[ 2]  Set ThePageName to '" + ThePageName + "'" )
    return  aAppName                                                                                    // .(90602.07.3 RAM Return aAppName)
            }

  function  fmtPage( f, a, b, c ) {                                                                       // .(90530.05.2 RAM Break this out)
            ThePageName = (typeof( ThePageName ) == 'undefined') ? '' : ThePageName                       // .(90601.02.4 RAM Catch if it is an MT stgring)
        if (ThePageName == '')  {  setPage( '.' )  }                                                      // .(90601.02.5 RAM A last resort: '-': just .say, '.': full page, '': _3/JSs/JScripts_vY)
       var  bShowData   =  typeof( bShowData ) != 'undefined' ? bShowData :  0, k = ": "                  // .(90703.02.1)
       var  aPageName   =  typeof( aPageName ) != 'undefined' ? aPageName :  ThePageName + "."            // .(90530.02.3 RAM Use it here)
        if (a.match( /\n$/ )) { a = a.replace( /\n$/, ''); k = ":\n" }                                    // .(90703.02.2 RAM Allow \n after label)
        if (typeof(b) == 'object') { b = ( bShowData || c > 0 ) ? fmtObj( b, c ) : "[object]" }
                              else { if (typeof(b) == 'undefined') { b = " ", k = "" } }                  // .(90703.02.2 RAM Don't show '' if undefined)
//  return  aPageName + (f || "") +  (a ? "  " + a + ": " : (f ? "  " : "") ) + (b ?        b   : "" )
//  return  aPageName + (f || "") +  (a ? "  " + a        :             ""  ) + (b ? ": " + b   : "" )    //#.(90601.02.6 RAM Some simplification, and we get rid of trailing ':').(90601.02.7)
//  return  aPageName + (f || "") + "  " + ( a ? a + ": " : "" ).replace( /^[ :]+/, "" ) + (b ? b : ""  ) //#.(90601.02.7 RAM Oh, well more complexity to get rid of leading  ':').(90605.08.2)
    return  aPageName + (f || "") + "  " + ( a ? a +  k   : "" ).replace( /^[ :]+/, "" ) + (b ? b : "''") // .(90605.08.2 RAM Show MT string with quotes. Why?).(90703.02.3 RAM Added k)
//  return  aPageName + (f || "") + "  " + ( a ? a + ": " : "" ).replace( /^[ :]+/, "" )                  //#.(90605.08.3)
//                                       + ( b ? ( typeof(b) == 'string' ? "'" + b + "'"  : b ) : "" )    //#.(90605.08.3 RAM Format string with quotes, but b is also fmtObj(b) )
            }
//          --------------  =  ----------------------------------------------------

  function  fmtObj( pObj, nCd ) {                                                                         // .(90530.05.3 RAM Note two versions for client & server)
        if (typeof( window ) == 'undefined') {
       var  aObj =  require( 'util' ).inspect( pObj ) }
          else {
       var  aObj =  JSON.stringify( pObj ).replace( /","/g, '"\n ,"' ).replace( /},{/g, '}\n,{' ) }
//  return  aObj.split( '\n' ).join( '\n    ')
//  return  '  '  +  aObj.replace( /[\n]/g, '\n  ' )
//  return  nCd == 1 ?            aObj.replace( /[\n] */g,  " " ) : "\n" + aObj // .replace( /[\n]/g, "\n  " )  //#.(90614.04.1)
    return  nCd == 1 ? take( 105, aObj.replace( /[\n] */g,  " " ) ) + ( aObj.length > 105 ? "..." : "" )        // .(90614.04.1 RAM Don't print it all)
                     : `\n${aObj}`.replace( /[\n]/g, "\n".padEnd( nCd ) )                                       // .(10401.02.1 RAM Added padEnd( nWdt )
            }
//          --------------  =  ----------------------------------------------------

  function  trace( aMsg, bShow ) {
        if (Number.isInteger( aMsg )) { [ aMsg, bShow ] = [ bShow || '' , aMsg ? aMsg : 0 ] }                   // .(10303.04.1 RAM if undefined use 1st arg ?? )
        if (String(aMsg).match( /setProj.*/i )) { TheProject = String(bShow); return }                          // .(10301.01.2 RAM Set for parsing functino stall stack)
        if (String(aMsg).match( /setShow.*/i )) { bQuiet     = String(bShow).match( /false|0/i ) != null; return }    // .(10303.01.1 RAM).(10303.12.1 RAM Gotta use String()).(10315.03.1 RAM Was bShow == false )
            bQuiet =  typeof(bQuiet) !=  'undefined' ? bQuiet : false;
            ThePrj =  typeof(ThePrj) !=  'undefined' ? ThePrj : 'FormR'
       if ((bQuiet == true || bShow == 0) && (bShow != -1)) { return }

       let  aError =  new Error();
//     let  mStack =  aError.stack.split( '\n' )
       let  mStack =  aError.stack.split( '\n' ).filter( aLine => aLine.match( TheProject ) != null )
        if (mStack.length == 0) { console.log( ` ** trace() The project name, '${TheProject}', is not set correctly.`); return } // .(.(10301.01.2)
//     let  frame  =  aError.stack.split("\n")[2];
       let  mLine  =  mStack[1].replace( /^ *at /, '' ).split(" ");
       let  aName  =  mLine.length > 1 ? mLine[0] : '';
       let  aLine  =  mLine[ aName ? 1 : 0 ].substr(4).split( ':' )[1].padStart( 3 )                            //              substr(4) gets rid of (*c:\\
       let  aFile  =  mLine[ aName ? 1 : 0 ].replace( /.+[\\\/]/, '').replace( /:.+/, '')                       // .(10228.10.1 RAM Added aFile)
            aName  = (aName == 'Object.<anonymous>') ? aFile : `${ aFile.replace( /\.n*js/, '' ) }.${aName}`    // .(10228.10.2)
            aName  =  aName ? aName.padEnd( 0 ) : "<anonymous> "                                                // 12 or 0 leaves no space before aLine
       let  aTrace = (" ".padEnd( 2 * (mStack.length - 1), " ." ) + aName + "[" + aLine + "]  ").padEnd( 60 )
            aMsg   = ( aMsg ? aMsg : '' ); if (aMsg.match( /^\n/)) { aTrace = `\n${aTrace}`; aMsg = aMsg.replace( /^\n/, '' ) } // .(10305.05.1 RAM If aMsg has a leading \n)
            console.log( aTrace.replace( /Object\./, '' ) + aMsg )                                              // .(10329.04.1 RAM Remove Object. from function name)
            }
//          --------------  =  ----------------------------------------------------

  function  doTest( nTest, aFilename ) { var nDoTests1
       var  bNotTesting  = (aFilename ? aFilename : __filename) != process.mainModule.filename                  // .(10301.04.6 RAM if parent script is not called by another)
        if (bNotTesting || typeof( nDoTests ) == 'undefined') { nDoTests1 = nDoTests = ',,' }                   // .(10305.04.1 RAM ie we are be performing a test if nDoTests exists)
     else { nDoTests1 = ',' + nDoTests + ',' }; nTest = String(nTest)
        if (nTest.match( /[ ,]/ )) { nDoTests1 = `${nTest}`; nTest = nDoTests }                                 // .(10303.014.1 RAM Switch if )                                                           //                  if aTests contain nTest
    return  nDoTests1.match( `,${nTest},` )
            }
//          --------------  =  ----------------------------------------------------

  function  shoRoutes( pApp, aShoEm, nWdt ) {                                                                   // .(10326.04.1 RAM Ad nWdt arg)
            nWdt       = `${aShoEm}`.match( /[0-9]+/) ? aShoEm : ( nWdt ? nWdt : 40)                            // .(10326.04.2)
        if (String(aShoEm).match( /false|0/i )) { return }                                                      // || ! require( 'fs' ).existsSync( '../../server/node_modules/express-list-endpoints' ) ) { return }

//     var  aModDir    = (typeof(APP_DIR) == 'undefined')  ? ''
//                     : `${BRANCH_HOME}/${ APP_DIR.split( '/' )[0] }/node_modules/`                            // .(10305.02.1 RAM Gotta get server or client folder name)
       var  nDepth     =    APP_HOME.match( /FR.app02s/ ) ? 2 : 1                                                    // .(10328.05.5 RAM Jeese Louise to the 4th!)
       var  aModDir    = `${APP_HOME.split( /[\\/]/ ).slice( 0, -nDepth ).join('/')}/node_modules`              // .(10328.05.6)
//ry { var  listRoutes =  require( '../../server/node_modules/express-list-endpoints' ) } catch(e) {            // .(10224.02.1 RAM Bruce doesn't have it loaded).(10301.14.1 RAM Moving it here requires a different path)
//ry { var  listRoutes =  require( 'express-list-endpoints' ) } catch(e) {                                      // .(10305.02.1 RAM Left over from testing if it exists with pFS.existsSync).(10328.05.6 RAM Probably OK now)
 try { var  mRoutes    =  require( `${aModDir}/express-list-endpoints` )( pApp ) } catch(e) {                   // .(10305.02.1.(10323.02.1 RAM Was listRoutes = require())
            console.log( " ** The module, express-list-endpoints, is not installed");                           // .(10224.02.1 RAM Above no working because it running in Master folder)
            return }
            console.log( "\n" + mRoutes.map( pRoute => fmtRoute( pRoute ) ).join( "\n" ) )                      // .(10323.02.2 RAM Was listRoutes( pApp))

  function  fmtRoute( pRoute ) {
       var  aRoute =  pRoute.path, aStr = '', i=0
            pRoute.middleware.map( aController => {  // aMiddle ?                                               // .(10323,02.3 RAM He uses the same middleware name for each method. S.B. different for each)
            pRoute.methods   .map( aMethod => { var aRoute2 = `${aRoute} ${ aController}`
//          aStr  += `\n    ${ aMethod.padEnd( 6 ) } ${ aPath.padEnd( 30 ) } ${ aMiddle } (${ i++ })` } )
            aStr  += `\n    ${ aMethod.padEnd( 6 ) } ${ aRoute.padEnd( nWdt ) } ${ aController } (${ i++ })` }) // .(10326.04.3)
            } )
     return aStr.substr(1) // + "\n"
            } }
//          --------------  =  ----------------------------------------------------

  function  setAppDirs( aDirName ) { // trace()                                         // .(01012.01.2 Beg).(10303.02.1 RAM Moved to JScript.njs).(10317.04.1 RAM Split out setAppDirs function)

        if (typeof( aDirName ) == 'undefined' ) {                                       // .(10301.11.1 RAM __dirname is not in v10.12+).(10316.12.1 Beg RAM Do it here)
//    var __dirname  =  path.dirname( __filename );
//    var __dirname  =  path.resolve( path.dirname( decodeURI( new URL( import.meta.url).pathname ) ) );
//        __dirname  =  require('path').resolve( path.dirname( '' ) );
//    var   aError   =  new Error; aDirName = aError.stack.split( '\n' )          [2].replace( /.+\(/, '' ).split( /[\\/]/).slice(0,-1).join('/')
//    var   aError   =  new Error; aDirName = aError.stack.split( '\n' ).slice(-1)[0].replace( /.+\(/, '' ).split( /[\\/]/).slice(0,-1).join('/')
      var   mErrors  = (new Error).stack.split( '\n' )
//          aDirName =  mErrors.slice(-1)[0].match( /node:internal/  ) ? mErrors[2] : mErrors.slice(-1)[0]  // .(10317.04.1 RAM Don't know why this is there sometimes)
            aDirName =  mErrors[2].match( /[\\/](api|src|server).*/i ) ? mErrors[2] : mErrors.slice(-1)[0]  // .(10317.04.1 RAM Don't know why this is there sometimes)
            aDirName =  mErrors[3].match( /[\\/](api|src|server).*/i ) ? mErrors[3] : aDirName              // .(10317.04.1 RAM Last try)
            aDirName =  aDirName.replace( /.+\(/, '' ).split( /[\\/]/ ).slice(0,-1).join( '/' )             // .(10317.04.1 RAM The calling dir ??)
            }                                                                           // .(10316.12.1 End)
//          --------------  =  ---------------------------------------

        if (typeof(APP_NAME) == 'undefined') { APP_HOME =  ''; APP_NAME = '' }          // .(10318.02.6 RAM Good grief)
//     var  aApp     =  aDirName.split(   /[\\\/]/ ).splice( -4, 4 ).join( '/' )        //#.(10303.02.3 RAM Let get it from __DirName)
//          aDirName =  aDirName.replace( /[\\/](api|src).*/i, '')                      //#.(10317.03.1 RAM Peel back to before /api or /src).(10318.02.1)
//          aDirName =  aDirName.replace( /[\\/](api|src|_4).*/i, '')                   //#.(10317.03.1 RAM Peel back to before /api or /src).(10318.02.1 RAM or _4)
            aDirName =  aDirName.replace( /[\\/](api|src).*/i, '')                      // .(10317.03.1 RAM Peel back to before /api or /src).(10318.02.1 RAM or _4).(10328.04.x RAM Why _4)
       var  nDepth   =  aDirName.match( /FR.app02s/ ) ? 3 : 2                                // .(10328.05.1 RAM Jeese Louise cubed!)
       var  aAppName =  aDirName.split(   /[\\/]/ ).slice( -nDepth ).join( '/' )   // .(10316.12.2 RAM Just set serverN/appNN*).(10328.05.2)
            aAppName =  aAppName.replace( /master[\\/]/i, '' )                          // .(10318.02.2)
//      if (aAppName.match( /server.+[\\/]app/    )) {                                  //#.(10317.03.2).(10318.02.2)
//      if (aAppName.match( /server.+([\\/]app)*/ )) {                                  // .(10318.02.3 RAM Jeese Louise)
        if (aAppName.match( /server.+([\\/]app)*/ ) || nDepth == 3) {                   // .(10318.02.3 RAM Jeese Louise).(10328.05.3 RAM Added FR.app02s. Jeese Louise is right)
            APP_NAME = aAppName; process.env.APP_NAME  = aAppName                       // .(10303.02.1 RAM Needed APP_NAME here. Save it!)
            APP_HOME = aDirName; process.env.APP_HOME  = aDirName                       // .(10316.12.3 RAM Save APP_HOME too!)
          __dirname  = aDirName; process.env.__dirname = aDirName                       // .(10303.02.4 RAM Save it too!).(10316.12.4)
        } else {
//          console.log( `  * App, ${aAppName}, is Not an App.` )                       // .(10317.03.3)
            }
            FORMRs_4 = `${ aDirName.replace( /[\\/]app[0-9]+[sc][0-9]*/i, '' ) }/_4/FR.fns02s/` // .(10317.01.1 RAM Server's Home if dynamically assigned).(10327.02.1 RAM Allow for trailing no: e.g. app08s1)
                      if ( aDirName.match(   /_4/ ) ) {                                    // .(10331.02.1 RAM Will we ever get it right)
            FORMRs_4 = `${ aDirName.replace( /_4[\\\/]FR.app02s/, '_4/FR.fns02s/' ) }` }             // .(10331.02.2)
            }
//          --------------  =  ----------------------------------------------------

  function  setEnv(     aDirName ) {                                                    // .(10317.04.2)
        var pFS      =  require( 'fs' )                                                 // .(10319.07.1)
            setAppDirs( aDirName )                                                      // .(10317.04.3)
//     if (!process.env.PORT) {                                                         // .(10317.04.4)
//     var  aAppDir  =  aApp.split( '[\\/]' ).splice( -2, 2 ).join( '/' )               //#.(10303.02.5).(10317.04.5)
//     var  mEnv     =  require( 'fs' ).readFileSync( `${aDirName}/../../${aAppDir}/.env`, 'ASCII' ).split( '\n' )  // .(10317.04.6)

       var  aEnvFile =  pFS.existsSync( `${APP_HOME}/.env` ) ? `${APP_HOME}/.env` : `${FORMRs_4}.ENV`  // .(10319.07.2 RAM Get it here is exists)
//try{ var  mEnv     =  require( 'fs' ).readFileSync( `${APP_HOME}/.env`, 'ASCII' )                    //#.(10317.04.6).(10319.07.3)
  try{ var  mEnv     =  pFS.readFileSync( aEnvFile, 'ASCII' )                                          // .(10317.04.6).(10319.07.3)
            mEnv.split( '\n' ).map( aEnv => { if (aEnv) { var v = ( aEnv + '=' ).split( '=' );
//          process.env[ v[0] ] =           v[1].replace( /\r/, '' )   } } )            //#.(10315.04.1)
            process.env[ v[0] ] = chkRegEx( v[1].replace( /\r/, '' ), v[0] ) } } )      // .(10315.04.1 RAM Do it here, Save it in process, not process.env, which is a string)
//          }                                                                           //#.(01012.01.2 End).(10317.04.1)
   } catch( e ) { console.log( " ** File, .env, Not Found." ) }
     return APP_HOME                                                                    // .(10316.12.2 RAM)
            }
//          --------------  =  ----------------------------------------------------

  function  chkRegEx( aRE, aVar ) {                                                     // .(10218.04.1 Beg RAM)
        if (aRE.match( /^\// )) {
            process[ aVar ] = new RegExp( aRE.substr(1).replace( /\/$/, '' ) )
    return  process[ aVar ]
        } else {
    return  aRE;
        }   }                                                                           // .(10218.04.1 End)
//          --------------  =  ----------------------------------------------------

//          sndAPI_2( 'get', "http://localhost:50416/api/formr/users" )

// function onSuccess( pBody ) { console.log( "response", pBody ) }
// function onFailure( pErr  ) { console.log( "error",    pErr  ) }

//      -----------  =   ----------------------------

 async function sndAPI_3( aMethod, aURL, pData, aToken, xNext ) {                                               // .(10402.05.1 Beg RAM Can we return real data, i.e. a Promise)

       var  xAJAX3     =  require( './request3.njs' )
var pReq =  sndAPI(       aMethod, aURL, pData, aToken, xNext ) 

                          onSubmit(  pReq, xNext )
           try {    
var pRes = await xAJAX3(  pReq )
                          onSuccess( pRes, xNext ) 
          return pRes 
        } catch( pErr ) { onFailure( pErr, xNext ) } 

            } // eof sndAPI3                                                                                    // .(10402.05.1 End)
//      -----------  =   ----------------------------

  function  sndAPI_2( aMethod, aURL, pData, aToken, xNext ) {
       var  xAJAX2 =  require( './request3.njs' )
var pReq =  sndAPI(   aMethod, aURL, pData, aToken, xNext ) 
            onSubmit( pReq, xNext )
//          xAJAX2(  pReq ).then( onSuccess ).catch( onFailure )                                                //#.(10402.06.1)        
            xAJAX2(  pReq ).then(  pRes => onSuccess( pRes, xNext ) )                                           // .(10402.06.1 RAM Have to pass xNext)        
                           .catch( pErr => onFailure( pErr, xNext ) )                                           // .(10402.06.1)        
            }// eof sndAPI_2                                                                                    // .(10402.06.1 RAM Don't include sub functions)        
//      -----------  =   ----------------------------

 function  onSuccess( pResponse, xNext ) {                                                                      // .(10402.06.2 RAM Added xNext)
        if (typeof(xNext) != 'function') {
        if (typeof( pResponse.body ) != 'string') {
        var mRecs = pResponse.body.length ? pResponse.body : [ pResponse.body ]      
        var aRecs = pResponse.body.length ? mRecs.length : ' ' 
            console.log( ` Response.body: [${aRecs}]${ fmtObj( mRecs[0], 6 ) }`);
        } else {
            console.log( " Response.body\n:" + pResponse.body.replace( /[\\]+/g, '\\' ) ); }
        if (pResponse.headers) {
            console.log( " Response.headers:" + fmtObj( pResponse.headers, 6 ) ); }
        } else {  
            xNext( '', pResponse, '' ) }
            } // eof onSuccess
//      -----------  =   ----------------------------

  function  onFailure(  pError, xNext ) {                                                                       // .(10402.06.3 Added xNext)
        if (typeof(xNext) != 'function') {
//          throw new Error( pError );
            console.log( "Response.error:" + fmtObj( pError, 6 ) ); 
        } else { 
            xNext( pError, '', '' ) }
            } // eof onFailure
//      -----------  =   ----------------------------
//          } // eof sndAPI_2                                                                                   //#.(10402.06.1)
// ----- ----------  =    ---------------------------------------------------------
            
  function  sndAPI_1( aMethod, aURL, pData, aToken,   xNext ) {
       var  xAJAX1 =  require( 'request' ), pRequest
       var  pReq   =  sndAPI(  aMethod, aURL, pData, aToken, xNext ) 
            onSubmit( pReq, xNext )
            xAJAX1(   pReq, onComplete )

//      -----------  =   ----------------------------

  function  onComplete( pError, pResponse, pBody ) {
        if (typeof(xNext) != 'function') {
        if (pError) { onFailure( pError )
        } else      { onSuccess( pResponse.body, pResponse ) }
        } else xNext( pError, pBody, '' )
            }  // onComplete
//      -----------  =   ----------------------------

            } // eof sndAPI_1  
// ----- ----------  =    ---------------------------------------------------------

  function  onSubmit( pReq, xNext ) {
        if (typeof(xNext) != 'function') {
            console.log( "-------------------------------------------------------------------" ); console.log( "" )
            console.log( " Request.url:\n     "  +  `${ pReq.method } ${ pReq.url }` );
        if (pReq.headers) {
            console.log( " Request.headers:"  + fmtObj( pReq.headers, 6 ) ); }
        if (pReq.json) {                                                                // .(10402.04.6 RAM Not sure if this is the best way)
            console.log( " Request.data:"     + fmtObj( pReq.json,    6 ) );            // .(10402.04.7 Beg)
        } else {                                                                        
        if (pReq.data) {
            console.log( " Request.data:\n     " +      pReq.data         ); }
//          console.log( " Request.data:"     + fmtObj( pReq.data,    6 ) ); }          //#.(10402.04.8)      
            }                                                                           // .(10402.04.7 End)
        } else {
            xNext( pReq.headers, pReq.data, `${ pReq.method} ${pReq.url}` )
            }
        }
//      -----------  =   ----------------------------

  function  sndAPI(   aMethod, aURL, pData, aToken,   xNext ) {

       var  pHeaders = {   'cache-control'    : 'no-cache' }

        if (aToken) {
            pHeaders[      'x-access-token' ] =  aToken
            }
        if (aMethod.match( /GET|DELETE/i  ) ) {
            aURL     =   `${aURL}${ pData ? '/' + pData : '' }`
       var  bJSON    =      false
       var  aData    =     ''                                                           // .(10402.04.1)
            }
        if (aMethod.match( /POST|PUT/i ) ) {
       var  aData    =      JSON.stringify( pData )                                     // .(10402.04.2 RAM Assuming pData is always in JSON format)
            pHeaders[      'content-type'   ] = 'application/json'
            pHeaders[      'content-length' ] =  aData.length                           // .(10402.04.3 RAM Gotta send length)
       var  bJSON    =      true
            }
        if (aMethod.match( /PUT/i ) && pData && pData.id ) {
            aURL     =   `${aURL}${ pData.id }`
            delete          pData.id
            }
     return pRequest = 
             {  method          :  aMethod
             ,  url             :  aURL
             ,  headers         :  pHeaders
             ,  data            :  aData // pData                                       // .(10402.04.4 Change to aData)                                                // .(10402.04.4)
             ,  json            :  bJSON ?  pData : ''                                  // .(10402.04.5)
                }
//          -------  =   ---------------------
         } // eof sndAPI 
//       ----------  =   ----------------------------
//--------  --------------  =  ------------------------------------------------------------------------------------

      ; ( ( aFns ) => {

            setAppDirs()                                                                                                                                                            // .(10317.03.4 Run setEnv even if ..)
            BRANCH_HOME     =  process.env.FORMR_HOME                                                                                                                            // .(10317.03.5)
                                                                                                                                                                   // .(90601.03.1 RAM Beg Look Ma, no global vars ...)
       var  aGlobal = (typeof( window ) == 'undefined') ? 'global' : 'window'
            aFns.split( ' ' ).forEach( g => { eval( aGlobal + '["' + g + '"] = ' + g ) } )
//    { ... } )( 'getArg parse mIota take cnum say         setPage logIt fmtTS                fmtObj Alert' )                                                                    //#.(90601.04.1 RAM End ... just these fns).(90605.09.2)
//    { ... } )( 'getArg parse mIota take cnum say sho     setPage logIt fmtTS                fmtObj Alert' )                                                                    //#.(90605.09.2 RAM Added sho).(90629.03.1)
//    { ... } )( 'getArg parse mIota take cnum say sho now setPage logIt fmtTS fmtDate fmtAmt fmtObj Alert' )                                                                    //#.(90629.03.1 RAM Added fmtDate, fmtAmt, now)
//    { ... } )( 'getArg parse mIota take cnum say sho now setPage logIt fmtTS fmtDate fmtAmt fmtObj Alert trace doTest' )                                                       //#.(10228.09.2)
//    { ... } )( 'getArg parse mIota take cnum say sho now setPage logIt fmtTS fmtDate fmtAmt fmtObj Alert trace doTest shoRoutes                      __dirname __filename' )   //#.(10228.09.2).(10317.03.6)
            } )( 'getArg parse mIota take cnum say sho now setPage logIt fmtTS fmtDate fmtAmt fmtObj Alert trace doTest shoRoutes APP_HOME BRANCH_HOME __dirname __filename' )   // .(10317.03.6)

            module.exports =
             {  help       : shoHelp
             ,  Help       : shoHelp
//           ,  shoRoutes  : shoRoutes
             ,  setEnv     : setEnv
             ,  sndAPI     : sndAPI_2
                }
//          module.exports =   shoHelp

//--------  --------------  =  ------------------------------------------------------------------------------------

//          nDoTests = '1,2'  // 'test2,test3'                                                                  // .(10301.04.1)
//          nDoTests =  1     // 'test1'                                                                        // .(10301.04.2)

        if (process.mainModule.filename != __filename) { return }                                               // .(10301.04.3)
//      if (parse( typeof(aTests) == 'undefined' ? '' : aTests, 'test1' )) { .. }
//      if (typeof(aTests) != 'undefined' && aTests.match(/test1/)) {                                           //#.(10301.04.4)
        if (doTest( 1 )) {                                                                                      // .(10301.04.4)

            aStr1 = 'The quick brown fox jumped over the lazy dog'
            aStr2 = 'The quick brown\n fox jumped \nover the lazy dog'

            say( )
            say( "aStr", "'" + aStr2 + "'" )
            say( )
            say( "parse[5]  parse( aStr, 'quick', 'lazy' )", "'" + parse( aStr2, 'quick',                  'lazy', 1 ) + "'" ); say()
            say( "parse[5]  parse( aStr, /quick.*?fox/   )", "'" + parse( aStr1, 'quick.*?fox',            '',     0 ) + "'" ); say()
            say( "parse[5]  parse( aStr, /quick(.*?)fox/ )", "'" + parse( aStr1, 'quick ([\\s\\S]*?) fox', '',     1 ) + "'" ); say()
            say( "parse[5]  parse( aStr, 'quick ', ' fox')", "'" + parse( aStr1, 'quick ',                 ' fox', 1 ) + "'" ); say()
            say( "parse[5]  parse( '.',  'quick'         )", "'" + parse( ".",   'quick'                             ) + "'" )
            say( "parse[5]  parse( '',   'quick'         )", "'" + parse( "",    'quick'                             ) + "'" )
            say( "parse[5]  parse( aStr, 'quick fox'     )", "'" + parse( aStr1, 'quick fox',              '',    0  ) + "'" )
            say( "parse[5]  parse( aStr, /Quick/i        )", "'" + parse( aStr1, /Quick/i                            ) + "'" )
            say( )
            say( "mIota( aStr.split(' '), 'fox'  )",     take( -2, mIota( aStr.split(' ') , 'fox'  ) ) )
            say( "mIota( aStr.split(' '), 'Fox'  )",     take( -2, mIota( aStr.split(' ') , 'Fox'  ) ) )
            say( "mIota( aStr.split(' '), /Fox/i )",     take( -2, mIota( aStr.split(' ') , /Fox/i ) ) )
            say( )
            say( "take(  5,'a'   )"              , "'" + take(  5,"a"   ) + "'" )
            say( "take( -5, aStr )"              , "'" + take( -5, aStr ) + "'" )
            say( "take(-50, aStr )"              , "'" + take(-50, aStr ) + "'" )
            say( )
            }

//      if (parse( typeof(aTests) == 'undefined' ? '' : aTests, 'test2' )) {                                    // .(10301.04.4)
        if (doTest( 2 )) {                                                                                      // .(10301.04.4)
            mArr = [1,2,3]; pObj = { Obj: { a: 'a', n: 1, o: '' }, Arr: mArr, Willie: "Mays" }

            say( )                              // -> "\n   "
            say( "" )                           // -> "\n   "
            say( " " )                          // -> "\n "
            say( "hey" )                        // -> "hey"
            say( "\nhey" )                      // -> "\nhey"
            say( "", "hey"  )                   // -> "   "
            say( " ", "hey" )                   // -> "90601-131311 .say[ 1]   : Willie"
            say( "hey1", "Willie" )             // -> "90601-131153 .say[ 1]  hey1: Willie"
            say( "hey2",  mArr    )             // -> "90601-131458 .say[ 1]  hey2: [object]"
            say( "hey2",  mArr, 1 )             // -> "90601-131458 .say[ 1]  hey2: [ 1, 2, 3 ]"
            say( "hey2",  mArr, 2 )             // -> "90601-131458 .say[ 1]  hey2:\n[ 1, 2, 3 ]"

          logIt( )                              // -> "\n             "
          logIt( "" )                           // -> "\n             "
          logIt( " " )                          // -> "\n             "
          logIt( "say hey" )                    // -> "say hey"
          logIt( "\nsay hey" )                  // -> "\n             say hey"
          logIt( "say[ 1]", "hey" )             // -> "90601-130531 .say[ 1]  hey"
          logIt( "say[ 1]", "\nhey" )           // -> "\n             90601-130609 .say[ 1]  hey"
          logIt( "say[ 1]" )                    // -> "90601-130631 .say[ 1]   "
          logIt( "say[ 1]", "hey3"  )           // -> "90601-130701 .say[ 1]  hey3"
          logIt( "say[ 1]", "hey4", "Willie" )  // -> "90601-130729 .say[ 1]  hey4: Willie"
          logIt( "say[ 1]", "hey5",  pObj    )
          logIt( "say[ 1]", "hey5",  pObj, 1 )
          logIt( "say[ 1]", "hey5",  pObj, 2 )

          say( "\n\n" )
          Alert( "\nhey" )
          Alert( "hey6" )
          Alert( "hey7", "say[ 1]" )
          Alert( "hey8", "say[ 1]", "Willie" )
          Alert( "hey9", "say[ 1]",  pObj    )
          Alert( "hey9", "say[ 1]",  pObj, 1 )
          Alert( "hey9", "say[ 1]",  pObj, 2 )
          }

//      if (parse( typeof(aTests) == 'undefined' ? '' : aTests, 'test3' )) {                                    //#.(10301.04.5)
        if (doTest( 3 )) {                                                                                      // .(10301.04.5)
            logIt( "JSCripts[ 9]", "\n*** There is no 'test3'. Try 'test2'" )
            }
