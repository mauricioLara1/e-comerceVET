const crypto = require('crypto');

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const multer = require('multer');


// Configuración de multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//apartado correos

const nodeMailer  = require('nodemailer');
const { error, info } = require('console');
//perb luog wbfv iomv
const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user:"papyrus1764@gmail.com",
        pass:"perbluogwbfviomv"
    }
});

let mail ={
    from: "papyrus1764@gmail.com",
    to: "jmlm1719lara@gmail.com",
    subject: "hola",
    text: "hola usuario",
    html: `<h5>Este mensaje es desde nodemailer</h5>`
}

    app.post("/correoTest",async (req, res) => {
    try {
        transporter.sendMail(mail, (error, info) => {
            if(error){
                console.log("error en send email",error.message);
            }else{
                console.log("email sent");
            }
        });
    } catch (error) {
        console.log(error.message);
    }
    });
    app.post("/send-rejected-email", (req, res) => {
    const { idcitas, cliente, servicio, fecha, hora, correo } = req.body;
    const mailOptions = {
      from: "papyrus1764@gmail.com",
      to: correo,
      subject: "Cita Rechazada",
      html: `
        <h1>Cita Rechazada</h1>
        <p>Hola ${cliente},</p>
        <p>Lo lamentamos pero tu cita ha sido rechazada. Aquí están los detalles:</p>
        <ul>
          <li><strong>Código de cita:</strong> ${idcitas}</li>
          <li><strong>Servicio:</strong> ${servicio}</li>
          <li><strong>Fecha:</strong> ${fecha}</li>
          <li><strong>Hora:</strong> ${hora}</li>
        </ul>
      `
    };
  
    // Llamada a la función de envío de correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error enviando el correo");
      } else {
        console.log('Correo enviado:', info.response);
        res.status(200).send("Correo enviado");
      }
    });
    });
    app.post("/send-acceptance-email", (req, res) => {
    const { idcitas, cliente, servicio, fecha, hora, correo } = req.body;
    const mailOptions = {
      from: "papyrus1764@gmail.com",
      to: correo,
      subject: "Cita Aceptada",
      html: `
        <h1>Cita Aceptada</h1>
        <p>Hola ${cliente},</p>
        <p>Tu cita ha sido aceptada. Aquí están los detalles:</p>
        <ul>
          <li><strong>Código de cita:</strong> ${idcitas}</li>
          <li><strong>Servicio:</strong> ${servicio}</li>
          <li><strong>Fecha:</strong> ${fecha}</li>
          <li><strong>Hora:</strong> ${hora}</li>
        </ul>
      `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error enviando el correo");
      } else {
        console.log('Correo enviado:', info.response);
        res.status(200).send("Correo enviado");
      }
    });
    });
    app.post("/send-completion-email", (req, res) => {
    const { idcitas, cliente, servicio, fecha, hora, correo } = req.body;
    const mailOptions = {
      from: "tuemail@gmail.com",
      to: correo,
      subject: "Cita Finalizada",
      html: `
        <h1>Cita Finalizada</h1>
        <p>Hola ${cliente},</p>
        <p>Tu cita ha sido finalizada. Aquí están los detalles:</p>
        <ul>
          <li><strong>Código de cita:</strong> ${idcitas}</li>
          <li><strong>Servicio:</strong> ${servicio}</li>
          <li><strong>Fecha:</strong> ${fecha}</li>
          <li><strong>Hora:</strong> ${hora}</li>
        </ul>
        <p>Queremos conocer tu opinión. Por favor, llena la siguiente <a href="https://forms.gle/3gTt78kfYec7PbXj6">encuesta de satisfacción</a>.</p>
      `
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error enviando el correo");
      } else {
        console.log('Correo enviado:', info.response);
        res.status(200).send("Correo enviado");
      }
    });
    });

    //olvidaste contraseña:
        // Enviar código al correo
        app.post("/usuarios/solicitar-codigo", async (req, res) => {
            try {
                const { correo } = req.body;
                const usuario = await pool.query("SELECT * FROM usuarios WHERE correo = $1", [correo]);

                if (usuario.rows.length === 0) {
                    return res.status(404).json({ message: "El correo electrónico no está registrado." });
                }

                const nuevoCodigo = generarCodigoAleatorio();
                await pool.query("UPDATE usuarios SET codigo = $1 WHERE correo = $2", [nuevoCodigo, correo]);

                // Configura nodemailer
                let transporter = nodeMailer.createTransport({
                    service: 'gmail', // Usa el servicio de tu preferencia
                    auth: {
                        user: 'papyrus1764@gmail.com',
                        pass: 'perbluogwbfviomv'
                    }
                });

                // Enviar correo
                let mailOptions = {
                    from: 'tuemail@gmail.com',
                    to: correo,
                    subject: 'Código de Verificación',
                    text: `Tu código de verificación es: ${nuevoCodigo}`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return res.status(500).send(error.toString());
                    }
                    res.json({ message: "El código ha sido enviado exitosamente." });
                });

            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error en el servidor.");
            }
        });

        app.post("/send-sell-email", (req, res) => {
            const { cliente, correo } = req.body;
            
            // Log para verificar que los datos están llegando correctamente
            console.log("Cliente:", cliente);
            console.log("Correo:", correo);
        
            if (!correo) {
                return res.status(400).send("Correo no definido");
            }
        
            const mailOptions = {
                from: "papyrus1764@gmail.com",
                to: correo,
                subject: "venta despachada",
                html: `
                    <h1>Cita Aceptada</h1>
                    <p>Hola ${cliente},</p>
                    <p>Tu compra ha sido despachada. En las próximas horas tocaremos tu puerta.</p>
                `
            };
        
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).send("Error enviando el correo");
                } else {
                    console.log('Correo enviado:', info.response);
                    return res.status(200).send("Correo enviado");
                }
            });
        });
        
    
//ROUTES//
    //funciones barrios aprovados
        //obtener barriosAprovados
            app.get("/barriosAprovados", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM barriosAprovados");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    
    //funciones categorias
        //obtener tablas categorias
            app.get("/categorias", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM categorias");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

    //funciones citas
        //obtener citas
            app.get("/citas", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM citas");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
        //registrar una cita en la db
            app.post("/citas", async (req, res) => {
                try {
                    //obtener los datos del http
                    const { direccion, fechacita, horacita, comentariocliente,idservicio,idtipodomicilio,idmascota,idbarrioaprovado,idcliente } = req.body;
                    const idestadocita = 2;

                    // Verificación de la hora de la cita (7:00 AM - 6:00 PM)
                    const [hour, minute] = horacita.split(":").map(Number);
                    if (hour < 7 || hour > 18 || (hour === 18 && minute > 0)) {
                        return res.status(400).send("La hora de la cita debe estar entre las 7:00 AM y las 6:00 PM.");
                    }
                    
                    // Verificación de la fecha de la cita (mínimo 36 horas después de la solicitud)
                    const fechaActual = new Date();
                    const fechaCitaDate = new Date(fechacita);
                    const diferenciaHoras = (fechaCitaDate - fechaActual) / (1000 * 60 * 60);
                    if (diferenciaHoras < 36) {
                        return res.status(400).send("La fecha de la cita debe ser al menos 36 horas después del momento de la solicitud.");
                    }

                    // Realizar la inserción en la base de datos
                    const newCita = await pool.query(
                        "INSERT INTO citas (direccion,fechacita,horacita,comentariocliente,idservicio,idtipodomicilio,idmascota, idbarrioaprovado,idestadocita,idcliente) VALUES  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
                        [direccion,fechacita,horacita,comentariocliente,idservicio,idtipodomicilio,idmascota, idbarrioaprovado,idestadocita,idcliente ]
                    );
            
                    res.json(newCita.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar la cita en la base de datos.");
                }
            });
        //modificar estado de una cita en la db
            //aceptar
            app.put("/citas/aceptar/:id", async(req,res) =>{
                try {
                    const{ id } = req.params;
                    const aceptarCita = await pool.query(
                        "UPDATE citas SET idestadocita = 3 WHERE idcitas = $1",
                        [id]
                    );
                    res.json("se acepto una cita");
                } catch (error) {
                    console.error(error.message);
                }
            });

            //aceptar
            app.put("/citas/rechazar/:id", async(req,res) =>{
                try {
                    const{ id } = req.params;
                    const aceptarCita = await pool.query(
                        "UPDATE citas SET idestadocita = 1 WHERE idcitas = $1",
                        [id]
                    );
                    res.json("se rechazo una cita");
                } catch (error) {
                    console.error(error.message);
                }
            });
            //aceptar
            app.put("/citas/finalizar/:id", async(req,res) =>{
                try {
                    const{ id } = req.params;
                    const aceptarCita = await pool.query(
                        "UPDATE citas SET idestadocita = 4 WHERE idcitas = $1",
                        [id]
                    );
                    res.json("se acepto una cita");
                } catch (error) {
                    console.error(error.message);
                }
            });
            
    //tablas clientes
        //obtener clientes
            app.get("/clientes", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM clientes");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
        //publicar clientes
        app.post("/clientes", async (req, res) => {
            try {
                // Obtener los datos del HTTP
                const { nuipcliente, correo, telefono, nombres } = req.body;
        
                // Realizar la inserción en la base de datos
                const newCliente = await pool.query(
                    "INSERT INTO clientes (nuipcliente, correo, telefono, nombres) VALUES ($1, $2, $3, $4) RETURNING idcliente",
                    [nuipcliente, correo, telefono, nombres]
                );
        
                // Retornar solo el valor de idcliente
                res.json({ idcliente: newCliente.rows[0].idcliente });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el cliente en la base de datos.");
            }
        });
        
    //tablas detalle ventas
        //obtener detalles ventas
            app.get("/detalleVenta", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM detalleVenta");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
        //publicar un detalle venta
            app.post("/detalleVenta", async (req, res) => {
                try {
                    const { cantidad, valortotal, idventa, idproducto } = req.body;

                    // Realizar la inserción en la base de datos
                    const newDetalleVenta = await pool.query(
                        "INSERT INTO detalleVenta (cantidad, valortotal, idventa, idproducto) VALUES ($1, $2, $3, $4) RETURNING *",
                        [cantidad, valortotal, idventa, idproducto]
                    );
            
                    res.json(newDetalleVenta.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar el detalle de venta en la base de datos.");
                }
            });

        //modificar un detalle venta

    //tabla dias disponibles
        //obtener diasDisponibles
            app.get("/diasDisponibles", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM diasDisponibles");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla especies
        //obtener especies
            app.get("/especies", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM especies");
                    res.json(allTodos.rows)
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla estados citas
        //obtener estados citas
            app.get("/estadoCita", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM estadoCita");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tablas estados venta
        //obtener estados de ventas
            app.get("/estadosVentas", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM estadosVentas");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
  
    //tabla de mascotas de las citas
        //obtener mascotas de las citas
            app.get("/mascotascitas", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM mascotascitas");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

        //publicar mascotas de las citas
            app.post("/mascotascitas", async (req, res) => {
                try {
                    //obtener lo escrito en el raw body
                    const { nombremascota, raza } = req.body;
            
                    // Realizar la inserción en la base de datos
                    const newMascota = await pool.query(
                        "INSERT INTO mascotascitas (nombreMascota, raza) VALUES ($1, $2) RETURNING *",
                        [nombremascota, raza]
                    );
            
                    res.json({idmascota: newMascota.rows[0].idmascota});
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar la mascota en la base de datos.");
                }
            });
    //tabla mascotas de usuarios
        //obtener mascotas de usuarios
            app.get("/mascotasusuario", async(req,res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM mascotasusuario");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

        //publicar mascotas de usuario
            app.post("/mascotasusuario", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
        
        //borrar mascota de usuario
            app.delete("/mascotasusuario", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

        //modificar mascota de usario
            app.patch("/mascotasusuario", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla productos tienda
        //publicar producto tienda
        app.post('/productos', upload.single('foto'), async (req, res) => {
            try {
                const { producto, descripccion, precioventa, idespecie, idcategoria } = req.body;
                const foto = req.file ? req.file.buffer : null;
        
                // Validar que todos los campos requeridos estén presentes
                if (!producto || !descripccion || precioventa === undefined || idespecie === undefined || idcategoria === undefined || !foto) {
                    return res.status(400).send("Por favor, complete todos los campos obligatorios.");
                }
        
                // Insertar producto en la base de datos
                const newProducto = await pool.query(
                    "INSERT INTO productos (producto, descripccion, precioventa, idespecie, idcategoria, foto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                    [producto, descripccion, precioventa, idespecie, idcategoria, foto]
                );
        
                res.json({ idproducto: newProducto.rows[0].idproducto });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el producto en la base de datos.");
            }
        });
        //obtener producto tienda
        app.get("/productos", async (req, res) => {
            try {
                const allProducts = await pool.query("SELECT idproducto, producto, descripccion, precioventa, idespecie, idcategoria, foto FROM productos");
                res.json(allProducts.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener productos activos
        app.get('/productos/activos', async (req, res) => {
            try {
              const productosActivos = await pool.query('SELECT * FROM productos WHERE activo = true');
              res.json(productosActivos.rows);
            } catch (error) {
              console.error(error.message);
              res.status(500).json('Error al obtener los productos');
            }
        });
        //cambiar precio
        app.put('/productos/precio/:idproducto/precioventa', async (req, res) => {
            try {
                const { idproducto } = req.params;
                const { precioventa } = req.body;
        
                // Validar que el precio de venta esté presente
                if (precioventa === undefined) {
                    return res.status(400).send("Por favor, proporcione el nuevo precio de venta.");
                }
        
                // Actualizar el precio de venta del producto en la base de datos
                const updatedProducto = await pool.query(
                    "UPDATE productos SET precioventa = $1 WHERE idproducto = $2 RETURNING *",
                    [precioventa, idproducto]
                );
        
                if (updatedProducto.rowCount === 0) {
                    return res.status(404).send("Producto no encontrado.");
                }
        
                res.json({ message: "Precio de venta actualizado correctamente.", producto: updatedProducto.rows[0] });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al actualizar el precio de venta en la base de datos.");
            }
        });
        //borrado suave productos
        app.put('/productos/borrar/:id', async (req, res) => {
                try {
                const { id } = req.params;
                const borrarProducto = await pool.query(
                    'UPDATE productos SET activo = false WHERE idproducto = $1',
                    [id]
                );
                res.json('Producto borrado suavemente');
                } catch (error) {
                console.error(error.message);
                res.status(500).json('Error al borrar el producto');
                }
        });
        

        

        //obtener productos segun categorias
            //comida
            app.get("/productos/comida", async(req,res) => {
                try {
                    console.log("comida")
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 1 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //hogar
            app.get("/productos/hogar", async(req,res) => {
                try {
                    console.log("hogar")
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 2 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //juguetes
            app.get("/productos/juguetes", async(req,res) => {
                try {
                    console.log("juguetes")
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 3 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //salud
            app.get("/productos/salud", async(req,res) => {
                try {
                    console.log("salud")
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 4 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //viaje
            app.get("/productos/viaje", async(req,res) => {
                try {
                    console.log("viaje")
                    const allTodos = await pool.query("SELECT * FROM productos where idcategoria = 5 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            //paseo
            app.get("/productos/paseo", async(req,res) => {
                try {
                    console.log("paseo")
                    const allTodos = await pool.query("select * from productos where idcategoria = 6 ");
                    res.json( allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
            
        //publicar producto tienda


          

    //tabla productos intrahospitalarios
        //obtener producto intrahospitalarios
            app.get("/productosIntrahospitalarios", async (req,res) =>{
                try {
                    const allTodos = await pool.query("SELECT * FROM productosIntrahospitalarios");
                    res.json(allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
        //obtener productos intrahospitalarios activos
            app.get("/productosIntrahospitalarios/activos", async (req, res) => {
                try {
                    const allTodos = await pool.query("SELECT * FROM productosIntrahospitalarios WHERE activo = true");
                    res.json(allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

        //publicar producto intrahospitalarios
            app.post("/productosIntrahospitalarios", async (req, res) => {
                try {
                    //obtener lo escrito en el raw body
                    const { nombreProductoIntrahospitalario, preciocompra, descripccion, inventarioactual, mininventariorecomendado} = req.body;
                    
                    // Verificar si los datos son válidos
                    
                    //volver el http a query sql
                    const newProducto = await pool.query(
                        "INSERT INTO productosIntrahospitalarios (nombreProductoIntrahospitalario, precioCompra, descripccion, inventarioActual, minInventarioRecomendado) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                        [nombreProductoIntrahospitalario, preciocompra, descripccion, inventarioactual, mininventariorecomendado]
                    );

                    res.json(newProducto.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar en la base de datos.");
                }
            });
        //modificar producto intrahospitalarios
            // Actualizar producto intrahospitalario, precio, inventario, miniinventariorecomendado
            app.put("/productosIntrahospitalarios/:id", async (req, res) => {
                try {
                    const { id } = req.params;
                    const { preciocompra, inventarioactual, mininventariorecomendado } = req.body;
                    
                    // Verificar si los datos son válidos
                    
                    // Actualizar los datos en la base de datos
                    const updateProducto = await pool.query(
                        "UPDATE productosIntrahospitalarios SET precioCompra = $1, inventarioActual = $2, minInventarioRecomendado = $3 WHERE idproductointrahospitalario = $4 RETURNING *",
                        [preciocompra, inventarioactual, mininventariorecomendado, id]
                    );

                    if (updateProducto.rows.length === 0) {
                        return res.status(404).send("Producto no encontrado");
                    }

                    res.json(updateProducto.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al actualizar en la base de datos.");
                }
            });
            //borrar producto intrahospitalario
            // Borrado suave de producto intrahospitalario
            app.delete("/productosIntrahospitalarios/:id", async (req, res) => {
                try {
                    const { id } = req.params;
                    
                    // Actualizar el estado de activo a false
                    const deleteProducto = await pool.query(
                        "UPDATE productosIntrahospitalarios SET activo = false WHERE idproductointrahospitalario = $1 RETURNING *",
                        [id]
                    );

                    if (deleteProducto.rows.length === 0) {
                        return res.status(404).send("Producto no encontrado");
                    }

                    res.json(deleteProducto.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al realizar el borrado suave en la base de datos.");
                }
            });




    //tabla proovedores
        //obtener proovedores
            app.get("/proveedores", async (req,res) =>{
                try {
                    const allTodos = await pool.query("SELECT * FROM proveedores");
                    res.json(allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });

        //publicar un proovedor
            app.post("/proveedores", async (req, res) => {
                try {
                    //obtener lo escrito en el raw body
                    const { nombreproveedor, telefonoproveedor, correo, direccion } = req.body;

                    // Verificar si los datos son válidos
                    
                    //volver el http a query sql
                    const newProveedor = await pool.query(
                        "INSERT INTO proveedores (nombreProveedor, telefonoProveedor, correo, direccion) VALUES ($1, $2, $3, $4) RETURNING *",
                        [nombreproveedor, telefonoproveedor, correo, direccion]
                    );

                    res.json(newProveedor.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar en la base de datos.");
                }
            });

        //modificar un proovedor
            app.patch("/proveedores", async(req,res) => {
                try {
                    res.json( "proximamente");
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla roles
        //obtener roles
            app.get("/roles", async (req,res) =>{
                try {
                    const allTodos = await pool.query("SELECT * FROM roles");
                    res.json(allTodos.rows);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al obtener en la base de datos.");
                }
            });
    //tabla de servicios:
    
    app.post("/servicios", async (req, res) => {
        try {
            const { servicio, idEspecie, idTamanoAnimal, idDiasDisponibles, idTipoServicio } = req.body;
    
            // Verificar si los datos son válidos
            if (!servicio || !idEspecie || !idTamanoAnimal || !idDiasDisponibles || !idTipoServicio || servicio.trim() === "") {
                return res.status(400).json({ message: "El servicio, idEspecie, idTamanoAnimal, idDiasDisponibles e idTipoServicio son campos obligatorios." });
            }
    
            // Verificar si las claves foráneas existen en las tablas relacionadas
            const especieExists = await pool.query("SELECT * FROM especies WHERE idEspecie = $1", [idEspecie]);
            if (especieExists.rows.length === 0) {
                return res.status(404).json({ message: "La especie especificada no existe." });
            }
    
            const tamanoAnimalExists = await pool.query("SELECT * FROM tamanoAnimales WHERE idTamanoAnimal = $1", [idTamanoAnimal]);
            if (tamanoAnimalExists.rows.length === 0) {
                return res.status(404).json({ message: "El tamaño del animal especificado no existe." });
            }
    
            const diasDisponiblesExists = await pool.query("SELECT * FROM diasDisponibles WHERE idDiasDisponibles = $1", [idDiasDisponibles]);
            if (diasDisponiblesExists.rows.length === 0) {
                return res.status(404).json({ message: "Los días disponibles especificados no existen." });
            }
    
            const tipoServicioExists = await pool.query("SELECT * FROM tiposServicios WHERE idTipoServicio = $1", [idTipoServicio]);
            if (tipoServicioExists.rows.length === 0) {
                return res.status(404).json({ message: "El tipo de servicio especificado no existe." });
            }
    
            // Realizar la inserción en la base de datos
            const newServicio = await pool.query(
                "INSERT INTO servicios (servicio, idEspecie, idTamanoAnimal, idDiasDisponibles, idTipoServicio) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [servicio, idEspecie, idTamanoAnimal, idDiasDisponibles, idTipoServicio]
            );
    
            res.json(newServicio.rows[0]);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Error al insertar el servicio en la base de datos.");
        }
    });

    //tabla de ventas
        //obtener ventas
            app.get("/ventas", async(req,res) =>{
                try {
                    const allTodos = await pool.query("SELECT * FROM ventas");
                    res.json(allTodos.rows);
                } catch (error) {
                    
                }
            });
        //publicar una venta
        
        //registrar una venta
            app.post("/ventas", async (req, res) => {
                try {
                    const { fechaventa, valortotal, direccion, idbarriosaprovado,idcliente} = req.body;
                    const idestadoventa = 2;
                    // Verificar si los datos son válidos
                    if (!fechaventa || !valortotal || !direccion || !idbarriosaprovado || !idestadoventa || !idcliente) {
                        return res.status(400).json({ message: "La fecha de venta, total, dirección, cliente, barrio aprobado y estado de venta son campos obligatorios." });
                    }
            
                    // Realizar la inserción en la base de datos
                    const newVenta = await pool.query(
                        "INSERT INTO ventas (fechaventa, valortotal, direccion, idbarriosaprovado, idestadoventa, idcliente) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                        [fechaventa, valortotal, direccion, idbarriosaprovado, idestadoventa, idcliente]
                    );
            
                    res.json(newVenta.rows[0]);
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send("Error al insertar la venta en la base de datos.");
                }
            });
        //Despachar una venta
            app.put("/ventas/despachar/:id", async (req, res) => {
                try {
                  const { id } = req.params;
                  const despacharVenta = await pool.query(
                    "UPDATE ventas SET idestadoventa = 3 WHERE idventa = $1",
                    [id]
                  );
                  res.json("Venta despachada exitosamente");
                } catch (error) {
                  console.error(error.message);
                  res.status(500).json("Error al despachar la venta");
                }
              });
            //finalizar una venta
              app.put("/ventas/Finalizar/:id", async (req, res) => {
                try {
                  const { id } = req.params;
                  const despacharVenta = await pool.query(
                    "UPDATE ventas SET idestadoventa = 4 WHERE idventa = $1",
                    [id]
                  );
                  res.json("Venta despachada exitosamente");
                } catch (error) {
                  console.error(error.message);
                  res.status(500).json("Error al despachar la venta");
                }
              });






//post/create a testVet
    //tablas de productos
        //agregar a la db un tipo producto
        app.post("/tipoProductos", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const {nombreTipoProducto} = req.body;

                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newTodo = await pool.query(
                    "INSERT INTO tipoProductos (nombreTipoProducto) VALUES ($1) RETURNING *",
                    [nombreTipoProducto]
                );

                res.json(newTodo.rows[0])
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
    
    //tablas de citas
        //agregar una especie a la bd
        app.post("/especies", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { especie } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newEspecie = await pool.query(
                    "INSERT INTO especies (especie) VALUES ($1) RETURNING *",
                    [especie]
                );
                
                res.json(newEspecie.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar tamano animal
        app.post("/tamanoAnimales", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { tamano } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newTamanoAnimal = await pool.query(
                    "INSERT INTO tamanoAnimales (tamano) VALUES ($1) RETURNING *",
                    [tamano]
                );
                
                res.json(newTamanoAnimal.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar a la db un tipo de servicio
        app.post("/tiposServicios", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { tipoServicio } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newTipoServicio = await pool.query(
                    "INSERT INTO tiposServicios (tipoServicio) VALUES ($1) RETURNING *",
                    [tipoServicio]
                );
                
                res.json(newTipoServicio.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar a la bd un tipo domicilio
        app.post("/tiposDomicilios", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { tipoDomicilio } = req.body;
        
                // Verificar si los datos son válidos
                if (!tipoDomicilio || tipoDomicilio.trim() === "") {
                    return res.status(400).json({ message: "El tipo de domicilio no puede estar vacío." });
                }
        
                // Realizar la inserción en la base de datos
                const newTipoDomicilio = await pool.query(
                    "INSERT INTO tiposDomicilios (tipoDomicilio) VALUES ($1) RETURNING *",
                    [tipoDomicilio]
                );
        
                res.json(newTipoDomicilio.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el tipo de domicilio en la base de datos.");
            }
        }); 
        //agregar una mascota
        //registrar un barrio aprovado
        app.post("/barriosAprovados", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { barrioAprovado } = req.body;
        
                // Verificar valores válidos
                if (!barrioAprovado || barrioAprovado.trim() === "") {
                    return res.status(400).json({ message: "El nombre del barrio aprobado es obligatorio." });
                }
        
                // Realizar la inserción en la base de datos
                const newBarrioAprovado = await pool.query(
                    "INSERT INTO barriosAprovados (barrioAprovado) VALUES ($1) RETURNING *",
                    [barrioAprovado]
                );
        
                res.json(newBarrioAprovado.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el barrio aprobado en la base de datos.");
            }
        });
        //agregar un estado de cita    
        app.post("/estadoCita", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { estadoCita } = req.body;
        
                // Verificar si los datos son válidos
                if (!estadoCita || estadoCita.trim() === "") {
                    return res.status(400).json({ message: "El estado de la cita es obligatorio." });
                }
        
                // Realizar la inserción en la base de datos
                const newEstadoCita = await pool.query(
                    "INSERT INTO estadoCita (estadoCita) VALUES ($1) RETURNING *",
                    [estadoCita]
                );
        
                res.json(newEstadoCita.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el estado de la cita en la base de datos.");
            }
        });
        //registrar un cliente
        //registrar un servicio
    //tablas de ventas
        //registrar estado venta
        app.post("/estadoVenta", async (req, res) => {
            try {
                const { estadoVenta } = req.body;
        
                // Verificar si los datos son válidos
                if (!estadoVenta || estadoVenta.trim() === "") {
                    return res.status(400).json({ message: "El estado de venta es obligatorio." });
                }
        
                // Realizar la inserción en la base de datos
                const newEstadoVenta = await pool.query(
                    "INSERT INTO estadoVenta (estadoVenta) VALUES ($1) RETURNING *",
                    [estadoVenta]
                );
        
                res.json(newEstadoVenta.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el estado de venta en la base de datos.");
            }
        });
        //registrar un producto
        app.post("/productos", async (req, res) => {
            try {
                const { nombreProducto } = req.body;
        
                // Verificar si los datos son válidos
                if (!nombreProducto || nombreProducto.trim() === "") {
                    return res.status(400).json({ message: "El nombre del producto es obligatorio." });
                }
        
                // Realizar la inserción en la base de datos
                const newProducto = await pool.query(
                    "INSERT INTO Productos (nombreProducto) VALUES ($1) RETURNING *",
                    [nombreProducto]
                );
        
                res.json(newProducto.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar el producto en la base de datos.");
            }
        });
        //registrar detalle venta

//get/select all todo
    //tablas de productos
        //obtener todos los tipos de productos
        app.get("/tipoProductos", async (req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM tipoProductos");
                res.json(allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        app.get("/tamanoAnimales", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM tamanoanimales");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.get("/tiposServicios", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM tiposServicios");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });

        //obtener tipos servicios
        app.get("/tiposDomicilios", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM tiposDomicilios");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener mascotas
        //obtener estadoCita
        app.get("/estadoCita", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM estadoCita");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener clientes
        //obtener servicios
        app.get("/servicios", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM servicios");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
    //tablas de ventas
        //obtener estadoVenta
        //obtener productos
        app.get("/productos", async(req,res) => {
            try {
                const allTodos = await pool.query("SELECT * FROM productos");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener detalleVenta
        //app.get("/detalleVenta", async(req,res) => {
        //    try {
        //        const allTodos = await pool.query("SELECT * FROM detalleVenta");
        //        res.json( allTodos.rows);
        //    } catch (error) {
        //        console.error(error.message);
        //        res.status(500).send("Error al obtener en la base de datos.");
        //    }
        //});

//get a todo
    //tablas de productos
        //obtener todos los tipos de productos
        app.get("/tipoProductos/:id", async (req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM tipoProductos WHERE idTipoProducto = $1",[id]);
                res.json(allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener todos los proovedores
        app.get("/proveedores/:id", async (req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM proveedores WHERE idProveedor = $1",[id]);
                res.json(allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener todos los productos intrahospitalarios
        app.get("/productosIntrahospitalarios/:id", async (req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM productosIntrahospitalarios WHERE idProductoIntrahospitalario = $1",[id]);
                res.json(allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener lotes productos intrahospitalarios
        app.get("/lotesProductos/:id",async (req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM lotesProductos WHERE idLoteProducto = $1",[id]);
                res.json(allTodos.rows[0]);
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener salidas productos intrahospitalarios
        app.get("/salidasProductos/:id", async(req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM salidasProductos WHERE idSalidaProducto = $1",[id]);
                res.json(allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
    //tablas de citas  
        //obtener especies animales
        app.get("/especies/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM especies WHERE idEspecie = $1",[id]);
                res.json(allTodos.rows[0])
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener tamaños
        app.get("/tamanoAnimales/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM tamanoanimales WHERE idTamanoAnimal = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.get("/tiposServicios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM tiposServicios WHERE idTipoServicio = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener diasDisponibles
        app.get("/diasDisponibles/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM diasDisponibles WHERE idDiasDisponibles = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.get("/tiposDomicilios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM tiposDomicilios WHERE idTipoDomicilio = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener mascotas
        app.get("/mascotas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM mascotas WHERE idMascota = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener barriosAprovados
        app.get("/barriosAprovados/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM barriosAprovados WHERE idBarrioAprovado = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener estadoCita
        app.get("/estadoCita/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM estadoCita WHERE idEstadoCita = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener clientes
        app.get("/clientes/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM clientes WHERE nuipCliente = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener servicios
        app.get("/servicios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM servicios WHERE idServicio = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener citas 3h35l
        app.get("/citas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM citas WHERE idCitas = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
    //tablas de ventas
        //obtener estadoVenta
        app.get("/estadoVenta/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM estadoVenta WHERE idEstadoVenta = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener productos
        app.get("/productos/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM productos WHERE idProducto = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener 
        app.get("/ventas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM ventas WHERE idDetalle = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });
        //obtener detalleVenta
        app.get("/detalleVenta/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("SELECT * FROM detalleVenta WHERE idDetalleVenta = $1",[id]);
                res.json( allTodos.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });

//update a todo

//delete a todo
    //tablas de productos
        //obtener todos los tipos de productos
        app.delete("/tipoProductos/:id", async (req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM tipoProductos WHERE idTipoProducto = $1",[id]);
                res.json("element was delete");
                res.json( allTodos.rows[0]);

            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener todos los proovedores
        app.delete("/proveedores/:id", async (req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM proveedores WHERE idProveedor = $1",[id]);
                res.json("element was delete");
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener todos los productos intrahospitalarios
        app.delete("/productosIntrahospitalarios/:id", async (req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM productosIntrahospitalarios WHERE idProductoIntrahospitalario = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener lotes productos intrahospitalarios
        //obtener salidas productos intrahospitalarios
        app.delete("/salidasProductos/:id", async(req,res) =>{
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM salidasProductos WHERE idSalidaProducto = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
    //tablas de citas  
        //obtener especies animales
        app.delete("/especies/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM especies WHERE idEspecie = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener tamaños
        app.delete("/tamanoAnimales/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM tamanoanimales WHERE idTamanoAnimal = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.delete("/tiposServicios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM tiposServicios WHERE idTipoServicio = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener diasDisponibles
        app.delete("/diasDisponibles/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM diasDisponibles WHERE idDiasDisponibles = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener tipos servicios
        app.delete("/tiposDomicilios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM tiposDomicilios WHERE idTipoDomicilio = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener mascotas
        app.delete("/mascotas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM mascotas WHERE idMascota = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener barriosAprovados
        app.delete("/barriosAprovados/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM barriosAprovados WHERE idBarrioAprovado = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener estadoCita
        app.delete("/estadoCita/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM estadoCita WHERE idEstadoCita = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener clientes
        app.delete("/clientes/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM clientes WHERE nuipCliente = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener servicios
        app.delete("/servicios/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM servicios WHERE idServicio = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener citas 3h35l
        app.delete("/citas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM citas WHERE idCitas = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
    //tablas de ventas
        //obtener estadoVenta
        app.delete("/estadoVenta/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM estadoVenta WHERE idEstadoVenta = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener productos
        app.delete("/productos/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM productos WHERE idProducto = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener 
        app.delete("/ventas/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM ventas WHERE idDetalle = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
        //obtener detalleVenta
        app.delete("/detalleVenta/:id", async(req,res) => {
            try {
                const {id} = req.params;
                const allTodos = await pool.query("DELETE FROM detalleVenta WHERE idDetalleVenta = $1",[id]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al borrar en la base de datos.");
            }
        });
    //tablas roles
        //obtener roles
        app.post("/roles",async(req,res)=>{
            try {
                const { descripccion } = req.body;
                const newRol = await pool.query(
                    "INSERT INTO roles (descripccion) VALUES ($1) RETURNING *",
                    [descripccion]
                );
                res.json(newRol.rows[0]);

            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //agregar roles
        app.get("/roles",async(req,res)=>{
            try {
                const allTodos = await pool.query("SELECT * FROM roles");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
    
    //tablas de usuarios
        //obtener usuarios
        app.get("/usuarios", async(req,res) => {
            console.log("aqui")
            try {
                const allTodos = await pool.query("SELECT * FROM usuarios");
                res.json( allTodos.rows);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al obtener en la base de datos.");
            }
        });

        //publicar usuarios
        app.post("/usuarios/cliente", async (req, res) => {
            try {
                // Obtener los datos del cuerpo de la solicitud
                const { nuipusuario, clave_hash, correo, telefono, nombre } = req.body;
                const idroll = 1;
        
                // Verificar si el nuipusuario ya existe
                const existingUser = await pool.query("SELECT * FROM usuarios WHERE nuipusuario = $1", [nuipusuario]);
                if (existingUser.rows.length > 0) {
                    return res.status(400).json({ error: 'El nuipusuario ya está registrado.' });
                }
        
                // Verificar si el correo ya existe
                const existingEmail = await pool.query("SELECT * FROM usuarios WHERE correo = $1", [correo]);
                if (existingEmail.rows.length > 0) {
                    return res.status(400).json({ error: 'El correo ya está registrado.' });
                }
        
                // Calcular el hash SHA-256 de la contraseña
                const hash = crypto.createHash('sha256').update(clave_hash).digest('hex');
        
                // Insertar los datos en la base de datos
                const newProveedor = await pool.query(
                    "INSERT INTO usuarios (nuipusuario, clave_hash, correo, telefono, nombre, idroll) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                    [nuipusuario, hash, correo, telefono, nombre, idroll]
                );
        
                res.json(newProveedor.rows[0]); // Responder con los datos insertados
        
            } catch (error) {
                // Verificar si el error es por clave duplicada
                if (error.code === '23505') { // 23505 es el código de error para violación de restricción única en PostgreSQL
                    res.status(400).json({ error: 'El nuipusuario o correo ya está registrado.' });
                } else {
                    console.error(error.message);
                    res.status(500).send("Error al insertar en la base de datos.");
                }
            }
        });
        
        //publicar usuarios
        app.post("/usuarios/admin", async (req, res) => {
            try {
                // Obtener los datos del cuerpo de la solicitud
                const { nuipusuario, clave_hash, correo, telefono, nombre } = req.body;
                const idroll = 2;
                console.log(nuipusuario, clave_hash, correo, telefono, nombre,idroll);
        
                // Calcular el hash SHA-256 de la contraseña
                const hash = crypto.createHash('sha256').update(clave_hash).digest('hex');
        
                // Insertar los datos en la base de datos
                const newProveedor = await pool.query(
                    "INSERT INTO usuarios (nuipusuario, clave_hash, correo, telefono, nombre, idroll) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                    [nuipusuario, hash, correo, telefono, nombre, idroll]
                );
                console.log(nuipusuario, hash, correo, telefono, nombre, idroll);
                res.json(newProveedor.rows[0]); // Responder con los datos insertados
                
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
        });
        //inicio seccion de un usuario
        app.post("/autenticar", async (req, res) => {
            try {
                // Obtener los datos de la consulta
                const { correo, clave } = req.body;
                console.log(correo, clave);
        
                // Buscar el usuario en la base de datos por correo electrónico
                const usuario = await pool.query(
                    "SELECT * FROM usuarios WHERE correo = $1",
                    [correo]
                );
        
                // Verificar si se encontró un usuario con ese correo
                if (usuario.rows.length === 0) {
                    return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos." });
                }
        
                // Verificar si la contraseña coincide
                const hash = crypto.createHash('sha256').update(clave).digest('hex');
                if (usuario.rows[0].clave_hash !== hash) {
                    return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos." });
                }
        
                // Si la autenticación es exitosa, devolver los datos del usuario
                res.json(usuario.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error en el servidor.");
            }
        });

        // Generar un código aleatorio de 5 caracteres
        function generarCodigoAleatorio() {
            const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let resultado = '';
            for (let i = 0; i < 5; i++) {
                resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
            return resultado;
        }
        // Asignar un código aleatorio a un usuario
        app.patch("/usuarios/asignar-codigo", async (req, res) => {
            try {
                // Obtener el correo del cuerpo de la solicitud
                const { correo } = req.body;

                // Buscar el usuario en la base de datos por correo electrónico
                const usuario = await pool.query(
                    "SELECT * FROM usuarios WHERE correo = $1",
                    [correo]
                );

                // Verificar si se encontró un usuario con ese correo
                if (usuario.rows.length === 0) {
                    return res.status(404).json({ message: "El correo electrónico no está registrado." });
                }

                // Generar un nuevo código aleatorio
                const nuevoCodigo = generarCodigoAleatorio();

                // Actualizar el código del usuario en la base de datos
                await pool.query(
                    "UPDATE usuarios SET codigo = $1 WHERE correo = $2",
                    [nuevoCodigo, correo]
                );

                res.json({ message: "El código ha sido asignado exitosamente.", codigo: nuevoCodigo });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error en el servidor.");
            }
        });

        // Cambiar contraseña de un usuario
        app.patch("/usuarios/cambiar-clave", async (req, res) => {
            try {
                // Obtener los datos del cuerpo de la solicitud
                const { correo, codigo, nuevaClave } = req.body;

                // Buscar el usuario en la base de datos por correo electrónico y código
                const usuario = await pool.query(
                    "SELECT * FROM usuarios WHERE correo = $1 AND codigo = $2",
                    [correo, codigo]
                );

                // Verificar si se encontró un usuario con ese correo y código
                if (usuario.rows.length === 0) {
                    return res.status(404).json({ message: "El correo electrónico o el código no están registrados." });
                }

                // Calcular el hash SHA-256 de la nueva clave
                const hashNuevaClave = crypto.createHash('sha256').update(nuevaClave).digest('hex');

                // Actualizar la clave del usuario en la base de datos
                await pool.query(
                    "UPDATE usuarios SET clave_hash = $1 WHERE correo = $2 AND codigo = $3",
                    [hashNuevaClave, correo, codigo]
                );

                res.json({ message: "La clave ha sido cambiada exitosamente." });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error en el servidor.");
            }
        });

        //cambiar telefono de un usuario
        app.patch("/usuarios/cambiar-telefono", async (req, res) => {
            try {
                // Obtener los datos del cuerpo de la solicitud
                const { correo, nuevaTelefono } = req.body;
        
                // Actualizar el teléfono del usuario en la base de datos
                await pool.query(
                    "UPDATE usuarios SET telefono = $1 WHERE correo = $2",
                    [nuevaTelefono, correo]
                );
        
                res.json({ message: "El teléfono ha sido cambiado exitosamente." });
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error en el servidor.");
            }
        });

        
        //agregar a la db dias disponibles
        app.post("/diasDisponibles", async (req, res) => {
            try {
                //obtener lo escrito en el raw body
                const { diasdisponibles } = req.body;
                
                // Verificar si los datos son válidos
                
                //volver el http a query sql
                const newDiaDisponible = await pool.query(
                    "INSERT INTO diasDisponibles (diasdisponibles) VALUES ($1) RETURNING *",
                    [diasdisponibles]
                );
                
                res.json(newDiaDisponible.rows[0]);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Error al insertar en la base de datos.");
            }
    });
        
        
        //obtener un usuario

        //guardar usuarios

        //borrar usuarios

app. listen(5000, () =>{
    console.log("server has started on port 5000");
});