/* src/App.js */
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createCrop } from './graphql/mutations'
import { listCrops } from './graphql/queries'

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }

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
      if (!formState.name || !formState.description) return
      const crop = { ...formState }
      setCrops([...crops, crop])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createCrop, {input: crop}))
    } catch (err) {
      console.log('error creating crop:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Crops</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name} 
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addCrop}>Create crop</button>
      {
        crops.map((crop, index) => (
          <div key={crop.id ? crop.id : index} style={styles.crop}>
            <p style={styles.cropName}>{crop.name}</p>
            <p style={styles.cropDescription}>{crop.description}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  crop: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  cropName: { fontSize: 20, fontWeight: 'bold' },
  cropDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App