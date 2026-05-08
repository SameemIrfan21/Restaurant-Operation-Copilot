from pydantic import BaseModel


class MenuItemBase(BaseModel):
    item_name: str
    category: str
    price: float


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemUpdate(MenuItemBase):
    pass


class MenuItem(MenuItemBase):
    id: int

    class Config:
        from_attributes = True
