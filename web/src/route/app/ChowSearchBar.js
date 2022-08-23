// import { useState } from 'react';
// import {
//   Paper,
//   IconButton,
//   InputBase,
//   Divider,
//   Accordion,
//   AccordionSummary,
//   Container,
//   AccordionDetails,
//   AccordionActions,
//   Typography,
//   ToggleButtonGroup,
//   ToggleButton,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import ClearIcon from '@mui/icons-material/Clear';
// import FilterIcon from '@mui/icons-material/FilterAlt';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// import './ChowSearchBar.css';

// const ChowSearchBar = (props) => {
//   const [isFilterExpanded, setIsFilterExpanded] = useState(true);
//   const [isButton1Toggled, setIsButton1Toggled] = useState(false);
//   const [isButton2Toggled, setIsButton2Toggled] = useState(false);
//   const [isButton3Toggled, setIsButton3Toggled] = useState(false);

//   const toggleFilter = () => {
//     setIsFilterExpanded(!isFilterExpanded);
//   };

//   const toggleButton1 = () => {
//     setIsButton1Toggled(!isButton1Toggled);
//   };

//   const toggleButton2 = () => {
//     setIsButton2Toggled(!isButton2Toggled);
//   };

//   const toggleButton3 = () => {
//     setIsButton3Toggled(!isButton3Toggled);
//   };

//   return (
//     <Accordion expanded={isFilterExpanded} sx={{ flex: '0 1 auto' }}>
//       <AccordionSummary
//         sx={{
//           padding: '0px 5px',
//         }}
//       >
//         <Container
//           component='form'
//           sx={{
//             padding: '0px',
//             display: 'flex',
//             alignItems: 'center',
//           }}
//           margin={0}
//           disableGutters={true}
//         >
//           <SearchIcon sx={{ p: '10px' }} />
//           <InputBase sx={{ ml: 1, flex: 1 }} placeholder='Search Chow' />
//           <IconButton type='button'>
//             <ClearIcon />
//           </IconButton>
//           <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
//           <IconButton color='primary' onClick={toggleFilter}>
//             {isFilterExpanded ? <ExpandLessIcon /> : <FilterIcon />}
//           </IconButton>
//         </Container>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Container>
//           <ToggleButton
//             value='web'
//             selected={isButton1Toggled}
//             onClick={toggleButton1}
//           >
//             Web
//           </ToggleButton>
//           <ToggleButton
//             value='android'
//             selected={isButton2Toggled}
//             onClick={toggleButton2}
//           >
//             Android
//           </ToggleButton>
//           <ToggleButton
//             value='ios'
//             selected={isButton3Toggled}
//             onClick={toggleButton3}
//           >
//             iOS
//           </ToggleButton>
//         </Container>
//         <Container>
//           <ToggleButton
//             value='web'
//             selected={isButton1Toggled}
//             onClick={toggleButton1}
//           >
//             Web
//           </ToggleButton>
//           <ToggleButton
//             value='android'
//             selected={isButton2Toggled}
//             onClick={toggleButton2}
//           >
//             Android
//           </ToggleButton>
//           <ToggleButton
//             value='ios'
//             selected={isButton3Toggled}
//             onClick={toggleButton3}
//           >
//             iOS
//           </ToggleButton>
//         </Container>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export { ChowSearchBar };
