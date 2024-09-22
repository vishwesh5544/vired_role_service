## Example docker running command: 
```
docker run -p 3000:3000 \
  -e MONGO_URI="mongodb+srv://<username>:<password>@<uri>/<db-name>?retryWrites=true&w=majority&appName=main" \
  vired_role_service
```