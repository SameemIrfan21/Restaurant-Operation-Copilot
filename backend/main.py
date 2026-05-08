from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.orm import Session

from database import SessionLocal, engine
from models import Base, Menu
from schemas import MenuItem, MenuItemCreate, MenuItemUpdate

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.on_event("startup")
def seed_menu():
    db = SessionLocal()
    try:
        if db.query(Menu).count() == 0:
            sample_items = [
                Menu(item_name="Burger", category="Fast Food", price=120.0),
                Menu(item_name="Pizza", category="Fast Food", price=250.0),
                Menu(item_name="Salad", category="Healthy", price=80.0),
                Menu(item_name="Pasta", category="Italian", price=150.0),
            ]
            db.add_all(sample_items)
            db.commit()
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Restaurant API Running"}


@app.get("/menu", response_model=List[MenuItem])
def get_menu(db: Session = Depends(get_db)):
    return db.query(Menu).all()


@app.post("/menu", response_model=MenuItem)
def create_menu_item(item: MenuItemCreate, db: Session = Depends(get_db)):
    db_item = Menu(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.put("/menu/{item_id}", response_model=MenuItem)
def update_menu_item(item_id: int, item: MenuItemUpdate, db: Session = Depends(get_db)):
    db_item = db.query(Menu).filter(Menu.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, value in item.dict().items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.delete("/menu/{item_id}")
def delete_menu_item(item_id: int, db: Session = Depends(get_db)):
    db_item = db.query(Menu).filter(Menu.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted"}