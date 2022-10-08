import React from "react";

import InputGrande from '../../../../components/input/input-grande/inputGrande'
import BotaoGrande from '../../../../components/botao/botao-grande/botaoGrande'
import BotaoVoltar from '../../../../components/botao/botao-voltar/botaoVoltar'
import TituloMedio from '../../../../components/titulo/titulo-medio/tituloMedio'

import "./cadastroAdm.css";

function CadastroAdm() {
    return (
        <div className="entire-page-cadastroAdm">
            <header className="header-cadastroAdm">
                <TituloMedio title="Cadastrar Administrador" />
            </header>
            <body className="body-cadastroAdm">
                <section className="coluna-inputs-cadastroAdm">
                    <InputGrande label="Nome" />
                    <InputGrande label="Email" />
                    <InputGrande label="CPF" />
                    <InputGrande label="Senha" type="password" />
                </section>
                <section className="botao-cadastroAdm">
                    <BotaoGrande text="Cadastrar" />
                </section>
            </body>
            <BotaoVoltar path="/menu/cadastros/funcionario/administrador" />
        </div>
    );
}

export default CadastroAdm;
