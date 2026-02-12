import React, { useState } from 'react';
import ReportTabs from './ReportTabs';
import DataFetcher from './DataFetcher';
import { fetchWellnessData } from './api';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const wellnessData = await fetchWellnessData();
            setData(wellnessData);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        loadData();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.message}</div>;

    return (
        <div>
            <h1>Betterly Wellness Management Report</h1>
            <ReportTabs data={data} />
        </div>
    );
};

export default Dashboard;