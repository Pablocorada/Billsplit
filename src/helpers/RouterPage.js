import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MisCuentas } from "../components/misCuentas/MisCuentas";
import { Cuenta } from "../components/cuenta/Cuenta";

export const RouterPage = () => {

  return (
    <>
        <Router>
            <div>
                <Routes>
                    {/* <Route exact path="/" element={HomeScreen} /> 
                    <Route exact path="/login" element={LoginScreen} /> 
                    <Route exact path="/profile" element={ProfileScreen} />  */}
                    <Route exact path="/mis_cuentas" element={MisCuentas} /> 
                    <Route exact path="/cuenta" element={Cuenta} /> 
                    <Route exact path="*" element={<Navigate replace to="/" />} /> 
                </Routes>
            </div>
        </Router>
    </>
    );
};