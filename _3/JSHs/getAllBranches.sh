#!/bin/sh

   aGit=https://github.com/benawad/react-formik-example.git
   aMsg=
   aDir=Dev02

   aGit=https://github.com/benawad/basic-react-form.git
   aMsg=!_basic-react-form, material-ui_v0 by Ben Awad
   aDir=Dev03

   aGit=https://github.com/benawad/react-typescript-material-ui-form.git
   aMsg=!_basic-react-form, material-ui_v1, typescript by Ben Awad
   aDir=Dev04

   aGit=https://github.com/benawad/react-typescript-material-ui-form.git
   aMsg=!_basic-react-form, material-ui_v1, typescript by Ben Awad
   aDir=Dev05


#  git clone --bare  ${aGit} ${aDir}
   git clone ${aGit} ${aDir}

   cd ${aDir}

#  git push  --mirror ${aGit}   # if you own it

for branch in `git branch -a | grep remotes | grep -v HEAD | grep -v master`; do

   echo  git branch --track ${branch#remotes/origin/} ${branch}
         git branch --track ${branch#remotes/origin/} ${branch}

#  echo  git checkout -b ${branch} origin/${branch}
#        git checkout -b ${branch} origin/${branch}

#  echo "git checkout -b ${branch}"
#        git checkout -b ${branch}

   echo ""

done

#!_basic-react-form, material-ui_v0 by Ben Awad
#---------------------------------------------------------------------------------------------
# Branch '1_basic_form'                 set up to track remote branch '1_basic_form'                from 'origin'.
# Branch '2_material_ui'                set up to track remote branch '2_material_ui'               from 'origin'.
# Branch '3_client_side_validation'     set up to track remote branch '3_client_side_validation'    from 'origin'.
# Branch '4_table'                      set up to track remote branch '4_table'                     from 'origin'.
# Branch '5_set_state'                  set up to track remote branch '5_set_state'                 from 'origin'.
# Branch '6_edit_delete_rows'           set up to track remote branch '6_edit_delete_rows'          from 'origin'.
# Branch '7_sort_columns'               set up to track remote branch '7_sort_columns'              from 'origin'.
# Branch '8_cancel_edit'                set up to track remote branch '8_cancel_edit'               from 'origin'.
# Branch '9_search'                     set up to track remote branch '9_search'                    from 'origin'.

#!_basic-react-form, material-ui_v0 by Ben Awad
#---------------------------------------------------------------------------------------------
#Branch '1_form'                         set up to track remote branch '1_form'                      from 'origin'.
#Branch '2_table'                        set up to track remote branch '2_table'                     from 'origin'.