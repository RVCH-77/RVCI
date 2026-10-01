import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.jsx'
import './App.css'

function datos() {
  const titulo = "CIRV-TIENDA-AWP";
  const subtitulo = "Tienda del IDGS 1004 WACHO";

  return {
    titulo,
    subtitulo
  }
}

function Encabezado() {
  const { titulo, subtitulo } = datos();

  return (
    <div className="bg-warning text-center p-4 mb-4 shadow-sm">
      <h1 className="fw-bold">{titulo}</h1>
      <h3 className="text-black">{subtitulo}</h3>
    </div>
  );
}

function Productos({ nombre, precio, imagen }) {
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className="card shadow h-100">
        <img
          className="card-img-top p-3"
          src={imagen}
          style={{ height: "220px", objectFit: "contain" }}
          alt={nombre}
        />
        <div className="card-body text-center d-flex flex-column justify-content-between">
          <h5 className="card-title text-capitalize">{nombre}</h5>
          <span className="fw-bold fs-5 text-dark">Precio: ${precio}</span>
        </div>
      </div>
    </div>
  );
}

function ContadorCarga({ segundos }) {
  return (
    <div className="container text-center my-5 py-4">
      <div
        className="card shadow-lg p-4 mx-auto border-warning"
      >
        <div className="card-body">
          <div
            className="spinner-border text-warning mb-3"
            
            role="status"
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h3 className="card-title fw-bold text-dark mb-2">Cargando Catálogo</h3>
          <p className="text-muted mb-3">
            El catálogo de productos se mostrará en:
          </p>
          <div
            className="display-1 fw-bold text-warning my-2"
           
          >
            {segundos}
          </div>
          <span className="badge bg-warning text-dark fs-6 px-3 py-2 mt-2">
            
          </span>
        </div>
      </div>
    </div>
  );
}

function Estante() {
  const productos = [
    { id: 1, nombre: "sabritas avanero", precio: 20, imagen: "./img/sabritas-avanero.webp" },
    { id: 2, nombre: "sabritas crema", precio: 25, imagen: "./img/sabritas-crema-especias.webp" },
    { id: 3, nombre: "Sabritas Originales", precio: 25, imagen: "./img/Papas_Sabritas_original.webp" },
    { id: 4, nombre: "Sabritas adobadas", precio: 50, imagen: "./img/adobadas-papas.webp" }
  ];

  return (
    <div className="container">
      <h2 className="text-center mb-4 fw-bold">Catálogo de Productos</h2>
      <div className="row">
        {productos.map(producto => (
          <Productos
            key={producto.id}
            nombre={producto.nombre}
            precio={producto.precio}
            imagen={producto.imagen}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [contador, setContador] = useState(3);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    if (contador > 0) {
      const timer = setTimeout(() => {
        setContador(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCargado(true);
    }
  }, [contador]);

  return (
    <div>
      <Encabezado />
      {!cargado ? (
        <ContadorCarga segundos={contador} />
      ) : (
        <Estante />
      )}
      <PWABadge />
    </div>
  );
}

export default App;

