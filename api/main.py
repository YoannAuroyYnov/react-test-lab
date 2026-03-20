import mysql.connector
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conn = mysql.connector.connect(
  database=os.getenv("MYSQL_DATABASE"),
  user=os.getenv("MYSQL_USER"),
  password=os.getenv("MYSQL_PASSWORD"),
  port=3306,
  host=os.getenv("MYSQL_HOST")
)


class UserCreate(BaseModel):
    name: str
    email: str
    firstname: str | None = None
    lastname: str | None = None
    birth: str | None = None
    city: str | None = None
    zipCode: str | None = None

@app.get("/users")
async def get_users():
    cursor = conn.cursor(dictionary=True)
    sql_select_query = "SELECT * from users"
    cursor.execute(sql_select_query)
    records = cursor.fetchall()
    print("Total number of rows in users is: ", cursor.rowcount)
    return {"users": records}


@app.post("/users", status_code=201)
async def create_user(user: UserCreate):
  cursor = conn.cursor(dictionary=True)
  try:
    cursor.execute(
      "INSERT INTO users (name, email) VALUES (%s, %s)",
      (user.name, user.email),
    )
    conn.commit()

    created_id = cursor.lastrowid
    cursor.execute("SELECT * FROM users WHERE id = %s", (created_id,))
    created_user = cursor.fetchone()
    return created_user
  except mysql.connector.Error as error:
    conn.rollback()
    raise HTTPException(status_code=400, detail=str(error))

@app.put("/users/{user_id}")
async def update_user(user_id: int, user: UserCreate):
  cursor = conn.cursor(dictionary=True)
  try:
    cursor.execute(
      "UPDATE users SET name = %s, email = %s WHERE id = %s",
      (user.name, user.email, user_id),
    )
    conn.commit()
    if cursor.rowcount == 0:
      raise HTTPException(status_code=404, detail="User not found")

    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    updated_user = cursor.fetchone()
    return updated_user
  except mysql.connector.Error as error:
    conn.rollback()
    raise HTTPException(status_code=400, detail=str(error))

@app.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: int):
  cursor = conn.cursor(dictionary=True)
  try:
    cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
    conn.commit()
    if cursor.rowcount == 0:
      raise HTTPException(status_code=404, detail="User not found")
  except mysql.connector.Error as error:
    conn.rollback()
    raise HTTPException(status_code=400, detail=str(error))