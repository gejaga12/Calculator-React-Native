import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {BotonCalc} from '../components/BotonCalc';
import {styles} from '../theme/appTheme';

export const CalculadoraScreen = () => {
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');

  const limpiar = () => {
    setNumero('0');
  };

  const armarNumero = (NumeroTexto: string) => {
    // NO ACEPTAR DOBLE PUNTO
    if (numero.includes('.') && NumeroTexto === '.') return;

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      //PUNTO DECIMAL
      if (NumeroTexto === '.') {
        setNumero(numero + NumeroTexto);
        //EVALUAR SI ES OTRO CERO Y HAY UN PUNTO
      } else if (NumeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + NumeroTexto);
        // EVALUAR SI ES DIF A CERO Y NO TIENE PUNTO
      } else if (NumeroTexto !== '0' && !numero.includes('.')) {
        setNumero(NumeroTexto);
        //EVITAR 0000.0
      } else if (NumeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      }
    } else {
      setNumero(numero + NumeroTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  return (
    <View style={styles.calculadoraContainer}>
      <Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>
      <Text style={styles.resultado} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>

      {/* FILA DE BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="C" color="#9B9B9B" accion={limpiar} />
        <BotonCalc texto="+/-" color="#9B9B9B" accion={positivoNegativo} />
        <BotonCalc texto="del" color="#9B9B9B" accion={limpiar} />
        <BotonCalc texto="/" color="#FF9427" accion={limpiar} />
      </View>
      {/* FILA DE BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="7" accion={armarNumero} />
        <BotonCalc texto="8" accion={armarNumero} />
        <BotonCalc texto="9" accion={armarNumero} />
        <BotonCalc texto="X" color="#FF9427" accion={limpiar} />
      </View>
      {/* FILA DE BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="4" accion={armarNumero} />
        <BotonCalc texto="5" accion={armarNumero} />
        <BotonCalc texto="6" accion={armarNumero} />
        <BotonCalc texto="-" color="#FF9427" accion={limpiar} />
      </View>
      {/* FILA DE BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="1" accion={armarNumero} />
        <BotonCalc texto="2" accion={armarNumero} />
        <BotonCalc texto="3" accion={armarNumero} />
        <BotonCalc texto="+" color="#FF9427" accion={limpiar} />
      </View>
      {/* FILA DE BOTONES */}
      <View style={styles.fila}>
        <BotonCalc texto="0" ancho accion={armarNumero} />
        <BotonCalc texto="." accion={armarNumero} />
        <BotonCalc texto="=" color="#FF9427" accion={limpiar} />
      </View>
    </View>
  );
};
