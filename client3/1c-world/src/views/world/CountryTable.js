   import   React                                 from 'react'

   import { List,      Datagrid,  EditButton    } from 'react-admin'
   import { TextField, DateField                } from 'react-admin'

   import { Edit, Create, SimpleForm            } from 'react-admin'
// import { TextInput,    DateInput             } from 'react-admin'
   import {               DateInput             } from 'react-admin'

// import { AutocompleteInput                   } from 'react-admin'
// import { required                            } from 'react-admin'
//  const   Select         =  AutocompleteInput

export const CountryView   =  function( props ) {  // .(10417.03.11 Beg RAM Create a Read-Only view)

  return (
    <List                               {...props}
                    bulkActionButtons = { false  }
         >
      <Datagrid
                    isRowSelectable   = { record => false }
         >
        <TextField  source="Code"           />
        <TextField  source="Name"           />
        <TextField  source="Continent"      />
        <TextField  source="Region"         />
        <TextField  source="SurfaceArea"    />
        <TextField  source="IndepYear"      />
        <TextField  source="Population"     />
        <TextField  source="LifeExpectancy" />
        <TextField  source="GNP"            />
        <TextField  source="GNPOld"         />
        <TextField  source="LocalName"      />
        <TextField  source="GovernmentForm" />
        <TextField  source="HeadOfState"    />
        <TextField  source="Capital"        />
        <TextField  source="Code2"          />
        <DateField  source="createdAt"      />
        <DateField  source="updatedAt"      />
        <EditButton/>
      </Datagrid>
    </List>
    ) };                                           // .(10417.03.11 End)

export const CountryList   =  function( props ) {
  return (
    <List                        {...props}>
      <Datagrid rowClick="edit">
        <TextField  source="Code"           />
        <TextField  source="Name"           />
        <TextField  source="Continent"      />
        <TextField  source="Region"         />
        <TextField  source="SurfaceArea"    />
        <TextField  source="IndepYear"      />
        <TextField  source="Population"     />
        <TextField  source="LifeExpectancy" />
        <TextField  source="GNP"            />
        <TextField  source="GNPOld"         />
        <TextField  source="LocalName"      />
        <TextField  source="GovernmentForm" />
        <TextField  source="HeadOfState"    />
        <TextField  source="Capital"        />
        <TextField  source="Code2"          />
        <DateField  source="createdAt"      />
        <DateField  source="updatedAt"      />
        <EditButton/>
      </Datagrid>
    </List>
    ) };

export const CountryEdit   =  function( props ) {
  return (
    <Edit title='Edit a Country'      { ...props } >
      <SimpleForm>
        <TextField  source="Code"           />
        <TextField  source="Name"           />
        <TextField  source="Continent"      />
        <TextField  source="Region"         />
        <TextField  source="SurfaceArea"    />
        <TextField  source="IndepYear"      />
        <TextField  source="Population"     />
        <TextField  source="LifeExpectancy" />
        <TextField  source="GNP"            />
        <TextField  source="GNPOld"         />
        <TextField  source="LocalName"      />
        <TextField  source="GovernmentForm" />
        <TextField  source="HeadOfState"    />
        <TextField  source="Capital"        />
        <TextField  source="Code2"          />
        <DateInput  source="createdAt"    label="Created At"                disabled               helperText="Date Country was Created"        />
        <DateInput  source="updatedAt"    initialValue={new Date()}         disabled               helperText="Date Country was Last Updated"   />
      </SimpleForm>
    </Edit>
    ) };

export const CountryCreate =  function( props ) {
  return (
    <Create title='Create a Country'   {...props } >
      <SimpleForm>
        <TextField  source="Code"           />
        <TextField  source="Name"           />
        <TextField  source="Continent"      />
        <TextField  source="Region"         />
        <TextField  source="SurfaceArea"    />
        <TextField  source="IndepYear"      />
        <TextField  source="Population"     />
        <TextField  source="LifeExpectancy" />
        <TextField  source="GNP"            />
        <TextField  source="GNPOld"         />
        <TextField  source="LocalName"      />
        <TextField  source="GovernmentForm" />
        <TextField  source="HeadOfState"    />
        <TextField  source="Capital"        />
        <TextField  source="Code2"          />
        <DateInput  source="createdAt"    initialValue={new Date()}         disabled               helperText="Date Country is Created"        />
{/*     <DateInput  source="updatedAt"    initialValue={new Date()}         disabled               helperText="Date User was Last Updated"   /> */}
      </SimpleForm>
    </Create>
    ) };