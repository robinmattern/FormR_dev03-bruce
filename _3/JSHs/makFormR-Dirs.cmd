@echo off

 set aJSHs="../_2/JSHs/FormR"

 set aToFile=./.vscode/launch.json
 set aToFile=CON

:                                    Type  Stage  App(s) Name   Prj
:                                    ----  -----  ------ ----- ------
:bash   "%aJSHs%/makFormR-dirs.sh"     %1   %2    %3
:bash   "%aJSHs%/makFormR-dirs.sh"      3    3           Bruce-dev03

   cd    Bruce-dev03

:bash "../%aJSHs%/makFormR-CS-dirs.sh"  3    3    12345
:bash "../%aJSHs%/makFormR-CS-dirs.sh"  3    3    1
:bash "../%aJSHs%/makFormR-CS-dirs.sh"  3    3    3
:bash "../%aJSHs%/makFormR-CS-dirs.sh"  3    3    4
 bash "../%aJSHs%/makFormR-CS-dirs.sh"  3    3    5


:bash "../%aJSHs%/makLaunch-json.sh"    3  dev03  1      world  50    >%aToFile%
:bash "../%aJSHs%/makLaunch-json.sh"    3  dev03  3      rauth  50   >>%aToFile%
:bash "../%aJSHs%/makLaunch-json.sh"    3  dev03  4      admin  50   >>%aToFile%
 bash "../%aJSHs%/makLaunch-json.sh"    3  dev03  5      formr  50   >>%aToFile%

