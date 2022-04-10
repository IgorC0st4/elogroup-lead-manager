/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Container,
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
    LeadController.initializeInsertLeadId();
    const queryResult = LeadController.fetchLeads();
    setLeads(queryResult);
  };

  React.useEffect(() => {
    getLeads();
  }, []);

  return (
    <Box className="page">
      <Container maxWidth="lg">
        <Card>
          <CardContent>
            <Grid container flexDirection="column" spacing={1}>
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
