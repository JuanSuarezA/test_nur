import "./App.css";
import { useState } from "react";
import Axios from "axios";

type Usuario = {
  id: number;
  nombre: string;
  email: string;
  tipo: string;
  password: string;
};

function App() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState(0);
  const [editar, setEditar] = useState(false);
  const [usuariosList, setUsuarios] = useState<Usuario[]>([]);

  const editarUsuarios = (val: Usuario) => {
    setEditar(true);
    setNombre(val.nombre);
    setEmail(val.email);
    setTipo(val.tipo);
    setPassword(val.password);
    setId(val.id);
  };

  const limpiar = () => {
    setNombre("");
    setEmail("");
    setTipo("");
    setPassword("");
    setEditar(false);
  };

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      email: email,
      tipo: tipo,
      password: password,
    }).then(() => {
      alert("Usuario Registrado");
      limpiar();
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      email: email,
      tipo: tipo,
      password: password,
    }).then(() => {
      alert("Usuario Actualizado con Exito");
      limpiar();
    });
  };

  const eliminar = (id: number) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      alert("Usuario eliminado con Exito");
      getUsuarios();
      limpiar();
    });
  };

  const getUsuarios = () => {
    Axios.get("http://localhost:3001/usuarios").then((response) => {
      setUsuarios(response.data);
    });
  };

  getUsuarios();

  return (
    <>
      <div className="container">
        <h2>CRUD Usuarios</h2>
        <form>
          <div className="row">
            <div className="mb-3 col-3">
              <label className="form-label">Nombre</label>
              <input
                onChange={(event) => {
                  setNombre(event.target.value);
                }}
                type="text"
                className="form-control"
                value={nombre}
              />
            </div>
            <div className="mb-3 col-3">
              <label className="form-label">Email</label>
              <input
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                type="text"
                className="form-control"
                value={email}
              />
            </div>
            <div className="mb-3 col-3">
              <label className="form-label">Tipo</label>
              <input
                onChange={(event) => {
                  setTipo(event.target.value);
                }}
                type="text"
                className="form-control"
                value={tipo}
              />
            </div>
            <div className="mb-3 col-3">
              <label className="form-label">Password</label>
              <input
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                type="password"
                className="form-control"
                value={password}
              />
            </div>
          </div>
          <div className="row">
            <div className="mb-3 d-grid gap-2">
              {editar ? (
                <>
                  <button
                    onClick={update}
                    type="button"
                    className="btn btn-warning"
                  >
                    Actualizar
                  </button>
                  <button
                    onClick={limpiar}
                    type="button"
                    className="btn btn-primary"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button onClick={add} type="button" className="btn btn-success">
                  Guardar
                </button>
              )}
            </div>
          </div>
          <div className="row">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Password</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosList.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.id}</td>
                      <td>{val.nombre}</td>
                      <td>{val.email}</td>
                      <td>{val.tipo}</td>
                      <td>{val.password}</td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Basic mixed styles example"
                        >
                          <button
                            onClick={() => {
                              editarUsuarios(val);
                            }}
                            type="button"
                            className="btn btn-warning"
                          >
                            Actualizar
                          </button>

                          <button
                            onClick={() => {
                              eliminar(val.id);
                            }}
                            type="button"
                            className="btn btn-danger"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
