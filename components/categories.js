import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Box from '@mui/material/Box';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Categories(props) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categories, setCategories] = useState(props.categories)
  const [chipData, setChipData] = useState([
    { key: 0, alias: 'Angular' },
    { key: 1, alias: 'jQuery' },
    { key: 2, alias: 'Polymer' },
    { key: 3, alias: 'React' },
    { key: 4, alias: 'Vue.js' },
  ]);

  
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };


  const selectCategory = (e) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, e.target.value])
    } else {
      let tempCategories = selectedCategories.filter(c => c != e.target.value)
      setSelectedCategories(tempCategories)
    }
  }

  return (
    <Box
    sx={{
      width: 300,
      maxWidth: '100%',
    }}
  >
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.length > 0 && chipData.map((data) => {
        return (
          <ListItem key={data.alias}>
            <Chip
              // icon={icon}
              label={data.alias}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
    </Box>
  );
}