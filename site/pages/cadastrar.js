import React, { useState } from 'react';

import Menu from '../components/Menu';
import { Jumbotron, Container, Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

function Cadastrar() {
    const [meta, setMeta] = useState({
        name: '',
        description: '',
        status: ''
    });
    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });
    const onChangeInput = e => setMeta({ ...meta, [e.target.name]: e.target.value });

    const sendMeta = async e => {
        e.preventDefault();

        setResponse({ formSave: true });

        try {
            const res = await fetch('http://localhost:8080/metas', {
                method: 'POST',
                body: JSON.stringify(meta),
                headers: { 'Content-Type': 'application/json' }
            });

            const responseEnv = await res.json();

            if (responseEnv.error) {
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.message
                });
                //console.log(responseEnv.message);
            } else {
                setResponse({
                    formSave: false,
                    type: 'success',
                    message: responseEnv.message
                });
                //console.log(responseEnv.message);
            }
        } catch (err) {
            setResponse({
                formSave: false,
                type: 'error',
                message: 'erro: Meta não cadastrada com sucesso, tente mais tarde!!!'
            });
            //console.log("erro: Meta não cadastrada com sucesso, tente mais tarde!!!");
        }
    }

    return (
        <div>
            <Menu />
            <Jumbotron fluid className="form">
                <style>
                    {`.form{
                        background-color:#171941;
                        color: #bf38ac;
                        padding-top: 30px;
                        padding-bottom: 150px;
                        margin-bottom: 0rem !important;
                    }`}
                </style>
                <Container>
                    <h1 className="display-4 text-center">Cadastrar minha meta</h1>

                    <hr />

                    {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : ""}
                    {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : ""}


                    <Form onSubmit={sendMeta}>
                        <FormGroup>
                            <Label for="name">Nome da Meta</Label>
                            <Input type="text" name="name"
                                id="name"
                                placeholder="Nome da meta"
                                onChange={onChangeInput} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Descrição</Label>
                            <Input type="textarea" name="description"
                                id="description"
                                placeholder="Descrição da meta"
                                onChange={onChangeInput} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="status">Status</Label>
                            <Input type="text" name="status"
                                id="status"
                                placeholder="Status da meta"
                                onChange={onChangeInput} />
                        </FormGroup>

                        {response.formSave ? <Button type="submit" color="danger" disabled>Enviando</Button> : <Button type="submit" outline color="primary">Cadastrar</Button>}
                    </Form>
                </Container>
            </Jumbotron>
        </div>
    );
}
export default Cadastrar;