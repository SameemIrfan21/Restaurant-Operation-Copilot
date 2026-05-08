from sqlalchemy import Column, Float, Integer, String

from database import Base


class Menu(Base):
    __tablename__ = "menu"

    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    price = Column(Float, nullable=False)
