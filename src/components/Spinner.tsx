import React, { useEffect, useState } from 'react';

interface SpinnerProps {
  color?: string; // Puedes permitir que el color sea pasado como prop
  size?: string; // Tamaño del spinner
}

const Spinner: React.FC<SpinnerProps> = ({ color = 'green-500', size = '24' }) => {
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(false); // Nuevo estado para controlar la carga

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true); // Cambia el estado a cargado después de 10 segundos
    }, 10000); // 10 segundos en milisegundos

    return () => clearTimeout(timer); // Limpiar el timeout al desmontar el componente
  }, []);

  useEffect(() => {
    // Si el componente está cargado, verifica si han pasado 10 segundos
    if (loaded) {
      setVisible(false); // Oculta el spinner si ya se ha cargado
    }
  }, [loaded]);

  return visible ? ( // Solo renderiza si visible es true
    <div className="flex flex-col items-center justify-center h-screen">
      <div 
        className={`border-t-4 border-${color} border-solid rounded-full w-${size} h-${size} animate-spin`} 
      />
      <span className="mt-4 text-lg text-blue-500">
        Cargando...
      </span>
    </div>
  ) : null;
};

export default Spinner;