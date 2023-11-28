const express = require('express');
const { DynamoDBClient, PutItemCommand, UpdateItemCommand, GetItemCommand, ScanCommand } = require('@aws-sdk/client-dynamodb');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const bodyParser = require('body-parser');
const config = require('./config.json');
const cors = require('cors');
const AWS = require('aws-sdk');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dynamoDbClient = new DynamoDBClient({
  region: config.region,
  credentials: fromIni({ profile: 'Alan' }),
});

// Ruta para crear un nuevo registro de vehículo
app.post('/api/vehiculos', async (req, res) => {
  try {
    const { marca, modelo, cliente, patente, cilindrada, anioFabricacion, ultimoCambioAceite, kilometraje, color } = req.body;
    const servicioNumber = new Date().toISOString().replace(/[:.-]/g, '');

    const params = {
      TableName: 'Vehiculos',
      Item: {
        servicioNumber: { S: servicioNumber },
        marca: { S: marca },
        modelo: { S: modelo },
        cliente: { S: cliente },
        patente: { S: patente },
        cilindrada: { S: cilindrada },
        anioFabricacion: { S: anioFabricacion },
        ultimoCambioAceite: { S: ultimoCambioAceite },
        kilometraje: { S: kilometraje },
        color: { S: color },
        trabajos: { L: [] },
      },
    };

    await dynamoDbClient.send(new PutItemCommand(params));
    res.json({ message: 'Registro de vehículo creado con éxito', servicioNumber: servicioNumber });
  } catch (error) {
    console.error('Error al crear el registro de vehículo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para agregar un trabajo a un vehículo existente
app.post('/api/vehiculos/:servicioNumber/trabajos', async (req, res) => {
  try {
    const { servicioNumber } = req.params;
    const { descripcion } = req.body;

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
      ReturnValues: 'UPDATED_NEW',
    };

    const result = await dynamoDbClient.send(new UpdateItemCommand(updateParams));
    res.json({ message: 'Trabajo agregado al vehículo con éxito', updatedAttributes: result.Attributes });
  } catch (error) {
    console.error('Error al agregar el trabajo al vehículo:', error);
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
    res.json(data.Items.map(item => AWS.DynamoDB.Converter.unmarshall(item)));
  } catch (error) {
    console.error('Error al obtener la información de los vehículos:', error);
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
      res.json(AWS.DynamoDB.Converter.unmarshall(data.Item));
    }
  } catch (error) {
    console.error('Error al obtener la información del vehículo:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
