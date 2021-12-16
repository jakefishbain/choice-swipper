'use strict';

import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/supabaseClient'

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import Zip from '../components/zip'
import Categories from '../components/categories'
import Results from '../components/results'

// import bs from '../utils/businesses'
 
// const yelp = require('yelp-fusion');
// const client = yelp.client(process.env.YELP_FUSION_KEY);


export default function Home() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [zip, setZip] = useState()
  const [categories, setCategories] = useState([])
  const [queryCategories, setQueryCategories] = useState()
  const [results, setResults] = useState([])

  const setAllZips = (childZip) => {
    // console.log('index childZip', childZip)
    setZip(childZip)
  }

  const setAllSelectedCategories = (cats) => {
    // console.log('index categories...', cats)
    let aliases = cats.map( c => c.alias)
    let alias_str = aliases.join()
    console.log(alias_str)
    setQueryCategories(alias_str)
  }

  // const getYelpCategories = async () => {
    // console.log('getting categories...')

    // client.allCategories().then(response => {
    //   console.log(response.jsonBody.categories[0].alias);
    // }).catch(e => {
    //   console.log(e);
    // });

    // let results;

    // fetch('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/categories', {
    //   method: 'GET',
    //   headers: {
    //     "accept": "application/json",
    //     "x-requested-with": "xmlhttprequest",
    //     "Access-Control-Allow-Origin": "*",
    //     "Authorization": `Bearer ${process.env.NEXT_PUBLIC_YELP_FUSION_KEY}`
    //   }
    // })
    // .then(res => res.json())
    // .then(res => {
    //   let categories = res.categories
    //   console.log(categories)
    //   let filteredCategories = categories.filter(c => c.parent_aliases.includes('restaurants'))
    //   setCategories(filteredCategories)
    // })
    // setCategories([1,2,3])

    // console.log('results', results)
  // }

  const queryForResults = () => {
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-Requested-With", "xmlhttprequest");
    myHeaders.append("Authorization", `Bearer ${process.env.NEXT_PUBLIC_YELP_FUSION_KEY}`);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?open_now=true&categories=${queryCategories}&limit=50&location='${zip}'`, requestOptions)
      .then(response => response.text())
      .then(result => { 
        // console.log('result', result) 
        setResults(JSON.parse(result))
      })
      .catch(error => console.log('error', error));


  }

  const steps = [
    {
      label: 'Enter Zip',
      run: null,
      html: <Zip zip={zip} setIndexZip={setAllZips}/>
    },
    {
      label: 'Select Categories',
      html: <Categories categories={categories} setIndexCats={setAllSelectedCategories}/>
    },
    {
      label: 'Results',
      html: <Results results={results}/>
    },
  ];

  const maxSteps = steps.length;

  

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    // getChoice()
    // console.log('activeStep', activeStep)
    activeStep === 2 && queryForResults()
  }, [activeStep])

  // async function getChoice() {
  //   try {
  //     let { data, error } = await supabase
  //       .from('choices')
  //       .select()

  //     if (error) {
  //       throw error
  //     }

  //     if (data) {
  //       console.log('data', data)
  //     }
  //   } catch (error) {
  //     alert(error.message)
  //   } finally {
  //   }
  // }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              height: 50,
              pl: 2,
              bgcolor: 'background.default',
            }}
          >
            <Typography>{steps[activeStep].label}</Typography>
          </Paper>
          <Box sx={{ height: '620px', maxWidth: 400, width: '100%', p: 2, border: '1px solid black', overflow: 'auto', position: 'relative' }}>
              {steps[activeStep].html}
          </Box>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="large"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button size="large" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Box>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  )
}
