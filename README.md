
## How to Launch the App

This project has two parts:

- **Backend (Express API)** → `http://localhost:5000`
- **Frontend (React App)** → `http://localhost:3000`

You will need **two terminals** (one for backend, one for frontend).

---

## 1) Run the Backend

Open a terminal and run:

```bash
cd StarterCode/backend
npm install
node index.js
````

You should see:

```bash
Server is running on port 5000
```

### Test backend (optional)

Open this URL in your browser:

```txt
http://localhost:5000/api/products
```

You should see a JSON list of products.


## 2) Run the Frontend

Open a **second terminal** and run:

```bash
cd StarterCode/frontend
npm install
npm start
```

This should open the app in your browser automatically.

If it does not open automatically, go to:

```txt
http://localhost:3000
```


## 3) Use the App

* The frontend fetches products from the backend
* Products are shown as cards
* Click the delete icon to remove a product

---

## Common Issues / Troubleshooting

### Port already in use

If port `3000` or `5000` is already being used:

* Close other running apps using those ports, **or**
* Change the port in your code/config and restart
