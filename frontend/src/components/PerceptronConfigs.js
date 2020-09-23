import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from 'react-bootstrap';

import { Button, TextField } from '@material-ui/core';

const PerceptronConfigs = (props) =>  {
    const { handleSubmit, register, errors, control } = useForm();

    const onSubmit = async (values) => {
        console.log(values)
    };

    return <>
        <Form onSubmit={handleSubmit(onSubmit)} className="">
            <Controller
                as={TextField}
                name="learning_rate"
                control={control}
                id="learning_rate"
                name="learning_rate"
                label="Nivel de aprendizaje"
                rules={{
                    required: "Este campo es requerido",
                    validate: value => (parseFloat(value, 10) > 0 && parseFloat(value, 10) <= 1)  || "El valor debe ser entre 0 y 1",
                }}
                helperText={errors?.learning_rate?.message}
                error={!!errors?.learning_rate}
                margin="normal"
                fullWidth
            />
            <Controller
                as={TextField}
                name="max_epic_number"
                control={control}
                id="max_epic_number"
                name="max_epic_number"
                label="Número máximo de épocas"
                rules={{ required: "Este campo es requerido" }}
                helperText={errors?.max_epic_number?.message}
                error={!!errors?.max_epic_number}
                margin="normal"
                fullWidth
            />
            
            <Button className="mt-4" fullWidth color="primary" style={{color: "#03A9F4"}}>Inicializar</Button>
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>Perceptrón</Button>
        </Form>

    </>
}

export default PerceptronConfigs;