import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

export default function Results(props) {
  const [items, setItems] = useState([])
  const [random, setRandom] = useState();

  const starDisplay = (rating) => {
    // console.log(rating)
    let hasHalf = Math.floor(rating) != Math.ceil(rating)
    let starArray = [...Array(Math.floor(rating)).keys()]

    if(hasHalf) {
      return <span>{ starArray.map(_ => <StarIcon fontSize='small' />) }<StarHalfIcon fontSize='small' /></span>
    } else {
      return <span>{ starArray.map(_ => <StarIcon fontSize='small' />) }</span>
    }
  }

  useEffect(() => {
    // console.log('res results', props.results && JSON.parse(props.results).businesses)
    setItems(props.results.businesses)
  }, [props.results])

  //MODAL 

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    randomSelection()
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const randomSelection = () => {
    let num = Math.floor(Math.random() * items.length)
    console.log('random', num, items, items[num])
    setRandom(items[num])
  }

  return (
    <div>
      <Button onClick={handleOpen} sx={{ display: 'sticky' }}>Choose For Me...</Button>
      <ImageList sx={{ width: 300, maxWidth: '100%' }} varient='quilted'>
        {items && items.length > 0 && items.map((item) => (
          <ImageListItem
            key={item.image_url}
            sx={{
              height: '100px',
              width: '150px'
            }}
          >
            <img
              src={item.image_url}
              srcSet={item.image_url}
              alt={item.name}
              loading="lazy"

            />
            <ImageListItemBar
              title={item.name}
              subtitle={<span>{item && starDisplay(item.rating)}</span>}
              position="below"
              sx={{
                background: 'black',
                color: 'white',
                opacity: 0.6,
                px: '10px'
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={random?.image_url}
            srcSet={random?.image_url}
            alt={random?.name}
            loading="lazy"
            height= '100px'
            width='150px'
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {random?.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>
              {random?.location?.address1}
            </div>
            {random && starDisplay(random?.rating)}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
