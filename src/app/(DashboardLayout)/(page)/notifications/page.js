"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components

const Dashboard = () => {
  return (
    <PageContainer title="Thong bao" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          Thoong bao
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
