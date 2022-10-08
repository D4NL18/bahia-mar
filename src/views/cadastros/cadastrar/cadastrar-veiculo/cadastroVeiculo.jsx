import React from "react";

import InputGrande from '../../../../components/input/input-grande/inputGrande'
import BotaoGrande from '../../../../components/botao/botao-grande/botaoGrande'
import BotaoVoltar from '../../../../components/botao/botao-voltar/botaoVoltar'
import TituloMedio from '../../../../components/titulo/titulo-medio/tituloMedio'

import "./cadastroVeiculo.css";

function CadastroMotorista() {
    return (
        <div className="entire-page-cadastroVeiculo">
            <header className="header-cadastroVeiculo">
                <TituloMedio title="Cadastrar Veiculo" />
            </header>
            <body className="body-cadastroVeiculo">
                <section className="coluna-inputs-cadastroVeiculo">
                    <InputGrande label="Tipo" />
                    <InputGrande label="Marca" />
                    <InputGrande label="Modelo" />
                    <InputGrande label="Placa" type="password" />
                </section>
                <section className="botao-cadastroVeiculo">
                    <BotaoGrande text="Cadastrar" />
                </section>
            </body>
            <BotaoVoltar />
        </div>
    );
}

export default CadastroMotorista;
