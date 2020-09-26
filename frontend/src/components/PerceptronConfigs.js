import React,{useContext, useState} from "react";
import { useForm, Controller } from "react-hook-form";
import { Form } from 'react-bootstrap';

import { Button, TextField } from '@material-ui/core';
import Perceptron from '../hooks/Perceptron.js';
import { PerceptronContext } from "./PerceptronContext.js";





const PerceptronConfigs = (props) =>  {

    
    //const [perceptron, setPerceptron] = useState(null);
    //const [entrenado, setEntrenado] = useState(false);    
    const { handleSubmit, register, errors, control } = useForm();
    const {perceptronState, setPerceptronState} = useContext(PerceptronContext);
    
    const iniciarPesos = async (values) =>{        
        console.log(values);
        setPerceptronState( {
            perceptron: new Perceptron(4, values.learning_rate, values.max_epic_number),
            entrenado: false 
        });
      }
      const entrenar = () =>{                
        perceptronState.perceptron.fit();     
        setPerceptronState( {
            perceptron: perceptronState.perceptron,
            entrenado: true
        });           
        console.log(perceptronState.perceptron.w);
      }
      const probar = () =>{
      
        const x = [1, 0, 1];
     //   const xd = perceptronState.perceptron.predict(x);
       
        
        
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
            
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>  Inicializar </Button>
            
        </Form>
        <Form onSubmit={handleSubmit(entrenar)} className="">                        
            <Button className="mt-4" type="sumbit" fullWidth color="primary" style={{color: "#03A9F4"}}>Perceptrón</Button>
        </Form>
        

    </>
}

export default PerceptronConfigs;