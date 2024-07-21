const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to serve a welcome message
app.get('/', (req, res) => {
  res.send('Hello, World! This is a Devesh.');
});

// Route to serve user information
app.get('/user', (req, res) => {
  res.json({
    name: 'Devesh',
    role: 'Developer',
    email: 'deveshrathore13@gmail.com'
  });
});

// Route to handle POST requests
app.post('/data', (req, res) => {
  const { data } = req.body;
  res.json({ receivedData: data });
});

// Route to handle errors
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
