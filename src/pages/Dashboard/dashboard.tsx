import { FormControlLabel, InputLabel,  dialogClasses } from "@mui/material";
import Header from "../Header/header"
import { AspectRatio, Box, Button, Card, CardContent, Checkbox, Container,  Grid, Sheet, Slider, Typography } from "@mui/joy";
import { IoSettingsOutline } from "react-icons/io5";
import { Gauge, PieChart } from "@mui/x-charts";
import { VictoryPie, VictoryTheme } from "victory";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

// import { PieArc } from '@mui/x-charts/PieChart';
import styled from 'styled-components';
// // or
import { PieArc } from '@mui/x-charts';
import React from "react";


const Dashboard = () => {

    const DashboardDiv = styled.div`
    font-family: 'Poppins', sans-serif;
    `;

    const data1 = [
        { label: 'Group A', value: 40 },

    ];
    const data2 = [
        { label: '1', value: 35 },

    ];

    const radius = 100;
    const [itemNb, setItemNb] = React.useState(1);
    const [skipAnimation, setSkipAnimation] = React.useState(false);

    const handleItemNbChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setItemNb(newValue);
    };

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event?.target?.value);
    };


    return (
        <DashboardDiv>

            <div style={{ width: "100%" }}>
                <div style={{ display: 'flex', flexDirection: "row", padding: '20px', justifyContent: "space-between", }}>
                    <div>
                        <Typography sx={{ fontWeight: '600', fontSize: "32px", color: "#202224" }}>
                            Dashboard
                        </Typography>

                    </div>
                    <div>
                        <Button color="neutral" startDecorator={<IoSettingsOutline />} sx={{ background: 'black', pt: '10px', pb: '10px' }}>
                            Manage Dashboard
                        </Button>
                    </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', flexWrap: 'wrap', width: '100%' }}>
                        <div style={{
                            width: '45%', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                            boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.19)'
                        }}>
                            <Typography sx={{ fontWeight: '800', fontSize: '37px', padding: '10px' }}>
                                <span style={{ color: 'blue' }}>Smart</span><span style={{ color: 'green' }}>Sign</span>
                            </Typography>

                        </div>
                        <div style={{
                            width: '45%', paddingLeft: '15px', borderRadius: '5px', height: '80%',
                            boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.19)',
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'
                        }}>
                            <Typography>
                                <IoSettingsOutline />
                                <img src="./src/Assets/Assets.png" alt="" />

                            </Typography>
                            <Typography sx={{ fontWeight: '600', fontSize: '37px' }}>
                                $40,291
                            </Typography>
                            <Typography sx={{ fontWeight: '400', color: '#9E9E9E' }}>
                                Number Of Active Assets
                            </Typography>

                        </div>
                        <div style={{
                            width: '43%', paddingLeft: '12px', borderRadius: '5px', height: '80%',
                            boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.19)',
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'
                        }}>
                            <Typography>
                                <IoSettingsOutline />

                            </Typography>
                            <Typography sx={{ fontWeight: '600', fontSize: '37px' }}>
                                $18,291
                            </Typography>
                            <Typography sx={{ fontWeight: '400', color: '#9E9E9E' }}>
                                Value Of Assets
                            </Typography>

                        </div>
                        <div style={{
                            width: '45%', paddingLeft: '15px', borderRadius: '5px', height: '80%',
                            boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.19)',
                            display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'
                        }}>
                            <Typography>
                                <IoSettingsOutline />

                            </Typography>
                            <Typography sx={{ fontWeight: '600', fontSize: '37px' }}>
                                $ 8,291
                            </Typography>
                            <Typography sx={{ fontWeight: '400', color: '#9E9E9E' }}>
                                Purchases In Fiscal Years
                            </Typography>

                        </div>
                    </div>
                    <div style={{
                        width: '100%', borderRadius: '5px',
                        boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.19)',
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'
                    }}>
                        <div style={{ padding: '10px' }}>
                            <Typography>
                                <span style={{ fontWeight: '600', fontSize: '28px' }}>Asset Value </span>
                                <span style={{ fontWeight: '400', color: '#9E9E9E', fontSize: '20px' }}>by Category</span>
                            </Typography>
                            {/* <PieArc
                            color={"#ff0000"} // Example color: red
                            id={"myPieArc"} // Example id: myPieArc
                            dataIndex={0}
                            isFaded={false}
                            isHighlighted={false}
                            cornerRadius={100} // Example cornerRadius: 100
                            endAngle={90} // Example endAngle: 90 degrees
                            innerRadius={0} // Example innerRadius: 0
                            outerRadius={50} // Example outerRadius: 50
                            paddingAngle={0} // Example paddingAngle: 0
                            startAngle={0} // Example startAngle: 0 degrees
                        /> */}
                            <PieChart
                                height={300}
                                series={[
                                    { data: data1, outerRadius: radius },
                                    {
                                        data: data2.slice(0, itemNb),
                                        innerRadius: radius,
                                        arcLabel: (params) => params.label ?? '',
                                    },
                                ]}
                                skipAnimation={skipAnimation}
                            />

                            <Typography>
                                Computer Equipment
                            </Typography>
                        </div>
                        
                    </div>


                </div>

            </div>
        </DashboardDiv>


    );
}

export default Dashboard;
