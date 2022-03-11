import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Evaluasi() {
    const [data, setData] = useState([])
    const [urut, setList] = useState([])
    const [edit, setEdit] = useState(null)
    useEffect(()=>{
        getData()
        getList()
    },[])
    const getData = ()=>{
        axios.get('http://localhost:3001/card')
        .then(hasil=>setData(hasil.data))
    }
    const getList = ()=>{
        axios.get('http://localhost:3001/data')
        .then(hasil=>setList(hasil.urut))
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:3001/card', {name: e.target.submit.value})
        .then(()=>{
            getData()
            e.target.submit.value=''
        })
    }
    const handleDelete = (id)=>{
        axios.delete(`http://localhost:3001/card/${id}`)
        .then(()=>getData())
    }
    const handleEdit = (e) =>{
        e.preventDefault()
        axios.patch(`http://localhost:3001/card/${data[edit].id}`, {name: e.target.save.value})
        .then(()=>{
          getData()
          setEdit(null)
        })
      }
    const handleList = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/data',{name: e.target.list.value})
        .then(()=>{
            getList()
            e.target.list.value=''
        })
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div>DAFTAR MAHASISWA BERPRESTASI</div>
          <hr></hr>
          <heading>Nama Mahasiswa:    </heading>
          <input name='submit'></input>
          <button>Submit Nama</button>
        </form>
        <div>
          {data.map((value, index)=>{
            return (
              edit === index?
              <form key={index} onSubmit={handleEdit}>
                <input name='save' defaultValue={value.name}/> <button>simpan</button>
              </form>
            : <div key={index}>{value.name} 
              <button onClick={ () => handleDelete(value.id)}>Hapus</button> 
              <button onClick={ () => setEdit(index)}>Edit</button>
              <div>
                <form onSubmit={handleList}>
                  <input name='list'/>
                  <button>Buat List Prestasi</button>
                </form>
              </div>
              <br></br>
            </div>)
          })}
        </div>

      </div>
  )
}