const Clientes = require("../models/Clientes");

//Agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);

  try {
    //almacenar el registro
    await cliente.save();
    res.json({
      mensaje: "Se agrego un nuevo cliente",
    });
  } catch (error) {
    //si hay error, console.log y next
    /* console.log(error); */
    res.send(error);
    next();
  }
};

//Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

//Mostrar un unico cliente por ID
/* exports.mostrarCliente = async (req, res, next) => {
  const cliente = await Clientes.findById(req.params.idCliente);
  if (!cliente) {
    res.json({ mensaje: "Cliente no existe" });
    next();
  }
  //mostrar el cliente
  res.json(cliente);
}; */
exports.mostrarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findById(req.params.idCliente);
    res.json(cliente);
  } catch (error) {
    console.log(error);
    next();
  }
};
//actualiza un cliente
exports.actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      {
        _id: req.params.idCliente,
      },
      req.body,
      {
        new: true,
      }
    );
    res.json(cliente);
  } catch (error) {
    res.send(error);
    /* console.log(error); */
    next();
  }
};
//elimina cliente por id
exports.eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.idCliente });
    res.json({ mensaje: "El cliente fue eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};
