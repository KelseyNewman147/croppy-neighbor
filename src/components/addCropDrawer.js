import React, { useState } from 'react'
import {
  Drawer,
} from '@material-ui/core';
import Select from 'react-select'
import { createCrop } from '../graphql/mutations'
import { sanitize } from '../utils';
import { styles, DROPDOWN, initialState } from '../constants';
import { API, graphqlOperation } from 'aws-amplify'

export function AddCropDrawer(addCropDrawerIsOpen, handleAddCropDrawer) {

  const [formState, setFormState] = useState(initialState)
  const [crops, setCrops] = useState([])

  const handleCancel = () => {
    setFormState(initialState)
    handleAddCropDrawer(!addCropDrawerIsOpen)
  };
  
  const setInput = (key, value) => {
    setFormState({ ...formState, [key]: value })
  }

  const addCrop = async () => {
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
      <Drawer
        open={addCropDrawerIsOpen}
        onClose={handleCancel}
        anchor='right'
      >
      <div style={styles.container}>
      <h3>Add New Crop</h3>
      <span>Scientific Name</span>
      <input
        onChange={event => {setInput('scientific_name', event.target.value)}}
        style={styles.input}
        value={formState.scientific_name} 
        placeholder="Ex: Solanum Lycopersicum"
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
      <span>Nutrient Needs</span>
      <Select
        onChange={event => setInput('nutrient_needs', event.value)}
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
      <button style={styles.button} onClick={handleCancel}>Cancel</button>
      </div>
      </Drawer>
    );
}