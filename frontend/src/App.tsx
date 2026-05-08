import { useEffect, useState } from 'react'
import './App.css'

interface MenuItem {
  id: number
  item_name: string
  category: string
  price: number
}

function App() {
  const [menu, setMenu] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newItem, setNewItem] = useState({ item_name: '', category: '', price: '' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editItem, setEditItem] = useState({ item_name: '', category: '', price: '' })

  const fetchMenu = () => {
    fetch('http://localhost:8000/menu')
      .then(response => response.json())
      .then(data => {
        setMenu(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to fetch menu')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newItem.item_name || !newItem.category || !newItem.price) return

    fetch('http://localhost:8000/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_name: newItem.item_name,
        category: newItem.category,
        price: parseFloat(newItem.price)
      })
    })
      .then(response => response.json())
      .then(() => {
        setNewItem({ item_name: '', category: '', price: '' })
        fetchMenu()
      })
      .catch(() => setError('Failed to create item'))
  }

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id)
    setEditItem({ item_name: item.item_name, category: item.category, price: item.price.toString() })
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editItem.item_name || !editItem.category || !editItem.price || !editingId) return

    fetch(`http://localhost:8000/menu/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_name: editItem.item_name,
        category: editItem.category,
        price: parseFloat(editItem.price)
      })
    })
      .then(response => response.json())
      .then(() => {
        setEditingId(null)
        setEditItem({ item_name: '', category: '', price: '' })
        fetchMenu()
      })
      .catch(() => setError('Failed to update item'))
  }

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8000/menu/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetchMenu())
      .catch(() => setError('Failed to delete item'))
  }

  if (loading) return <div>Loading menu...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="app">
      <h1>Restaurant Menu Management</h1>

      <form onSubmit={handleCreate} className="create-form">
        <input
          type="text"
          placeholder="Item Name"
          value={newItem.item_name}
          onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          required
        />
        <button type="submit">Add Item</button>
      </form>

      <div className="menu-container">
        {menu.map(item => (
          <div key={item.id} className="menu-item">
            {editingId === item.id ? (
              <form onSubmit={handleUpdate} className="edit-form">
                <input
                  type="text"
                  value={editItem.item_name}
                  onChange={(e) => setEditItem({ ...editItem, item_name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  value={editItem.category}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                  required
                />
                <input
                  type="number"
                  step="0.01"
                  value={editItem.price}
                  onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                  required
                />
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <h3>{item.item_name}</h3>
                <p>Category: {item.category}</p>
                <p>Price: ₹{item.price}</p>
                <div className="actions">
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
