import React from 'react'
import {
  Divider,
} from '@material-ui/core';
import { createCrop } from '../graphql/mutations'
import { sanitize } from '../utils';

export class AddCropDrawer extends React.Component {

  handleCancel = () => {
    const { onClose, clearFormInput } = this.props;
    clearFormInput();
    onClose();
  };
  
   addCrop = async () => {
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

  render() {
    return (
      <React.Fragment>
        <Divider />
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
      <button style={styles.button} onClick={this.addCrop}>Add Crop</button>
      <button style={styles.button} onClick={this.handleCancel}>Cancel</button>
      </div>
        </React.Fragment>
    );
  }
}