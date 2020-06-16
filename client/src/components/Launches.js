import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const EXCHANGE_RATES = gql`
  {
    launches{
        flight_number,
        launch_date_local,
        launch_success,
        mission_name
    }
  }
`;

const Launches = () => {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <>
            <h1 className="display-4 my-3">Launches</h1>
            <MissionKey/>
            {
                data.launches.map(launch=> <LaunchItem key={launch.flight_number} launch={launch}/>)
            }
        </>
    );
};

export default Launches;