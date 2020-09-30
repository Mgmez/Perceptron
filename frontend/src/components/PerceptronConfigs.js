import React,{useContext, useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl } from 'react-bootstrap';

import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@material-ui/core';
import Perceptron from '../hooks/Perceptron.js';
import { PerceptronContext } from "./PerceptronContext.js";
import Adaline from '../algoritmos/Adaline.js';


const perceptronTypes = [
    {
        label: "Perceptron",
        value: "perceptron"
    },
    {
        label: "Adaline",
        value: "adaline"
    },
    {
        label: "Ambos",
        value: "both"
    }
]

const PerceptronConfigs = (props) =>  {    
<<<<<<< HEAD
     
    const { handleSubmit, register, errors, control } = useForm();
=======
    //const [perceptron, setPerceptron] = useState(null);
    //const [entrenado, setEntrenado] = useState(false);    
    const { handleSubmit, register, errors, control, watch } = useForm();
>>>>>>> b6206d2769305bad1601a23a0a8aa2a171c7d1a4
    const {perceptronState, setPerceptronState} = useContext(PerceptronContext);
    const [perceptronErrors, setPerceptronErrors] = useState({});

    const type = watch("type");
    
    const iniciarPesos = async (values) =>{
        console.log(values);
        setPerceptronErrors({});
        if (!perceptronState?.x?.length) {
            setPerceptronErrors({
                trainingSet: {
                    message: "Agregue datos de entrenamiento"
                }
            });
            return;
        }
        //const perceptron = new Perceptron(perceptronState.x[0].length, values.learning_rate, values.max_epic_number, perceptronState.cpDrawer);
        const perceptron = new Adaline(
            perceptronState.x[0].length,             
            values.max_epic_number,
            values.learning_rate,
            perceptronState.cpDrawer);

        setPerceptronState( {
            ...perceptronState,
            perceptron,
        
        });       
        const x2 = []; 
        x2[0] = perceptron.calcularX2(-5);
        x2[1] = perceptron.calcularX2(5);
        console.log("x2: ", x2);
        perceptronState.cpDrawer.drawLine(-5, x2[0],5, x2[1], "#0101DF" );

      }
      const entrenar = async () =>{     
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
        setPerceptronState( {
            ...perceptronState,
            entrenado: true,
            limiteAlcanzado: xd
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
                label="Nivel de aprendizaje"
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
                defaultValue ={50}
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
            {
                (type === "adaline" || type === "both") &&
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
            }
           
            <Controller
                defaultValue ={"perceptron"}
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
                    perceptronTypes.map((type, index) => 
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
            <br />

        

            {
                perceptronErrors.trainingSet &&
                <span className="error">{perceptronErrors.trainingSet.message}</span>
            }

            {
                perceptronErrors.trainedPerceptron &&
                <span className="error">{perceptronErrors.trainedPerceptron.message}</span>
            }
            
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>  Inicializar </Button>
            
        </Form>
        <Form onSubmit={handleSubmit(entrenar)} className="">                        
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>Entrenar</Button>
        </Form>
        
        <Form onSubmit={handleSubmit(reiniciar)} className="">                        
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>Reiniciar</Button>
        </Form>

    </>
}

export default PerceptronConfigs;