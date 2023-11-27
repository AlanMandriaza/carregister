const express = require('express');
const AWS = require('aws-sdk');
const { DynamoDBClient, PutItemCommand, UpdateItemCommand, GetItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const bodyParser = require('body-parser');
const config = require('./config.json');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
AWS.config.update({
  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});

const dynamoDbClient = new DynamoDBClient({
  region: config.region,
  credentials: fromIni({ profile: 'Alan' }),
});

app.use(bodyParser.json());

// Ruta para crear un nuevo registro de vehículo
app.post('/api/vehiculos', async (req, res) => {
  try {
    const { marca, modelo, cliente, patente, cilindrada, anioFabricacion, ultimoCambioAceite, kilometraje, color } = req.body;

    const params = {
      TableName: 'Vehiculos',
      Item: {
        servicioNumber: { S: new Date().toISOString().replace(/[:.-]/g, '') },
        marca: { S: marca },
        modelo: { S: modelo },
        cliente: { S: cliente },
        patente: { S: patente },
        cilindrada: { S: cilindrada },
        anioFabricacion: { S: anioFabricacion },
        ultimoCambioAceite: { S: ultimoCambioAceite },
        kilometraje: { S: kilometraje },
        color: { S: color },
        trabajos: { L: [] }, // Inicializa la lista de trabajos como vacía
      },
    };

    await dynamoDbClient.send(new PutItemCommand(params));
    res.json({ message: 'Registro de vehículo creado con éxito' });
  } catch (error) {
    console.error('Error al crear el registro de vehículo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear un nuevo registro de trabajo y asociarlo a un vehículo
app.post('/api/trabajos', async (req, res) => {
  try {
    const { servicioNumber, descripcion } = req.body;

    // Actualiza el registro de vehículo existente para agregar el trabajo
    const updateParams = {
      TableName: 'Vehiculos',
      Key: {
        servicioNumber: { S: servicioNumber },
      },
      UpdateExpression: 'SET #trabajos = list_append(if_not_exists(#trabajos, :empty_list), :trabajo)',
      ExpressionAttributeNames: {
        '#trabajos': 'trabajos',
      },
      ExpressionAttributeValues: {
        ':trabajo': { L: [{ S: descripcion }] },
        ':empty_list': { L: [] },
      },
      ReturnValues: 'ALL_NEW',
    };

    await dynamoDbClient.send(new UpdateItemCommand(updateParams));
    res.json({ message: 'Registro de trabajo creado y asociado al vehículo con éxito' });
  } catch (error) {
    console.error('Error al crear el registro de trabajo y asociarlo al vehículo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener información de todos los vehículos
app.get('/api/vehiculos', async (req, res) => {
  try {
    const params = {
      TableName: 'Vehiculos',
    };

    const data = await dynamoDbClient.send(new ScanCommand(params));
    res.json(data.Items);
  } catch (error) {
    console.error('Error al obtener la información de los vehículos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener información de todos los trabajos
app.get('/api/trabajos', async (req, res) => {
  try {
    const params = {
      TableName: 'Trabajos',
    };

    const data = await dynamoDbClient.send(new ScanCommand(params));
    res.json(data.Items);
  } catch (error) {
    console.error('Error al obtener la información de los trabajos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener información de un vehículo específico por su servicioNumber
app.get('/api/vehiculos/:servicioNumber', async (req, res) => {
  try {
    const { servicioNumber } = req.params;

    const params = {
      TableName: 'Vehiculos',
      Key: {
        servicioNumber: { S: servicioNumber },
      },
    };

    const data = await dynamoDbClient.send(new GetItemCommand(params));
    if (!data.Item) {
      res.status(404).json({ error: 'Vehículo no encontrado' });
    } else {
      res.json(data.Item);
    }
  } catch (error) {
    console.error('Error al obtener la información del vehículo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener información de un trabajo específico por su servicioNumber
app.get('/api/trabajos/:servicioNumber', async (req, res) => {
  try {
    const { servicioNumber } = req.params;

    const params = {
      TableName: 'Trabajos',
      Key: {
        servicioNumber: { S: servicioNumber },
      },
    };

    const data = await dynamoDbClient.send(new GetItemCommand(params));
    if (!data.Item) {
      res.status(404).json({ error: 'Trabajo no encontrado' });
    } else {
      res.json(data.Item);
    }
  } catch (error) {
    console.error('Error al obtener la información del trabajo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
