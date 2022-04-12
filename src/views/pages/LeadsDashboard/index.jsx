import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Container,
  Typography,
} from '@mui/material';
import {
  Link,
} from 'react-router-dom';
import {
  AddCircleOutline as AddIcon,
} from '@mui/icons-material';

import './styles.css';
import LeadsTable from '../../components/LeadsTable';
import LeadController from '../../../controllers/LeadController';

function LeadsDashboard() {
  const [leads, setLeads] = React.useState([]);
  const getLeads = () => {
    const queryResult = LeadController.fetchLeads();
    setLeads(queryResult);
  };

  React.useEffect(() => {
    LeadController.initializeInsertLeadId();
    getLeads();
  }, []);

  return (
    <Box className="page">
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <Grid container flexDirection="column" spacing={1}>
              <Grid item>
                <Grid
                  container
                  flexDirection="row"
                  justifyContent="center"
                  justifyItems="center"
                  alignContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <img
                      alt="elogroup logo"
                      src="https://elogroup.com.br/wp-content/uploads/2021/08/Logo-2.svg"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Typography variant="h4" component="div">Painel de Leads</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button variant="contained" endIcon={<AddIcon />}>
                  <Link className="new-lead-button" to="/new">Novo Lead</Link>
                </Button>
              </Grid>
              <Grid item>
                <LeadsTable leads={leads} updateTable={getLeads} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default LeadsDashboard;
