import {useRef, useState} from 'react';

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const useCalculadora = () => {
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');
  const ultimaOperacion = useRef<Operadores>();

  // BOTON C
  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
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
        // EVALUAR SI ES DIFERENTE A CERO Y NO TIENE PUNTO
      } else if (NumeroTexto !== '0' && !numero.includes('.')) {
        setNumero(NumeroTexto);
        //EVITAR 0000.0
      } else if (NumeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + NumeroTexto);
      }
    } else {
      setNumero(numero + NumeroTexto);
    }
  };

  //BOTON DELETE
  const btnDelete = () => {
    let negativo = '';
    let numeroTempo = numero;
    if (numero.includes('-')) {
      negativo = '-';
      numeroTempo = numero.substring(1);
    }
    if (numeroTempo.length > 1) {
      setNumero(numeroTempo.slice(0, -1));
    } else {
      setNumero('0');
    }
  };

  // BOTON POSITIVO NEGATIVO
  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const cambiarNumPorAnteriror = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumPorAnteriror();
    ultimaOperacion.current = Operadores.dividir;
  };

  const btnMultiplicar = () => {
    cambiarNumPorAnteriror();
    ultimaOperacion.current = Operadores.multiplicar;
  };

  const btnRestar = () => {
    cambiarNumPorAnteriror();
    ultimaOperacion.current = Operadores.restar;
  };

  const btnSumar = () => {
    cambiarNumPorAnteriror();
    ultimaOperacion.current = Operadores.sumar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${num1 + num2} `);
        break;
      case Operadores.restar:
        setNumero(`${num2 - num1} `);
        break;
      case Operadores.multiplicar:
        setNumero(`${num1 * num2} `);
        break;
      case Operadores.dividir:
        setNumero(`${num2 / num1} `);
        break;
    }
    setNumeroAnterior('0');
  };

  return {
    numeroAnterior,
    numero,
    limpiar,
    positivoNegativo,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
    armarNumero,
  };
};
