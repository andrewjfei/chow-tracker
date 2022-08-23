import { Card, CardContent, Typography, Grid } from '@mui/material';
import { RouteBox } from '../../component';

const AuthRoute = () => {
  return (
    <RouteBox>
      <div>test</div>
      <Grid
        container
        columns={12}
        columnSpacing={3}
        direction='row'
        alignItems='stretch'
      >
        <Grid item md='2'>
          <Card>
            <CardContent>
              {/* <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography variant='h5' component='div'>
              sdsafas
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              adjective
            </Typography>
            <Typography variant='body2'>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item md='10'>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant='h5' component='div'>
                sdsafas
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                adjective
              </Typography>
              <Typography variant='body2'>
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </RouteBox>
  );
};

export { AuthRoute };
