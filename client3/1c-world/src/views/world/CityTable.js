   import   React                                 from 'react'

   import { List,      Datagrid,  EditButton    } from 'react-admin'
// import { TextField, DateField, EmailField    } from 'react-admin'
   import { TextField, DateField                } from 'react-admin'

   import { Edit, Create, SimpleForm            } from 'react-admin'
// import { TextInput,    DateInput             } from 'react-admin'
   import {               DateInput             } from 'react-admin'

// import { AutocompleteInput                   } from 'react-admin'
// import { required                            } from 'react-admin'
//  const   Select         =  AutocompleteInput

export const CityView   =  function( props ) {    // .(10417.03.10 Beg RAM Create a Read-Only View )
   
  return (
    <List                  {...props} 
         bulkActionButtons={ false }
         >
      <Datagrid 
         isRowSelectable = { record => false }
         >
        <TextField  source="id"             label = 'ID'/>   
        <TextField  source="Name"           />   
        <TextField  source="CountryCode"    />   
        <TextField  source="District"       />
        <TextField  source="Population"     />   
        <DateField  source="createdAt"      />
        <DateField  source="updatedAt"      />
      </Datagrid>
    </List>
    ) };                                           // .(10417.03.10 End)

export const CityList   =  function( props ) {
  return (
    <List                        {...props}>
      <Datagrid rowClick="edit">
        <TextField  source="id"             label = 'ID'/>   
        <TextField  source="Name"           />   
        <TextField  source="CountryCode"    />   
        <TextField  source="District"       />
        <TextField  source="Population"     />   
        <DateField  source="createdAt"      />
        <DateField  source="updatedAt"      />
        <EditButton/>
      </Datagrid>
    </List>
    ) };

export const CityEdit   =  function( props ) {
  return (
    <Edit title='Edit a User'      {...props} >
      <SimpleForm>
        <TextField  source="id"             />   
        <TextField  source="Name"           />   
        <TextField  source="CountryCode"    />   
        <TextField  source="District"       />
        <TextField  source="Population"     />   
        <DateInput  source="createdAt"    label="Created At"                disabled               helperText="Date City was Created"        />
        <DateInput  source="updatedAt"    initialValue={new Date()}         disabled               helperText="Date City was Last Updated"   />
      </SimpleForm>
    </Edit>
    ) };

export const CityCreate =  function( props ) {
  return (
    <Create title='Create a User' {...props} >
      <SimpleForm>
        <TextField  source="id"             />   
        <TextField  source="Name"           />   
        <TextField  source="CountryCode"    />   
        <TextField  source="District"       />
        <TextField  source="Population"     />   
        <DateInput  source="createdAt"    initialValue={new Date()}         disabled               helperText="Date City is Created"        />
{/*     <DateInput  source="updatedAt"    initialValue={new Date()}         disabled               helperText="Date City was Last Updated"   /> */}
      </SimpleForm>
    </Create>
    ) };