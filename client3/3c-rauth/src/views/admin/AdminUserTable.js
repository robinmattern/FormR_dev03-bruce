   import   React                                 from 'react'

   import { List,      Datagrid,  EditButton    } from 'react-admin'
   import { TextField, DateField, EmailField    } from 'react-admin'

   import { Edit, Create, SimpleForm            } from 'react-admin'
   import { TextInput, DateInput, PasswordInput } from 'react-admin'
   import { AutocompleteInput                   } from 'react-admin'
   import { required, email                     } from 'react-admin'
    const   Password    =   PasswordInput 
    const   Select      =   AutocompleteInput


    const   chkUsername =   required()
    const   chkPassword =   required()
    const   chkEmail    = [ required(), email() ]

    const   roles       = [ { val: 'Admin',  item: 'Admin'  }
                          , { val: 'Editor', item: 'Editor' }
                          , { val: 'User',   item: 'User'   }
                          , { val: 'Public', item: 'Guest'  }
                            ] 
                 
    const   yorn        = [ { val: 'Yes',    item: 'Yes'    }, { val: 'No', item: 'No' } ]

export const UserList   =  function( props ) {
  return (
    <List                        {...props}>
      <Datagrid rowClick="edit">
        <TextField  source="id"           />
        <TextField  source="username"     label="User Name" />
        <EmailField source="email"        />
{/*     <TextField  source="password"     />  */}
        <TextField  source="role"         />
        <TextField  source="active"       />
        <DateField  source="createdAt"    />
{/*     <DateField  source="updatedAt"    /> */}
        <TextField  source="passworddate" label="Password Date" /> 
        <EditButton/>
      </Datagrid>
    </List>
    ) };

export const UserEdit   =  function( props ) {
  return (
    <Edit title='Edit User'      {...props} >
      <SimpleForm>
        <TextInput  source="id"                                             disabled               helperText="User's Primary Key"           />
        <TextInput  source="username"     label="User Name"                 validate={chkUsername} helperText="User's User ID"               />
        <TextInput  source="email"                                          validate={chkEmail}    helperText="User's Email Address"         />
        <Password   source="password"                                       validate={chkPassword} helperText="User's Password"              /> 
        <Select     source="role"         choices={roles} optionText="item" optionValue="val"      helperText="User's Role"                  />
        <Select     source="active"       choices={yorn}  optionText="item" optionValue="val"      helperText="User is Active or Not"        />
        <TextInput  source="passworddate" label="Password Date"                                    helperText="Date of Last Password Change" />   
        <DateInput  source="createdAt"    label="Created At"                disabled               helperText="Date User was Created"        />
        <DateInput  source="updatedAt"    initialValue={new Date()}         disabled               helperText="Date User was Last Updated"   /> 
      </SimpleForm>
    </Edit>
    ) };

export const UserCreate =  function( props ) {
  return (
    <Create title='Create a User' {...props} >
      <SimpleForm>
        <TextInput  source="id"                                             disabled               helperText="User's Primary Key"           />
        <TextInput  source="username"     label="User Name"                 validate={chkUsername} helperText="User's User ID"               />
        <TextInput  source="email"                                          validate={chkEmail}    helperText="User's Email Address"         />
        <Password   source="password"                                       validate={chkPassword} helperText="User's Password"              />  
        <Select     source="role"         choices={roles} optionText="item" optionValue="val"      helperText="User's Role"                  />
        <Select     source="active"       choices={yorn}  optionText="item" optionValue="val"      helperText="User is Active or Not"        />
        <TextInput  source="passworddate" label="Password Date"                                    helperText="Date of Last Password Change" />   
        <DateInput  source="createdAt"    initialValue={new Date()}         disabled               helperText="Date User was Created"        />
{/*     <DateInput  source="updatedAt"    initialValue={new Date()}         disabled               helperText="Date User was Last Updated"   /> */}
      </SimpleForm>
    </Create>
    ) };