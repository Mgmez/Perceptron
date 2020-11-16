import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from 'react-bootstrap';

import { Button, FormControlLabel, Radio, RadioGroup, TextField, FormLabel,FormControl} from '@material-ui/core';
import Perceptron from '../hooks/Perceptron.js';
import { PerceptronContext } from "./PerceptronContext.js";
import Adaline from '../algoritmos/Adaline.js';
import BackPropagation from '../algoritmos/BackPropagation.js';

const numCapas = [
    {
        label: "1",
        value: "unacapa"
    },
    {
        label: "2",
        value: "doscapas"
    }
]
let clases = [];

const PerceptronConfigs = (props) => {
    //const [perceptron, setPerceptron] = useState(null);
    //const [entrenado, setEntrenado] = useState(false);    
    const { handleSubmit, register, errors, control, watch } = useForm();
    const { perceptronState, setPerceptronState } = useContext(PerceptronContext);
    const [perceptronErrors, setPerceptronErrors] = useState({});
    const [iniciado, setIniciado] = useState(false);
    const [initConf, setInitConf] = useState({});
    const [claseSelect, setClaseSelect] = useState("1");

    const type = watch("type");

    const cambiarClase = (event) => {
        console.log("cambio clase");
        console.log(event.target.value);
        setClaseSelect(event.target.value);
        setPerceptronState({
            ...perceptronState,
           claseSelect: event.target.value
        });
    }
    const iniciar = async (values) => {
        console.log(values);
        if (values.type === 'unacapa') {
            setInitConf({
                num_class: values.max_class,
                num_capas: 3,
                num_n_capa1: values.max_capa1
            });
        } else {
            setInitConf({
                num_class: values.max_class,
                num_capas: 4,
                num_n_capa1: values.max_capa1,
                num_n_capa2: values.max_capa2
            });
        }

        for (let i = 1; i <= values.max_class; i++) {
            clases.push({
                label: "clase" + i,
                color: randomColor(),
                value: "" + i
            })
        }
        setPerceptronState({
            ...perceptronState,
            clases: clases,
            iniciado: true
        });
        setIniciado(true);
    }

    const randomColor = () => {
        const hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
        let color_aleatorio = "#";
        for (let i = 0; i < 6; i++) {
            let posarray = aleatorio(0, hexadecimal.length);
            color_aleatorio += hexadecimal[posarray];
        }
        return color_aleatorio;
    }

    const aleatorio = (inferior, superior) => {
        const numPosibilidades = superior - inferior;
        let aleat = Math.random() * numPosibilidades
        aleat = Math.floor(aleat)
        return parseInt(inferior) + aleat
    }

    const iniciarPesos = async (values) => {
        console.log(values);
        let perceptron;
        setPerceptronErrors({});
        if (!perceptronState?.x?.length) {
            setPerceptronErrors({
                trainingSet: {
                    message: "Agregue datos de entrenamiento"
                }
            });
            return;
        }
        /*switch (type) {
            case "perceptron":
                perceptron = new Perceptron(perceptronState.x[0].length, values.learning_rate, values.max_epic_number, perceptronState.cpDrawer);
                break;
            case "adaline":
                perceptron = new Adaline(
                    perceptronState.x[0].length,
                    values.max_epic_number,
                    values.max_error,
                    values.learning_rate,
                    perceptronState.cpDrawer
                );
                break;

            default:
                perceptron = new Adaline(
                    perceptronState.x[0].length,
                    values.max_epic_number,
                    values.max_error,
                    values.learning_rate,
                    perceptronState.cpDrawer
                );
        }*/
        const neuronsPerLayer = [2, initConf.num_n_capa1];
        if (initConf.num_capas === 4) {
            neuronsPerLayer.push(initConf.num_n_capa2);
        }
        neuronsPerLayer.push(initConf.num_class);
        const backP = new BackPropagation(
            initConf.num_capas, neuronsPerLayer, values.learning_rate, values.max_error, values.max_epic_number
        );

        setPerceptronState({
            ...perceptronState,
            perceptron: backP,

        });
        const x2 = [];
        // x2[0] = perceptron.calcularX2(-5);
        // x2[1] = perceptron.calcularX2(5);
        // console.log("x2: ", x2);
        // perceptronState.cpDrawer.clearCanvas();
        // perceptronState.cpDrawer.drawAxis();
        // perceptronState.x.forEach((point, index) => {
        //     perceptronState.cpDrawer.drawPoint(perceptronState.cpDrawer.XC(point[0]), perceptronState.cpDrawer.YC(point[1]), perceptronState.y[index])
        // });
        // if (type === 'adaline') {
        //     perceptronState.cpDrawer.drawLine(-5, x2[0], 5, x2[1], "#FF0040");
        // } else {
        //     perceptronState.cpDrawer.drawLine(-5, x2[0], 5, x2[1], "#0101DF");
        // }



    }
    const entrenar = async () => {
        setPerceptronErrors({});
        if (!perceptronState.perceptron) {
            setPerceptronErrors({
                "trainedPerceptron": {
                    message: "Primero inicialice el perceptron"
                }
            });
            return;
        }
        await perceptronState.perceptron.fit(perceptronState.x, perceptronState.y);
        const xd = perceptronState.perceptron.errorAcumulado.length >= perceptronState.perceptron.iterations;
        setPerceptronState({
            ...perceptronState,
            entrenado: true,
            limiteAlcanzado: xd
        });
        console.log(perceptronState.perceptron.w);
    }


    const reiniciar = () => {
        perceptronState.cpDrawer.clearCanvas();
        perceptronState.cpDrawer.drawAxis();
        setPerceptronState({
            ...perceptronState,
            perceptron: null,
            entrenado: false,
            x: [],
            y: [],
        });
    }


    if (iniciado) {
        return (
            <>
                <Form onSubmit={handleSubmit(iniciarPesos)} className="">
                    <Controller
                        as={TextField}
                        name="learning_rate"
                        control={control}
                        id="learning_rate"
                        name="learning_rate"
                        label="Nivel de aprendizaje"
                        rules={{
                            required: "Este campo es requerido",
                            validate: value => (parseFloat(value, 10) > 0 && parseFloat(value, 10) <= 1) || "El valor debe ser entre 0 y 1",
                        }}
                        helperText={errors?.learning_rate?.message}
                        error={!!errors?.learning_rate}
                        defaultValue={0.1}
                        margin="normal"
                        className="mt-2"
                    />
                    <br />
                    <Controller
                        defaultValue={100}
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
                    />
                    <br />

                    <Controller
                        defaultValue={0.01}
                        as={TextField}
                        name="max_error"
                        control={control}
                        id="max_error"
                        name="max_error"
                        label="Error"
                        rules={{ required: "Este campo es requerido" }}
                        helperText={errors?.max_error?.message}
                        error={!!errors?.max_error}
                        margin="normal"
                    />
                    <p></p>
                    <FormControl component="fieldset">
                    <FormLabel component="legend">Clases</FormLabel>

                        <RadioGroup aria-label="clases" name="clases" value={claseSelect} onChange={cambiarClase}>
                        {
                            clases.map((type, index) =>
                                <FormControlLabel
                                    value={type.value}
                                    key={index}
                                    control={
                                        <Radio
                                            size="small"
                                            style={{ color: type.color }}
                                        />
                                    }
                                    label={
                                        <span style={{ fontSize: "12pt" }}>
                                            {type.label}
                                        </span>
                                    }
                                />
                            )
                        }
                    
                        </RadioGroup>
                    </FormControl>

                    {
                        perceptronErrors.trainingSet &&
                        <span className="error">{perceptronErrors.trainingSet.message}</span>
                    }

                    {
                        perceptronErrors.trainedPerceptron &&
                        <span className="error">{perceptronErrors.trainedPerceptron.message}</span>
                    }

                    <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{ color: "#03A9F4" }}>  Inicializar </Button>

                </Form>
                <Form onSubmit={handleSubmit(entrenar)} className="">
                    <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{ color: "#03A9F4" }}>Entrenar</Button>
                </Form>

                <Form onSubmit={handleSubmit(reiniciar)} className="">
                    <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{ color: "#03A9F4" }}>Reiniciar</Button>
                </Form>
            </>
        );
    } else {
        return (
            <>
                <Form onSubmit={handleSubmit(iniciar)} className="">
                    <Controller
                        defaultValue={3}
                        as={TextField}
                        name="max_class"
                        control={control}
                        id="max_class"
                        name="max_class"
                        label="Numero de clases"
                        rules={{ required: "Este campo es requerido" }}
                        helperText={errors?.max_error?.message}
                        error={!!errors?.max_error}
                        margin="normal"
                    />

                    <p></p>
                    <span className="">{"Numero de capas ocultas"}</span>
                    <Controller
                        defaultValue={"unacapa"}
                        as={RadioGroup}
                        name="type"
                        control={control}
                        id="type"
                        name="type"
                        rules={{ required: "Este campo es requerido" }}
                        helperText={errors?.type?.message}
                        error={!!errors?.type}
                        margin="normal"
                    >
                        {
                            numCapas.map((type, index) =>
                                <FormControlLabel
                                    value={type.value}
                                    key={index}
                                    control={
                                        <Radio
                                            size="small"
                                            style={{ color: "#03a9f4" }}
                                        />
                                    }
                                    label={
                                        <span style={{ fontSize: "12pt" }}>
                                            {type.label}
                                        </span>
                                    }
                                />
                            )
                        }
                    </Controller>


                    <Controller
                        defaultValue={5}
                        as={TextField}
                        name="max_capa1"
                        control={control}
                        id="max_capa1"
                        name="max_capa1"
                        label="Neuronas en la capa 1"
                        rules={{ required: "Este campo es requerido" }}
                        helperText={errors?.max_error?.message}
                        error={!!errors?.max_error}
                        margin="normal"
                    />


                    {
                        type == 'doscapas' &&
                        <Controller
                            defaultValue={5}
                            as={TextField}
                            name="max_capa2"
                            control={control}
                            id="max_capa2"
                            name="max_capa2"
                            label="Neuronas en la capa 2"
                            rules={{ required: "Este campo es requerido" }}
                            helperText={errors?.max_error?.message}
                            error={!!errors?.max_error}
                            margin="normal"
                        />

                    }


                    <Button
                        className="mt-4"
                        type="sumbit"
                        fullWidth color="primary"
                        style={{ color: "#03A9F4" }}
                        onSubmit
                    >Continuar</Button>
                </Form>
            </>
        );
    }


}

export default PerceptronConfigs;