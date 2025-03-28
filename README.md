# **FAPI - File-based API 📂**

**FAPI** is a simple, self-hosted REST API that serves JSON data based on uploaded files. Just upload a `.json` file, and it automatically becomes an API endpoint!

## **🚀 Features**
✅ **Upload JSON files** → Automatically creates API endpoints  
✅ **Retrieve data** → Fetch the entire JSON file or filter by `id`  
✅ **Auto-generated endpoints** → No coding required, just upload files  
✅ **Simple UI** → Swagger-like interface with collapsible sections  
✅ **Delete API endpoints** → Remove JSON files to remove endpoints  

---

## **📦 Installation**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/icequezon/fapi.git
cd fapi
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Build the Project**
```sh
npm run build
```

### **4️⃣ Start the Server**
```sh
npm start
```
By default, the server runs on **`http://localhost:3000`**.

---


## **🐳 Docker Setup**

FAPI can also be run using Docker for easy deployment.

### **📦 Build the Docker Image**
First, build the Docker image by running the following command in your project root:

```sh
docker build -t fapi .
```

You can pull and run the prebuilt FAPI Docker image from Docker Hub.

### **📥 Pull the Image**
If the image has already been pushed to Docker Hub, you can pull it using:
```sh
docker pull aisukezontech/fapi:latest
```

### **🚀 Run the Docker Container**
After building the image, run the container:

```sh
docker run -p 3000:3000 fapi
```

This will start the FAPI server and expose it on **`http://localhost:3000`**.

### **🔧 Docker Compose (Optional)**
If you are using Docker Compose, you can add the following `docker-compose.yml` to simplify container management:

```yaml
version: '3.8'

services:
  fapi:
    ports:
      - "3000:3000"
```

To run the app using Docker Compose:
```sh
docker-compose up
```

---

Now, you can access the FAPI server at **`http://localhost:3000`**.

---

## **🛠 Usage**
### **📌 Upload a JSON File**
- Visit **`http://localhost:3000`** and click **"Upload JSON"**
- Choose a `.json` file
- Click **Upload**
- The filename (without `.json`) becomes the **API endpoint**

### **📌 API Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/upload` | Upload a JSON file to create an endpoint |
| **GET** | `/api` | Lists all available endpoints |
| **GET** | `/api/:endpoint` | Fetch the JSON data of an endpoint |
| **GET** | `/api/:endpoint/:id` | Fetch a single item by ID (if the JSON is a list) |
| **DELETE** | `/api/:endpoint` | Deletes the JSON file (removes the endpoint) |

---

## **📝 Example**
### **📌 Upload `users.json`**
#### **JSON File (`users.json`)**
```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```
#### **📌 Access the Data**
```sh
GET /api/users
```
📌 **Response:**
```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```
```sh
GET /api/users/1
```
📌 **Response:**
```json
{ "id": 1, "name": "Alice" }
```

---

## **💻 API via cURL**
### **📌 Upload JSON File**
```sh
curl -X POST -F "file=@users.json" http://localhost:3000/upload
```

### **📌 Fetch All Endpoints**
```sh
curl http://localhost:3000/api
```

### **📌 Delete an Endpoint**
```sh
curl -X DELETE http://localhost:3000/api/users
```

---

## **🛡 License**
This project is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.  
You are free to use, modify, and distribute it under the terms of the GPL-3.0 license.  

For more details, visit [GNU GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html).
