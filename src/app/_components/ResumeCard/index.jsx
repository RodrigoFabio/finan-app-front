import React from 'react';
import './index.scss';
import { Card, CardContent, Typography } from '@mui/material';

const ResumeCard = ({Title, Resume, Value, Icon, TipoCard})=>{
    return  (
        <Card className="Card" id={TipoCard}>
            <h2>{Title}</h2>
            {Icon && <Icon id={"icon-"+{TipoCard}} className="h-8 w-8 fill-gray-600" />}
            <h1>{Value}</h1> 
            <p>{Resume}</p> 
        </Card>)
};

export default ResumeCard;