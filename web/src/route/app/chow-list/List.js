import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';

const dummyData = [
  { name: "Botany McDonald's" },
  { name: 'Botany Lone Star' },
  { name: "Pakuranga McDonald's" },
  { name: 'Pakuranga Burger Fuel' },
  { name: "Pakuranga McDonald's" },
  { name: "Pakuranga McDonald's" },
  { name: 'Pakuranga Burger Fuel' },
  { name: "Pakuranga McDonald's" },
  { name: "Pakuranga McDonald's" },
  { name: 'Pakuranga Burger Fuel' },
  { name: "Pakuranga McDonald's" },
];

const renderListItem = (chowVenue) => {
  return (
    <ListItem>
      <Card
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <CardContent>{chowVenue.name}</CardContent>
      </Card>
    </ListItem>
  );
};

const ChowList = () => {
  return (
    <Container
      disableGutters={true}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <Typography variant='h5'>Chow List</Typography>
        <Button>Add New Chow</Button>
      </Box>
      <Card
        sx={{
          backgroundColor: 'pink',
          flex: '1 1 0',
          boxSizing: 'border-box',
        }}
      >
        <List
          sx={{ backgroundColor: 'purple', overflow: 'auto', height: '100%' }}
        >
          {dummyData.map((chowVenue, index) => renderListItem(chowVenue))}
        </List>
      </Card>
    </Container>
  );
};

export { ChowList };
