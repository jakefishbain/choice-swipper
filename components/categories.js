import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { filteredCategories } from '../utils/yelpCategories'


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function Categories(props) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categories, setCategories] = useState(filteredCategories)
  // const [chipData, setChipData] = useState([
  //   { key: 0, alias: 'Angular' },
  //   { key: 1, alias: 'jQuery' },
  //   { key: 2, alias: 'Polymer' },
  //   { key: 3, alias: 'React' },
  //   { key: 4, alias: 'Vue.js' },
  // ]);

  // useEffect(() => {
  //   console.log('cat useEffect', categories)
  //   setCategories(props.categories)
  // }, [props.categories])

  
  // const handleDelete = (categoryToDelete) => () => {
  //   setCategories((cats) => cats.filter((cat) => cat.alias !== categoryToDelete.alias));
  // };

  const handleAdd = (catToAdd) => () => {
    setSelectedCategories([...selectedCategories, catToAdd])

    let tempCategories = categories.filter(c => c != catToAdd)
    setCategories(tempCategories)
    props.setIndexCats([...selectedCategories, catToAdd])
  }
  
  const handleRemove = (catToRemove) => () => {
    setCategories([...categories, catToRemove])
    
    let tempCategories = selectedCategories.filter(c => c != catToRemove)
    setSelectedCategories(tempCategories)
    props.setIndexCats(selectedCategories.filter(c => c != catToRemove))
  }


  // const selectCategory = (e) => {
  //   if (e.target.checked) {
  //     setSelectedCategories([...selectedCategories, e.target.value])
  //   } else {
  //     let tempCategories = selectedCategories.filter(c => c != e.target.value)
  //     setSelectedCategories(tempCategories)
  //   }
  // }

  const selectedHeight = () => {
    let pix = Math.ceil(selectedCategories.length / 2) * 45
    return pix >= 400 ? '400px' : pix + 'px'
  }

  return (
    <Box
    sx={{
      width: 300,
      maxWidth: '100%',
      maxHeight: '100%',
      // overflow: 'scroll',
      display: 'flex',
      flexDirection: 'column',
      // flexWrap: 'wrap'
    }}
    >
    <Paper
      sx={{
        display: selectedCategories.length > 0 ? 'flex' : 'none',
        // position: 'fixed',
        // position: 'absolute',
        // width: '80%',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
        overflow: 'scroll',
        minHeight: selectedHeight
        // flexShrink: 0,
      }}
      component="ul"
      >
      {selectedCategories.length > 0 && selectedCategories.map((data) => {
        return (
          <ListItem key={data.alias}>
            <Chip
              // icon={icon}
              avatar={<RestaurantIcon />}
              // deleteIcon={<RestaurantIcon />}
              label={data.title}
              // clickable={true}
              onClick={handleRemove(data)}
              // onDelete={handleRemove(data)}
              />
          </ListItem>
        );
      })}
    </Paper>
    <Paper
      sx={{
        display: 'flex',
        // position: 'fixed',
        // position: 'absolute',
        // width: '80%',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        // mt: '180px',
        overflow: 'scroll',
        // flexShrink: 1
      }}
      component="ul"
    >
      {categories.length > 0 && categories.map((data) => {
        return (
          <ListItem key={data.alias}>
            <Chip
              // deleteIcon={<RestaurantIcon />}
              avatar={<RestaurantIcon />}
              label={data.title}
              // clickable={true}
              // onDelete={handleAdd(data)}
              onClick={handleAdd(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
    </Box>
  );
}