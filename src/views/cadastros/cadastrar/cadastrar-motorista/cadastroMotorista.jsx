import React from "react";

import InputGrande from '../../../../components/input/input-grande/inputGrande'
import BotaoGrande from '../../../../components/botao/botao-grande/botaoGrande'
import BotaoVoltar from '../../../../components/botao/botao-voltar/botaoVoltar'
import TituloMedio from '../../../../components/titulo/titulo-medio/tituloMedio'

import "./cadastroMotorista.css";

function CadastroMotorista() {
    return (
        <div className="entire-page-cadastroMotorista">
            <header className="header-cadastroMotorista">
                <TituloMedio title="Cadastrar Motorista" />
            </header>
            <body className="body-cadastroMotorista">
                <section className="coluna-inputs-cadastroMotorista">
                    <InputGrande label="Nome" />
                    <InputGrande label="Email" />
                    <InputGrande label="CPF" />
                    <InputGrande label="Senha" type="password" />
                </section>
                <section className="botao-cadastroMotorista">
                    <BotaoGrande text="Cadastrar" />
                </section>
            </body>
            <BotaoVoltar path="/menu/cadastros/funcionario/motorista" />
        </div>
    );
}

export default CadastroMotorista;
