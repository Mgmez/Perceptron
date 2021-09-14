import React,{useContext, useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl } from 'react-bootstrap';
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import Adaline from '../algoritmos/Adaline.js';
import Perceptron from "../algoritmos/Perceptron";
import { PerceptronContext } from "./PerceptronContext.js";


const PerceptronConfigs = (props) =>  {    

    const { handleSubmit, register, errors, control, watch } = useForm();
    const {perceptronState, setPerceptronState} = useContext(PerceptronContext);
    const [perceptronErrors, setPerceptronErrors] = useState({});



    const iniciarPesosPerceptron = async (values) =>{

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
        perceptron = new Perceptron(
            perceptronState.x[0].length,
            values.learning_rate,
            values.max_epic_number,
            perceptronState.cpDrawer
        );

        setPerceptronState( {
            ...perceptronState,
            perceptron,

        });
        const x2 = [];
        x2[0] = perceptron.calcularX2(-5);
        x2[1] = perceptron.calcularX2(5);

        perceptronState.cpDrawer.clearCanvas();
        perceptronState.cpDrawer.drawAxis();
        perceptronState.x.forEach ((point, index) => {
            perceptronState.cpDrawer.drawPoint(perceptronState.cpDrawer.XC(point[0]), perceptronState.cpDrawer.YC(point[1]), perceptronState.y[index])
        });


        perceptronState.cpDrawer.drawLine(-5, x2[0],5, x2[1], "#fa0e11" );




    }
    const entrenarPerceptron = async () =>{
        setPerceptronErrors({});
        if (!perceptronState.perceptron) {
            setPerceptronErrors({
                "trainedPerceptron": {
                    message: "Inicialice Perceptron"
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

    }


    const iniciarPesosAdaline = async (values) =>{

        let adaline;
        setPerceptronErrors({});
        if (!perceptronState?.x?.length) {
            setPerceptronErrors({
                trainingSet: {
                    message: "Agregue datos de entrenamiento"
                }
            });
            return;
        }

        const perceptronx1 = perceptronState.perceptron.calcularX2(-5);
        const perceptronx2 = perceptronState.perceptron.calcularX2(5);
        adaline = new Adaline(
            perceptronState.x[0].length,
            values.max_epic_number,
            values.max_error,
            values.learning_rate,
            perceptronState.cpDrawer,
            perceptronx1,
            perceptronx2
        );

        setPerceptronState( {
            ...perceptronState,
            adaline,

        
        });       
        const x2 = []; 
        x2[0] = adaline.calcularX2(-5);
        x2[1] = adaline.calcularX2(5);
        console.log("x2: ", x2);
        perceptronState.cpDrawer.clearCanvas();
        perceptronState.cpDrawer.drawAxis();
        perceptronState.x.forEach ((point, index) => {
            perceptronState.cpDrawer.drawPoint(perceptronState.cpDrawer.XC(point[0]), perceptronState.cpDrawer.YC(point[1]), perceptronState.y[index])             
        });          


        perceptronState.cpDrawer.drawLine(-5, x2[0],5, x2[1], "#0101DF" );

        
        

      }
      const entrenarAdaline = async () =>{
        setPerceptronErrors({});
        if (!perceptronState.adaline) {
            setPerceptronErrors({
                "trainedPerceptron": {
                    message: "Inicialice Adaline"
                }
            });
            return;
        }           
        await perceptronState.adaline.fit(perceptronState.x, perceptronState.y);

        const  limiteAlcanzado = perceptronState.adaline.errorAcumulado.length >= perceptronState.adaline.iterations;
        setPerceptronState( {
            ...perceptronState,
            adalineEntrenado: true,
            limiteAlcanzadoAdaline: limiteAlcanzado
        });           

    }


    return <>

        {!perceptronState.entrenado
            ? <>
                <Form onSubmit={handleSubmit(iniciarPesosPerceptron)} className="">
                    <Controller
                        as={TextField}
                        name="learning_rate"
                        control={control}
                        id="learning_rate"
                        name="learning_rate"
                        label="Learning rate"
                        rules={{
                            required: "Este campo es requerido",
                            validate: value => (parseFloat(value, 10) > 0 && parseFloat(value, 10) <= 1) || "El valor debe ser entre 0 y 1",
                        }}
                        helperText={errors?.learning_rate?.message}
                        error={!!errors?.learning_rate}
                        defaultValue={0.01}
                        margin="normal"
                    />

                    <Controller
                        defaultValue={500}
                        as={TextField}
                        name="max_epic_number"
                        control={control}
                        id="max_epic_number"
                        name="max_epic_number"
                        label="Épocas máximas"
                        rules={{required: "Este campo es requerido"}}
                        helperText={errors?.max_epic_number?.message}
                        error={!!errors?.max_epic_number}
                        margin="normal"
                    />



                    {
                        perceptronErrors.trainingSet &&
                        <span className="error">{perceptronErrors.trainingSet.message}</span>
                    }

                    {
                        perceptronErrors.trainedPerceptron &&
                        <span className="error">{perceptronErrors.trainedPerceptron.message}</span>
                    }

                    <Button className="mt-4" variant="contained" type="sumbit" fullWidth color="primary"
                            style={{color: "#ffffff"}}> Inicializar Perceptron</Button>

                </Form>
                <Form onSubmit={handleSubmit(entrenarPerceptron)} className="">
                    <Button className="mt-4" type="sumbit" variant="contained" fullWidth color="primary"
                            style={{color: "#ffffff"}}>Entrenar Perceptron</Button>
                </Form>

            </>
            :
            <>
                <Form onSubmit={handleSubmit(iniciarPesosAdaline)} className="">
                    <Controller
                        as={TextField}
                        name="learning_rate"
                        control={control}
                        id="learning_rate"
                        name="learning_rate"
                        label="Learning rate"
                        rules={{
                            required: "Este campo es requerido",
                            validate: value => (parseFloat(value, 10) > 0 && parseFloat(value, 10) <= 1) || "El valor debe ser entre 0 y 1",
                        }}
                        helperText={errors?.learning_rate?.message}
                        error={!!errors?.learning_rate}
                        defaultValue={0.1}
                        margin="normal"
                    />

                    <Controller
                        defaultValue={100}
                        as={TextField}
                        name="max_epic_number"
                        control={control}
                        id="max_epic_number"
                        name="max_epic_number"
                        label="Épocas máximas"
                        rules={{required: "Este campo es requerido"}}
                        helperText={errors?.max_epic_number?.message}
                        error={!!errors?.max_epic_number}
                        margin="normal"
                    />


                    <Controller
                        defaultValue={0.01}
                        as={TextField}
                        name="max_error"
                        control={control}
                        id="max_error"
                        name="max_error"
                        label="Error"
                        rules={{required: "Este campo es requerido"}}
                        helperText={errors?.max_error?.message}
                        error={!!errors?.max_error}
                        margin="normal"
                    />


                    {
                        perceptronErrors.trainingSet &&
                        <span className="error">{perceptronErrors.trainingSet.message}</span>
                    }

                    {
                        perceptronErrors.trainedPerceptron &&
                        <span className="error">{perceptronErrors.trainedPerceptron.message}</span>
                    }

                    <Button className="mt-4" variant="contained" type="sumbit" fullWidth color="primary"
                            style={{color: "#ffffff"}}> Inicializar Adaline</Button>

                </Form>
                <Form onSubmit={handleSubmit(entrenarAdaline)} className="">
                    <Button className="mt-4" type="sumbit" variant="contained" fullWidth color="primary"
                            style={{color: "#ffffff"}}>Entrenar
                        Adaline</Button>
                </Form>

            </>
        }




    </>
}

export default PerceptronConfigs;