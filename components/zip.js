import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Zip(props) {
  const [zip, setZip] = useState(props.zip || '')

  const setAllZips = (e) => {
    let tempZip = e.target.value
    setZip(tempZip)
    props.setIndexZip(tempZip)
  }

  return (
    <Box
      sx={{
        width: 300,
        maxWidth: '100%',
      }}
    >
      <TextField 
        fullWidth 
        type='tel'
        label="Enter Zip" 
        id="zip" 
        value={zip}
        inputProps={{ maxLength: 5 }}
        onChange={setAllZips}
      />
    </Box>
  );
}