import React, { FunctionComponent, useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchSteps } from '../../redux/features/StepsSlice';
import AppView from '../../components/Common/AppView';
import CompanyInfo from '../Companyinfo/CompanyInfo';
import { Box, Card, CardContent, Typography } from '@mui/joy';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = {
  totalAssets: 120,
  netAssetValue: 500000,
  valueOfAssets: 450000,
  purchasesInFiscalYear: 50000,
};

const pieData = [
  { name: 'Total Assets', value: data.totalAssets },
  { name: 'Net Asset Value', value: data.netAssetValue },
  { name: 'Value of Assets', value: data.valueOfAssets },
  { name: 'Purchases in Fiscal Year', value: data.purchasesInFiscalYear },
];

const barData = [
  { name: 'Total Assets', value: data.totalAssets },
  { name: 'Net Asset Value', value: data.netAssetValue },
  { name: 'Value of Assets', value: data.valueOfAssets },
  { name: 'Purchases in Fiscal Year', value: data.purchasesInFiscalYear },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard: FunctionComponent = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const step = useSelector((state: RootState) => state.steps.data);
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchSteps());
  }, [dispatch]);

  return (
    <AppView>
      {step && step[0]?.step === 7 ? (
        <CompanyInfo open={open} setOpen={() => setOpen(false)} />
      ) : (
        <Box sx={styles.dashboardContainer}>
          <Card sx={styles.card}>
            <CardContent>
              <Typography level="h4" sx={styles.cardTitle}>
                Total Number of Assets
              </Typography>
              <Typography level="h2" sx={styles.cardValue}>
                {data.totalAssets}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={styles.card}>
            <CardContent>
              <Typography level="h4" sx={styles.cardTitle}>
                Net Asset Value
              </Typography>
              <Typography level="h2" sx={styles.cardValue}>
                ${data.netAssetValue.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={styles.card}>
            <CardContent>
              <Typography level="h4" sx={styles.cardTitle}>
                Value of Assets
              </Typography>
              <Typography level="h2" sx={styles.cardValue}>
                ${data.valueOfAssets.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={styles.card}>
            <CardContent>
              <Typography level="h4" sx={styles.cardTitle}>
                Purchases in Fiscal Year
              </Typography>
              <Typography level="h2" sx={styles.cardValue}>
                ${data.purchasesInFiscalYear.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={styles.chartCard}>
            <CardContent>
              <Typography level="h4" sx={styles.cardTitle}>
                Asset Distribution
              </Typography>
              <PieChart width={400} height={400}>
                <Pie
                  data={pieData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </CardContent>
          </Card>
          <Card sx={styles.chartCard}>
            <CardContent>
              <Typography level="h4" sx={styles.cardTitle}>
                Asset Values
              </Typography>
              <BarChart
                width={500}
                height={300}
                data={barData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </CardContent>
          </Card>
        </Box>
      )}
    </AppView>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    padding: '20px',
  },
  card: {
    width: '250px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
  },
  chartCard: {
    width: '500px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
  },
  cardTitle: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  cardValue: {
    color: '#388e3c',
  },
};

export default Dashboard;
