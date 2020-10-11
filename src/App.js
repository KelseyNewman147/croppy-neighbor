/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listCrops } from './graphql/queries'
import logo from './earth.svg';
import './App.css';
import { AddCropDrawer } from './components/addCropDrawer'
import { styles, initialState } from './constants';

import awsExports from "./aws-exports";
Amplify.configure(awsExports);


const App = () => {
  const [crops, setCrops] = useState([])
  const [addCropDrawerIsOpen, handleAddCropDrawer] = useState(initialState.addCropDrawerIsOpen)
  useEffect(() => {
    fetchCrops()
  }, [])

  async function fetchCrops() {
    try {
      const cropData = await API.graphql(graphqlOperation(listCrops))
      const crops = cropData.data.listCrops.items
      setCrops(crops)
    } catch (err) { console.log('error fetching crops:', err) }
  }

  return (
    // <div style={styles.topContainer}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>
          Croppy Neighbor
        </h3>
      </header>
    {/* </div> */}
    <div style={styles.topContainer}>
      <header>
        <h4>
          Crop Comparisons
        </h4>
        <button
              color="secondary"
              variant="contained"
              onClick={() => handleAddCropDrawer(!addCropDrawerIsOpen)}
            >
              + Add Crop
        </button>
      </header>
      {AddCropDrawer(addCropDrawerIsOpen, handleAddCropDrawer)}
    </div >
      {
        crops.map((crop, index) => (
          <div key={crop.id ? crop.id : index} style={styles.crop}>
            <p style={styles.cropScientificName}>Scientific Name: {crop.scientific_name}</p>
            <p style={styles.cropValues}>Common Name: {crop.common_name}</p>
            <p style={styles.cropValues}>Pests: {crop.pests.join(',')}</p>
            <p style={styles.cropValues}>Rooting Depth: {crop.rooting_depth}</p>
            <p style={styles.cropValues}>Foot Print: {crop.foot_print}</p>
            <p style={styles.cropValues}>Light Needs: {crop.light_needs}</p>
            <p style={styles.cropValues}>Water Needs: {crop.water_needs}</p>
            <p style={styles.cropValues}>Time in Field: {crop.time_in_field}</p>
            <p style={styles.cropValues}>Family: {crop.family}</p>
            <p style={styles.cropValues}>Labor: {crop.labor}</p>
            <p style={styles.cropValues}>Profit: {crop.profit}</p>
          </div>
        ))
      }      
    </div>
  )
}

export default App