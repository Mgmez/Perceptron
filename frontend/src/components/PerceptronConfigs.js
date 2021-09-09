import React,{useContext, useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl } from 'react-bootstrap';

import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import Adaline from '../algoritmos/Adaline.js';
import { PerceptronContext } from "./PerceptronContext.js";


const PerceptronConfigs = (props) =>  {
    //const [perceptron, setPerceptron] = useState(null);
    //const [entrenado, setEntrenado] = useState(false);
    const { handleSubmit, register, errors, control, watch } = useForm();
    const {perceptronState, setPerceptronState} = useContext(PerceptronContext);
    const [perceptronErrors, setPerceptronErrors] = useState({});

    const type = watch("type");

    const iniciarPesos = async (values) =>{
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
        perceptron = new Adaline(
            perceptronState.x[0].length,
            values.max_epic_number,
            values.max_error,
            values.learning_rate,
            perceptronState.cpDrawer
        );

        setPerceptronState( {
            ...perceptronState,
            perceptron,

        });
        const x2 = [];
        x2[0] = perceptron.calcularX2(-5);
        x2[1] = perceptron.calcularX2(5);
        console.log("x2: ", x2);
        perceptronState.cpDrawer.clearCanvas();
        perceptronState.cpDrawer.drawAxis();
        perceptronState.x.forEach ((point, index) => {
            perceptronState.cpDrawer.drawPoint(perceptronState.cpDrawer.XC(point[0]), perceptronState.cpDrawer.YC(point[1]), perceptronState.y[index])
        });


        perceptronState.cpDrawer.drawLine(-5, x2[0],5, x2[1], "#0101DF" );




      }
      const entrenar = async () =>{
        setPerceptronErrors({});
        if (!perceptronState.perceptron) {
            setPerceptronErrors({
                "trainedPerceptron": {
                    message: "Inicialice Adaline"
                }
            });
            return;
        }
        await perceptronState.perceptron.fit(perceptronState.x, perceptronState.y);

        const  limiteAlcanzado = perceptronState.perceptron.errorAcumulado.length >= perceptronState.perceptron.iterations;
        setPerceptronState( {
            ...perceptronState,
            entrenado: true,
            limiteAlcanzado: limiteAlcanzado
        });
        console.log(perceptronState.perceptron.w);
    }

    const reiniciar = () =>{
        perceptronState.cpDrawer.clearCanvas();
        perceptronState.cpDrawer.drawAxis();
        setPerceptronState( {
            ...perceptronState,
            perceptron : null,
            entrenado: false,
            x : [],
            y : [],
        });
    }



    return <>
        <Form onSubmit={handleSubmit(iniciarPesos)} className="">
            <Controller
                as={TextField}
                name="learning_rate"
                control={control}
                id="learning_rate"
                name="learning_rate"
                label="Learning rate"
                rules={{
                    required: "Este campo es requerido",
                    validate: value => (parseFloat(value, 10) > 0 && parseFloat(value, 10) <= 1)  || "El valor debe ser entre 0 y 1",
                }}
                helperText={errors?.learning_rate?.message}
                error={!!errors?.learning_rate}
                defaultValue = {0.1}
                margin="normal"
            />
            <br />
            <Controller
                defaultValue ={100}
                as={TextField}
                name="max_epic_number"
                control={control}
                id="max_epic_number"
                name="max_epic_number"
                label="Épocas máximas"
                rules={{ required: "Este campo es requerido" }}
                helperText={errors?.max_epic_number?.message}
                error={!!errors?.max_epic_number}
                margin="normal"
            />
            <br />

            <Controller
                defaultValue ={0.01}
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

            <br />



            {
                perceptronErrors.trainingSet &&
                <span className="error">{perceptronErrors.trainingSet.message}</span>
            }

            {
                perceptronErrors.trainedPerceptron &&
                <span className="error">{perceptronErrors.trainedPerceptron.message}</span>
            }

            <Button className="mt-4" variant="contained" type="sumbit" fullWidth color="primary" style={{color: "#ffffff"}}>  Inicializar </Button>

        </Form>
        <Form onSubmit={handleSubmit(entrenar)} className="">
            <Button className="mt-4" type="sumbit" variant="contained" fullWidth color="primary" style={{color: "#ffffff"}}>Entrenar</Button>
        </Form>



    </>
}

export default PerceptronConfigs;
