import React from 'react';
import '../css/Footer.css'

const Footer = () => {
    return (
        <div className="Footer-footer">
            <p className="Footer-direitos">LIFE + MONEY · 2021 © Todos os direitos reservados</p>
            <div className="Footer-footerLinks">
                <a href="https://lifeandmoney.com.br/termos-e-condicoes/" className="Footer-footerLink">Termos e Condições Gerais de Uso</a>
                <a href="https://lifeandmoney.com.br/politica-de-privacidade/" className="Footer-footerLink">Política de Privacidade</a>
            </div>
        </div>
    );
};

export default Footer;