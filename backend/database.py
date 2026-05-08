from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:something@localhost/restaurant_db"

engine = create_engine(DATABASE_URL, future=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, future=True)

Base = declarative_base()