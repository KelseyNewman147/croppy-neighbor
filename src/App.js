/* src/App.js */
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createCrop } from './graphql/mutations'
import { listCrops } from './graphql/queries'
import logo from './earth.svg';
import './App.css';
import { sanitize } from './utils';
import { DROPDOWN } from './constants.js';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { 
  scientific_name: '', 
  common_name: '',
  pests: '',
  rooting_depth: '',
  foot_print: '',
  light_needs: '',
  water_needs: '',
  time_in_field: '',
  family: '',
  labor: '',
  profit: ''
}

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [crops, setCrops] = useState([])

  useEffect(() => {
    fetchCrops()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchCrops() {
    try {
      const cropData = await API.graphql(graphqlOperation(listCrops))
      const crops = cropData.data.listCrops.items
      setCrops(crops)
    } catch (err) { console.log('error fetching crops') }
  }

  async function addCrop() {
    try {
      let crop = { ...formState }
      crop = sanitize(crop);
      console.log(crop);
      setCrops([...crops, crop])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createCrop, {input: crop}))
    } catch (err) {
      console.log('error creating crop:', err)
    }
  }

  return (
    <div style={styles.topContainer}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Croppy Neighbor
        </p>
      </header>
    </div>
    <div style={styles.container}>
      <h3>Add New Crop</h3>
      <span>Scientific Name</span>
      <input
        onChange={event => {setInput('scientific_name', event.target.value)}}
        style={styles.input}
        value={formState.scientific_name} 
        placeholder="Ex: Solanum lycopersicum"
      />
      <span>Common Name</span>
      <input
        onChange={event => setInput('common_name', event.target.value)}
        style={styles.input}
        value={formState.common_name}
        placeholder="Ex: Garden Tomato"
      />
      <span>Pests</span>
      <input
        onChange={event => setInput('pests', event.target.value)}
        style={styles.input}
        value={formState.pests} 
        placeholder="Ex: Slugs,Aphids"
      />
      <span>Rooting Depth</span>
      <Select
        onChange={event => setInput('rooting_depth', event.value)}
        styles={styles.selectStyles}
        defaultValue={DROPDOWN.ROOT_DEPTHS[0]}
        options={DROPDOWN.ROOT_DEPTHS}
      />
      <span>Foot Print</span>
      <Select
        onChange={event => setInput('foot_print', event.value)}
        styles={styles.selectStyles}
        defaultValue={DROPDOWN.FOOT_PRINT[0]}
        options={DROPDOWN.FOOT_PRINT}
      />
      <span>Light Needs</span>
      <Select
        onChange={event => setInput('light_needs', event.value)}
        styles={styles.selectStyles}
        defaultValue={DROPDOWN.NEEDS[0]}
        options={DROPDOWN.NEEDS}
      />
      <span>Water Needs</span>
      <Select
        onChange={event => setInput('water_needs', event.value)}
        styles={styles.selectStyles}
        defaultValue={DROPDOWN.NEEDS[0]}
        options={DROPDOWN.NEEDS}
      />
      <span>Time in Field</span>
      <Select
        onChange={event => setInput('time_in_field', event.value)}
        styles={styles.selectStyles}
        defaultValue={DROPDOWN.TIME_IN_FIELD[0]}
        options={DROPDOWN.TIME_IN_FIELD}
      />
      <span>Scientific Family</span>
      <input
        onChange={event => setInput('family', event.target.value)}
        style={styles.input}
        value={formState.family}
        placeholder="Ex: Solanaceae"
      />
      <span>Labor</span>
      <Select
        onChange={event => setInput('labor', event.value)}
        defaultValue={DROPDOWN.LABOR[0]}
        options={DROPDOWN.LABOR}
        styles={styles.selectStyles}
      />
      <span>Profit</span>
      <Select
        onChange={event => setInput('profit', event.value)}
        styles={styles.selectStyles}
        defaultValue={DROPDOWN.PROFIT[0]}
        options={DROPDOWN.PROFIT}
      />
      <button style={styles.button} onClick={addCrop}>Add Crop</button>
      {
        crops.map((crop, index) => (
          <div key={crop.id ? crop.id : index} style={styles.crop}>
            <p style={styles.cropScientificName}>{crop.scientific_name}</p>
            <p style={styles.cropValues}>{crop.common_name}</p>
            <p style={styles.cropValues}>{crop.pests}</p>
            <p style={styles.cropValues}>{crop.rooting_depth}</p>
            <p style={styles.cropValues}>{crop.foot_print}</p>
            <p style={styles.cropValues}>{crop.light_needs}</p>
            <p style={styles.cropValues}>{crop.water_needs}</p>
            <p style={styles.cropValues}>{crop.time_in_field}</p>
            <p style={styles.cropValues}>{crop.family}</p>
            <p style={styles.cropValues}>{crop.labor}</p>
            <p style={styles.cropValues}>{crop.profit}</p>
          </div>
        ))
      }
    </div>
    </div>
  )
}

const styles = {
  topContainer: { border: '3px solid #fff', padding: 10 },
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', float: 'left', padding: 20 },
  crop: {  marginBottom: 15 },
  input: {  backgroundColor: 'white', color: '#696969', marginBottom: 5, marginTop: 5, padding: 8, fontSize: 16, borderColor: 'hsl(0deg 0% 80%)', borderRadius: '4px', borderStyle: 'solid', borderWidth: '1px' },
  cropScientificName: { fontSize: 20, fontWeight: 'bold' },
  cropValues: { marginBottom: 0 },
  button: { backgroundColor: '#696969', borderRadius: '4px', color: 'white', fontSize: 20, padding: '12px 0px', marginTop: 5 },
  selectStyles: {
    control: styles => ({ ...styles, backgroundColor: 'white', marginBottom: 5, marginTop: 5, fontSize: 16, color: '#696969' }),
    option: styles => ({ ...styles, backgroundColor: 'white', fontSize: 16, color: '#696969' }),
  }

}

export default App