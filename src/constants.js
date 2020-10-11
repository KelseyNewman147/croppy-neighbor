export const DROPDOWN = {
  ROOT_DEPTHS: [
    { 
      label: 'Shallow',
      value: 1
    },
    { 
      label: 'Medium',
      value: 2
    },
    { 
      label: 'Deep',
      value: 3
    },
  ],
  FOOT_PRINT: [
    { 
      label: 'Small',
      value: 1
    },
    { 
      label: 'Medium',
      value: 2
    },
    { 
      label: 'Large',
      value: 3
    },
  ],
  NEEDS: [
    { 
      label: 'Low',
      value: 1
    },
    { 
      label: 'Medium',
      value: 2
    },
    { 
      label: 'High',
      value: 3
    },
  ],
  TIME_IN_FIELD: [
    { 
      label: 'Short (30-50 days)',
      value: 1
    },
    { 
      label: 'Medium (50-100 days)',
      value: 2
    },
    { 
      label: 'Long (100+ days)',
      value: 3
    },
  ],
  LABOR: [
    { 
      label: 'Low Labor', // labor per 100 row ft
      value: 3
    },
    { 
      label: 'Labor Intensive', // ex: tomatoes (10+ hrs/wk)
      value: -1
    }
  ],
  PROFIT: [
    { 
      label: '$',
      value: 1
    },
    { 
      label: '$$',
      value: 2
    },
    { 
      label: '$$$',
      value: 3
    },
  ],
  SEARCH_TYPE: [
    {
      label: 'Scientific Name',
      value: 'scientific_name'
    },
    {
      label: 'Common Name',
      value: 'common_name'
    }
  ]
}

export const styles = {
  topContainer: { border: '3px solid #fff', padding: 10 },
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', float: 'left', padding: 20 },
  crop: {  marginBottom: 15 },
  input: {  backgroundColor: 'white', color: '#696969', marginBottom: 5, marginTop: 5, padding: 8, fontSize: 16, borderColor: 'hsl(0deg 0% 80%)', borderRadius: '4px', borderStyle: 'solid', borderWidth: '1px' },
  cropScientificName: { fontSize: 20, fontWeight: 'bold' },
  cropValues: { marginBottom: 0 },
  button: { backgroundColor: '#696969', borderRadius: '4px', color: 'white', fontSize: 18, padding: '12px 0px', marginTop: 5 },
  selectStyles: {
    control: styles => ({ ...styles, backgroundColor: 'white', marginBottom: 5, marginTop: 5, fontSize: 16, color: '#696969' }),
    option: styles => ({ ...styles, backgroundColor: 'white', fontSize: 16, color: '#696969' }),
  }
}

export const initialState = { 
  addCropDrawerIsOpen: false,
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
  profit: '',
  searchBoxes: [],
  comparisonResults: [],
  search_type: ''
}