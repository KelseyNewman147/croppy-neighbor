import React, { useState } from 'react'
import { listCrops } from '../graphql/queries'
import { styles, initialState, DROPDOWN } from '../constants';
import { API, graphqlOperation } from 'aws-amplify'
import TextField from '@material-ui/core/TextField';
import Select from 'react-select';
import _ from 'lodash'

export function CropComparisons() {
  const [searchState, setSearchState] = useState(initialState.searchBoxes)
  const [formState, setFormState] = useState(initialState)
  const [comparisonState, setComparisonState] = useState(initialState.comparisonResults)

  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value })
  }

  function setCropsforComparison(event) {
    if (event.target.value !== '') {
      searchState.push(event.target.value)
      setSearchState(searchState)
    } else {
      setSearchState([])
    }
    console.log(searchState)
  }

  const compatibilityScore = (cl, cr) => {
    let total = 0;
    const addIfEqual = ['light_needs', 'water_needs'];
    const subtractIfEqual = ['rooting_depth', 'foot_print', 'nutrient_needs', 'time_in_field', 'labor'];
    for (const [key, value] of Object.entries(cr)) {
      if (addIfEqual.includes(key)) {
        if (cl[key] === cr[key]){
          total += (cl[key] + cr[key]);
        } else {
          total -= (cl[key] + cr[key]);
        }
      }
      if (subtractIfEqual.includes(key)) {
        if (cl[key] !== cr[key]){
          total += (cl[key] + cr[key]);
        } else {
          total -= (cl[key] + cr[key]);
        }
      }
    }
    if (_.intersection(cl.pests, cr.pests).length > 0) {
      total -= 3
    } else {
      total += 3
    }

    if (cl.family === cr.family) {
      total -= 4
    } else {
      total += 4
    }
    total += (cl.profit + cr.profit);
    
    return <h3>Compatibility Score: {total}</h3>;
  }

  const searchCrops = async (searchState, searchType) => {
    console.log(`searching by ${searchType}: `, searchState);
      try {
        const searchPromises = searchState.map(search => API.graphql(graphqlOperation(listCrops, {
          filter: {
            [searchType]: {
              contains: search
            }
          }
        })));
        
        const [comparisonLeft, comparisonRight] = await Promise.all(searchPromises);
        setComparisonState([
          comparisonLeft.data.listCrops.items[0], 
          comparisonRight.data.listCrops.items[0]
        ])
      } catch (err) {
        console.log('error finding crop:', err)
      }
  }

  return (
    <div>
      <div>
        <Select
          onChange={event => setInput('search_type', event.value)}
          styles={styles.selectStyles}
          defaultValue='scientific_name'
          options={DROPDOWN.SEARCH_TYPE}
          placeholder='Search by...'
        />
        <TextField id='searchbox1' label='Crop 1' type='search' variant='outlined' onBlur={setCropsforComparison}/>
        <TextField id='searchbox2' label='Crop 2' type='search' variant='outlined' onBlur={setCropsforComparison}/>
      <button onClick={async () => await searchCrops(searchState, formState.search_type)}>Compare</button>
     </div>  
    <div style={styles.container}>
      { comparisonState.length !== 2 
      ? (
        <p>Please enter two crops for comparison</p>
      ) 
      : (
      comparisonState.map((crop, index) => (
      <div key={crop.id ? crop.id : index} style={styles.crop}>
        <p style={styles.cropScientificName}>Scientific Name: {crop.scientific_name}</p>
        <p style={styles.cropValues}>Common Name: {crop.common_name}</p>
        <p style={styles.cropValues}>Family: {crop.family}</p>
      </div>
      ))
    )}
    {comparisonState.length === 2 && compatibilityScore(comparisonState[0], comparisonState[1])}
    </div>
    </div>
  );
}