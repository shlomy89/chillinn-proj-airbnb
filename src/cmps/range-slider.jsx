import * as React from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'

export default function RangeSlider({ handlePriceSlider }) {

  const [value, setValue] = React.useState([1000, 2500])

  const handleChange = (event, newValue) => {
    const [min, max] = newValue
    handlePriceSlider(min, max)
    setValue(newValue)
  }

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        min={0}
        max={5000}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
}
