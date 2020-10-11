import React, { useState } from 'react'
import { listCrops } from '../graphql/queries'
import { styles, initialState } from '../constants';
import { API, graphqlOperation } from 'aws-amplify'
import TextField from '@material-ui/core/TextField';

export function CropComparisons() {
  const [searchState, setSearchState] = useState(initialState.searchBoxes)
  const [comparisonState, setComparisonState] = useState(initialState.comparisonResults)

  function setCropsforComparison(event) {
    if (event.target.value !== '') {
      searchState.push(event.target.value)
      setSearchState(searchState)
    } else {
      setSearchState([])
    }
    console.log(searchState)
  }

  const compatibilityScore = (comparisonLeft, comparisonRight) => {
    let total = 0;

  }

  const searchCrops = async (searchState) => {
    console.log('searching: ', searchState);
      try {
        const searchPromises = searchState.map(search => API.graphql(graphqlOperation(listCrops, {
          filter: {
            scientific_name: {
              eq: search
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
        <TextField id='searchbox1' label='Crop 1' type='search' variant='outlined' onBlur={setCropsforComparison}/>
        <TextField id='searchbox2' label='Crop 2' type='search' variant='outlined' onBlur={setCropsforComparison}/>
      <button onClick={async () => await searchCrops(searchState)}>Compare</button>
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
    </div>
    </div>
  );
}