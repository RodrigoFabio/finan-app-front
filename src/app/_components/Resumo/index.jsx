import React, { useState } from 'react';
import './index.scss'
import ResumeCard from '../ResumeCard';
import { Container } from '@mui/material';
import TipoCartaoResumo from '../../utils/tipoCartaoResumo.js'

let valueTeste = 4.88
const Resumo = ({props})=>{
    return <Container className='container'>
          <div id="cards">
                <ResumeCard Title="Receitas" 
            Value={`R$ ${valueTeste}`} 
            TipoCard="Receitas"
            //TipoCard={TipoCartaoResumo.RECEITA}   
            Resume={`Total de entradas em julho de 2025`}  
                />
                <ResumeCard Title="Despesas" 
                            Value={`R$ ${valueTeste}`} 
                            TipoCard={TipoCartaoResumo.DESPESA}    
                            Resume={`Total de saídas em julho de 2025`}
                />
                <ResumeCard Title="Saldo" 
                            Value={`R$ ${valueTeste}`} 
                            TipoCard={TipoCartaoResumo.SALDO}    
                            Resume={`0 transações registradas`}
                />
                <ResumeCard Title="Parcelamentos" 
                            Value={`R$ ${valueTeste}`} 
                            TipoCard={TipoCartaoResumo.PARCELAMENTO}    
                            Resume={`R$ 0,00 pendentes`}
                />
          </div>
           <div id="main">
                <div className="main-content" id="proximos-gastos">
                    PROXIMOS GASTOS
                </div>
                <div className="main-content" id="categorias-gastos">
                    CATEGORIA GASTOS
                </div>
            </div>     
    </Container>

}
export default Resumo;
    