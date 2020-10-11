/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { listCrops } from './graphql/queries'
import logo from './earth.svg';
import './App.css';
import { AddCropDrawer } from './components/addCropDrawer'
import { CropComparisons } from './components/cropComparisons'
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>
          Croppy Neighbor
        </h3>
        <p className="App-nav">About</p>
      </header>
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
              Add Crop
        </button>
      </header>
      {AddCropDrawer(addCropDrawerIsOpen, handleAddCropDrawer)}
      {CropComparisons()}
    </div >
   
    </div>
  )
}

export default App
