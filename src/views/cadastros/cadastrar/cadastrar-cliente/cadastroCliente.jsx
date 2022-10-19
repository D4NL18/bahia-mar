import React from "react";

import InputPequeno from '../../../../components/input/input-pequeno/inputPequeno'
import BotaoGrande from '../../../../components/botao/botao-grande/botaoGrande'
import BotaoVoltar from '../../../../components/botao/botao-voltar/botaoVoltar'
import TituloMedio from '../../../../components/titulo/titulo-medio/tituloMedio'
import SelectPequeno from "../../../../components/input/select-pequeno/selectPequeno";

import "./cadastroCliente.css";

function CadastroCliente() {

    const options = ["Física", "Jurídica"]

    return (
        <div className="entire-page-cadastroCliente">
            <header className="header-cadastroCliente">
                <TituloMedio title="Cadastrar Cliente" />
            </header>
            <body className="body-cadastroCliente">
                <div className="caixa-inputs-cadastroClientes">
                    <section className="coluna-inputs-cadastroCliente">
                        <SelectPequeno options={options} label="Pessoa Física/Jurídica" />
                        <InputPequeno label="Nome" />
                        <InputPequeno label="Telefone" />
                        <InputPequeno label="CPF/CNPJ" />
                        <InputPequeno label="CEP" />
                    </section>
                    <section className="coluna-inputs-cadastroCliente">
                        <InputPequeno label="Cidade" />
                        <InputPequeno label="Bairro" />
                        <InputPequeno label="Rua" />
                        <InputPequeno label="Número" />
                        <InputPequeno label="Complemento" />
                    </section>
                </div>
                <section className="botao-cadastroCliente">
                    <BotaoGrande text="Cadastrar" />
                </section>
            </body>
            <BotaoVoltar path="/menu/cadastros/cliente" />
        </div>
    );
}

export default CadastroCliente;
